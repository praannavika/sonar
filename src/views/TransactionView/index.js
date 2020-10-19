import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCreditCards, fetchTransactions } from '../../actions/creditCardAction'
import CreditCard from '../CreditCardView/component/CreditCard'
import TransactionsView from './component/TransactionsView';

const PAGE = ['creditCards', 'transactions']

class ListCreditCardsAsButton extends Component {

    componentDidMount() {
        this.props.getAllCreditCards()
    }

    render() {

        let { currPage } = this.props;
        let mainContent

        switch (PAGE[currPage]) {
            case 'creditCards':
                let { creditCards } = this.props
                if (creditCards instanceof Array && creditCards.length > 0) {
                    mainContent = creditCards.map(c =>
                        <div className="grid-list" onClick={() => this.props.getAllTransactions(c.creditCardNo)}>
                            <CreditCard key={c.id} creditCard={c} />
                        </div>
                    )
                } else {
                    mainContent = (
                        <div className="d-flex justif-content-center align-items-center">
                            <h4>Please upload a credit card</h4>
                        </div>
                    )
                }
                break

            case 'transactions':
                let { transactions } = this.props
                mainContent = (
                    <TransactionsView transactions={transactions} />
                )
                break

        }

        return (
            <div className="sidebar-offset">
                {mainContent}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        creditCards: state.creditCardReducer.creditCards,
        currPage: state.creditCardReducer.currPage
    }
}

const mapDispatchToProps = {
    getAllCreditCards: fetchCreditCards,
    getAllTransactions: fetchTransactions
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCreditCardsAsButton);