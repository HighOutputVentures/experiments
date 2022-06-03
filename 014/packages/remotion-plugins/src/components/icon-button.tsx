import clsx from "clsx";
import * as React from "react";

interface IconButtonProps {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

type ButtonBaseProps = Omit<React.ComponentProps<"button">, "children">;

export default React.forwardRef<
  HTMLButtonElement,
  IconButtonProps & ButtonBaseProps
>(function IconButton({icon: SVGIcon, className, ...props}, ref) {
  return (
    <button
      ref={ref}
      className={clsx(
        "group rounded-full bg-blue-400 p-3 outline-none transition-all duration-300 hover:bg-blue-300 focus:bg-blue-300 disabled:cursor-not-allowed disabled:bg-gray-100",
        className,
      )}
      {...props}
    >
      <SVGIcon className="h-6 w-6 stroke-white group-disabled:stroke-gray-300" />
    </button>
  );
});
