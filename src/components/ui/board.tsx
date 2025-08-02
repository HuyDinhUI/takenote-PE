
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type BoardVariant = 'default' | 'primary'

export type BoardItemProps = {
    type: BoardVariant
    title?: string
    img?: ReactNode
    href?: string
}

export const Board = ({ type, title, img = '', href = '' }: BoardItemProps) => {

    if (type === 'default') {
        return (
            <button className="bg-gray-100 font-light shadow-sm rounded-md hover:bg-gray-200">
                <span>{title}</span>
            </button>
        )
    }


    return (
        <div className="board shadow-sm rounded-md overflow-hidden">
            <Link to={href}>
                <div className="flex flex-col">
                    <div className="h-[72px] w-full" style={{ backgroundImage: `url(${img})` }}>
                        <div className="h-full w-full hover:bg-black/10"></div>
                    </div>
                    <div className="p-2 flex items-center">
                        <span className="">{title}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

type BoardContainerProps = {
    icon: ReactNode
    title: string
    children: ReactNode
}

export const BoardContainer = ({ icon, title, children }: BoardContainerProps) => {
    return (
        <div className="pb-13">
            
            <div className="flex items-center gap-3 mb-5">
                {icon}
                <span className="font-bold text-[15px]">{title}</span>
            </div>
            <div className="grid grid-cols-4 gap-5">
                {children}
            </div>
        </div>

    )
}

type BoardWorkspaceProps = {
    label: string
    children: ReactNode
    icon?: ReactNode
}

export const BoardWorkspace = ({label,children,icon}: BoardWorkspaceProps) => {

    return (
        <div className="">
            <div className="flex gap-3 mb-5 items-center">
                <label className="uppercase font-bold text-gray-700">{label}</label>
                {icon && icon}
            </div>
            {children}
        </div>
    )
}