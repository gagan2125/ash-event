/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { cn } from "../../libs/utils";

export const ButtonsCard = ({ children, className, onClick }) => {
  return (
    <div onClick={onClick}>
      <div className="absolute inset-0 dark:bg-dot-white/[0.1] bg-dot-black/[0.1]" />
      <div className="relative z-40">{children}</div>
    </div>
  );
};
