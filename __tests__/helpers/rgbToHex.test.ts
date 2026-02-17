import { rgbToHex } from "@/helpers/rgbToHex";

describe("rgbToHex", () => {
  it("should convert rgb to hex", () => {
    expect(rgbToHex("rgb(255, 255, 255)")).toBe("#FFFFFF");
  });

  it("should convert black to hex", () => {
    expect(rgbToHex("rgb(0, 0, 0)")).toBe("#000000");
  });

  it("should convert red to hex", () => {
    expect(rgbToHex("rgb(255, 0, 0)")).toBe("#FF0000");
  });

  it("should convert green to hex", () => {
    expect(rgbToHex("rgb(0, 255, 0)")).toBe("#00FF00");
  });

  it("should convert blue to hex", () => {
    expect(rgbToHex("rgb(0, 0, 255)")).toBe("#0000FF");
  });

  it("should convert gray to hex", () => {
    expect(rgbToHex("rgb(128, 128, 128)")).toBe("#808080");
  });

  it("should convert custom color to hex", () => {
    expect(rgbToHex("rgb(123, 45, 67)")).toBe("#7B2D43");
  });

  it("should handle single digit values", () => {
    expect(rgbToHex("rgb(1, 2, 3)")).toBe("#010203");
  });
});
