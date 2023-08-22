import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import jwtDecode from "jwt-decode"
import axios from 'axios'
import Cookies from 'js-cookie'
import logo from '@/public/logo.webp'
import Router from 'next/router'

export default function Login() {
  const [input, setInput] = React.useState({
		email: "",
		password: "",
	})

	const handleChange = (event) =>
		setInput({ ...input, [event.target.name]: event.target.value })

	const handleSubmit = (event) => {
		event.preventDefault()

		axios
			.post(`https://service-example.sanbercloud.com/api/login`, {
				email: input.email,
				password: input.password,
			})
			.then((res) => {
				let { token } = res.data
				let { user } = res.data

				let decoded = jwtDecode(token)

				if (decoded.role !== "admin") {
					Cookies.set("token_user", token, { expires: 1 })
					Cookies.set("user", JSON.stringify(user), { expires: 1 })
					Router.push("/")
				}
			})
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					alert(error.response.data)
					console.log(error.response.status)
					console.log(error.response.headers)
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					alert(error.request)
				} else {
					// Something happened in setting up the request that triggered an Error
					alert("Error", error.message)
				}
				alert(error.config)
			})
	}

	return (
		<section className="bg-white dark:bg-gray-700">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<Link
					href="/"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<Image
						src={logo}
						width={200}
						height={200}
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
								className="w-full text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
							>
								Sign in
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don&apos;t have an account yet?{" "}
								<Link
									href="/auth/user-register"
									className="font-medium text-yellow-400 hover:underline dark:text-yellow-300"
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}