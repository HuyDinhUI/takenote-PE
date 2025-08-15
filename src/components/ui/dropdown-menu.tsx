import React, { useEffect, useRef, useState, type ReactNode } from "react";


const menuData: MenuItem[] = [
    {
        label: "File",
        children: [
            { label: "New File" },
            { label: "Open" },
            {
                label: "Export",
                children: [
                    { label: "PDF" },
                    { label: "Word" },
                    { label: "Excel" }
                ]
            }
        ]
    },
    {
        label: "Edit",
        children: [
            { label: "Undo" },
            { label: "Redo" },
            {
                label: "Find",
                children: [
                    { label: "Find in File" },
                    { label: "Find in Project" }
                ]
            }
        ]
    }
]

export interface MenuItem {
    label: string;
    des?: string;
    children?: MenuItem[];
}
type DropDownMenuProps = {
    data: MenuItem[],
    children: ReactNode

}

export const DropdownMenu2 = ({ data, children }: DropDownMenuProps) => {
    const [history, setHistory] = useState<MenuItem[][]>([data]);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const currentMenu = history[history.length - 1];
    console.log(currentMenu)

    const handleClick = (item: MenuItem) => {

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
                setHistory([menuData]); // reset về menu gốc khi đóng
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} onClick={() => setIsOpen((prev) => !prev)} className="relative inline-block">
            {/* <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Menu
            </button> */}
            {children}

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


