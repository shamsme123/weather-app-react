import React, { useReducer } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import cityData from '../../assets/city-data/cities-fr.json';
import DropDown from '../ReusableComponnets/DropDown';
import '../../assets/css/App.css';

function reducer(state, action) {
    console.log("state,action ===>", state, action);
}

const initialState = {
}

const HomeComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("City Data ===>", cityData);

    const handleSelect = (evt, evtKey) => {
        console.log("On Select DropDown Call Back ===>", evt, evtKey);
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