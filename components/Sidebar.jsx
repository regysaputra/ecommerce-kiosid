import React from "react"
import Link from "next/link"
import logo from "../public/logo.webp"
import Image from "next/image"
import { GlobalContext } from "../context/GlobalContext"
import Cookies from "js-cookie"
import Router from "next/router"

export default function Sidebar() {
	let { state } = React.useContext(GlobalContext)
	let { setAdmin, theme, setTheme, setIsClick } = state

	const handleSignOut = () => {
		Cookies.remove("token_admin")
		Cookies.remove("admin")
		Router.push("/auth/admin-login")
		setAdmin(undefined)
	}

	const themeToggle = () => {
		if (theme === "dark") {
			setTheme("light")
		} else {
			setTheme("dark")
		}
		setIsClick(true)
	}

	React.useEffect(() => {
		if (theme !== undefined) {
			localStorage.setItem("theme", theme)
		}

		if (theme === "light") {
			document.documentElement.classList.remove("dark")
		} else if (theme === "dark") {
			document.documentElement.classList.add("dark")
		} else {
			setTheme(localStorage.getItem("theme"))
		}
	}, [theme])

	return (
		<div className="h-screen lg:block shadow-lg w-80">
			<div className="bg-white h-full dark:bg-gray-700">
				<div className="relative pt-4 ml-6">
					<Image
						src={logo}
						width={100}
						height={100}
						alt="Logo"
					/>
				</div>
				<nav className="mt-6">
					<div>
						<Link
							href="/dashboard"
							className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
						>
							<span className="text-left">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
									/>
								</svg>
							</span>
							<span className="mx-2 text-sm font-normal">Dashboard</span>
						</Link>
						<Link
							href="/dashboard/category"
							className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
						>
							<span className="text-left">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							</span>
							<span className="mx-2 text-sm font-normal">Category</span>
						</Link>
						<Link
							href="/dashboard/product"
							className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
						>
							<span className="text-left">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							</span>
							<span className="mx-2 text-sm font-normal">Product</span>
						</Link>
						<Link
							href="/dashboard/checkout"
							className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
						>
							<span className="text-left">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							</span>
							<span className="mx-2 text-sm font-normal">Checkout</span>
						</Link>
						<Link
							href="/dashboard/transaction"
							className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
						>
							<span className="text-left">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							</span>
							<span className="mx-2 text-sm font-normal">Transaction</span>
						</Link>
						<Link
							href="/auth/admin-login"
							onClick={handleSignOut}
							className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
						>
							<span className="text-left">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
									/>
								</svg>
							</span>
							<span className="mx-2 text-sm font-normal">Sign Out</span>
						</Link>

						{theme === undefined && <span></span>}
						{theme === "light" && (
							<button
								className="fixed bottom-2 left-2 rounded-full shadow-lg border"
								onClick={themeToggle}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
									/>
								</svg>
							</button>
						)}
						{theme === "dark" && (
							<button
								className="fixed bottom-2 left-2 rounded-full"
								onClick={themeToggle}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
									/>
								</svg>
							</button>
						)}
					</div>
				</nav>
			</div>
		</div>
	)
}
