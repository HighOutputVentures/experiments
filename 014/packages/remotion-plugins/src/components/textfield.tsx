import * as React from "react";

type TextFieldProps = React.ComponentProps<"input"> & {
  label?: string;
};

export default React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({label, className, ...props}, ref) {
    return (
      <div className={className}>
        {label && (
          <label className="mb-2 flex items-center text-sm">
            {label}

            {props.required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
        )}

        <input
          className="block w-full rounded-sm border border-gray-200 p-2 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
