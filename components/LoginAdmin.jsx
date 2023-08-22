import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import jwtDecode from "jwt-decode"
import axios from "axios"
import Cookies from "js-cookie"
import logo from "@/public/admin.webp"

export default function LoginAdmin() {
	let router = useRouter()

	const [input, setInput] = React.useState({
		email: "",
		password: "",
	})

	const handleChange = (event) =>
		setInput({ ...input, [event.target.name]: event.target.value })

	const handleSubmit = (event) => {
		event.preventDefault()

		axios
			.post(`https://service-example.sanbercloud.com/api/login-admin`, {
				email: input.email,
				password: input.password,
			})
			.then((res) => {
				let { admin } = res.data
				let { token } = res.data

				let decoded = jwtDecode(token)

				if (decoded.role === "admin") {
					Cookies.set("token_admin", token, { expires: 1 })
					Cookies.set("admin", JSON.stringify(admin), { expires: 1 })
					window.location = "/dashboard"
				}
			})
	}

	return (
		<section className="bg-white dark:bg-black">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<Link
					href="/"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<Image
						src={logo}
						width={100}
						height={100}
						quality={40}
						alt="logo"
						priority
					/>
				</Link>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={handleSubmit}
						>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
								</label>
								<input
									onChange={handleChange}
									value={input.email}
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-300 dark:focus:border-yellow-300"
									placeholder="name@company.com"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									onChange={handleChange}
									value={input.password}
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-300 dark:focus:border-yellow-300"
									required
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400"
							>
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
