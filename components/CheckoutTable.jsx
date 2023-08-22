import React from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function CheckoutTable() {
	let { state, handleFunction } = React.useContext(GlobalContext)
	let { checkout } = state
	let { checkCheckout } = handleFunction

	React.useEffect(() => {
		checkCheckout()
	}, [])

	return (
		<>
			<div className="relative shadow-md sm:rounded-lg mt-4">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="py-3 px-4"
							>
								ID
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Product
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Product Price
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Quantity
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Checkout Price
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Email User
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Sudah Transaksi
							</th>
						</tr>
					</thead>
					<tbody>
						{checkout !== null &&
							checkout.map((res) => {
								return (
									<tr
										key={res.id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
									>
										<td className="py-4 px-4">{res.id}</td>
										<td className="py-4 px-4">{res.product.product_name}</td>
										<td className="py-4 px-4">{res.product.price}</td>
										<td className="py-4 px-4">{res.quantity}</td>
										<td className="py-4 px-4">{res.unit_price}</td>
										<td className="py-4 px-4">{res.user.email}</td>
										<td className="py-4 px-4">
											{res.is_transaction === 0 ? "False" : "True"}
										</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
		</>
	)
}
