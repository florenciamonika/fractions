const main_state = {
    nominal :'',
    result: false,
    error: '',
}

const main = (state = main_state, action) => {
    switch (action.type) {
        case 'SET_NOMINAL':
            return{
                ...state,
                nominal: action.data
            }
        case 'SET_RESULT':
            return{
                ...state,
                result: action.data
            }
        case 'SET_ERROR':
            return{
                ...state,
                error: action.data
            }
		default:
			return state;
	}
};

export default main;