import axios from "axios"
import React from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function CategoryTable() {
	let { state, handleFunction } = React.useContext(GlobalContext)
	let {
		category,
		isDeleteModal,
		setIsDeleteModal,
		isFormModal,
		setIsFormModal,
		isDelete,
		setIsDelete,
		id,
		setId,
		categoryName,
		setCategoryName,
		setAction,
	} = state
	let { checkCategory } = handleFunction
	const [fetch, setFetch] = React.useState(false)

	React.useEffect(() => {
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
			.get(`https://service-example.sanbercloud.com/api/category/${id}`)
			.then((res) => {
				let category = res.data.category_name
				setCategoryName(category)
				openFormModal()
			})
	}

	const handleDelete = (event) => {
		setId(event.target.value)
		openDeleteModal()
	}

	return (
		<>
			<div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="py-3 px-6"
							>
								Category Name
							</th>
							<th
								scope="col"
								className="py-3 px-6"
							>
								Category Code
							</th>
							<th
								scope="col"
								className="py-3 px-6"
							>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{category !== null &&
							category.map((res) => {
								return (
									<tr
										key={res.id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
									>
										<td className="py-4 px-6">{res.category_name}</td>
										<td className="py-4 px-6">{res.category_code}</td>
										<td className="py-4 px-6">
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
