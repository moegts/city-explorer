import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

export class Weather extends Component {
    render() {
        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.weatherData.map(i => {
                            return  <tr>
                                        <td>{i.date}</td>
                                        <td>{i.description}</td>
                                    </tr>
                        })}

                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Weather
