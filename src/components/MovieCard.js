import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import placeholder from './placeholdermovie.jpg';


export class MovieCard extends Component {
    
    render() {
        return (
            <div class="row">
                <h1 style={{color: 'white'}}>The Movie list</h1>
                {this.props.movieData.map(i => {
                    let poster_path = i.poster_path;
                    if (poster_path.search("null") > -1) {
                        poster_path = placeholder;
                    }
                    const popover = (
                        <Popover id="popover-basic">
                          <Popover.Header as="h6">{i.title}</Popover.Header>
                          <Popover.Body>
                            {i.overview}
                          </Popover.Body>
                        </Popover>
                      );
                      
                      const Example = () => (
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                          <Button variant="success">Overview</Button>
                        </OverlayTrigger>
                      );
                    return <div class="col-sm-3">
                                <Card style={{  width: '18rem' }}>
                                    <Card.Img variant="top" src={poster_path}/>
                                    <Card.Body>
                                        <Card.Title>
                                            {i.title}
                                        </Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Average Votes: {i.vote_average}</ListGroupItem>
                                        <ListGroupItem>Total Votes: {i.vote_count}</ListGroupItem>
                                        <ListGroupItem>Popularity: {i.popularity}</ListGroupItem>
                                        <ListGroupItem>Released On: {i.release_date}</ListGroupItem>
                                        <ListGroupItem><Example /></ListGroupItem>

                                    </ListGroup>
                                </Card>
                            </div>
                    
                })}
            </div>
        )
    }
}

export default MovieCard
