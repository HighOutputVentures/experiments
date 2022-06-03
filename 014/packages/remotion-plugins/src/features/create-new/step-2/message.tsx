import {TrashIcon} from "@heroicons/react/solid";
import IMessage from "~/types/message";

interface MessageProps {
  data: IMessage;
  onDelete?: () => void;
}

export default function Message({data, onDelete}: MessageProps) {
  return (
    <div className="flex items-center rounded-md border border-gray-200 p-4">
      <div className="grow">
        <h3>{data.author}</h3>
        <p className="text-xs line-clamp-1">{data.body}</p>
      </div>

      <button className="group outline-none" onClick={onDelete}>
        <TrashIcon className="h-8 w-8 fill-gray-400 transition-colors duration-300 hover:fill-red-400 group-focus:fill-red-400" />
      </button>
    </div>
  );
}
