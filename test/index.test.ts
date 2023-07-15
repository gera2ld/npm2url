import { expect, it, describe } from "vitest";
import { urlBuilder } from "../src";

const testPath = "npm2url/dist/index.cjs";

describe("urlBuilder", () => {
  it("pass", () => {
    expect(urlBuilder.getFullUrl(testPath, "jsdelivr")).toBe(
      `https://cdn.jsdelivr.net/npm/${testPath}`
    );
    expect(urlBuilder.getFullUrl(testPath, "unpkg")).toBe(
      `https://unpkg.com/${testPath}`
    );
  });
});
