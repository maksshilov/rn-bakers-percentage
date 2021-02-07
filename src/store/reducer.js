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
	let ingrMassObj = {}

	Object.keys(state)
		.filter((item) => !item.match('flour'))
		.map((item) => {
			ingrMassObj[item] = {
				...state[item],
				perc:
					state.flour === 0 || isNaN(state.flour)
						? 0
						: Math.round((state[item].mass / state.flour) * 1000) / 10,
			}
		})

	console.log(ingrMassObj)

	let flour
	let percIngridient
	let massIngridient

	switch (action.type) {
		case 'flourMainMass':
			flour = state.flourAdd.mass + action.payload
			return {
				flour,
				...ingrMassObj,
				flourMain: {
					...state.flourMain,
					mass: action.payload,
					perc: flour === 0 ? 0 : Math.round((action.payload / flour) * 1000) / 10,
				},
				flourAdd: {
					...state.flourAdd,
					perc: flour === 0 ? 0 : Math.round((state.flourAdd.mass / flour) * 1000) / 10,
				},
				flourAdd_2: {
					...state.flourAdd_2,
					perc: flour === 0 ? 0 : Math.round((state.flourAdd_2.mass / flour) * 1000) / 10,
				},
			}
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
		case 'flourAddMass':
			flour = state.flourMain.mass + state.flourAdd_2.mass + action.payload
			return {
				flour,
				...ingrMassObj,

				flourMain: {
					...state.flourMain,
					perc: flour === 0 ? 0 : Math.round((state.flourMain.mass / flour) * 1000) / 10,
				},
				flourAdd: {
					...state.flourAdd,
					mass: action.payload,
					perc: flour === 0 ? 0 : Math.round((action.payload / flour) * 1000) / 10,
				},
				flourAdd_2: {
					...state.flourAdd_2,
					perc: flour === 0 ? 0 : Math.round((state.flourAdd_2.mass / flour) * 1000) / 10,
				},
			}
		case 'flourAdd_2Mass':
			flour = state.flourMain.mass + state.flourAdd.mass + action.payload
			return {
				flour,
				...ingrMassObj,

				flourMain: {
					...state.flourMain,
					perc: flour === 0 ? 0 : Math.round((state.flourMain.mass / flour) * 1000) / 10,
				},
				flourAdd: {
					...state.flourAdd,
					perc: flour === 0 ? 0 : Math.round((state.flourAdd.mass / flour) * 1000) / 10,
				},
				flourAdd_2: {
					...state.flourAdd_2,
					mass: action.payload,
					perc: flour === 0 ? 0 : Math.round((action.payload / flour) * 1000) / 10,
				},
			}
		case 'waterMass':
			percIngridient = Math.round((action.payload / state.flour) * 1000) / 10
			return {
				...state,
				water: {
					...state.water,
					mass: action.payload,
					perc:
						!isNaN(percIngridient) && percIngridient !== Infinity
							? percIngridient
							: state.water.perc,
				},
			}
		case 'WATER_PERC':
			massIngridient = Math.round(state.flour * action.payload) / 100
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
		case 'saltMass':
			percIngridient = Math.round((action.payload / state.flour) * 1000) / 10
			return {
				...state,
				salt: {
					...state.salt,
					mass: action.payload,
					perc:
						!isNaN(percIngridient) && percIngridient !== Infinity
							? percIngridient
							: state.salt.perc,
				},
			}
		case 'SALT_PERC':
			massIngridient = Math.round(state.flour * action.payload) / 100
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
		case 'yeastsourMass':
			percIngridient = Math.round((action.payload / state.flour) * 1000) / 10
			return {
				...state,
				yeastsour: {
					...state.yeastsour,
					mass: action.payload,
					perc:
						!isNaN(percIngridient) && percIngridient !== Infinity
							? percIngridient
							: state.yeastsour.perc,
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
