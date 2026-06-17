// Live GitHub stats for the Open Source section.
// Fetched server-side with hourly revalidation. Unauthenticated REST + the
// public jogruber contributions API; everything degrades gracefully on error.

const USER = "SiddhantSwan12";
const REVALIDATE = 60 * 60; // 1 hour

export type ContribDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GitHubStats = {
  repos: number;
  followers: number;
  stars: number;
  mergedPRs: number;
  weeks: ContribDay[][]; // columns of up-to-7 days
  totalContributions: number;
  ok: boolean;
};

const EMPTY: GitHubStats = {
  repos: 0,
  followers: 0,
  stars: 0,
  mergedPRs: 0,
  weeks: [],
  totalContributions: 0,
  ok: false,
};

async function getJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function toWeeks(days: ContribDay[]): ContribDay[][] {
  const weeks: ContribDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const [user, repos, merged, contrib] = await Promise.all([
    getJSON<{ public_repos: number; followers: number }>(
      `https://api.github.com/users/${USER}`,
    ),
    getJSON<{ stargazers_count: number }[]>(
      `https://api.github.com/users/${USER}/repos?per_page=100&type=owner`,
    ),
    getJSON<{ total_count: number }>(
      `https://api.github.com/search/issues?q=author:${USER}+type:pr+is:merged&per_page=1`,
    ),
    getJSON<{ total: Record<string, number>; contributions: ContribDay[] }>(
      `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
    ),
  ]);

  if (!user) return EMPTY;

  const stars = (repos ?? []).reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const days = contrib?.contributions ?? [];

  return {
    repos: user.public_repos ?? 0,
    followers: user.followers ?? 0,
    stars,
    mergedPRs: merged?.total_count ?? 0,
    weeks: toWeeks(days),
    totalContributions: days.reduce((s, d) => s + d.count, 0),
    ok: true,
  };
}
