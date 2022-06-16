import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/outline";
import {useEffect, useMemo, useState} from "react";
import arrayChunk from "../../../utils/array-chunk";
import {Schema} from "../types";
import Empty from "./empty";
import Message from "./message";
import PaginationButton from "./pagination-button";

interface MessageListProps {
  open?: boolean;
  messages: Schema["messages"];
  onClose?: () => void;
  onDelete?: (message: Schema["messages"][number]) => void;
}

export default function MessageList({
  open,
  messages,
  onClose,
  onDelete,
}: MessageListProps) {
  const [page, setPage] = useState(1);

  const isEmpty = messages.length <= 0;
  const chunks = useMemo(() => arrayChunk(messages, 2), [messages]);

  const hasNext = page < chunks.length;
  const hasPrev = page > 1;

  const next = () => {
    if (hasNext) setPage((current) => current + 1);
  };

  const prev = () => {
    if (hasPrev) setPage((current) => current - 1);
  };

  useEffect(() => {
    if (page > 1 && page > chunks.length) setPage((current) => current - 1);
  }, [chunks.length, page]);

  if (!open) return null;

  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center bg-black bg-opacity-50">
      <CloseButton onClose={onClose} />

      <div className="relative mx-auto flex min-h-[550px] w-3/4 max-w-[650px] flex-col rounded-sm bg-white p-16 shadow-md">
        {isEmpty && <Empty />}
        {!isEmpty && (
          <>
            <div className="flex grow flex-col gap-4">
              {chunks.at(page - 1)?.map((msg) => (
                <Message
                  key={msg.id}
                  data={msg}
                  onDelete={() => onDelete?.(msg)}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center gap-2">
              <PaginationButton
                icon={ChevronLeftIcon}
                onClick={prev}
                disabled={!hasPrev}
              />
              <PaginationButton
                icon={ChevronRightIcon}
                onClick={next}
                disabled={!hasNext}
              />
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
