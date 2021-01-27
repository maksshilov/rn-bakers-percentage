import { ReactReduxContext } from 'react-redux'

const initialState = {
	flour: 0,
	flourMain: { mass: 0, perc: 0 },
	flourAdd: { mass: 0, perc: 0 },
	water: { mass: 0, perc: 0 },
	salt: { mass: 0, perc: 0 },
}

export const reducer = (state = initialState, action) => {
	let flour
	let percIngridient
	let massIngridient
	switch (action.type) {
		case 'FLOUR_MAIN_MASS':
			flour = state.flourAdd.mass + action.payload
			return {
				...state,
				flour,
				flourMain: {
					mass: action.payload,
					perc: flour === 0 ? 0 : Math.round((action.payload / flour) * 1000) / 10,
				},
				flourAdd: {
					...state.flourAdd,
					perc: flour === 0 ? 0 : Math.round((state.flourAdd.mass / flour) * 1000) / 10,
				},
				water: {
					...state.water,
					perc: Math.round((state.water.mass / flour) * 1000) / 10,
				},
				salt: {
					...state.salt,
					perc: Math.round((state.salt.mass / flour) * 1000) / 10,
				},
			}
		case 'FLOUR_ADD_MASS':
			flour = state.flourMain.mass + action.payload
			return {
				...state,
				flour: state.flourMain.mass + action.payload,
				flourMain: {
					...state.flourMain,
					perc: flour === 0 ? 0 : Math.round((state.flourMain.mass / flour) * 1000) / 10,
				},
				flourAdd: {
					mass: action.payload,
					perc: flour === 0 ? 0 : Math.round((action.payload / flour) * 1000) / 10,
				},
				water: {
					...state.water,
					perc: Math.round((state.water.mass / flour) * 1000) / 10,
				},
				salt: {
					...state.salt,
					perc: Math.round((state.salt.mass / flour) * 1000) / 10,
				},
			}
		case 'WATER_MASS':
			percIngridient = Math.round((action.payload / state.flour) * 1000) / 10
			return {
				...state,
				water: {
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
					mass:
						!isNaN(massIngridient) && massIngridient !== Infinity
							? massIngridient
							: state.water.mass,
					perc: action.payload,
				},
			}
		case 'SALT_MASS':
			percIngridient = Math.round((action.payload / state.flour) * 1000) / 10
			return {
				...state,
				salt: {
					mass: action.payload,
					perc:
						!isNaN(percIngridient) && percIngridient !== Infinity
							? percIngridient
							: state.salt.perc,
				},
			}
		case 'CLEAR':
			return {
				flour: 0,
				flourMain: { mass: 0, perc: 0 },
				flourAdd: { mass: 0, perc: 0 },
				water: { mass: 0, perc: 0 },
				salt: { mass: 0, perc: 0 },
			}
		default:
			return state
	}
}
