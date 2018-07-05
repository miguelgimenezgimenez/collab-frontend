import React, { Component } from 'react';
import './TransactionList.css';
import PropTypes from 'prop-types'; // ES6

class TransactionList extends Component {

  filterDuplicatedTransactions = (transactions) => {
    const filteredTransactions = [];

    filteredTransactions.push(transactions[0]);
    transactions = transactions.slice(1, transactions.length);

    transactions.forEach(trans => {
      filteredTransactions.forEach(fTrans => {
        if (trans.transaction_str !== fTrans.transaction_str
          && trans.type !== fTrans.type) filteredTransactions.push(trans);
      });
    });

    //this works, but still some transaction are received badly from server.
    return filteredTransactions;
  }

  render() {
    if (this.props.wallet.transactions.length < 1) return <h3 id='transactions-no'>No transactions yet</h3>;
    return (
      <div className='TransactionList'>
        <div className='TransactionList-title'>
          <p>Transactions</p>
          <div className='TransactionList-keys'>
            <p id='amount'>Amount</p>
            <p id='date'>Date</p>
            <p id='id'>Transaction ID</p>
            <p id='type'>Direction</p>

          </div>
        </div>
        {this.filterDuplicatedTransactions(this.props.wallet.transactions).map(transaction => {
          return (
            <div className='transaction' key={transaction.transaction_str+Math.random()}> {/*change this*/}
              <p>
                <span>{transaction.amount/100000000} BTC</span>
                <span>{transaction.date.slice(0,10)}</span>
                <span>{transaction.transaction_str}</span>
                <span>{transaction.type}</span>
                {/* {transaction.counter_party ? <span>{transaction.counter_party}</span> : null} */}
                {/* <span id=''>{transaction.message}</span> */}
              </p>
            </div>
          );})}
      </div>
    );
  }
}

TransactionList.propTypes = {
  wallet: PropTypes.object.isRequired,
};

export default TransactionList;
