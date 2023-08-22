import React from "react"
import Sidebar from "@/components/Sidebar"

export default function LayoutDashboard({ children }) {
	return (
		<main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
			<div className="flex items-start justify-between">
				<Sidebar />
				<div className="flex flex-col w-full md:space-y-4">
					<div className="overflow-auto h-screen pb-24 px-4 md:px-6">
						{children}
					</div>
				</div>
			</div>
		</main>
	)
}
