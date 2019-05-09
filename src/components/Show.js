import React, { Component } from 'react';
import firebase from '../Firbase';
import { Link } from 'react-router-dom';
import {Container, Row, Card, Button, Spinner} from 'react-bootstrap'
class Show extends Component {
    constructor(props){
        super(props);
        this.state = {
            book: {},
            key: '',
            loading:true
        };
    }
    componentDidMount(){
        const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if(doc.exists){
                this.setState({
                    book: doc.data(),
                    key:doc.id,
                    loading:false
                    });
            }
            else{
                console.log("No such document!");
            }
        });
    }
    delete(id){
        firebase.firestore().collection('boards').doc(id).delete().then(() =>{
            console.log("Document successfully deleted!");
            this.props.history.push("/")
        }).catch((error) =>{
            console.error("error removing document:", error);
        })
    }
    render() {
        if(!this.state.loading){
        return (
            <Container  className="main-content" >
                <Row>
                    <Card className="content">
                    <Card.Body>
                    <Card.Title style={{textAlign:"center"}}><h3> {this.state.book.title}</h3></Card.Title>
                   <h4><Link to="/"  className="btn btn-primary">Book List</Link></h4>
                   <dl>
                       <dt>Description:</dt>
                       <dd>{this.state.book.description}</dd>
                       <dt>Author:</dt>
                       <dd>{this.state.book.author}</dd>
                   </dl>
                   <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>
                   &nbsp;
                   <Button
                   variant="danger"
                   onClick={this.delete.bind(this, this.state.key)}>Delete</Button>
                    </Card.Body>
                    </Card>
                </Row>
            </Container>        );
    }
            else{
                return(    
                  <div className="spinner-container">
                <Spinner animation="grow" />
                </div>
                )
            
              }
    }
}

export default Show;