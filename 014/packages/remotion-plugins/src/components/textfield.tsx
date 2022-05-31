import clsx from "clsx";
import * as React from "react";

export default React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function TextField({className, ...props}, ref) {
  return (
    <input
      ref={ref}
      className={clsx(
        "rounded-full border border-zinc-800 bg-transparent p-4 outline-none",
        className
      )}
      {...props}
    />
  );
});
