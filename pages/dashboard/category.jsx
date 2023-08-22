import React from "react"
import CategoryModals from "@/components/CategoryModals"
import CategoryTable from "@/components/CategoryTable"
import DeleteCategoryModals from "@/components/DeleteCategoryModals"
import LayoutDashboard from "@/widget/LayoutDashboard"

export default function Category() {
	return (
		<LayoutDashboard>
			<div className="container p-6 overflow-auto">
				<h1 className="font-bold text-xl mb-4 dark:text-gray-200">
					Admin Category
				</h1>
				<p className="mb-4 dark:text-gray-200">
					Di bawah sini merupakan data dari category product
				</p>
				<CategoryModals />
				<DeleteCategoryModals />
				<CategoryTable />
			</div>
		</LayoutDashboard>
	)
}
