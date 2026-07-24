import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({
  className = "",
  ...props
}: ContainerProps) {
  const classes = ["container", className].filter(Boolean).join(" ");

  return <div className={classes} {...props} />;
}
