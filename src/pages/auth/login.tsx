import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { GoogleIcon } from "@/assets/icon/index";
import API from "@/utils/axios";
import {toast} from 'react-toastify'
import {AlertCircleIcon} from "lucide-react"
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState<any>(undefined)
  const navigate = useNavigate();

  const submitLogin = async (data: any) => {
    console.log(data)
    try{
      const res = await API.post('/users/login',data)
      if (res.data.role === "customer"){
        navigate('/boards/1')
      } else navigate('/admin')
    }
    catch (error: any){
      setError(error.response?.data?.message)
    }

  };

  return (
    <div className="h-[100vh] shadow-lg flex items-center justify-center">
      
    </div>
  );
};

export default Login;
