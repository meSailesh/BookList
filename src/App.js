import React, {Component} from 'react';
import './App.css';
import firebase from './Firbase';
import { Link } from 'react-router-dom';
import {Container, Row, Card, Table, Spinner} from 'react-bootstrap'
class App extends Component {
  constructor(props){
    super(props)
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state={
      books:[],
      loading: true
    }
  }
  onCollectionUpdate = (querySnapshot) => {
    const books =[];
    querySnapshot.forEach((doc) =>{
      
      const { title, description, author } = doc.data();
      books.push({
      key: doc.id,
      doc,
      title,
      description,
      author
    });
  });
    this.setState({
      books,
      loading:false
    })
    console.log(this.state.books)
  }
  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  render(){
    
    if(!this.state.loading){
  return (
    <Container className="main-content">
      <Row>
        <Card className="content">
           <Card.Body>
             <Card.Title style={{textAlign:"center"}}><h3>BOOK LIST</h3></Card.Title>
             <h4><Link to="/create" className="btn btn-primary">Add Book</Link></h4>
             <Table striped bordered hover>
             <thead>
               <tr>
                 <th>Title</th>
                 <th>Description</th>
                 <th>Author</th>
               </tr>
             </thead>
             <tbody>
               {this.state.books.map(book =>
                <tr>
                  <td><Link to={`/show/${book.key}`}>{book.title}</Link></td>
                  <td>{book.description}</td>
                  <td>{book.author}</td>
                </tr>)}
             </tbody>
             </Table>
           </Card.Body>
        </Card>
      </Row>
    </Container>
  );
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

export default App;
