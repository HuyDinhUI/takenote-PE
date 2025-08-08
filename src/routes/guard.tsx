import API from "@/utils/axios";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom"
import {ScaleLoader} from "react-spinners"
import {useAuth0} from "@auth0/auth0-react"

type Props = {
  children: ReactNode;
};

const override:any = {
    display: "block",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%;-50%)"
}

const Guard = ({ children }: Props) => {
  const [auth, setAuth] = useState<any>(null)
  const {isAuthenticated} = useAuth0()

  useEffect(() => {
    if (isAuthenticated){
      setAuth(true)
      return
    }
    
    const checkLogin = async () => {
        try{
            const res = await API.get('/account/info')

            if (res.data){
                localStorage.setItem('username',res.data.username)
                setAuth(true)
            } else setAuth(false)
        } catch(error){
            setAuth(false)
        }
    }
    checkLogin()
  })

  if (auth === null) return <ScaleLoader cssOverride={override} aria-setsize={10} />

  if(!auth) return <Navigate to="/auth/login" replace/>

  return children
}

export default Guard