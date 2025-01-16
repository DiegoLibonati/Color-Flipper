import { rgbToHex } from "./rgbToHex";

describe("rgxToHex.ts", () => {
  describe("General Tests.", () => {
    test("Verify color in hexadecimal.", () => {
      const expectedHexColor = "#835D83";
      const receivedRgbColor = "rgb(131, 93, 131)";

      const receivedHexColor = rgbToHex(receivedRgbColor);
      expect(receivedHexColor).toBe(expectedHexColor);
    });
  });
});
