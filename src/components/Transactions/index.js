import React, { useEffect, useState } from 'react';

import { api } from '../../services/api';

import { Container, DateRange, Title, Table, Wrap } from './styles';
import Challenge from '../Challenge';

function Transactions({ link_id, live }) {
const [transactions, setTransactions] = useState([]);
const [needChallenge, setNeedChallenge] = useState(false);
const [challengeValue, setChallengeValue] = useState('');
const [session, setSession] = useState('');
const [dateFrom, setDateFrom] = useState('2021-01-01');
const [dateTo, setDateTo] = useState('2021-01-01');

const retrieveTransactions = async () => {
    let parseDateFrom = new Date(dateFrom).toISOString();
    let parseDateTo = new Date(dateTo).toISOString();
    try {
    const responseRetrieve = await api.post(
        `/transactions/retrieve/`, 
        { 
            link: link_id,
            date_from: parseDateFrom.split("T")[0],
            date_to: parseDateTo.split("T")[0]
        },
        { headers: { mode: !live ? 'sandbox' : 'live' } }
    );

    setTransactions(responseRetrieve.data.results ? responseRetrieve.data.results : responseRetrieve.data);
    setNeedChallenge(false);
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(true);
            setSession(err.response.data[0].session);
        }else{
            alert('Cannot load data from Transactions');
            console.log(err);
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
             { headers: { mode: !live ? 'sandbox' : 'live' } }
        );

        setTransactions(responseChallenge.data.results ? responseChallenge.data.results : responseChallenge.data);
        setNeedChallenge(false)
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(true);
        }else{
            alert('Cannot load data from Transactions');
            console.log(err);
        }
    }
}

useEffect(() => {
    retrieveTransactions();
}, [dateTo])

  return (
      <Container>
        <Title>
            <DateRange>
                <label><span>From:</span>
                    <input 
                        type="date"
                        placeholder="01-01-2021"
                        value={dateFrom}
                        onChange={(event) => setDateFrom(event.target.value)}    
                    />
                </label>
                <label><span>to:</span>
                    <input 
                        type="date"
                        placeholder="01-01-2021"
                        value={dateTo}
                        onChange={(event) => { setDateTo(event.target.value); setNeedChallenge(!needChallenge) }} 
                    />
                </label>
            </DateRange>
            <strong>Transaction Info</strong>
        </Title>
            {!needChallenge ? (       
        <Table>
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