import clsx from "clsx";
import * as React from "react";

export default function TextField({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={clsx(
        "rounded-full border border-zinc-800 bg-transparent p-4 outline-none",
        className
      )}
      {...props}
    />
  );
}
