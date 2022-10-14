export function reducer(state, action) {
    console.log("state,action ===>", action);
    switch(action.type){
        case 'GET_WEATHER_FOR_CITY':
            const newState = Object.assign({},{...state});
            newState.selectedCityId = action.payload;
            return newState;
        case "SET_SELECTED_CITY_WEATHER":
            return {
                ...state,
                selectedCityName: action.payload.data.name,
                selectedCityWeather: action.payload.data.weather
            }    
        case "SHOW_HIDE_LOADER":
            return {
                ...state,
                showLoader: action.payload
            }
        default:
            return state; 
    }
}