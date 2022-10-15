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
import {get3DaysForecast} from '../../utility/utility';



const HomeComponent = () => {
    const [appState, dispatch] = useReducer(reducer, initialState);
    console.log("render ===>", appState);

    const showHideLoader = (showHide) => {
        dispatch({type: "SHOW_HIDE_LOADER",payload: showHide});
    }

    const handleSelect = (evtKey, evt) => {
        showHideLoader(true);
        const url = `${APP_CONSTANTS.apiURLCity}?id=${evtKey}&appid=${APP_CONSTANTS.keyow}&units=metric`;
        axios.get(url).then((response)=>{
            //console.log("786 API call response ===>",response);
            dispatch({type: "SET_SELECTED_CITY_WEATHER",payload: response});
        }).then((response)=>{
            const url = `${APP_CONSTANTS.apiURLForeCast}?id=${evtKey}&appid=${APP_CONSTANTS.keyow}&units=metric`;
            axios.get(url).then((response)=>{
                console.log("786 API call response forecast ===>",response.data.list);

                //dispatch({type: "SET_SELECTED_CITY_WEATHER",payload: response});
                const threeDayFoecast = get3DaysForecast(response.data.list);
                console.log("786 API call response forecast 3days ===>",threeDayFoecast);
                showHideLoader(false);
            })
        }).catch();
    }

    const ReturnWeatherIcon = ({iconid}) => {
        const wiImgURL = `http://openweathermap.org/img/wn/${iconid}@2x.png`
        return (
            <img src={wiImgURL}/>
        )
    }

    return (
        <Container fluid className='home'>
            786 Allah is great
            <Row>
                <Col xs="12" sm="12" md="12">
                    <Card style={{minHeight: "20rem"}}>
                        <Card.Body>
                            <label style={{paddingLeft: "1rem", paddingRight: "1rem"}}>
                                <h5 className='label-headings'>Search & Select City To See Weather</h5>
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
            <Row className='my-5'>
                <Col xs="12" sm="12" md="12">
                    <Card style={{minHeight: "20rem"}}>
                        {appState.showLoader ? <Loader/> : null}
                        {appState.selectedCityName ? <Card.Body>
                            <Row>
                                <Col className='text-center'>
                                    <h5 className='label-headings'>City</h5>
                                    {appState.selectedCityName}
                                </Col>
                                <Col className='text-center'>
                                    <h5 className='label-headings'>Weather</h5>
                                    <ReturnWeatherIcon iconid={appState.selectedCityWeather[0].icon}/>
                                    <Row>
                                        <Col>{appState.selectedCityWeather[0].main} - {appState.selectedCityWeather[0].description}</Col>
                                    </Row>
                                </Col>
                                <Col className='text-center'>
                                    <h5 className='label-headings'>Temperature</h5>
                                    {appState.selectedCityTemperature}&nbsp; &#8451;
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'></Col>
                                <Col className='text-center'></Col>
                                <Col className='text-center'></Col>
                            </Row>
                        </Card.Body>: <Row><Col><div className='p-5 label-headings'>No City Selected, City Weather Will Load Here...</div></Col></Row>}
                    </Card>
                </Col>
            </Row>
        </Container>

    );
};

export default HomeComponent;