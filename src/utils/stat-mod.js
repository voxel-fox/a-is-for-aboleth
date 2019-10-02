export default function(value, isString = true) {
  const mod = Math.floor((value - 10) / 2);
  return (isString && mod > 0 && "+") + mod;
}
