import { GlobalContext } from '@/context/GlobalContext';
import React from 'react';
import Card from './Card';

export default function RandomProduct({ data }) {
  let { state } = React.useContext(GlobalContext)

  let { randomIndex } = state

  return (
		<div className="grid gap-y-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
			{data.length !== 0 &&
				data
					.filter((res, index) => {
						return (
							res.available === 1 &&
							index > randomIndex &&
							index < randomIndex + 3
						)
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