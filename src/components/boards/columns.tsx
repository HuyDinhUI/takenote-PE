import { Ellipsis } from "lucide-react"
import type { ReactNode } from "react"
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type ColummsProps = {
    label: string,
    children: ReactNode,
    id: string
}

const Column = ({ label, children, id }: ColummsProps) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: id, data: {} })

    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    }

    return (
        <div className="w-80 h-full">
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-amber-100 p-3 rounded-xl">
                <header className="flex justify-between items-center">
                    <label>{label}</label>
                    <Ellipsis size={18} />
                </header>
                <div className="">
                    {children}
                </div>
                <footer>
                    <button>Add a card</button>
                </footer>
            </div>
        </div>
    )
}

export type Columns = {
    id: string,
    label: string,
}

type ListColumnsProps = {
    columns: Columns[]
}

export const ListColumns = ({ columns }: ListColumnsProps) => {
    return (
        <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
            <div className="flex p-5 gap-5 h-full">
                {columns.map(col => (
                    <Column key={col.id} id={col.id} label={col.label}>
                        Card
                    </Column>
                ))}
            </div>
        </SortableContext>
    )
}