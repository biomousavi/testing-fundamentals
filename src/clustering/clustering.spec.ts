import { describe, expect, it } from "vitest";
import { loadDataset } from "./clustering";

describe("clustering", () => {
  it("should loud data", () => {
    const dataset = loadDataset();

    expect(dataset).toMatchSnapshot();
  });
});
