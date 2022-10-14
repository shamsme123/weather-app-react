export function reducer(state, action) {
    //console.log("state,action ===>", state, action);
    switch(action.type){
        case 'GET_WEATHER_FOR_CITY':
            const newState = Object.assign({},{...state});
            newState.selectedCityId = action.payload;
            return newState;
        case 'SHOW_HIDE_LOADER':
            return {
                ...state,
                showLoader: action.payload
            }

    }
}