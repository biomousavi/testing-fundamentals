import { beforeEach, describe, it, Mock, vi } from "vitest";
import { Fetch, GithubApi } from "./githubApi";

describe("githubApi", () => {
  let fetchMock: Mock<Parameters<Fetch>, ReturnType<Fetch>>;
  let api: GithubApi;

  const repo = "REPO";
  const token = "TOKEN";
  const username = "USERNAME";

  beforeEach(() => {
    // this is our function that pretending to be a real fetch function
    fetchMock = vi.fn<Parameters<Fetch>, ReturnType<Fetch>>(mockPromise);

    // initialize github API calss
    api = new GithubApi(token, fetchMock);
  });

  describe("getRepository", () => {
    it("should return repository information", async ({ expect }) => {
      // calling fetch API
      const apiResponse = api.getRepository(username, repo);

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

      const fetchRes = "RESPONSE";

      // Resolving Promise
      fetchMock.mock.results[0].value.resolve(new Response('"RESPONSE"'));

      // asserting Promise
      expect(await apiResponse).equal(fetchRes);
    });

    it("should timeout after x seconds with timeout response", async ({
      expect,
    }) => {
      const timeoutMs = 30;
      const api = new GithubApi(token, fetchMock, timeoutMs);
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

      expect(await response).toEqual({
        response: "timeout",
      });
    });
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
