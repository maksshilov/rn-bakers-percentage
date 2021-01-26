export const reducer = (state = 2, action) => {
	switch (action.type) {
		case 'CLOG':
			return state + 1
		default:
			return state
	}
}
