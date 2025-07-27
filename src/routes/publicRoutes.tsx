import {lazy} from 'react'

const Login = lazy(() => import('@/pages/auth/login'))

export const publicRoutes = [
    {
        path: "/auth/login",
        element: <Login/>
    }
]