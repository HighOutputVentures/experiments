import clsx from "clsx";
import * as React from "react";

type FileFieldProps = Omit<React.ComponentProps<"input">, "type">;

export default React.forwardRef<HTMLInputElement, FileFieldProps>(
  function FileField({className, ...props}, ref) {
    return (
      <input
        ref={ref}
        type="file"
        accept="image/png,image/jpg,image/jpeg"
        className={clsx(
          "block w-full text-sm text-gray-500 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-600 hover:file:bg-blue-100",
          className,
        )}
        {...props}
      />
    );
  },
);
