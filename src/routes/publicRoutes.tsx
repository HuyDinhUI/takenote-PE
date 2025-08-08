import {lazy} from 'react'

const Login = lazy(() => import('@/pages/auth/login'))
const Signup = lazy(() => import('@/pages/auth/signup'))

export const publicRoutes = [
    {
        path: "/auth/login",
        element: <Login/>
    },
    {
        path: "/auth/signup",
        element: <Signup/>
    }
]