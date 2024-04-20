import React, { useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { TamboonCard } from './components';

import { summaryDonations } from './helpers';
import {
  setCharities,
  setPaymentTransactions,
  setSelectAmount,
} from './store/appSlicer';
import { DONATE_AMOUNT } from './enum';

const App = () => {
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAppData();
  }, []);

  const setCharitiesDispatch = (charities = []) => {
    dispatch(setCharities(charities));
  };

  const setPaymentTransactionsDispatch = (paymentTransactions = []) => {
    dispatch(setPaymentTransactions(paymentTransactions));
  };

  const setSelectAmountDispatch = (selectedAmount = 0) => {
    dispatch(setSelectAmount(selectedAmount));
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

  const handleSelect = (selectedAmount) => {
    setSelectAmountDispatch(selectedAmount);
  };

  function handlePay(selectCharity = {}) {
    const selectAmount = appState.selectAmount;

    const { id, currency } = selectCharity;

    fetch('api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        charitiesId: id,
        amount: selectAmount,
        currency,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        toast.success('donate success');
      });
  }

  const donate = getDotation(appState?.payments);
  const message = 'nice message coming soon';

  return (
    <div>
      <h1>Tamboon React</h1>
      <p>All donations: {donate}</p>
      <p>{message}</p>
      <Layout>
        {appState?.charities?.map((charity, i) => {
          return (
            <TamboonCard
              key={charity.id}
              payments={DONATE_AMOUNT}
              item={charity}
              handlePay={handlePay}
              handleSelect={handleSelect}
            />
          );
        })}
      </Layout>
    </div>
  );
};

export default App;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  /* Styles for tablets */
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Styles for desktops */
  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
