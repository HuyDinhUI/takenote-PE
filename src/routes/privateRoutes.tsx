import {lazy} from 'react'
import Guard from './guard'

const Boards = lazy(() => import('@/pages/main/boards'))
const BoardsLayout = lazy(() => import('@/layouts/boardLayout'))

export const privateRoutes = [
    {
        path: '/boards/:id',
        element: <BoardsLayout><Boards/></BoardsLayout>
    }
]