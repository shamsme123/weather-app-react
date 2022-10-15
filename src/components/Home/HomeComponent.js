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
import {get3DaysForecast,getDayName} from '../../utility/utility';



const HomeComponent = () => {
    const [appState, dispatch] = useReducer(reducer, initialState);
    //console.log("render ===>", appState);

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
                // //console.log("786 API call response forecast ===>",response.data.list);
                const threeDayFoecast = get3DaysForecast(response.data.list);
                console.log("786 API call response forecast 3days ===>",threeDayFoecast);
                dispatch({type: "SET_SELECTED_CITY_FORECASTED_WEATHER",payload: threeDayFoecast});
                showHideLoader(false);
            }).catch(()=>{
                showHideLoader(false);
                alert("Error in fetching forcast data , Check the API Call or Internet Connection!!!!");
            });
        }).catch(()=>{
            showHideLoader(false);
            alert("Error in fetching city current weather data, Check the API Call or Internet Connection!!!!");
        });
    }

    const ReturnWeatherIcon = ({iconid}) => {
        const wiImgURL = `http://openweathermap.org/img/wn/${iconid}@2x.png`
        return (
            <img src={wiImgURL}/>
        )
    }

    return (
        <Container fluid className='home'>
            <div style={{display:'none'}}>786 - for Testing</div>
            <Row className='mt-3'>
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
                            <h6 className='pb-1 small'>* Current and Forecasted Weather for the next 3 days</h6>
                            <h6 className='pb-3 mb-5 small'>* Forecasts are only for the first 3 hours of the day</h6>
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
                                    {appState.selectedCityTemperature}&nbsp;&#8451;
                                </Col>
                            </Row>
                            <hr/>
                            <Row className='mt-5'>
                                {appState.selectedCityForCastedWeather.map((item)=>(
                                    <Col className='text-center' key={item.dt}>
                                        {getDayName(item.dt_txt.toString(),'en-US')}
                                        <br/>
                                        <ReturnWeatherIcon iconid={item.weather[0].icon}/>
                                        <br/>
                                        {item.weather[0].main} - {item.weather[0].description}
                                        <br/>
                                        {item.main.temp}&nbsp;&#8451;
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>: <Row><Col><div className='p-5 label-headings'>No City Selected, City Weather Will Load Here...</div></Col></Row>}
                    </Card>
                </Col>
            </Row>
        </Container>

    );
};

export default HomeComponent;