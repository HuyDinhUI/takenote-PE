import { ListColumns } from "@/components/boards/columns"
import { Button } from "@/components/ui/button"
import { Inbox, Bell, Filter, Ellipsis, Star } from "lucide-react"
import type { Columns } from "@/components/boards/columns"
import { DndContext } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import {arrayMove} from "@dnd-kit/sortable"

const ColumnsData: Columns[] = [
    {
        id: '1',
        label: 'Today'
    },
    {
        id: '2',
        label: 'Done'
    }
]

const Board = () => {

    const [BoardData,SetBoardData] = useState<Columns[]>(ColumnsData)

    useEffect(() => {

    },[])

    const HandleDragEnd = (event: any) =>{
        console.log(event)
        const {active, over} = event

        if (active.id !== over.id){
            const oldIndex =BoardData.findIndex(c => c.id === active.id)
            const newIndex = BoardData.findIndex(c => c.id === over.id)

            const NewBoardData = arrayMove(BoardData, oldIndex, newIndex)
            SetBoardData(NewBoardData)
        }
    }



    return (
        <div className="flex h-full gap-5">
            <div className="h-full min-w-80 ring ring-gray-200 rounded-xl">
                <header className="p-5 flex justify-between">
                    <div className="flex items-center gap-2">
                        <Inbox size={18} />
                        <label className="font-bold">Inbox</label>
                    </div>
                    <div className="flex items-center">
                        <Button size="ic" variant="icon" icon={<Bell size={18} />} />
                        <Button size="ic" variant="icon" icon={<Filter size={18} />} />
                        <Button size="ic" variant="icon" icon={<Ellipsis size={18} />} />
                    </div>
                </header>
            </div>
            <div className="flex-1 h-full ring ring-gray-200 rounded-xl flex flex-col">
                <header className="p-5 flex justify-between">
                    <div className="flex items-center gap-2">
                        <label className="font-bold">My Trello</label>
                    </div>
                    <div className="flex items-center">
                        <Button size="ic" variant="icon" icon={<Filter size={18} />} />
                        <Button size="ic" variant="icon" icon={<Star size={18} />} />
                        <Button size="ic" variant="icon" icon={<Ellipsis size={18} />} />
                    </div>
                </header>
                <div className="w-ful flex-1">
                    <DndContext onDragEnd={HandleDragEnd}>
                        <ListColumns columns={BoardData} />
                    </DndContext>
                </div>
            </div>
        </div>
    )
}

export default Board