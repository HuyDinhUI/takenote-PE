import { lazy } from 'react'
import Guard from '@/routes/guard'

const Boards = lazy(() => import('@/pages/main/boards'))
const MainLayout = lazy(() => import('@/layouts/mainLayout'))
const Templates = lazy(() => import('@/pages/main/templates'))
const Home = lazy(() => import('@/pages/main/home'))
const Board = lazy(() => import('@/pages/main/board/index'))
const BoardLayout = lazy(() => import('@/layouts/boardLayout'))

export const privateRoutes = [
    {
        path: '/:username/boards',
        element: <Guard><MainLayout><Boards /></MainLayout></Guard>
    },
    {
        path: '/templates',
        element: <Guard><MainLayout><Templates /></MainLayout></Guard>
    },
    {
        path: '/',
        element: <Guard><MainLayout><Home /></MainLayout></Guard>
    },
    {
        path:'b/:id/:name',
        element: <Guard><BoardLayout><Board/></BoardLayout></Guard>
    }
]