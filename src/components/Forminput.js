import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';

export class Forminput extends Component {
    render() {
        return (
            <div>
                <Form onSubmit={this.props.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter City Name:</Form.Label>
                        <Form.Control onChange={this.props.handleLocation} type="text" placeholder="City Name .." />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Explore!
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Forminput

