import fs from "fs/promises";
import { trim, split, pipe, map, reduce } from "ramda";

const parseInstructionLine = pipe(split(" "), ([direction, amount]) => ({
  direction,
  amount: Number(amount),
}));

const input2Instructions = pipe(trim, split("\n"), map(parseInstructionLine));

const translate = reduce(
  (acc, { direction, amount }) => {
    switch (direction) {
      case "forward":
        return { ...acc, x: acc.x + amount };
      case "up":
        return { ...acc, y: acc.y - amount };
      case "down":
        return { ...acc, y: acc.y + amount };
    }
  },
  { x: 0, y: 0 }
);

const translateWithAim = reduce(
  (acc, { direction, amount }) => {
    switch (direction) {
      case "forward":
        return {
          ...acc,
          x: acc.x + amount,
          y: acc.y + acc.aim * amount,
        };
      case "up":
        return {
          ...acc,
          aim: acc.aim - amount,
        };
      case "down":
        return {
          ...acc,
          aim: acc.aim + amount,
        };
    }
  },
  { x: 0, y: 0, aim: 0 }
);

const multiplyValues = ({ x, y }) => x * y;

const getAnswer = (fn) => pipe(input2Instructions, fn, multiplyValues);

const getAnswer1 = getAnswer(translate);
const getAnswer2 = getAnswer(translateWithAim);

fs.readFile(new URL("input.txt", import.meta.url), "utf-8").then((res) => {
  console.log(getAnswer1(res));
  console.log(getAnswer2(res));
});
