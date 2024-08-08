import { describe, expect, it } from "vitest";
import { cluster, loadDataset } from "./clustering";

describe("clustering", () => {
  it("should loud data", () => {
    const dataset = loadDataset();

    expect(dataset).toBeTruthy();
  });

  it("should create two clusters with two items each", () => {
    const dataset = [
      { lat: 0, lng: 0 },
      { lat: 0, lng: 1 },
      { lat: 10, lng: 10 },
      { lat: 11, lng: 11 },
    ];

    // slice it to have faster test
    const clusters = cluster(dataset, 5, 1);

    expect(clusters).toMatchObject({
      clusters: [
        {
          data: [
            { lat: 0, lng: 0 },
            { lat: 0, lng: 1 },
          ],
          latMax: 0,
          latMin: 0,
          lngMax: 1,
          lngMin: 0,
        },
        {
          data: [
            { lat: 10, lng: 10 },
            { lat: 11, lng: 11 },
          ],
          latMax: 11,
          latMin: 10,
          lngMax: 11,
          lngMin: 10,
        },
      ],
    });
  });
});
