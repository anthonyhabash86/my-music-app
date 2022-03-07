import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddArtistModal extends Component{
constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
}

handleSubmit(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_API + 'Artist',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            ArtistID:0,
            Name:event.target.ArtistName.value,
            ActiveYearStart: parseInt(event.target.ActiveYearStart.value),
            ActiveYearEnd: parseInt(event.target.ActiveYearEnd.value)
           
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
                        Add Artist    
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="ArtistName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="ArtistName" required
                                    placeholder="Artist Name" />
                                </Form.Group>  
                                <Form.Group controlId="ArtistActiveYearStart">
                                    <Form.Label>Start Year</Form.Label>
                                    <Form.Control type="number" name="ActiveYearStart" required />
                                </Form.Group>                                  
                                <Form.Group controlId="ArtistActiveYearEnd">
                                    <Form.Label>End Year</Form.Label>
                                    <Form.Control type="number" name="ActiveYearEnd"  />
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Artist
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

