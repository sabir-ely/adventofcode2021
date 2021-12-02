import fs from "fs/promises";
import {
  sum,
  map,
  pipe,
  trim,
  split,
  range,
  curry,
  curryN,
  slice,
  __,
} from "ramda";

const convertToNumbers = pipe(trim, split("\n"), map(Number));

const isIncrease = curry((depths, i) => i !== 0 && depths[i] > depths[i - 1]);

const sumSlice = curryN(3, pipe(slice, sum));

const isWindowIncrease = curry((depths, i) => {
  const sumSliceDepths = sumSlice(__, __, depths);
  return i !== 0 && sumSliceDepths(i, i + 3) > sumSliceDepths(i - 1, i + 2);
});

const countTrue = pipe(map(Number), sum);

const countIncreases = pipe(
  (depths) => map(isIncrease(depths), range(0, depths.length)),
  countTrue
);

const countWindowIncreases = pipe(
  (depths) => map(isWindowIncrease(depths), range(0, depths.length)),
  countTrue
);

const inputLocation = new URL("input.txt", import.meta.url);

fs.readFile(inputLocation, "utf-8").then((res) => {
  const depths = convertToNumbers(res);
  console.log(countIncreases(depths));
  console.log(countWindowIncreases(depths));
});
