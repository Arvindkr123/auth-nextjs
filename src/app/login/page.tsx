"use client"
import Link from "next/link";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";  // Updated import for useRouter
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const login = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user)
            toast.success("Login successful", {
                duration: 4000,
                position: 'top-center',
                icon: '👏',
            })
            console.log("login successful", response.data);
            router.push("/profile")
        } catch (error: any) {
            console.error("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="m-5 text-4xl">{loading ? "Processing" : "Login"}</h1>

            <div className='flex flex-col mb-3'>
                <label htmlFor="email">Email</label><br />
                <input
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    type="email"
                    placeholder="Enter email"
                    className="-mt-5 py-2 text-black px-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-600"
                />
            </div>
            <div className='flex flex-col mb-3'>
                <label htmlFor="password">Password</label><br />
                <input
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="-mt-5 py-2 text-black px-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-600"
                />
                <div className="flex items-center gap-3 my-2">
                    <input
                        className="w-[20px] h-[20px] text-xl"
                        onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                        type="checkbox"
                    />
                    <span>Show Password</span>
                </div>
            </div>
            <div className="flex items-center flex-col gap-2">
                <button
                    onClick={login}
                    type="submit"
                    className="bg-zinc-300 px-3 py-1 text-blue-600 rounded-md hover:bg-zinc-600 hover:text-black"
                    disabled={buttonDisabled}
                >
                    {loading ? "Processing" : "Login"}
                </button>
                <Link href={"/signup"} className="hover:text-gray-300">Visit SignUp Page</Link>
            </div>
        </div>
    )
}

export default LoginPage
