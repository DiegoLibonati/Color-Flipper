export const rgbToHex = (rgb: string): string => {
  console.log(rgb);
  const rgbValues = rgb.match(/\d+/g);
  return (
    "#" +
    rgbValues!
      .map((value) => parseInt(value, 10).toString(16).padStart(2, "0"))
      .join("")
  ).toUpperCase();
};
