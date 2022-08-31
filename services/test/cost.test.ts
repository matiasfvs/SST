import { expect, test } from "vitest";
import { calculateCost } from "../util/cost";


test("Lowest tier", () => {

  const storage:number = 10;

  const cost:number = 4000;
  const expectedCost:number = calculateCost(storage);

  expect(cost).toEqual(expectedCost);
});

test("Middle tier", () => {
  const storage:number = 100;

  const cost:number = 20000;
  const expectedCost:number = calculateCost(storage);

  expect(cost).toEqual(expectedCost);
});

test("Highest tier", () => {
  const storage:number = 101;

  const cost:number = 10100;
  const expectedCost:number = calculateCost(storage);

  expect(cost).toEqual(expectedCost);
});