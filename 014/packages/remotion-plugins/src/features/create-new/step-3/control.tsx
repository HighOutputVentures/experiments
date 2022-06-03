import clsx from "clsx";
import * as React from "react";

type ControlProps = Omit<React.ComponentProps<"button">, "children"> & {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
};

export default React.forwardRef<HTMLButtonElement, ControlProps>(
  function Control({icon: SVGIcon, className, ...props}, ref) {
    return (
      <button
        ref={ref}
        className={clsx("rounded-full bg-blue-400 p-3", className)}
        {...props}
      >
        <SVGIcon className="h-4 w-4 fill-white" />
      </button>
    );
  },
);
