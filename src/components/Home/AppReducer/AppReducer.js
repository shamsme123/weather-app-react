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
                selectedCityWeather: action.payload.data.weather,
                selectedCityTemperature: action.payload.data.main.temp

            }    
        case "SHOW_HIDE_LOADER":
            return {
                ...state,
                showLoader: action.payload
            }
        case "SET_SELECTED_CITY_FORECASTED_WEATHER":
            return {
                ...state,
                selectedCityForCastedWeather: action.payload
            }
        default:
            return state; 
    }
}