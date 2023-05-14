import clsx from "clsx";
import { ComponentPropsWithoutRef, FC } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  className?: string;
};

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "flex h-fit items-center gap-1 rounded-md bg-text-light-400 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-text-light-900 disabled:bg-bg-light-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
