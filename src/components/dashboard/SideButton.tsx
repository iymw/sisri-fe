import { LucideIcon } from "lucide-react";
import React from "react";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

import Typography from "@/components/Typography";

export type SideButtonProps = {
  children: React.ReactNode;
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
  onClick: () => void;
  className: string;
} & React.ComponentPropsWithRef<"button">;

const SideButton = React.forwardRef<HTMLButtonElement, SideButtonProps>(
  ({ icon: Icon, classNames, className, onClick, children, ...rest }, ref) => {
    return (
      <>
        <button
          ref={ref}
          type="button"
          {...rest}
          onClick={onClick}
          className={cn(
            "inline-flex w-full items-center gap-2 py-3 pl-8",
            className,
          )}
        >
          {Icon && <Icon size="1em" className={cn(classNames?.icon)} />}
          <Typography className="!text-sm">{children}</Typography>
        </button>
      </>
    );
  },
);

export default SideButton;
