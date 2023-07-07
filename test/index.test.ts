import { expect, it, describe } from "vitest";
import { cdnUrl } from "../src";

const testPath = "@gera2ld/jsx-dom/dist/index.js";

describe("cdnUrl", () => {
  it("pass", () => {
    expect(cdnUrl("jsdelivr", testPath)).toBe(
      `https://cdn.jsdelivr.net/npm/${testPath}`
    );
    expect(cdnUrl("unpkg", testPath)).toBe(`https://unpkg.com/${testPath}`);
  });
});
