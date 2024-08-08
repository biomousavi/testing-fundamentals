import { describe, it, vi } from "vitest";
import { Fetch, GithubApi } from "./githubApi";

describe("githubApi", () => {
  describe("getRepository", () => {
    it("should return repository information", async ({ expect }) => {
      const repo = "REPO";
      const token = "TOKEN";
      const fetchRes = "RESPONSE";
      const username = "USERNAME";

      // this is our function that pretending to be a real fetch function
      const fetchMock = vi.fn<Parameters<Fetch>, ReturnType<Fetch>>(
        mockPromise
      );
      const api = new GithubApi(token, fetchMock);
      const response = api.getRepository(username, repo);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.github.com/repos/${username}/${repo}`,
        {
          headers: {
            "User-Agent": "Qwik Workshop",
            "X-GitHub-Api-Version": "2022-11-28",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMock.mock.results[0].value.resolve(new Response('"RESPONSE"'));
      expect(await response).equal(fetchRes);
    });
    it.todo("should timeout after x seconds with timeout response");
  });
});

function mockPromise<T>(): Promise<T> & {
  resolve: (value: T) => void;
  reject: (error: any) => void;
} {
  let resolve!: (value: T) => void;
  let reject!: (error: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  }) as any;
  promise.resolve = resolve;
  promise.reject = reject;
  return promise;
}
