import employees from "../data/persons.json";
import type { Response } from "../types";

const typedData: Response = employees;

export const getPeople = (delay: number = 0) =>
  new Promise<Response>((res) => {
    setTimeout(() => {
      res(typedData);
    }, delay);
  });

export default getPeople;
