import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firbase';
import { Link } from 'react-router-dom';
import {Form, Card, Container, Row, FormControl, FormGroup, FormLabel, Button, Spinner} from 'react-bootstrap'

class Edit extends Component {
    constructor(props){
        super(props);
        this.state={
            key: '',
            title: '',
            description:'',
            author:'',
            loading:true,
        };
    }
    componentDidMount(){
        const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
        ref.get().then((doc) =>{
            if(doc.exists){
                const book = doc.data();
                this.setState({
                    key: doc.id,
                    title: book.title,
                    description: book.description,
                    author: book.author,
                    loading:false
                });
            } 
            else{
                console.log("No such document!")
            }
        })
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }

      onSubmit = (e) => {
        e.preventDefault();
    
        const { title, description, author } = this.state;
    
        const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
        updateRef.set({
          title,
          description,
          author
        }).then((docRef) => {
          this.setState({
            key: '',
            title: '',
            description: '',
            author: '',
          
          });
          this.props.history.push("/show/"+this.props.match.params.id)
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }

      
    render() {
     
    if(!this.state.loading){
        return (
            <Container  className="main-content" >
            <Row>
              <Card className="content">
                 <Card.Body>
                   <Card.Title style={{textAlign:"center"}}><h3> Edit Book</h3></Card.Title>
                   <h4><Link to={`/show/${this.state.key}`}  className="btn btn-primary">Book List</Link></h4>
                   <Form onSubmit ={this.onSubmit}>
                       <FormGroup>
                           <FormLabel>Title:</FormLabel>
                           <FormControl type="text" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
                       </FormGroup>

                       <FormGroup>
                           <FormLabel>Description:</FormLabel>
                           <FormControl as="textarea" rows="3" cols="80" name="description" onChange={this.onChange} value={this.state.description} placeholder="Description" />
                       </FormGroup>

                       <FormGroup>
                           <FormLabel>Author:</FormLabel>
                           <FormControl type="text" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
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
    }else{
        return(    
            <div className="spinner-container">
          <Spinner animation="grow" />
          </div>
          )
    }
    }
}

export default Edit;