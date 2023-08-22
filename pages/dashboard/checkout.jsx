import React from "react"
import CheckoutTable from "@/components/CheckoutTable"
import LayoutDashboard from "@/widget/LayoutDashboard"

export default function Checkout() {
	return (
		<LayoutDashboard>
			<div className="container p-5 grid grid-cols-1 whitespace-normal overflow-auto">
				<h1 className="font-bold text-xl mb-4 dark:text-gray-200">
					Admin Checkout
				</h1>
				<p className="mb-4 dark:text-gray-200">
					Di bawah sini merupakan data dari checkout product
				</p>
				<CheckoutTable />
			</div>
		</LayoutDashboard>
	)
}
