import React from 'react';
import styled from 'styled-components';

import { TamboonCard } from './components';

import { useAppHook } from './hooks/appHook';
import { groupDonations } from './helper/utils';
import { toast } from './helper/toast';
import { DONATE_AMOUNT_CHOICE } from './enum';

const App = () => {
  const { state: appState, action } = useAppHook();

  const groupDonate = groupDonations(appState?.payments);

  function handlePay(selectCharity = {}, selectAmount) {
    const { id, name, currency } = selectCharity;

    const param = {
      data: {
        charitiesId: id,
        amount: selectAmount,
        currency,
      },
      cb: {
        onSuccess: () => {
          toast.success({
            title: 'Donate Successful ❤️',
            content: `You donation ${selectAmount} ${currency} to ${name}`,
          });
        },
        onPending: () => {
          toast.info('Processing . . .');
        },
        onError: () => {
          toast.error({
            title: 'Something went wrong 🤕',
            content: `transaction ${selectAmount} ${currency} to ${name} was cancelled`,
          });
        },
      },
    };

    action.donate(param);
  }

  return (
    <AppLayout>
      <Header>Omise Tamboon React</Header>
      <Layout>
        {appState?.charities?.map((charity, i) => {
          const totalCharityDonated = groupDonate[charity.id] || [0];
          return (
            <TamboonCard
              key={charity.id}
              payments={DONATE_AMOUNT_CHOICE}
              item={charity}
              total={totalCharityDonated}
              handlePay={handlePay}
            />
          );
        })}
      </Layout>
    </AppLayout>
  );
};

export default App;

const AppLayout = styled.div`
  margin: 24px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  /* Styles for tablets and desktops */
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

const Header = styled.h1`
  color: #525252;
  text-align: center;

  margin: 12px 0;
`;
