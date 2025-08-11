import { ListColumns } from "@/components/boards/columns"
import { Button } from "@/components/ui/button"
import { Inbox, Bell, Filter, Ellipsis, Star } from "lucide-react"
import type { Columns } from "@/components/boards/columns"
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import { arrayMove } from "@dnd-kit/sortable"
import { Column } from "@/components/boards/columns"
import { Card, ListCard } from "@/components/boards/card"
import cloneDeep from "lodash/cloneDeep"


const ColumnsData: Columns[] = [
    {
        id: '1',
        label: 'Today',
        card: [
            {
                id: 'card-1',
                label: 'task 1',
                status: false,
                columnId: '1'
            },
            {
                id: 'card-2',
                label: 'task 2',
                status: false,
                columnId: '1'
            },
            {
                id: 'card-3',
                label: 'task 3',
                status: true,
                columnId: '1'
            },
            {
                id: 'card-4',
                label: 'task 4',
                status: true,
                columnId: '1'
            },
        ]
    },
    {
        id: '2',
        label: 'Done',
        card: [
            {
                id: 'card-5',
                label: 'task 5',
                status: true,
                columnId: '2'
            }
        ]
    },
    {
        id: '3',
        label: 'Yesterday',
        card: [
            {
                id: 'card-6',
                label: 'task 6',
                status: true,
                columnId: '3'
            }
        ]
    },
    {
        id: '4',
        label: 'This week',
        card: [
            {
                id: 'card-7',
                label: 'task 7',
                status: true,
                columnId: '4'
            }
        ]
    }
]

const TYPE_ACTIVE_DND = {
    COLUMN: 'T_COLUMN',
    CARD: 'T_CARD'
}

const Board = () => {
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10
        }
    })
    const sensors = useSensors(pointerSensor)

    const [BoardData, SetBoardData] = useState<Columns[]>(ColumnsData)

    const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null)
    const [activeDragItemType, setActiveDragItemType] = useState<string | null>(null)
    const [activeDragItemData, setActiveDragItemData] = useState<any>(null)

    useEffect(() => {

    }, [])

    const findColumn = (cardId: any) => {
        return BoardData.find(column => column.card.map(card => card.id)?.includes(cardId))
    }

    const HandleDragStart = (event: any) => {
        // console.log(event)
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? TYPE_ACTIVE_DND.CARD : TYPE_ACTIVE_DND.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }

    const HandleDragOver = (event: any) => {

        if (activeDragItemType === TYPE_ACTIVE_DND.COLUMN) return

        const { active, over } = event

        if (!over) return

        const { id: activeDrappingCardId, data: { current: activeDrappingCardData } } = active
        const { id: overCardId } = over

        const activeColumn = findColumn(activeDrappingCardId)
        const overColumn = findColumn(overCardId)



        if (!activeColumn || !overColumn) return


        SetBoardData(prevColumn => {
            const overCardIndex = overColumn?.card?.findIndex(card => card.id === overCardId)

            let newCardIndex: number
            const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
            const modifier = isBelowOverItem ? 1 : 0
            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.card?.length + 1

            const nextColumns = cloneDeep(prevColumn)
            const nextActiveColumn = nextColumns.find(column => column.id === activeColumn.id)
            const nextOverColumn = nextColumns.find(column => column.id === overColumn.id)

            if (nextActiveColumn) {
                nextActiveColumn.card = nextActiveColumn.card.filter(card => card.id !== activeDrappingCardId)
            }

            if (nextOverColumn) {
                nextOverColumn.card = nextOverColumn.card.filter(card => card.id !== activeDrappingCardId)
                nextOverColumn.card.splice(newCardIndex, 0, activeDrappingCardData)
                console.log('overcardIndex:', overCardIndex)
                console.log('isbelow:', isBelowOverItem)
                console.log('modifier:', modifier)
                console.log('new index card:', newCardIndex)
                console.log(nextColumns)
            }


            return nextColumns
        })


    }

    const HandleDragEnd = (event: any) => {
        // console.log(event)

        if (activeDragItemType === TYPE_ACTIVE_DND.CARD) {
            return
        }

        const { active, over } = event

        if (!over) return

        if (active.id !== over.id) {
            const oldIndex = BoardData.findIndex(c => c.id === active.id)
            const newIndex = BoardData.findIndex(c => c.id === over.id)

            const NewBoardData = arrayMove(BoardData, oldIndex, newIndex)
            SetBoardData(NewBoardData)
        }

        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
    }

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
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
            <div className="flex-1 h-full ring ring-gray-200 rounded-xl flex flex-col overflow-hidden" style={{ backgroundImage: "url('https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg')" }}>
                <header className="p-5 flex justify-between bg-black/20 text-white">
                    <div className="flex items-center gap-2">
                        <label className="font-bold">My Trello</label>
                    </div>
                    <div className="flex items-center">
                        <Button size="ic" variant="icon" icon={<Filter size={18} />} />
                        <Button size="ic" variant="icon" icon={<Star size={18} />} />
                        <Button size="ic" variant="icon" icon={<Ellipsis size={18} />} />
                    </div>
                </header>
                <div className="w-ful flex-1 relative overflow-x-auto scroll-smooth">
                    <DndContext
                        onDragEnd={HandleDragEnd}
                        onDragStart={HandleDragStart}
                        onDragOver={HandleDragOver}
                        sensors={sensors}
                        collisionDetection={closestCorners}>
                        <ListColumns columns={BoardData} />
                        <DragOverlay dropAnimation={dropAnimation}>
                            {(!activeDragItemId && null)}
                            {(activeDragItemId && activeDragItemType === TYPE_ACTIVE_DND.COLUMN)
                                &&
                                <Column label={activeDragItemData.label} id={activeDragItemData.id} card={activeDragItemData.card}>
                                    <ListCard items={activeDragItemData.card} />
                                </Column>}
                            {(activeDragItemId && activeDragItemType === TYPE_ACTIVE_DND.CARD)
                                &&
                                <Card item={activeDragItemData} />}
                        </DragOverlay>
                    </DndContext>
                </div>
            </div>
        </div>
    )
}

export default Board