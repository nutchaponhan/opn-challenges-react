import React, { useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import { useSelector, useDispatch } from 'react-redux';

import { TamboonCard } from './components';

import { summaryDonations } from './helpers';
import { setCharities, setPaymentTransactions } from './store/appSlicer';

const App = () => {
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const setCharitiesDispatch = (charities = []) => {
    dispatch(setCharities(charities));
  };

  const setPaymentTransactionsDispatch = (paymentTransactions = []) => {
    dispatch(setPaymentTransactions(paymentTransactions));
  };

  const getDotation = (paymentTransactions = []) => {
    return summaryDonations(paymentTransactions.map((item) => item.amount));
  };

  const fetchAppData = async () => {
    const fetchCharities = fetch('api/charities').then((resp) => {
      return resp.json();
    });

    const fetchPayments = fetch('api/payments').then((resp) => {
      return resp.json();
    });

    const [charities, payments] = await Promise.all([
      fetchCharities,
      fetchPayments,
    ]);

    setCharitiesDispatch(charities);
    setPaymentTransactionsDispatch(payments);
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  const style = {
    color: 'red',
    margin: '1em 0',
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center',
  };

  const donate = getDotation(appState?.payments);
  const message = 'nice message coming soon';

  return (
    <div>
      <h1>Tamboon React</h1>
      <p>All donations: {donate}</p>
      <p style={style}>{message}</p>
      {appState?.charities?.map((item, i) => {
        return (
          <TamboonCard
            key={item.id}
            payments={[10, 20, 50, 100, 500]}
            item={item}
            handlePay={handlePay}
          />
        );
      })}
    </div>
  );
};

export default App;

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
