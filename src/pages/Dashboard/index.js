import React, { useEffect } from 'react';

import { Container, Head, GeneralInfo, BalanceInfo, TransactionInfo } from './styles';

import Owners from '../../components/Owners';
import Accounts from '../../components/Accounts';
import Transactions from '../../components/Transactions';
import Balances from '../../components/Balances';
import Control from '../../components/Control';


function Dashboard({ location: { state }}) {
  const { link_id, live } = state;

  useEffect(() => {
  }, [])
  return (
      <Container>
        <Head>
          <Control link_id={link_id} live={live}></Control>
        </Head>
        <GeneralInfo>
          <Owners link_id={link_id} live={live}></Owners>
          <Accounts link_id={link_id} live={live}></Accounts>
        </GeneralInfo>
        <BalanceInfo>
          <Balances link_id={link_id} live={live}></Balances>
        </BalanceInfo>
        <TransactionInfo>
          <Transactions link_id={link_id} live={live}></Transactions>
        </TransactionInfo>
      </Container>
  );
}

export default Dashboard;