import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { TamboonCard } from './components';

import { summaryDonations } from './helpers';
import { fetchCharities, fetchPayments, postPayment } from './store/appSlicer';
import { DONATE_AMOUNT } from './enum';

const App = () => {
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAppData();
  }, []);

  const getDotation = (paymentTransactions = []) => {
    return summaryDonations(paymentTransactions.map((item) => item.amount));
  };

  const fetchAppData = async () => {
    dispatch(fetchCharities());
    dispatch(fetchPayments());
  };

  function handlePay(selectCharity = {}, selectAmount) {
    const { id, currency } = selectCharity;

    const data = {
      charitiesId: id,
      amount: selectAmount,
      currency,
    };

    const onSuccess = () => {
      toast('Donate success');
    };

    const param = {
      data,
      cb: {
        onSuccess,
      },
    };

    dispatch(postPayment(param));
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
