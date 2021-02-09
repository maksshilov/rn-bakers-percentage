const initialState = {
	flour: 0,
	flourMain: { key: 'flourMain', id: 1, title: 'Flour', mass: 0, perc: 0 },
	flourAdd: { key: 'flourAdd', id: 2, title: 'Flour # 2', mass: 0, perc: 0 },
	flourAdd_2: { key: 'flourAdd_2', id: 2, title: 'Flour # 3', mass: 0, perc: 0 },
	water: { key: 'water', id: 3, title: 'Water', mass: 0, perc: 0 },
	salt: { key: 'salt', id: 4, title: 'Salt', mass: 0, perc: 0 },
	yeastsour: { key: 'yeastsour', id: 5, title: 'Yeast / Sour Starter', mass: 0, perc: 0 },
}

export const reducer = (state = initialState, action) => {
	let flour = 0

	Object.keys(state)
		.filter((item) => item.match('flour'))
		.slice(1)
		.map((item) => {
			if (item === action.type.replace('Mass', '')) {
				flour += action.payload
			} else {
				flour += state[item].mass
			}
		})

	let flourMassObj = {}
	Object.keys(state)
		.filter((item) => item.match('flour'))
		.slice(1)
		.map((item) => {
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

	let percIngridient = Math.round((action.payload / flour) * 1000) / 10
	let massIngridient = Math.round(flour * action.payload) / 100

	if (Boolean(action.type.match('flour'))) {
		return {
			flour,
			...flourMassObj,
			...flourIngrPercObj,
		}
	}

	if (Boolean(!action.type.match('flour')) && action.type.match('Mass')) {
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

	switch (action.type) {
		case 'FLOUR_MAIN_PERC':
			return {
				...state,
				flourMain: {
					...state.flourMain,
					mass: (state.flour * action.payload) / 100,
					perc: action.payload,
				},
				flourAdd: {
					...state.flourAdd,
					mass: (state.flour * (100 - action.payload)) / 100,
					perc: 100 - action.payload,
				},
				water: {
					...state.water,
					perc:
						!isNaN(state.flour) && state.flour !== Infinity && state.flour !== 0
							? Math.round((state.water.mass / state.flour) * 1000) / 10
							: state.water.perc,
				},
				salt: {
					...state.salt,
					perc:
						!isNaN(state.flour) && state.flour !== Infinity && state.flour !== 0
							? Math.round((state.salt.mass / state.flour) * 1000) / 10
							: state.salt.perc,
				},
			}
		case 'WATER_PERC':
			return {
				...state,
				water: {
					...state.water,
					mass:
						!isNaN(massIngridient) && massIngridient !== Infinity
							? massIngridient
							: state.water.mass,
					perc: action.payload,
				},
			}
		case 'SALT_PERC':
			return {
				...state,
				salt: {
					...state.salt,

					mass:
						!isNaN(massIngridient) && massIngridient !== Infinity
							? massIngridient
							: state.salt.mass,
					perc: action.payload,
				},
			}
		case 'CLEAR':
			return {
				flour: 0,
				flourMain: { key: 'flourMain', id: 1, title: 'Flour', mass: 0, perc: 0 },
				flourAdd: { key: 'flourAdd', id: 2, title: 'Flour # 2', mass: 0, perc: 0 },
				flourAdd_2: { key: 'flourAdd_2', id: 2, title: 'Flour # 3', mass: 0, perc: 0 },
				water: { key: 'water', id: 3, title: 'Water', mass: 0, perc: 0 },
				salt: { key: 'salt', id: 4, title: 'Salt', mass: 0, perc: 0 },
				yeastsour: {
					key: 'yeastsour',
					id: 5,
					title: 'Yeast / Sour Starter',
					mass: 0,
					perc: 0,
				},
			}
		case 'ADD':
			const { newItem, newItemSort } = action.payload
			const newState = { ...state }
			newState[newItemSort] = {
				key: newItemSort,
				id: Object.keys(state).length,
				title: newItemSort,
				mass: 0,
				perc: 0,
			}
			return { ...newState }
		default:
			return state
	}
}
