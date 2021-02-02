import React, { Component } from 'react';
import {
   Container,Row,Col
} from 'reactstrap';
import './App.css';
import TableCard from './TableComponent/TableCard';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        response: [],
    }
 };
  /**
   * Main file where containet and table card will load.
   */
  render() {
    return (
      <Container>
      <Row>
        <Col>
        <TableCard/>
        </Col>
        </Row>
        </Container>
    )
  }
}
