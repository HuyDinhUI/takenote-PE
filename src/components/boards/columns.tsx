import { Ellipsis, Plus } from "lucide-react"
import type { ReactNode } from "react"
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { CardType } from "@/types/board/card"
import { ListCard } from "./card"

type ColummsProps = {
    label: string,
    children: ReactNode,
    id: string
    card: CardType[]
}

export const Column = ({ label, children, id, card }: ColummsProps) => {

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

    return (
        <div ref={setNodeRef} style={style} {...attributes}  className="w-80 h-full">
            <div {...listeners} className="bg-amber-100 p-3 rounded-xl cursor-pointer">
                <header className="flex justify-between items-center px-3 pb-5">
                    <label className="font-bold">{label}</label>
                    <Ellipsis size={18} />
                </header>
                <div className="pb-4">
                    {children}
                </div>
                <footer >
                    <button className="flex w-full items-center p-2 gap-2 opacity-70 hover:bg-amber-500/50 rounded-md cursor-pointer">
                        <Plus size={18} />
                        <label>Add a card</label>
                    </button>
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