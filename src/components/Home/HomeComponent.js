import React, { useReducer } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import cityData from '../../assets/city-data/cities-fr.json';
import DropDown from '../ReusableComponents/DropDown';
import '../../assets/css/App.css';
import axios from 'axios';
import Loader from '../ReusableComponents/Loader';
import Spinner from 'react-bootstrap/Spinner';
import {reducer} from "./AppReducer/AppReducer";
import {initialState} from "./initialState/initialState";
import {APP_CONSTANTS} from "../../Constants/AppConstants";


const HomeComponent = () => {
    const [appState, dispatch] = useReducer(reducer, initialState);
    console.log("render ===>", appState);

    const handleSelect = (evtKey, evt) => {
        //console.log("On Select DropDown Call Back ===>", evt, evtKey);
        //dispatch({type: "GET_WEATHER_FOR_CITY", payload: evtKey });
        const url = `${APP_CONSTANTS.apiURLCity}?id=${evtKey}&appid=${APP_CONSTANTS.keyow}`;
        axios.get(url).then((response)=>{
            console.log("786 API call response ===>",response.data.weather);
        }).catch();
    }

    const showHideLoader = (showHide) => {
        console.log("showHide ===>",showHide);
        dispatch({type: "SHOW_HIDE_LOADER",payload: showHide});
    }

    return (
        <Container fluid className='home'>
            786 Allah is great
            <Row>
                <Col xs="12" sm="12" md="12">
                    <Card style={{minHeight: "30rem"}}>
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
            <Row>
                <Col xs="12" sm="12" md="12">
                    <Card style={{minHeight: "30rem"}}>
                        <Card.Body>
                            Hello
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
};

export default HomeComponent;