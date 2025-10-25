import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import API from "@/utils/axios";
import {useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import bg_dark from "@/assets/rm218-bb-07.jpg"
import bg_light from "@/assets/v904-nunny-012.jpg"
import { AlertDanger } from "@/components/ui/alert";
import { toast } from "react-toastify";


const Signup = () => {
    const {
        register,
        handleSubmit,
    } = useForm();

    const [error, setError] = useState<any>(undefined)
    const navigate = useNavigate();
    const theme = localStorage.getItem('theme') ?? 'light'


    const submitSignup = async (data: any) => {
        console.log(data)
        try {
            const res = await API.post('/authorization/signup', data)
            if (res.data) {
                console.log(res)
                navigate('/auth/login')
                toast.success('Sign up is success')
            }
        }
        catch (error: any) {
            setError(error.response?.data?.message)
        }
    };

    return (
        <div 
        className="h-[100vh] shadow-lg flex items-center justify-center bg-cover" 
        style={theme === 'dark' ? { backgroundImage: `url("${bg_dark}")` } : { backgroundImage: `url("${bg_light}")` }}>
            <div className="w-100 min-h-[100px] bg-white dark:bg-transparent dark:backdrop-blur-md dark:ring dark:ring-gray-500 rounded-xl shadow-md flex overflow-hidden">
                <form className="w-full p-5" onSubmit={handleSubmit(submitSignup)}>
                    <div className="text-center mb-5">
                        <h1 className="font-bold text-2xl">Welcome to Trello</h1>
                        <p className="font-light">Create your trello account</p>
                    </div>
                    {error && <AlertDanger title={error} />}
                    <div className="grid gap-2 mb-5">
                        <label>Username</label>
                        <Input
                            type="text"
                            placeholder="example@123"
                            {...register("username", { required: "Username cannot be blank" })} />
                    </div>
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

                    </div>
                    <div className="grid gap-2 mb-5 relative">
                        <label>Confirm password</label>
                        <Input
                            required
                            type="password"
                            {...register("confirmPassword", { required: "Password cannot be blank" })} />

                    </div>
                    <Button type="submit" className="w-full justify-center rounded-sm" variant="dark" size="md" title="Submit" />
                    <div className="w-full mt-10">
                        <p className="text-center">
                            You have an account? <Link className="underline" to={'/auth/login'}>Log in</Link>
                        </p>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Signup;
