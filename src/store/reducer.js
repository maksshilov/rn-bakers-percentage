const initialState = {
	flour: 0,
	flourMain: { key: 'flourMain', type: 'flour', id: 1.1, title: 'Flour', mass: 0, perc: 0 },
	water: { key: 'water', type: 'ingridient', id: 2.1, title: 'Water', mass: 0, perc: 0 },
	salt: { key: 'salt', type: 'ingridient', id: 2.2, title: 'Salt', mass: 0, perc: 0 },
	yeastsour: {
		key: 'yeastsour',
		type: 'ingridient',
		id: 2.3,
		title: 'Yeast / Sour Starter',
		mass: 0,
		perc: 0,
	},
}

export const reducer = (state = initialState, action) => {
	let flour = 0
	let flourArr = Object.keys(state)
		.filter((item) => item.match('flour'))
		.slice(1)

	// SET COMMON FLOUR MASS
	flourArr.map((item) => {
		if (item === action.type.replace('Mass', '')) {
			flour += action.payload
		} else if (Boolean(action.type.match('Perc'))) {
			flour = state.flour
		} else {
			flour += state[item].mass
		}
	})

	// SET FLOUR MASS
	let flourMassObj = {}
	flourArr.map((item) => {
		if (item === action.type.replace('Mass', '')) {
			flourMassObj[item] = {
				...state[item],
				mass: action.payload,
				perc: flour === 0 ? 0 : Math.round((action.payload / flour) * 1000) / 10,
			}
		} else {
			flourMassObj[item] = {
				...state[item],
				perc: flour === 0 ? 0 : Math.round((state[item].mass / flour) * 1000) / 10,
			}
		}
	})

	// SET FLOUR PERC
	let flourPercObj = {}
	flourArr.map((item) => {
		if (item === action.type.replace('Perc', '')) {
			flourPercObj[item] = {
				...state[item],
				mass: (flour * action.payload) / 100,
				perc: action.payload,
			}
		} else {
			flourPercObj[item] = {
				...state[item],
			}
		}
	})

	// SET INGRIDIENT PERCENT WHEN FLOUR MASS HAS BEEN CHANGED
	let flourIngrPercObj = {}
	Object.keys(state)
		.filter((item) => !item.match('flour'))
		.map((item) => {
			flourIngrPercObj[item] = {
				...state[item],
				perc:
					flour === 0 || isNaN(flour)
						? 0
						: Math.round((state[item].mass / flour) * 1000) / 10,
			}
		})

	// TYPE FLOUR MASS VALUE
	if (Boolean(action.type.match('flour') && action.type.match('Mass'))) {
		return {
			flour,
			...flourMassObj,
			...flourIngrPercObj,
		}
	}

	// TYPE FLOUR PERCENT VALUE
	if (Boolean(action.type.match('flour') && action.type.match('Perc'))) {
		return {
			flour,
			...flourPercObj,
			...flourIngrPercObj,
		}
	}

	// TYPE INGRIDIENT MASS VALUE
	if (Boolean(!action.type.match('flour')) && action.type.match('Mass')) {
		let percIngridient = Math.round((action.payload / flour) * 1000) / 10
		let item = action.type.replace('Mass', '')
		return {
			...state,
			[item]: {
				...state[item],
				mass: action.payload,
				perc:
					!isNaN(percIngridient) && percIngridient !== Infinity
						? percIngridient
						: state[item].perc,
			},
		}
	}

	// TYPE INGRIDIENT PERCENT VALUE
	if (Boolean(!action.type.match('flour')) && action.type.match('Perc')) {
		let massIngridient = Math.round(flour * action.payload) / 100
		let item = action.type.replace('Perc', '')
		return {
			...state,
			[item]: {
				...state[item],
				mass:
					!isNaN(massIngridient) && massIngridient !== Infinity
						? massIngridient
						: state[item].mass,
				perc: action.payload,
			},
		}
	}

	switch (action.type) {
		case 'CLEAR':
			return {
				flour: 0,
				flourMain: {
					key: 'flourMain',
					type: 'flour',
					id: 1.1,
					title: 'Flour',
					mass: 0,
					perc: 0,
				},
				water: {
					key: 'water',
					type: 'ingridient',
					id: 2.1,
					title: 'Water',
					mass: 0,
					perc: 0,
				},
				salt: { key: 'salt', type: 'ingridient', id: 2.2, title: 'Salt', mass: 0, perc: 0 },
				yeastsour: {
					key: 'yeastsour',
					type: 'ingridient',
					id: 2.3,
					title: 'Yeast / Sour Starter',
					mass: 0,
					perc: 0,
				},
			}
		case 'ADD':
			const { newItem, newItemSort, type } = action.payload
			let typeOfId = type === 'flour' ? '1.' : '2.'
			const newState = { ...state }
			newState[newItemSort] = {
				key: newItemSort,
				id: Number(typeOfId.concat(Object.keys(state).length)),
				title: newItem[1].toString(),
				mass: 0,
				perc: 0,
				type,
			}

			return { ...newState }
		case 'DELETE':
			let removeState = state
			delete removeState[action.payload]
			return { ...removeState }
		default:
			return state
	}
}
