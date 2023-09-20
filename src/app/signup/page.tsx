"use client"
import Link from "next/link";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


const SignUpPage = () => {
    const [user, setUser] = useState({ email: "", username: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    const signUp = async () => {
        try {
            setLoading(true);
            console.log(user);
            const response = await axios.post("/api/users/signup", user);
            console.log("SignUp success ", response.data);
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
            console.log("SignUp failed", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="m-5 text-4xl">{loading ? "Processing..." : "SignUp"}</h1>
            <div className='flex flex-col mb-2'>
                <label htmlFor="username">Username</label><br />
                <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" placeholder="enter username" className="-mt-5 text-black py-2 px-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-600" />
            </div>
            <div className='flex flex-col mb-3'>
                <label htmlFor="email">Email</label><br />
                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder="enter email" className="-mt-5 py-2 text-black px-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-600" />
            </div>
            <div className='flex flex-col mb-3'>
                <label htmlFor="password">Password</label><br />
                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type={showPassword ? "text" : "password"} placeholder="enter password" className="-mt-5 py-2 text-black px-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-600" />
                <div className="flex items-center gap-3 my-2">
                    <input className="w-[20px] h-[20px] text-xl" onClick={() => setShowPassword(!showPassword)} type="checkbox" />
                    <span>Show Password</span>
                </div>
            </div>
            <div className="flex items-center flex-col gap-2">
                <button onClick={() => signUp()} type="submit" className="bg-zinc-300 px-3 py-1 text-blue-600 rounded-md hover:bg-zinc-600 hover:text-black">{buttonDisabled ? "No signup" : "SignUp"}</button>
                <Link href={"/login"} className="hover:text-gray-300">Visit login Page</Link>
            </div>
        </div>
    )
}

export default SignUpPage
