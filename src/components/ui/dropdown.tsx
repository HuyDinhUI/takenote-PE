import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import clsx from 'classnames';

export type MenuItem = 
  | {
      label: string;
      icon?: ReactNode;
      shortcut?: string;
      disabled?: boolean;
      onClick?: () => void;
      children?: MenuItem[]; // submenu
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
          sideOffset={12}

        >
          {items.map((item, index) => {
            if ('separator' in item) {
              return <Dropdown.Separator key={index} className="h-px my-1 bg-gray-200 dark:bg-gray-700" />;
            }

            if (item.children) {
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
                  <Dropdown.SubContent sideOffset={7} className="bg-white dark:bg-gray-800 rounded shadow-lg p-1 z-50">
                    {item.children.map((subItem, subIndex) => (
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


export const DropdownMenu2 = ({ trigger, items, size = 'md' }: DropdownMenuProps) => {
    const [history, setHistory] = useState<MenuItem[][]>([items]);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const currentMenu = history[history.length - 1];
    console.log(currentMenu)

    const handleClick = (item: MenuItem) => {

        if ("separator" in item){
          return
        }

        setHistory((prev) => [...prev, item.children!]);

    };

    const goBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    // Ẩn menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setHistory([items]); // reset về menu gốc khi đóng
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    

    return (
        <div ref={menuRef}  className="relative inline-block">
            {/* <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Menu
            </button> */}
            <div className='h-full w-full' onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>

            {isOpen && (
                <ul className="absolute mt-1 bg-white shadow-lg border rounded min-w-[200px] z-50 p-2">
                    {history.length > 1 && (
                        <li
                            onClick={goBack}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 font-semibold"
                        >
                            ← Back
                        </li>
                    )}
                    {currentMenu.map((item, index) => {
                        if("separator" in item) {
                          return 
                        }
                        
                        if (item.children) {
                            return <li
                                key={index}
                                onClick={() => handleClick(item)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between"
                            >
                                {item.label}
                                <span>▶</span>
                            </li>
                        }
                        else {
                            return <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between"
                            >
                                {item.label}
                            </li>
                        }

                    })}
                </ul>
            )}
        </div>
    );
};