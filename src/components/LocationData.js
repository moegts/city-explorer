import React, { Component } from 'react'
import {Container, Row, Col, Image} from 'react-bootstrap';
export class LocationData extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <h2>{this.props.display_name}</h2>
                            <h4>{this.props.lon}</h4>
                            <h4>{this.props.lat}</h4>
                            <Image src={this.props.cityImage} roundedCircle />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default LocationData
