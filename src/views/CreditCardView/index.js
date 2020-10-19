import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCreditCards } from '../../actions/creditCardAction'
import CreditCard from './component/CreditCard'

class ListCreditCards extends Component {

    componentDidMount() {
        this.props.getAllCreditCards();
    }

    render() {

        let list = null;
        let { creditCards } = this.props;
        if (creditCards instanceof Array && creditCards.length > 0) {
            list = creditCards.map(c => <CreditCard creditCard={c} key={c.id} />)
        }

        return (
            <div className="sidebar-offset">
                <div className="grid-list">
                    {list}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        creditCards: state.creditCardReducer.creditCards
    }
}

const mapDispatchToProps = {
    getAllCreditCards: fetchCreditCards
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCreditCards);