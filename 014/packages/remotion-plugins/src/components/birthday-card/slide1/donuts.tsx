import {Sequence} from "remotion";
import {v4 as uuid} from "uuid";
import {DonutUnstyled} from "../../icons/donut-unstyled";

type StringOrNumber = string | number;

type DonutItem = {
  color: string;
  position: {
    top: number;
    left?: StringOrNumber;
    right?: StringOrNumber;
  };
};

const donuts: DonutItem[] = [
  {color: "#75AEE5", position: {top: 8, left: "30%"}},
  {color: "#F3B344", position: {top: 14, right: "35%"}},
  {color: "#E44C85", position: {top: 32, left: "5%"}},
  {color: "#33C9B0", position: {top: 35, right: "10%"}},
  {color: "#7070DD", position: {top: 42, left: "25%"}},
  {color: "#33C9B0", position: {top: 64, left: "10%"}},
  {color: "#75AEE5", position: {top: 70, right: "15%"}},
  {color: "#E44C85", position: {top: 73, right: "2%"}},
  {color: "#7070DD", position: {top: 84, right: "14%"}},
  {color: "#F3B344", position: {top: 94, left: "23%"}},
];

export default function Donuts() {
  const start = 0;

  return (
    <>
      {donuts.map(({color, position}, index) => {
        return (
          <Sequence key={uuid()} from={start + index}>
            <DonutUnstyled
              style={{
                fill: color,
                width: 16,
                height: 16,
                position: "absolute",
                ...position,
                top: `${position.top}%`,
              }}
            />
          </Sequence>
        );
      })}
    </>
  );
}
