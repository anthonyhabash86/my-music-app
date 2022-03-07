import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditArtistModal extends Component{
constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
}

handleSubmit(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_API + 'Artist',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            ArtistID:event.target.ArtistID.value,
            Name:event.target.ArtistName.value,
            ActiveYearStart: parseInt(event.target.ArtistActiveYearStart.value),
            ActiveYearEnd: parseInt(event.target.ArtistActiveYearEnd.value)
           
        })
    })
    .then(res=>res.json())
    .then((result) => {
        alert(result);
    }, (error) =>{
        alert('Failed');
    })
}

render(){
    return(
        <div className="container">
            
            <Modal 
            {...this.props}
            size="lg"
            aria-labelledby="contained=-modal-title-vcenter"
            centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Artist    
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="ArtistID">
                                    <Form.Label>Artist ID</Form.Label>
                                    <Form.Control type="text" name="ArtistID" required
                                    disabled
                                    defaultValue={this.props.artistID}
                                    placeholder="Artist Name" />
                                </Form.Group>  
                                <Form.Group controlId="ArtistName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="ArtistName" required
                                    defaultValue={this.props.artistName}
                                    placeholder="Artist Name" />
                                </Form.Group>  
                                <Form.Group controlId="ArtistActiveYearStart">
                                    <Form.Label>Start Year</Form.Label>
                                    <Form.Control type="number" name="ArtistActiveYearStart" required 
                                    defaultValue={this.props.artistActiveYearStart}/>
                                </Form.Group>                                  
                                <Form.Group controlId="ArtistActiveYearEnd">
                                    <Form.Label>End Year</Form.Label>
                                    <Form.Control type="number" name="ActiveYearEnd"  
                                    defaultValue={this.props.artistActiveYearEnd}/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Artist
                                    </Button>
                                </Form.Group>
                            </Form>    
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

}

