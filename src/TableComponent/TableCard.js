import React, {Component} from 'react';
import axios from '../hoc/axios-instance';
import {
    Table, Card, CardHeader, CardBody,Button,CardTitle,Input
} from 'reactstrap';
import NoRecord from '../NoRecord/NoRecord';
import HOC from '../hoc/hoc';
import DropDownComponent from '../DropDownComponent/DropDownComponent';
export default class TableCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: [],
            MaxId: '',
            MinId: '',
            missingTransactionValue: []
        }
    };
    /**
     * Loading all thne transaction value.
     */
    componentDidMount = () => {
        axios.get('transactions/').then((response) => {
            if (response.data.response.length === 0) {
                this.setState({
                response: []
                });
            }
            else {
                this.setState({
                    response: response.data.response
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }
    handleChangeId = (changeValue) => {
        this.setState({MaxId: changeValue});
    }
    handleChangeMinId = (changeValue) => {
        this.setState({MinId: changeValue});
    }
    /**
     * Adding the missing value of transactionId
     */
    submitIdValue = (transactionId) => {
        const data = {};
        let amount = document.getElementById(transactionId).value;
        data['amount'] = amount;
        data['sales_reference'] = transactionId;
        axios.post('transactions/', data).then((response) => {
            let array = [...this.state.missingTransactionValue]; // make a separate copy of the array
            let index = array.indexOf(transactionId)
            if (index !== -1) {
              array.splice(index, 1);
              this.setState({
                missingTransactionValue: array
        });
    }
     alert(`Amount ${amount} is added to transactionId ${transactionId}`);
    }).catch(error => {
            console.log(error);
        })
    }
    /**
     * Finding the missing transaction id.
     */
    getMissingList = () => {
           let missingValue = [];
           for(let i = this.state.MaxId; i > this.state.MinId; i--) {
                if (this.state.response.filter(item=> item.sales_reference == i).length === 0){
                    missingValue.push(i);
                }
           }
            this.setState({
                        missingTransactionValue: missingValue
                });
        }
    render() {
        if (this.state.response.length === 0) {
            return (

<NoRecord />);
        }
        else {
            return(            

<HOC>
	<Card>
		<CardHeader>
			<h1> Transaction Details </h1>
		</CardHeader>
		<CardBody>
			<CardTitle>
				<DropDownComponent data={this.state.response} value="MaxTransactionId" handleChangeId={this.handleChangeId}/>
			</CardTitle>
			<CardTitle>
				<DropDownComponent data={this.state.response} value="MinTransactionId" handleChangeMinId={this.handleChangeMinId}/>
			</CardTitle>
			<CardTitle>
				<Button color="primary" onClick={this.getMissingList}>Click</Button>
			</CardTitle>
			<CardTitle></CardTitle>
            {
                this.state.missingTransactionValue.length > 0 ? (
			<div>
				<h1> Transaction Range From {this.state.MaxId} To {this.state.MinId}</h1>
				<Table bordered>
					<thead>
						<tr>
							<th>Missing transactions List</th>
						</tr>
					</thead>
					<tbody>
                        { this.state.missingTransactionValue.map(transactionId  => (
                        
						<tr>
							<td>{ transactionId }
                    
								<span>
									<Input  className="w-25" type="Number"  placeholder='Enter Amount' id = {transactionId}/>
								</span>
								<br/>
								<span>
									<Button  color="success" size="sm" onClick={() => this.submitIdValue(transactionId)}>Save</Button>
								</span>
							</td>
						</tr> 
                   )
                )
                } 
                    
					</tbody>
				</Table>
			</div>
                    )  : ''
            }
            
			<CardTitle></CardTitle>
			<Table bordered>
				<thead>
					<tr>
						<th>Created_at</th>
						<th>Sales_reference</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
    { this.state.response.map(responseData => (
				
					<tr>
						<td>
            {responseData.created_at}
          </td>
						<td>
            {responseData.sales_reference}
          </td>
						<td>
            {responseData.amount}
          </td>
					</tr> 
        )
      )}
			
				</tbody>
			</Table>
		</CardBody>
	</Card>
</HOC>
) 
}
}
}