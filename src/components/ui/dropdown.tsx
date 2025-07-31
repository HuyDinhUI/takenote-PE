import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  onSelect: (value: string) => void;
  triggerLabel?: string;
  disabled?: boolean;
};

export const Dropdown = ({ options, onSelect, triggerLabel = "Select", disabled }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border shadow-sm bg-white hover:bg-gray-100 text-sm"
        disabled={disabled}
      >
        {triggerLabel}
        <ChevronDown className="w-4 h-4" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={4}
          className="min-w-[160px] rounded-md bg-white border shadow-md p-1 z-50"
        >
          {options.map((opt) => (
            <DropdownMenu.Item
              key={opt.value}
              onSelect={() => onSelect(opt.value)}
              className="px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
            >
              {opt.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};