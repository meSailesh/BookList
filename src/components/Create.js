import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firbase';
import { Link } from 'react-router-dom';
import {Form, Card, Container, Row, FormControl, FormGroup, FormLabel, Button, Spinner} from 'react-bootstrap'

class Create extends Component {
    constructor(){
        super();
        this.ref= firebase.firestore().collection('boards');
        this.state = {
            title: '',
            description: '',
            author: ''
        };
    }
    onChange = (e) =>{
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    onSubmit = (e) => {
        
        e.preventDefault();
    
        const { title, description, author } = this.state;
    
        this.ref.add({
          title,
          description,
          author
        }).then((docRef) => {
          this.setState({
            title: '',
            description: '',
            author: ''
          });
          this.props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
    render() {
        const {title, description, author} = this.state;
        return (
            <Container  className="main-content">
            
            <Row>
              <Card className="content">
                 <Card.Body>
                   <Card.Title style={{textAlign:"center"}}><h3> ADD BOARD</h3></Card.Title>
                   <h4><Link to="/"  className="btn btn-primary">Book List</Link></h4>
                   <Form onSubmit ={this.onSubmit}>
                       <FormGroup>
                           <FormLabel>Title:</FormLabel>
                           <FormControl type="text" name="title" value={title} onChange={this.onChange} placeholder="Title" />
                       </FormGroup>

                       <FormGroup>
                           <FormLabel>Description:</FormLabel>
                           <FormControl as="textarea" rows="3" cols="80" name="description" onChange={this.onChange} value={description} placeholder="Description" />
                       </FormGroup>

                       <FormGroup>
                           <FormLabel>Author:</FormLabel>
                           <FormControl type="text" name="author" value={author} onChange={this.onChange} placeholder="Author" />
                       </FormGroup>

                       <Button variant="success" type="submit">
                            Submit
                        </Button>
                   </Form>
                 </Card.Body>
              </Card>
            </Row>
          </Container>
        );
    }
}

export default Create;