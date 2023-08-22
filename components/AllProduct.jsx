import Card from './Card'

export default function AllProduct({data}) {
  return (
		<div className="grid gap-y-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
			{data.length !== 0 &&
				data
					.filter((res, index) => {
						return res.available === 1
					})
					.map((res) => {
						return (
							<Card
								key={res.id}
								data={res}
							/>
						)
					})}
		</div>
	)
}