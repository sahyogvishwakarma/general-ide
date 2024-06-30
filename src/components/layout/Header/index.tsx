import { ThemeToggle } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { forwardRef } from "react";

interface Props {
  className?: ClassValue;
}
const Header = forwardRef<HTMLDivElement, Props>(({ className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-3 w-full gap-3 border-b items-center",
        className
      )}
    >
      <div className="flex justify-start gap-2"></div>
      <div className="flex justify-center gap-2">Header</div>
      <div className="flex justify-end gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
});
Header.displayName = "Header";
export default Header;
