import * as React from "react";

type FileFieldProps = Omit<React.ComponentProps<"input">, "type"> & {
  label?: string;
};

export default React.forwardRef<HTMLInputElement, FileFieldProps>(
  function FileField({label, className, ...props}, ref) {
    return (
      <div className={className}>
        {label && (
          <label className="mb-2 flex items-center text-sm">
            {label}

            {props.required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type="file"
          accept="image/png,image/jpg,image/jpeg"
          className="block w-full text-sm text-gray-500 outline-none file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-600 hover:file:bg-blue-100"
          {...props}
        />
      </div>
    );
  },
);
