import {lazy} from 'react'


const Boards = lazy(() => import('@/pages/main/boards'))
const BoardsLayout = lazy(() => import('@/layouts/boardLayout'))
const Templates = lazy(() => import('@/pages/main/templates'))
const Home = lazy(() => import('@/pages/main/home'))

export const privateRoutes = [
    {
        path: '/:username/boards',
        element: <BoardsLayout><Boards/></BoardsLayout>
    },
    {
        path: '/templates',
        element: <BoardsLayout><Templates/></BoardsLayout>
    },
    {
        path: '/',
        element: <BoardsLayout><Home/></BoardsLayout>
    }
]