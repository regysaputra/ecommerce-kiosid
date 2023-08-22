import React from "react"
import { GlobalContext } from "@/context/GlobalContext"

export default function TransactionTable() {
	let { state, handleFunction } = React.useContext(GlobalContext)
	let { transaksi } = state
	let { checkTransaksi } = handleFunction
	const [fetch, setFetch] = React.useState(false)

	React.useEffect(() => {
		checkTransaksi()
	}, [fetch])

	const currencyFormat = (number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(number)
	}

	const stringFormat = (number) => {
		const str = currencyFormat(number)
		return str.substring(0, str.length - 3)
	}

	return (
		<div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th
							scope="col"
							className="py-3 px-6"
						>
							Transaction Code
						</th>
						<th
							scope="col"
							className="py-3 px-6"
						>
							User Name
						</th>
						<th
							scope="col"
							className="py-3 px-6"
						>
							User Email
						</th>
						<th
							scope="col"
							className="py-3 px-6"
						>
							Bank
						</th>
						<th
							scope="col"
							className="py-3 px-6"
						>
							Total Quantity
						</th>
						<th
							scope="col"
							className="py-3 px-6"
						>
							Status
						</th>
						<th
							scope="col"
							className="py-3 px-6"
						>
							Total
						</th>
					</tr>
				</thead>
				<tbody>
					{transaksi !== null &&
						transaksi.map((res) => {
							return (
								<tr
									key={res.id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								>
									<td className="py-4 px-6">{res.transaction_code}</td>
									<td className="py-4 px-6">{res.user.name}</td>
									<td className="py-4 px-6">{res.user.email}</td>
									<td className="py-4 px-6">{res.bank.bank_name}</td>
									<td className="py-4 px-6">{res.quantity_product}</td>
									<td className="py-4 px-6">{res.status}</td>
									<td className="py-4 px-6">{stringFormat(res.total)}</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}
