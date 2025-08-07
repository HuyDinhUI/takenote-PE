import { lazy } from 'react'
import Guard from '@/routes/guard'

const Boards = lazy(() => import('@/pages/main/boards'))
const BoardsLayout = lazy(() => import('@/layouts/boardLayout'))
const Templates = lazy(() => import('@/pages/main/templates'))
const Home = lazy(() => import('@/pages/main/home'))

export const privateRoutes = [
    {
        path: '/:username/boards',
        element: <Guard><BoardsLayout><Boards /></BoardsLayout></Guard>
    },
    {
        path: '/templates',
        element: <Guard><BoardsLayout><Templates /></BoardsLayout></Guard>
    },
    {
        path: '/',
        element: <Guard><BoardsLayout><Home /></BoardsLayout></Guard>
    }
]