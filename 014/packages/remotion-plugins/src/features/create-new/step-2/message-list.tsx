import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/outline";
import IMessage from "~/types/message";
import Empty from "./empty";
import Message from "./message";
import PaginationButton from "./pagination-button";

interface MessageListProps {
  open?: boolean;
  messages: IMessage[];
  onClose?: () => void;
  onDelete?: (message: IMessage) => void;
}

export default function MessageList({
  open,
  messages,
  onClose,
  onDelete,
}: MessageListProps) {
  if (!open) return null;

  const isEmpty = messages.length <= 0;

  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center bg-black bg-opacity-50">
      <CloseButton onClose={onClose} />

      <div className="relative mx-auto flex min-h-[550px] w-3/4 max-w-[650px] flex-col rounded-sm bg-white p-16 shadow-md">
        {isEmpty && <Empty />}
        {!isEmpty && (
          <>
            <div className="flex grow flex-col gap-4">
              {messages.map((msg) => (
                <Message
                  key={msg.id}
                  data={msg}
                  onDelete={() => onDelete?.(msg)}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center gap-2">
              <PaginationButton icon={ChevronLeftIcon} disabled />
              <PaginationButton icon={ChevronRightIcon} disabled />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface CloseButtonProps {
  onClose?: () => void;
}

function CloseButton({onClose}: CloseButtonProps) {
  return (
    <button
      onClick={onClose}
      className="absolute right-6 top-6 rounded-full bg-white bg-opacity-20 p-2"
    >
      <XIcon className="h-8 w-8 stroke-white opacity-50" />
    </button>
  );
}
