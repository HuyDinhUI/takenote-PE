import type { CardType } from "@/types/board/card"
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { Edit } from "lucide-react"
import { useState } from "react"
import { CSS } from "@dnd-kit/utilities"
import CheckboxDemo from "../ui/checkbox"

type CardProps = {
    item: CardType
}

export const Card = ({ item }: CardProps) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.id, data: { ...item } })

    const style = {
        touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined
    }

    const [checked, setChecked] = useState<boolean>(item.status)
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white dark:bg-card py-2 px-3 rounded-md flex justify-between items-center gap-2 group shadow-sm cursor-pointer border-2 border-white/0 hover:border-amber-800">
            <div className="flex items-center gap-2 group">
                {/* <input onChange={(e) => setChecked(e.target.checked)} type="checkbox" checked={checked} className={`animate-checkbox ${checked ? "block" : "hidden group-hover:block"}`}></input> */}
                <CheckboxDemo onCheckedChange={(checked) => setChecked(checked === true)} checked={checked}/>
                <label className="">{item.label}</label>
            </div>
            <div>
                <Edit size={15} />
            </div>
        </div>
    )
}

type ListCardProps = {
    items: CardType[]
}

export const ListCard = ({ items }: ListCardProps) => {
    return (
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
                {items.map(item => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </SortableContext>
    )
}