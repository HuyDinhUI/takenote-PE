import { Ellipsis, HelpCircle, Plus, Settings2, X } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { CardType } from "@/types/board/card"
import { ListCard } from "./card"
import { Button } from "../ui/button"
import { DropdownMenu2, type MenuItem } from "../ui/dropdown"
import { IconLogout } from "@tabler/icons-react"

type ColummsProps = {
    label: string,
    children: ReactNode,
    id: string
    card: CardType[]
}

const items: MenuItem[] = [
        
        { label: 'Add card' },
        { label: 'Copy list' },
        { label: 'Move list' },
        { label: 'Move all card in this list' },
        { 
            label: 'Sort by...',
            children: [
                {
                    label:'Date created (newest first)'
                },
                {
                    label:'Date created (oldest first)'
                }
            ]
         },
        { separator: true },
        { label: 'Archive this list' },
        { label: 'Archive all cards in this list' }
    ];

export const Column = ({ label, children, id, card }: ColummsProps) => {

    const [openCreate, setOpenCreate] = useState(false)
    const [openEditLabel, setOpenEditLabel] = useState(false)
    const input = useRef<HTMLTextAreaElement>(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: id, data: {label,id,card} })

    const style = {
        touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
    }

    useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (input.current && !input.current.contains(event.target as Node)) {
                    setOpenEditLabel(false);
                    
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

    return (
        <div ref={setNodeRef} style={style} {...attributes}  className="w-80 h-full">
            <div {...listeners} className="bg-amber-100 dark:bg-column p-3 rounded-xl cursor-pointer">
                <header className="flex justify-between gap-2 items-center pb-5">
                    {/* <label className="font-bold">{label}</label> */}
                    {!openEditLabel ? 
                    (
                    <Button onClick={() => setOpenEditLabel(true)} variant="transparent" size="lb" className="font-bold w-full p-2" title={label}/>)
                    : (
                        <textarea ref={input} onBlur={() => setOpenEditLabel(false)} className="w-full resize-none p-2 bg-white dark:bg-background outline-blue-500" rows={1}>{label}</textarea>
                    )
                    }
                    
                    <DropdownMenu2 items={items} trigger={<Button variant="icon" size="ic" icon={ <Ellipsis size={18}/>}/>}/>
                   
                </header>
                <div className="pb-4">
                    {children}
                </div>
                <footer>
                    {!openCreate ?
                    (<button onClick={() => setOpenCreate(true)} className="flex w-full items-center p-2 gap-2 opacity-70 hover:bg-amber-500/50 dark:hover:bg-white/10 rounded-md cursor-pointer">
                        <Plus size={18} />
                        <label>Add a card</label>
                    </button>
                    )
                    : (
                    <form>
                        <textarea className="w-full resize-none p-2 rounded-md bg-white dark:bg-background shadow-md outline-blue-500" placeholder="Enter a title or past a link"/>
                        <div className="w-full flex gap-2 mt-2 justify-start">
                            <Button variant="primary" title="Add card"/>
                            <Button onClick={() => setOpenCreate(false)} variant="transparent" icon={<X/>}></Button>
                        </div>
                    </form>
                    )
                    }
                </footer>
            </div>
        </div>
    )
}



export type Columns = {
    id: string,
    label: string,
    card: CardType[]
}

type ListColumnsProps = {
    columns: Columns[]
}

export const ListColumns = ({ columns }: ListColumnsProps) => {
    return (
        <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
            <div className="flex p-5 gap-5 h-full  absolute">
                {columns.map(col => (
                    <Column key={col.id} id={col.id} label={col.label} card={col.card}>
                        <ListCard items={col.card} />
                    </Column>
                ))}
            </div>
        </SortableContext>
    )
}