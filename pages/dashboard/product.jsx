import React from "react"
import DeleteProductModals from "@/components/DeleteProductModals"
import ProductModals from "@/components/ProductModals"
import ProductTable from "@/components/ProductTable"
import LayoutDashboard from "@/widget/LayoutDashboard"

export default function Product() {
	return (
		<LayoutDashboard>
			<div className="container p-5 grid grid-cols-1 whitespace-normal overflow-auto">
				<h1 className="font-bold text-xl mb-4 dark:text-gray-200">
					Admin Product
				</h1>
				<p className="dark:text-gray-200 mb-4">
					Di bawah sini merupakan data dari product
				</p>
				<ProductModals />
				<DeleteProductModals />
				<ProductTable />
			</div>
		</LayoutDashboard>
	)
}
