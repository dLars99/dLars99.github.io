// Takes the width and height (a and b) of the ellipse, plus the angle, and returns
// the [x, y] coordinates of that point.
// Ellipse math is all trig. To find distance, we would need the coordinates anyway, so
// just work directly with those
// Equation to find x: ab / √(b² + a²(tan 𝜃)²)
// Equation to find y: ab / √(a² + b² / (tan 𝜃)²)

export const pointOnEllipse = (
  a: number,
  b: number,
  angleInDegrees: number
) => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  const tan = Math.tan(angleInRadians);
  const aSquared = a * a;
  const bSquared = b * b;
  const tanSquared = tan * tan;
  const topOfEquation = a * b;
  const bottomOfXEquation = Math.sqrt(bSquared + aSquared * tanSquared);
  const x = topOfEquation / bottomOfXEquation;
  const bottomOfYEquation = Math.sqrt(aSquared + bSquared / tanSquared);
  const y = topOfEquation / bottomOfYEquation;
  return [x, y];
};
