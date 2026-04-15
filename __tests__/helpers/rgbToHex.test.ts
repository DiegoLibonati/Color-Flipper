import { rgbToHex } from "@/helpers/rgbToHex";

describe("rgbToHex", () => {
  describe("valid RGB values", () => {
    it("should convert white to #FFFFFF", () => {
      expect(rgbToHex("rgb(255, 255, 255)")).toBe("#FFFFFF");
    });

    it("should convert black to #000000", () => {
      expect(rgbToHex("rgb(0, 0, 0)")).toBe("#000000");
    });

    it("should convert red channel only to #FF0000", () => {
      expect(rgbToHex("rgb(255, 0, 0)")).toBe("#FF0000");
    });

    it("should convert green channel only to #00FF00", () => {
      expect(rgbToHex("rgb(0, 255, 0)")).toBe("#00FF00");
    });

    it("should convert blue channel only to #0000FF", () => {
      expect(rgbToHex("rgb(0, 0, 255)")).toBe("#0000FF");
    });

    it("should pad single-digit hex values with a leading zero", () => {
      expect(rgbToHex("rgb(1, 2, 3)")).toBe("#010203");
    });

    it("should return uppercase hex characters", () => {
      expect(rgbToHex("rgb(171, 205, 239)")).toBe("#ABCDEF");
    });
  });

  describe("formatting variants", () => {
    it("should handle RGB string without spaces between values", () => {
      expect(rgbToHex("rgb(255,0,0)")).toBe("#FF0000");
    });
  });
});
