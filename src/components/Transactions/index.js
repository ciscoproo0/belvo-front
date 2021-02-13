import React, { useEffect, useState } from 'react';

import { api } from '../../services/api';

import { Container, Title, Table, Wrap } from './styles';
import Challenge from '../Challenge';

function Transactions({link_id}) {
const [transactions, setTransactions] = useState([]);
const [needChallenge, setNeedChallenge] = useState(false);
const [challengeValue, setChallengeValue] = useState('');
const [session, setSession] = useState('');

const retrieveTransactions = async () => {
    try {
    const responseRetrieve = await api.post(
        `/transactions/retrieve/`, 
        { 
            link: link_id,
            date_from: "2021-01-01",
            date_to: "2021-01-02"
        },
        { headers: { mode: 'sandbox' } }
    );

    setTransactions(responseRetrieve.data);
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(!needChallenge);
            setSession(err.response.data[0].session);
        }else{
            alert('Cannot load data from Transactions');
        }
    }    
}

const handleChallenge = async () => {
    try {
        const responseChallenge = await api.patch(
            `/transactions/resume/`,
            { 
                session: session,
                token: challengeValue,
                link: link_id,
             },
             { headers: { mode: "sandbox" } }
        );

        setTransactions(responseChallenge.data);
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(!needChallenge);
        }else{
            alert('Cannot load data from Transactions');
        }
    }
}

useEffect(() => {
    retrieveTransactions();
}, [transactions])

  return (
      <Container>
        <Title>
            <strong>Transaction Info</strong>
        </Title>
            {!needChallenge ? (        <Table>
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Account Number</th>
                <th>Total Balance</th>
                <th>Total Available Balance</th>
                <th>Date of Transaction</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Description</th>
                <th>Reference</th>
                <th>Transaction Balance</th>
                <th>Transaction Status</th>
              </tr>
            </thead>
            <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>
                            <span>{transaction.account.name}</span>
                        </td>
                        <td>
                            <span>{transaction.account.number}</span>
                        </td>
                        <td>
                            <span>{transaction.account.balance.current}</span>
                        </td>
                        <td>
                            <span>{transaction.account.balance.available}</span>
                        </td>
                        <td>
                            <span>{transaction.value_date}</span>
                        </td>
                        <td>
                            <span>{transaction.amount}</span>
                        </td>
                        <td>
                            <span>{transaction.currency}</span>
                        </td>
                        <td>
                            <span>{transaction.description}</span>
                        </td>
                        <td>
                            <span>{transaction.reference}</span>
                        </td>
                        <td>
                            <span>{transaction.balance}</span>
                        </td>
                        <td>
                            <span>{transaction.status}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        ): 
        (
            <Wrap>
                <Challenge 
                handleChallenge={() => handleChallenge()}
                challengeValue={challengeValue}
                setChallengeValue={(event) => setChallengeValue(event)}
                />
            </Wrap>
        )}
      </Container>
  );
}

export default Transactions;