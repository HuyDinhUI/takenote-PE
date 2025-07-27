import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { GoogleIcon } from "@/assets/icon/index";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import API from "@/utils/axios";
import {toast} from 'react-toastify'
import {AlertCircleIcon} from "lucide-react"
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
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
        navigate('/boards')
      } else navigate('/admin')
    }
    catch (error: any){
      setError(error.response?.data?.message)
    }

  };

  return (
    <div className="h-[100vh] shadow-lg flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        {error && <CardHeader>
          <Alert variant={'destructive'} className="w-full">
            <AlertCircleIcon/>
            <AlertTitle>Password is invalid</AlertTitle>
            <AlertDescription>
              <p>The required password is:</p>
              <ul className="list-inside list-disc text-sm">
                <li>Least 8 character</li>
                <li>Including capital letters, special characters, number</li>
              </ul>
            </AlertDescription>
          </Alert>
          </CardHeader>}
        <CardContent>
          <form onSubmit={handleSubmit(submitLogin)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email",{required: "Email cannot be blank"})}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required {...register("password",{
                  required: "Password cannot be blank"
                })} />
              </div>
            </div>
            <Button type="submit" className="w-full mt-3">
            Login
          </Button>
          </form>
          
        </CardContent>
        <CardFooter className="flex-col gap-2">
          
          <Button variant="outline" className="w-full">
            <GoogleIcon/>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
