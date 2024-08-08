import type { paths } from "@octokit/openapi-types";

type OrgRepoResponse =
  paths["/repos/{owner}/{repo}"]["get"]["responses"]["200"]["content"]["application/json"];

export type Fetch = typeof fetch;

export class GithubApi {
  constructor(
    private token: string | undefined,
    private apiFetch: Fetch,
    private timeout: number = 4000
  ) {
    this.token = token;
  }

  async getRepository(user: string, repo: string) {
    const headers: HeadersInit = {
      "User-Agent": "Qwik Workshop",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (this.token) {
      headers["Authorization"] = "Bearer " + this.token;
    }

    return Promise.race([
      delay(this.timeout).then(() => ({ response: "timeout" })),
      this.apiFetch(`https://api.github.com/repos/${user}/${repo}`, {
        headers,
      }).then((res) => res.json()),
    ]);
  }
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
