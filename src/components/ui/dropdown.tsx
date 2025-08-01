import * as Dropdown from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import clsx from 'classnames';

export type MenuItem = 
  | {
      label: string;
      icon?: ReactNode;
      shortcut?: string;
      disabled?: boolean;
      onClick?: () => void;
      items?: MenuItem[]; // submenu
    }
  | { separator: true };
type DropdownSize = 'sm' | 'md' | 'lg'

type DropdownMenuProps = {
  trigger: ReactNode;
  items: MenuItem[];
  size?: DropdownSize
};

const sizeClass: Record<DropdownSize,string> = {
  sm: 'min-w-[200px]',
  md: 'min-w-[300px]',
  lg: 'min-w-[400px]'
}

export const DropdownMenu = ({ trigger, items, size = 'md' }: DropdownMenuProps) => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        {trigger}
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          className={clsx(sizeClass[size],"bg-white dark:bg-gray-800 rounded shadow-lg p-1 z-50")}
          sideOffset={5}
        >
          {items.map((item, index) => {
            if ('separator' in item) {
              return <Dropdown.Separator key={index} className="h-px my-1 bg-gray-200 dark:bg-gray-700" />;
            }

            if (item.items) {
              return (
                <Dropdown.Sub key={index}>
                  <Dropdown.SubTrigger
                    className={clsx(
                      'group flex w-full items-center px-2 py-1.5 text-sm text-left rounded hover:bg-gray-100 dark:hover:bg-gray-700',
                      item.disabled && 'opacity-50 pointer-events-none'
                    )}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Dropdown.SubTrigger>
                  <Dropdown.SubContent className="bg-white dark:bg-gray-800 rounded shadow-lg p-1 z-50">
                    {item.items.map((subItem, subIndex) => (
                      'separator' in subItem ? (
                        <Dropdown.Separator key={subIndex} className="h-px my-1 bg-gray-200 dark:bg-gray-700" />
                      ) : (
                        <Dropdown.Item
                          key={subIndex}
                          className={clsx(
                            'flex items-center px-2 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700',
                            subItem.disabled && 'opacity-50 pointer-events-none'
                          )}
                          onClick={subItem.onClick}
                        >
                          {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                          <span className="flex-1">{subItem.label}</span>
                          {subItem.shortcut && (
                            <span className="text-xs text-gray-500 ml-2">{subItem.shortcut}</span>
                          )}
                        </Dropdown.Item>
                      )
                    ))}
                  </Dropdown.SubContent>
                </Dropdown.Sub>
              );
            }

            return (
              <Dropdown.Item
                key={index}
                className={clsx(
                  'flex items-center px-2 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700',
                  item.disabled && 'opacity-50 pointer-events-none'
                )}
                onClick={item.onClick}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="text-xs text-gray-500 ml-2">{item.shortcut}</span>
                )}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};
