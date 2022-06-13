import {SearchIcon} from "@heroicons/react/solid";
import clsx from "clsx";
import * as React from "react";

export default function Searchbar({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <div className={clsx("relative", className)}>
      <input
        ref={ref}
        type="search"
        placeholder="Search"
        className="block w-full rounded-sm border border-gray-200 bg-transparent p-3 text-sm outline-none transition-all duration-300 hover:border-gray-300 focus:border-blue-400 focus:ring-inset"
        {...props}
      />

      <SearchIcon className="absolute right-4 top-1/2 -z-10 h-4 w-4 -translate-y-1/2 fill-gray-400" />
    </div>
  );
}
