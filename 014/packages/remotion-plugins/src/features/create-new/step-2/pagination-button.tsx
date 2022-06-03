import * as React from "react";

type PaginationButtonProps = {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
} & Omit<React.ComponentProps<"button">, "children">;

export default React.forwardRef<HTMLButtonElement, PaginationButtonProps>(
  function PaginationButton({icon: SVGIcon, ...props}, ref) {
    return (
      <button
        ref={ref}
        className="group rounded-full bg-gray-200 p-2 outline-none hover:bg-gray-300 focus:bg-gray-300 disabled:bg-gray-100"
        {...props}
      >
        <SVGIcon className="h-6 w-6 stroke-gray-600 group-disabled:stroke-gray-300" />
      </button>
    );
  },
);
