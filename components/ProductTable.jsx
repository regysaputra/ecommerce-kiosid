import axios from "axios"
import React from "react"
import { GlobalContext } from "@/context/GlobalContext"
import Image from "next/image"

export default function ProductTable() {
	let { state, handleFunction } = React.useContext(GlobalContext)
	let {
		product,
		setIsDeleteModal,
		setIsFormModal,
		setId,
		setAction,
		setParamProduct,
	} = state
	let { checkCategory, checkProduct } = handleFunction

	React.PureComponentuseEffect(() => {
		checkProduct()
		checkCategory()
	}, [])

	const openFormModal = () => {
		setIsFormModal(true)
	}

	const openDeleteModal = () => {
		setIsDeleteModal(true)
	}

	const handleEdit = (event) => {
		const id = event.target.value
		setAction("edit")
		setId(id)
		axios
			.get(`https://service-example.sanbercloud.com/api/product/${id}`)
			.then((res) => {
				let result = res.data
				setParamProduct({
					idCategory: result.id_category,
					productName: result.product_name,
					description: result.description,
					imageUrl: result.image_url,
					stock: parseInt(result.stock),
					rating: parseInt(result.rating),
					price: parseInt(result.price),
					available: result.available,
				})
				openFormModal()
			})
	}

	const handleDelete = (event) => {
		setId(event.target.value)
		openDeleteModal()
	}

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
								Category
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Image
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Nama Product
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Deskripsi
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Harga
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Rating
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Stok
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Stok yang di Checkout
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Available
							</th>
							<th
								scope="col"
								className="py-3 px-4"
							>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{product !== null &&
							product.map((res) => {
								return (
									<tr
										key={res.id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
									>
										<td className="py-4 px-4">{res.category.category_name}</td>
										<td className="py-4 px-4">
											<div className="relative w-20 h-20">
												<Image
													src={res.image_url}
													fill
													alt="Gambar Produk"
												/>
											</div>
										</td>
										<td className="py-4 px-4">{res.product_name}</td>
										<td className="py-4 px-4">{res.description}</td>
										<td className="py-4 px-4">{res.price}</td>
										<td className="py-4 px-4">{res.rating}</td>
										<td className="py-4 px-4">{res.stock}</td>
										<td className="py-4 px-4">{res.stock_to_checkout}</td>
										<td className="py-4 px-4">{res.available}</td>
										<td className="py-4 px-4">
											<button
												onClick={handleEdit}
												value={res.id}
												type="button"
												className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
											>
												Edit
											</button>
											<button
												onClick={handleDelete}
												value={res.id}
												type="button"
												className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
											>
												Delete
											</button>
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
