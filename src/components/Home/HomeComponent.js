import React, { useReducer } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import cityData from '../../assets/city-data/cities-fr.json';
import DropDown from '../ReusableComponents/DropDown';
import '../../assets/css/App.css';
import axios from 'axios';

function reducer(state, action) {
    //console.log("state,action ===>", state, action);
    switch(action.type){
        case 'getWeatherForCity':
            const newState = Object.assign({},{...state});
            newState.selectedCityId = action.payload;
            return newState;

    }
}

const initialState = {
    selectedCityId: null,
    selectedCityWeather: {},
    selectedCityForCastedWeather:[]
}

const HomeComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("State ===>", state);

    const handleSelect = (evtKey, evt) => {
        //console.log("On Select DropDown Call Back ===>", evt, evtKey);
        //dispatch({type: "getWeatherForCity", payload: evtKey });
        const url = `https://api.openweathermap.org/data/2.5/weather?id=${evtKey}&appid=0f749ac9b1f41465cd227bfe73b9a224`;
        axios.get(url).then((response)=>{
            console.log("786 API call response ===>",response.data.weather);
        }).catch();
    }

    return (
        <Container fluid className='home'>
            786 Allah is great
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <DropDown onSelectCallBack={handleSelect} dropDownItemList={cityData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomeComponent;