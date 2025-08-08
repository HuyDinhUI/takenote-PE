import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { GoogleIcon } from "@/assets/icon/index";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import bg_login from "@/assets/undraw_hello_ccwj.svg"
import { AlertDanger } from "@/components/ui/alert";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState<any>(undefined)
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth0()


  const submitLogin = async (data: any) => {
    console.log(data)
    try {
      const res = await API.post('/users/login', data)
      if (res.data.role === "customer") {
        navigate('/' + res.data.username + '/boards')
      } else navigate('/admin')
    }
    catch (error: any) {
      setError(error.response?.data?.message)
    }

  };

  return (
    <div className="h-[100vh] shadow-lg flex items-center justify-center">
      <div className="w-200 min-h-[100px] rounded-xl shadow-md flex overflow-hidden">
        <form className="w-full p-5" onSubmit={handleSubmit(submitLogin)}>
          <div className="text-center mb-5">
            <h1 className="font-bold text-2xl">Welcome back</h1>
            <p className="font-light">Login to your trello account</p>
          </div>
          {error && <AlertDanger title={error} />}
          <div className="grid gap-2 mb-5">
            <label>Email</label>
            <Input
              type="email"
              placeholder="m@example.com"
              {...register("email", { required: "Email cannot be blank" })} />
          </div>
          <div className="grid gap-2 mb-5 relative">
            <label>Password</label>
            <Input
              required
              type="password"
              {...register("password", { required: "Password cannot be blank" })} />
            <Link className="absolute top-0 right-0" to={'/restpassword'}>Forgot your password ?</Link>
          </div>
          <Button type="submit" className="w-full justify-center rounded-sm" variant="dark" size="md" title="Login" />
          <div className="relative border-t-1 border-gray-200 w-full mt-10">
            <p className="absolute -top-3.5 px-2 right-[50%] translate-x-[50%] bg-white font-light">Or continue with</p>
            <div className="pt-10 pb-5">
              <Button type="button" onClick={() =>
                (window.location.href = "https://localhost:5024/v1/auth/google")
              } className="justify-center w-full" size="lg" variant="outline" icon={<GoogleIcon />} />
            </div>
            <p className="text-center">
              Don't have an account? <Link className="underline" to={'/auth/signup'}>Sign up</Link>
            </p>
          </div>
        </form>
        <div className="w-full bg-gray-50 flex justify-center items-end">
          <img src={bg_login}></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
