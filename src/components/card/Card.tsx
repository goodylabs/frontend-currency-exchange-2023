import clsx from "clsx";
import { PropsWithChildren } from "react";

type CardProps = {
  className?: string;
  "data-test"?: string;
};

export const Card = ({
  children,
  className,
  ...props
}: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={clsx(
        "flex flex-col rounded-2xl bg-bg-light-100 p-5 shadow-card-light",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
