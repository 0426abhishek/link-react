import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropDownComponent = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(props.value);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  function handleChangeId(event) {
    if(props.value === 'MaxTransactionId'){
        props.handleChangeId(event.target.value); 
    }else{
        props.handleChangeMinId(event.target.value); 
    }
    setDropdownValue(event.target.value);
  }
  return (
    <Dropdown direction="left" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {dropdownValue}
      </DropdownToggle>
      <DropdownMenu>
        {
        props.data.map((response, index) => {
            return (<DropdownItem key={index + response.sales_reference} onClick={ handleChangeId } value={response.sales_reference}>{response.sales_reference}</DropdownItem >)
      })
      }
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropDownComponent;