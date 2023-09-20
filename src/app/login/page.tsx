"use client"
import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";


const LoginPage = () => {
    const [user, setUser] = useState({ email: "", password: "" });

    const login = async () => {

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="m-5 text-4xl">Login</h1>

            <div className='flex flex-col mb-3'>
                <label htmlFor="email">Email</label><br />
                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder="enter email" className="-mt-5 py-2 text-black px-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-600" />
            </div>
            <div className='flex flex-col mb-3'>
                <label htmlFor="password">Password</label><br />
                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" placeholder="enter password" className="-mt-5 py-2 text-black px-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-600" />
            </div>
            <div className="flex items-center flex-col gap-2">
                <button onClick={login} type="submit" className="bg-zinc-300 px-3 py-1 text-blue-600 rounded-md hover:bg-zinc-600 hover:text-black">Login</button>
                <Link href={"/signup"} className="hover:text-gray-300">Visit SignUp Page</Link>
            </div>
        </div>
    )
}

export default LoginPage
