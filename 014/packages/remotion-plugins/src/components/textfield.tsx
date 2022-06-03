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
        "block w-full rounded-md border border-gray-200 p-2 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50",
        className,
      )}
      {...props}
    />
  );
});
