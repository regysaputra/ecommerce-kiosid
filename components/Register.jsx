import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.webp'
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  let router = useRouter()

	const [input, setInput] = React.useState({
		name: "",
		email: "",
		password: "",
		image_url: "",
	})

	const handleChange = (event) =>
		setInput({ ...input, [event.target.name]: event.target.value })

	const handleSubmit = (event) => {
		event.preventDefault()

		axios
			.post(`https://service-example.sanbercloud.com/api/register`, {
				name: input.name,
				email: input.email,
				password: input.password,
				image_url:
					"https://www.clipartmax.com/png/small/434-4349876_profile-icon-vector-png.png",
			})
			.then((res) => {
				router.push("/auth/user-login")
			})
	}

	return (
		<section className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="container mx-auto p-5">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
					<Link
						href="/"
						className="hidden sm:flex items-center mb-5"
					>
						<Image
							src={logo}
							width={200}
							height={200}
							alt="logo"
							quality={40}
							priority
						/>
					</Link>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:w-3/5 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create account
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={handleSubmit}
							>
								<div className="grid grid-cols-2 gap-2">
									<div>
										<label
											htmlFor="name"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Your name
										</label>
										<input
											onChange={handleChange}
											value={input.name}
											type="text"
											name="name"
											id="name"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-300 dark:focus:border-yellow-300"
											placeholder="My Name"
											required
										/>
									</div>
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
									<div>
										<label
											htmlFor="confirm-password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Confirm password
										</label>
										<input
											type="confirm-password"
											name="confirm-password"
											id="confirm-password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-300 dark:focus:border-yellow-300"
											required
										/>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											className="w-4 h-4 border dark:checked:bg-yellow-400 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-yellow-300 dark:ring-offset-gray-800"
											required
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="terms"
											className="font-light text-gray-500 dark:text-gray-300"
										>
											I accept the{" "}
											<a
												className="font-medium text-yellow-300 hover:underline dark:text-yellow-300"
												href="#"
											>
												Terms and Conditions
											</a>
										</label>
									</div>
								</div>
								<button
									type="submit"
									className="w-full text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
								>
									Create An Account
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<Link
										href="/auth/user-login"
										className="font-medium text-yellow-300 hover:underline dark:text-yellow-300"
									>
										Login here
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}