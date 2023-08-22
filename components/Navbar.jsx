import { GlobalContext } from "@/context/GlobalContext"
import axios from "axios"
import Cookies from "js-cookie"
import Image from "next/image"
import Link from "next/link"
import { Router } from "next/router"
import React from "react"
import logo from "@/public/logo.webp"
import { Avatar } from "flowbite-react"
import { HiCog, HiLogout } from "react-icons/hi"
import { CiLocationOn } from "react-icons/ci"
import { Dropdown } from "flowbite-react";

export default function Navbar() {
	let { state, handleFunction } = React.useContext(GlobalContext)

	let {
		user,
		setUser,
		fetchCheckoutStatus,
		setFetchCheckoutStatus,
		getCheckoutUser,
		isSearch,
		setIsSearch,
		displaySearch,
		setDisplaySearch,
		theme,
		setTheme,
	} = state

	let { fetchCheckoutUser } = handleFunction

	const [search, setSearch] = React.useState("")
	const [data, setData] = React.useState(null)
	const [latitude, setLatitude] = React.useState(undefined)
	const [longitude, setLongitude] = React.useState(undefined)
	const [location, setLocation] = React.useState("")

	const themeToggle = () => {
		if (theme === "dark") {
			setTheme("light")
		} else {
			setTheme("dark")
		}
	}

	const successGetPosition = (position) => {
		setLatitude(position.coords.latitude)
		setLongitude(position.coords.longitude)
	}

	const errorGetPosition = () => {
		setLocation("Unable to retrieve your location")
	}

	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			successGetPosition,
			errorGetPosition
		)
	}, [])

	React.useEffect(() => {
		if (latitude !== undefined && longitude !== undefined) {
			axios
				.get(
					`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
				)
				.then((res) => {
					let city = res.data.city
					let country = res.data.countryName

					setLocation(city + ", " + country)
				})
				.catch((error) => {
					console.log("Error Geocode API = ", error)
				})
		}
	}, [latitude, longitude])

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

	React.useEffect(() => {
		if (user === undefined) {
			if (Cookies.get("token_user") !== undefined) {
				let data = Cookies.get("user")
				data = JSON.parse(data)
				setUser(data)
			}
		} else {
			if (fetchCheckoutStatus) {
				fetchCheckoutUser()
				setFetchCheckoutStatus(false)
			}
		}
	}, [user, fetchCheckoutStatus])

	const handleSearch = (event) => {
		setDisplaySearch(true)
		setSearch(event.target.value)

		if (search !== "") {
			axios
				.get("https://service-example.sanbercloud.com/api/product")
				.then((res) => {
					let data = res.data.filter((res) => {
						return res.available !== 0
					})

					let searchData = data.filter((res) => {
						return Object.values(res)
							.join(" ")
							.toLowerCase()
							.includes(event.target.value.toLowerCase())
					})

					setData(searchData)
				})
		}
	}

	const handleLogout = () => {
		Cookies.remove("token_user")
		Cookies.remove("user")
		setUser(undefined)
	}

	const handleFocus = () => {
		if (!isSearch) {
			setIsSearch(true)
		}
	}

	let menuRef = React.useRef()

	React.useEffect(() => {
		let handler = (event) => {
			if (!menuRef.current.contains(event.target)) {
				setIsSearch(false)
				setDisplaySearch(false)
			}
		}

		document.addEventListener("mousedown", handler)

		return () => {
			document.removeEventListener("mousedown", handler)
		}
	})

	const handleFindProduct = (id) => {
		Router.push(`/detail-product/${id}`)
		setIsSearch(false)
		setDisplaySearch(false)
	}

	return (
		<nav
			ref={menuRef}
			className="sticky top-0 z-50 bg-white shadow-lg border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900"
		>
			<div className="container flex flex-wrap items-center justify-between mx-auto gap-9">
				<Link
					onClick={() => setIsSearch(false)}
					href="/"
					className="hidden md:block"
				>
					<Image
						src={logo}
						width={200}
						height={200}
						alt="Logo"
						priority
					/>
				</Link>

				<div className="grow">
					<form className="relative">
						<div className="flex">
							<label
								htmlFor="search"
								className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
							>
								Search Product
							</label>
							<div className="relative w-full">
								<input
									onFocus={handleFocus}
									onChange={handleSearch}
									type="search"
									value={search}
									id="search"
									className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-300 focus:ring-yellow-300 focus:border-yellow-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-yellow-500"
									placeholder="Search Product..."
									required
								/>
								<button
									name="search"
									type="submit"
									className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-yellow-500 rounded-r-lg border border-yellow-500 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-yellow-500 dark:hover:bg-yellow-500 dark:focus:ring-yellow-500"
								>
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
									<span className="sr-only">Search</span>
								</button>
							</div>
						</div>
						{displaySearch && (
							<div className="absolute z-10 w-full bg-white border rounded-b-lg dark:bg-gray-700 dark:border-none dark:text-white overflow-y-auto max-h-[400px]">
								{data !== null &&
									data.map((res) => {
										return (
											<span
												key={res.id}
												onClick={() => handleFindProduct(res.id)}
												className="block p-2.5 text-sm border-b-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-none"
											>
												{res.product_name}
											</span>
										)
									})}
							</div>
						)}
					</form>
				</div>

				<div>
					{user === undefined && (
						<ul className="flex flex-row items-center p-4 mt-0 space-x-8 text-sm font-medium">
							<li className="relative pr-5">
								<span className="block p-0 text-gray-700 rounded hover:bg-transparent hover:text-yellow-500 dark:hover:text-white dark:text-gray-400 dark:hover:bg-transparent dark:border-gray-700">
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
											strokeWidth="2"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										></path>
									</svg>
								</span>
							</li>
							{theme === undefined && <li className="relative pr-5"></li>}
							{theme === "light" && (
								<li
									className="relative pr-5"
									onClick={themeToggle}
								>
									<span className="block p-0 text-gray-700 rounded hover:bg-transparent hover:text-yellow-500 dark:hover:text-white dark:text-gray-400 dark:hover:bg-transparent dark:border-gray-700">
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
									</span>
								</li>
							)}
							{theme === "dark" && (
								<li
									className="relative pr-5"
									onClick={themeToggle}
								>
									<span className="block p-0 text-gray-700 rounded hover:bg-transparent hover:text-yellow-500 dark:hover:text-white dark:text-gray-400 dark:hover:bg-transparent dark:border-gray-700">
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
									</span>
								</li>
							)}
							<li>
								<Link
									href="/auth/user-login"
									className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
								>
									Login
								</Link>
							</li>
						</ul>
					)}
					{user !== undefined && (
						<ul className="flex flex-row items-center p-4 mt-0 space-x-4 text-sm font-medium">
							<li className="relative pr-5">
								<Link
									href="/user/checkout"
									className="block p-0 text-gray-700 rounded hover:bg-transparent hover:text-yellow-300 dark:hover:text-white dark:text-gray-400 dark:hover:bg-transparent dark:border-gray-700"
								>
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
											strokeWidth="2"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										></path>
									</svg>
									<div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 left-3 dark:border-gray-900">
										{getCheckoutUser}
									</div>
								</Link>
							</li>

							<li className="relative pr-5">
								<Link
									href="/user/transaction"
									className="block p-0 text-gray-700 rounded hover:bg-transparent hover:text-yellow-300 dark:hover:text-white dark:text-gray-400 dark:hover:bg-transparent dark:border-gray-700"
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
											d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
										/>
									</svg>
								</Link>
							</li>

							{theme === undefined && <li className="relative pr-5"></li>}
							{theme === "light" && (
								<li
									className="relative pr-5"
									onClick={themeToggle}
								>
									<span className="block p-0 text-gray-700 rounded hover:bg-transparent hover:text-yellow-500 dark:hover:text-white dark:text-gray-400 dark:hover:bg-transparent dark:border-gray-700">
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
									</span>
								</li>
							)}
							{theme === "dark" && (
								<li
									className="relative pr-5"
									onClick={themeToggle}
								>
									<span className="block p-0 text-gray-700 rounded hover:bg-transparent hover:text-yellow-500 dark:hover:text-white dark:text-gray-400 dark:hover:bg-transparent dark:border-gray-700">
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
									</span>
								</li>
							)}

							<li>
								<div className="flex">
									<Dropdown
										arrowIcon={false}
										inline={true}
										label={
											<Avatar
												alt="User settings"
												img="/user.png"
												rounded={true}
											/>
										}
									>
										<Dropdown.Header>
											<span className="block text-sm">{user.name}</span>
											<span className="block text-sm font-medium truncate">
												{user.email}
											</span>
										</Dropdown.Header>
										<Dropdown.Item icon={CiLocationOn}>
											<span className="flex gap-x-1">
												<p className="font-normal text-xs leading-4">
													Dikirim ke
												</p>
												<p className="font-bold text-xs leading-4">
													{location}
												</p>
											</span>
										</Dropdown.Item>
										<Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item
											onClick={handleLogout}
											icon={HiLogout}
										>
											Logout
										</Dropdown.Item>
									</Dropdown>
								</div>
							</li>
						</ul>
					)}
				</div>
			</div>
		</nav>
	)
}
