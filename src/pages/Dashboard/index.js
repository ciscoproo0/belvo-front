import React, { useEffect } from 'react';

import { Container, Head, GeneralInfo, BalanceInfo, TransactionInfo } from './styles';

import Owners from '../../components/Owners';
import Accounts from '../../components/Accounts';
import Transactions from '../../components/Transactions';
import Balances from '../../components/Balances';
import Control from '../../components/Control';


function Dashboard({ location: { state } }) {

  useEffect(() => {
  }, [])
  return (
      <Container>
        <Head>
          <Control link_id={state}></Control>
        </Head>
        <GeneralInfo>
          <Owners link_id={state}></Owners>
          <Accounts link_id={state}></Accounts>
        </GeneralInfo>
        <BalanceInfo>
          <Balances link_id={state}></Balances>
        </BalanceInfo>
        <TransactionInfo>
          <Transactions link_id={state}></Transactions>
        </TransactionInfo>
      </Container>
  );
}

export default Dashboard;