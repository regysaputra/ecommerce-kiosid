import React from "react"
import LayoutDashboard from "@/widget/LayoutDashboard"
import { GlobalContext } from "@/context/GlobalContext"
import TransactionTable from "@/components/TransactionTable"

export default function Transaction() {
	let { state } = React.useContext(GlobalContext)

	return (
		<LayoutDashboard>
			<div className="container p-6 overflow-auto">
				<h1 className="font-bold text-xl mb-4 dark:text-gray-200">
					Admin Transaction
				</h1>
				<TransactionTable />
			</div>
		</LayoutDashboard>
	)
}
