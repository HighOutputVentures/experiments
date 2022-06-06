import {ChevronRightIcon, PlusSmIcon} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import {v4 as uuid} from "uuid";
import FileField from "~/components/file-field";
import IconButton from "~/components/icon-button";
import Textfield from "~/components/textfield";
import Layout from "../layout";
import {Schema} from "../types";
import useStore from "../use-store";
import MessageList from "./message-list";

type IMessage = Schema["messages"][number];

const defaultMsgValue: IMessage = {body: "", author: "", id: ""};

export default function CreateNewStep2() {
  const store = useStore();
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

          <TextareaAutosize
            value={value.body}
            placeholder="Message"
            className="mt-4 block w-full resize-none rounded-md border border-gray-200 p-2 outline-none transition-colors duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
            onChange={(e) => {
              setValue((o) => ({
                ...o,
                body: e.target.value,
              }));
            }}
          />

          <FileField
            className="mt-4"
            onChange={(e) => {
              const filelist = e.target.files;

              if (filelist && filelist.length > 0) {
                setValue((o) => ({
                  ...o,
                  image: filelist[0],
                }));
              } else {
                setValue((o) => ({
                  ...o,
                  image: undefined,
                }));
              }
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

        <MessageList
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
