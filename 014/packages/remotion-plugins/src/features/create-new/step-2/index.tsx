import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusSmIcon,
  XIcon,
} from "@heroicons/react/outline";
import {TrashIcon} from "@heroicons/react/solid";
import Image from "next/image";
import {useRouter} from "next/router";
import * as React from "react";
import {v4 as uuid} from "uuid";
import IconButton from "~/components/icon-button";
import Textfield from "~/components/textfield";
import useCreateCardStore from "~/hooks/use-create-card-store";
import IMessage from "~/types/message";
import Layout from "../layout";

const defaultMsgValue: IMessage = {id: "", body: "", author: ""};

export default function CreateNewStep2() {
  const store = useCreateCardStore();
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [preview, setPreview] = React.useState(false);
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [value, setValue] = React.useState(defaultMsgValue);

  React.useEffect(() => {
    if (!store.data) router.push("/create-new");
  }, [router, store.data]);

  React.useEffect(() => {
    return () => {
      setPreview(false);
      setMessages([]);
      setValue(defaultMsgValue);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(value.author && value.body)) return;

    setMessages((array) => [...array, {...value, id: uuid()}]);
    setValue(defaultMsgValue);

    inputRef.current?.focus();
  };

  const next = () => {
    if (!store.data) return;

    store.update({
      ...store.data,
      messages,
    });

    router.push("/create-new/step-3");
  };

  if (!store.data) return null;

  return (
    <Layout>
      <div>
        <button
          className="text-sm transition-colors duration-300 hover:text-blue-500"
          onClick={() => setPreview(true)}
        >
          Messages: {messages.length}
        </button>

        <form className="mt-4 w-[350px]" onSubmit={handleSubmit}>
          <Textfield
            ref={inputRef}
            autoFocus
            placeholder="Name"
            value={value.author}
            onChange={(e) => {
              setValue((o) => ({
                ...o,
                author: e.target.value,
              }));
            }}
          />

          <textarea
            value={value.body}
            placeholder="Message"
            className="mt-4 block w-full resize-none rounded-md border border-gray-200 p-2 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
            onChange={(e) => {
              setValue((o) => ({
                ...o,
                body: e.target.value,
              }));
            }}
          />

          <div className="mt-16 flex justify-center gap-4">
            <IconButton type="submit" icon={PlusSmIcon} />
            <IconButton
              icon={ChevronRightIcon}
              onClick={next}
              disabled={messages.length <= 0}
            />
          </div>
        </form>

        <MsgPreview
          open={preview}
          onClose={() => setPreview(false)}
          messages={messages}
          onDelete={(subject) => {
            setMessages((current) =>
              current.filter(({id}) => id !== subject.id),
            );
          }}
        />
      </div>
    </Layout>
  );
}

interface MsgPreviewProps {
  open?: boolean;
  messages: IMessage[];
  onClose?: () => void;
  onDelete?: (message: IMessage) => void;
}

function MsgPreview({open, messages, onClose, onDelete}: MsgPreviewProps) {
  if (!open) return null;

  const isEmpty = messages.length <= 0;

  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center bg-black bg-opacity-50">
      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full bg-white bg-opacity-20 p-2"
      >
        <XIcon className="h-8 w-8 stroke-white opacity-50" />
      </button>

      <div className="relative mx-auto flex min-h-[550px] w-3/4 max-w-[650px] flex-col rounded-sm bg-white p-16 shadow-md">
        {isEmpty && <Empty />}

        {!isEmpty && (
          <React.Fragment>
            <div className="flex grow flex-col gap-4">
              {messages.map((msg) => (
                <MsgPreviewItem
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
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

type PaginationButtonProps = {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
} & Omit<React.ComponentProps<"button">, "children">;

const PaginationButton = React.forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(function PaginationButton({icon: SVGIcon, ...props}, ref) {
  return (
    <button
      ref={ref}
      className="group rounded-full bg-gray-200 p-2 outline-none hover:bg-gray-300 focus:bg-gray-300 disabled:bg-gray-100"
      {...props}
    >
      <SVGIcon className="h-6 w-6 stroke-gray-600 group-disabled:stroke-gray-300" />
    </button>
  );
});

interface MsgPreviewItemProps {
  data: IMessage;
  onDelete?: () => void;
}

function MsgPreviewItem({data, onDelete}: MsgPreviewItemProps) {
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

function Empty() {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
      <Image src="/notfound.svg" alt="" width={300} height={300} />
    </div>
  );
}
