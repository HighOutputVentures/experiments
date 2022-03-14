import { FC } from "react";

interface Props {
  id: string;
  sourceUrl: string;
  name: string;
  position: string;
}

export const List: FC<Props> = ({ id, sourceUrl, name, position }) => {
  return (
    <div
      style={{
        boxShadow: "-5px -5px 10px #fbfbfb, 5px 5px 4px #eeeeee",
      }}
      className="height-[300px] w-[400px] p-[20px] shadow-sm rounded-md bg-[#F5F5F5]  hover:cursor-pointer hover:shadow-md flex flex-col justify-center items-center transition ease-in-out delay-150"
    >
      <img
        src={sourceUrl}
        alt={name}
        className="h-[90px] w-[90px] rounded-full object-cover shadow-lg color-gray-800 mb-5"
      />
      <h1 className="text-gray-700 font-semibold">{name}</h1>
      <h6 className="text-gray-800 font-thin">{position}</h6>
    </div>
  );
};

export default List;
