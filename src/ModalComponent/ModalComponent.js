import React, { useState } from 'react';
import './ModalComponent.css' 
import Table, { Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Button } from 'reactstrap';

const ModalComponent = (props) => {
  const {
    buttonLabel,
    className,
    valueList
  } = props;
  alert(valueList);
  const [modal, setModal] = useState(false);
  
  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
  <div>
    <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle} close={closeBtn}>Modal title</ModalHeader>
      <ModalBody>

      <Row className="main-container">
                <Col className="class-col">
                  <text>Abcd</text>
                </Col>
                <Col className="class-col">
                  <Input type="text"/>
                </Col>
                <Col className="class-col">
                  <Button  color="success" size="sm" >Save</Button>
                </Col>
              </Row>
      </ModalBody>
    </Modal>
  </div>
);
}

export default ModalComponent;