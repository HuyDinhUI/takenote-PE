import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils"; // hoặc dùng classnames nếu bạn thích

type PopoverProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

export const Popover = ({
  trigger,
  children,
  className,
  side = "top",
  align = "center",
  sideOffset = 8,
}: PopoverProps) => {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "z-50 rounded-md bg-white p-2 shadow-lg border border-gray-200",
            "animate-in fade-in zoom-in-95",
            className
          )}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
