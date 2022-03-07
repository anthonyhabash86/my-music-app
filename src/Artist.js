import React, {Component} from "react";
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddArtistModal } from "./AddArtistModal";
import { EditArtistModal } from "./EditArtistModal";



export class Artist extends Component {

    constructor(props){
        super(props);
        this.state={artists:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API + 'artist')
        .then(response=>response.json())
        .then(data => {
            this.setState({artists:data})
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(state, prevState){
        if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {            
            this.refreshList();
          }
    }

    deleteArtist(ArtistID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'artist/' + ArtistID,{
                method: 'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            }).then(this.refreshList())
        }
    }

    render() {
        const {artists, artistID, artistName, artistActiveYearStart, artistActiveYearEnd}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Career Span</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artists.map(artist=>
                            <tr key={artist.ArtistID}>
                                <td>{artist.Name}</td>
                                <td>{artist.CareerSpan}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true
                                                                    ,artistID:artist.ArtistID
                                                                    ,artistName:artist.Name
                                                                    ,artistActiveYearStart:artist.ActiveYearStart
                                                                    ,artistActiveYearEnd:artist.ActiveYearEnd})}>
                                        Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteArtist(artist.ArtistID)}>
                                        Delete
                                        </Button>

                                        <EditArtistModal show={this.state.editModalShow}
                                                        onHide={editModalClose}
                                                        artistID={artistID}
                                                        artistName={artistName}
                                                        artistActiveYearStart={artistActiveYearStart}
                                                        artistActiveYearEnd={artistActiveYearEnd}/>
                                    </ButtonToolbar>

                                </td>
                            </tr> )}    
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary"
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Artist</Button>

                        <AddArtistModal show={this.state.addModalShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}