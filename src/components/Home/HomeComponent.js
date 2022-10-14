import React, { useReducer } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import cityData from '../../assets/city-data/cities-fr.json';
import DropDown from '../ReusableComponents/DropDown';
import axios from 'axios';
import Loader from '../ReusableComponents/Loader';
import {reducer} from "./AppReducer/AppReducer";
import {initialState} from "./initialState/initialState";
import {APP_CONSTANTS} from "../../Constants/AppConstants";
import '../../assets/css/App.css';
import { WiDaySunny } from 'weather-icons-react';



const HomeComponent = () => {
    const [appState, dispatch] = useReducer(reducer, initialState);
    console.log("render ===>", appState);

    const showHideLoader = (showHide) => {
        dispatch({type: "SHOW_HIDE_LOADER",payload: showHide});
    }

    const handleSelect = (evtKey, evt) => {
        showHideLoader(true);
        const url = `${APP_CONSTANTS.apiURLCity}?id=${evtKey}&appid=${APP_CONSTANTS.keyow}`;
        axios.get(url).then((response)=>{
            console.log("786 API call response ===>",response);
            dispatch({type: "SET_SELECTED_CITY_WEATHER",payload: response});
            showHideLoader(false);
        }).catch();
    }

    const ReturnWeatherIcon = ({iconid}) => {
        const wi = `http://openweathermap.org/img/wn/${iconid}@2x.png`
        return (
            <img src={wi}/>
        )
    }

    return (
        <Container fluid className='home'>
            786 Allah is great
            <WiDaySunny size={24} color='#000' />
            <Row>
                <Col xs="12" sm="12" md="12">
                    <Card style={{minHeight: "20rem"}}>
                        <Card.Body>
                            <label>
                                Select City To See Weather
                            </label>
                            <DropDown onSelectCallBack={handleSelect} dropDownItemList={cityData} showHideLoader={showHideLoader} />
                        </Card.Body>
                    </Card>
                </Col>
                {/* <Col xs={9} md={9}>
                Hello-{JSON.stringify(appState.showLoader)}
                    {appState.showLoader ? <Loader/>: null}
                </Col> */}
            </Row>
            {appState.selectedCityName && <Row className='my-5'>
                <Col xs="12" sm="12" md="12">
                    <Card style={{minHeight: "20rem"}}>
                        <Card.Body>
                            {appState.selectedCityName}
                            <ReturnWeatherIcon iconid={appState.selectedCityWeather[0].icon}/>
                            {appState.showLoader ? <Loader/> : null}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>}
        </Container>

    );
};

export default HomeComponent;