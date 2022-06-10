import {PlusIcon} from "@heroicons/react/solid";
import Link from "next/link";

export default function CreateButton() {
  return (
    <Link passHref href="/create-new">
      <a
        className="fixed right-[32px] bottom-[32px] z-50 rounded-full bg-blue-400 p-4 shadow-md"
        tabIndex={-1}
      >
        <PlusIcon className="h-5 w-5 fill-white" />
      </a>
    </Link>
  );
}
