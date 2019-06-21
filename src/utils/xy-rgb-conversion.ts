/**
 * Converts CIE color space to RGB color space
 * @param {Number} x
 * @param {Number} y
 * @param {Number} brightness - Ranges from 1 to 254
 * @return {Array} Array that contains the color values for red, green and blue
 */
export const cie_to_rgb = (x: number, y: number, brightness = 254) => {
  const z = 1.0 - x - y;
  const Y = Number((brightness / 254).toFixed(2));
  const X = (Y / y) * x;
  const Z = (Y / y) * z;

  //Convert to RGB using Wide RGB D65 conversion
  let red = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
  let green = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
  let blue = X * 0.051713 - Y * 0.121364 + Z * 1.01153;

  //If red, green or blue is larger than 1.0 set it back to the maximum of 1.0
  if (red > blue && red > green && red > 1.0) {
    green = green / red;
    blue = blue / red;
    red = 1.0;
  } else if (green > blue && green > red && green > 1.0) {
    red = red / green;
    blue = blue / green;
    green = 1.0;
  } else if (blue > red && blue > green && blue > 1.0) {
    red = red / blue;
    green = green / blue;
    blue = 1.0;
  }

  //Reverse gamma correction
  red = red <= 0.0031308 ? 12.92 * red : (1.0 + 0.055) * Math.pow(red, 1.0 / 2.4) - 0.055;
  green = green <= 0.0031308 ? 12.92 * green : (1.0 + 0.055) * Math.pow(green, 1.0 / 2.4) - 0.055;
  blue = blue <= 0.0031308 ? 12.92 * blue : (1.0 + 0.055) * Math.pow(blue, 1.0 / 2.4) - 0.055;

  //Convert normalized decimal to decimal
  red = Math.round(red * 255);
  green = Math.round(green * 255);
  blue = Math.round(blue * 255);

  if (isNaN(red)) red = 0;

  if (isNaN(green)) green = 0;

  if (isNaN(blue)) blue = 0;

  return [red, green, blue];
};

/**
 * Converts RGB color space to CIE color space
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @return {Array} Array that contains the CIE color values for x and y
 */
export const rgb_to_cie = (red, green, blue) => {
  //Apply a gamma correction to the RGB values, which makes the color more vivid and more the like the color displayed on the screen of your device
  const Red = red > 0.04045 ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : red / 12.92;
  const Green = green > 0.04045 ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : green / 12.92;
  const Blue = blue > 0.04045 ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : blue / 12.92;

  //RGB values to XYZ using the Wide RGB D65 conversion formula
  const X = Red * 0.664511 + Green * 0.154324 + Blue * 0.162028;
  const Y = Red * 0.283881 + Green * 0.668433 + Blue * 0.047685;
  const Z = Red * 0.000088 + Green * 0.07231 + Blue * 0.986039;

  //Calculate the xy values from the XYZ values
  let x = Number((X / (X + Y + Z)).toFixed(4));
  let y = Number((Y / (X + Y + Z)).toFixed(4));

  if (isNaN(x)) x = 0;

  if (isNaN(y)) y = 0;

  return [x, y];
};
