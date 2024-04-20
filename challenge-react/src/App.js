import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';

import { TamboonCard } from './components';

import { summaryDonations } from './helpers';

export default connect((state) => state)(
  class App extends Component {
    state = {
      charities: [],
      selectedAmount: 10,
    };

    fetchCharities() {
      fetch('api/charities')
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          this.setState({ charities: data });
        });
    }

    fetchPayments() {
      fetch('api/payments')
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          this.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => item.amount)),
          });
        });
    }

    componentDidMount() {
      this.fetchCharities();
      this.fetchPayments();
    }

    render() {
      const cards = this.state.charities.map((item, i) => {
        return (
          <TamboonCard
            key={item.id}
            payments={[10, 20, 50, 100, 500]}
            item={item}
            handlePay={handlePay}
          />
        );
      });

      const style = {
        color: 'red',
        margin: '1em 0',
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
      };

      const donate = this.props.donate;
      const message = this.props.message;

      return (
        <div>
          <h1>Tamboon React</h1>
          <p>All donations: {donate}</p>
          <p style={style}>{message}</p>
          {cards}
        </div>
      );
    }
  }
);

/**
 * Handle pay button
 * 
 * @param {*} The charities Id
 * @param {*} amount The amount was selected
 * @param {*} currency The currency
 * 
 * @example
 * fetch('api/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
 */
function handlePay(id, amount, currency) {}
