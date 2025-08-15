import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'classnames';
import { Button } from './button';

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
            <div className='h-full w-full' onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>

            {isOpen && (
                
                <ul className="absolute mt-1 bg-white dark:bg-card dark:text-gray-300 shadow-lg border rounded min-w-[300px] z-50">
                    <header className='relative pb-3 pt-1'>
                      <label className='w-full text-center block p-2'>List actions</label>
                      {history.length > 1 && (
                        <Button
                          variant='icon'
                          size='ic'
                          icon={<ChevronLeft size={18}/>}
                          onClick={goBack}
                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 absolute top-[50%] translate-y-[-50%] left-2"
                        >
                            
                        </Button>
                    )}
                    </header>
                    {currentMenu.map((item, index) => {
                        if("separator" in item) {
                          return <hr className='mx-4'></hr>
                        }
                        
                        if (item.children) {
                            return <li
                                key={index}
                                onClick={() => handleClick(item)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 font-light flex justify-between items-center"
                            >
                                {item.label}
                                <ChevronRight size={15}/>
                            </li>
                        }
                        else {
                            return <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 font-light flex justify-between"
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