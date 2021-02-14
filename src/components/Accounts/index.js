import React, { useEffect, useState } from 'react';

import { api } from '../../services/api';

import { Container, Title, Account, Items, Value } from './styles';
import Challenge from '../Challenge';

function Accounts({ link_id, live }) {
const [accounts, setAccounts] = useState([]);
const [needChallenge, setNeedChallenge] = useState(false);
const [challengeValue, setChallengeValue] = useState('');
const [session, setSession] = useState('');

const retrieveAccounts = async () => {
    try {
        const responseRetrieve = await api.post(
            `/accounts/retrieve/`, 
            { link: link_id },
            { headers: { mode: !live ? 'sandbox' : 'live' } }
        );

        setAccounts(responseRetrieve.data.results ? responseRetrieve.data.results : responseRetrieve.data);
        
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(!needChallenge);
            setSession(err.response.data[0].session);
        }else{
            alert('Cannot load data from Accounts');
            console.log(err);
        }
    }
}

const handleChallenge = async () => {
    try {
        const responseChallenge = await api.patch(
            `/accounts/resume/`,
            { 
                session: session,
                token: challengeValue,
                link: link_id,
             },
             { headers: { mode: !live ? 'sandbox' : 'live' } }
        );

        setAccounts(responseChallenge.data.results ? responseChallenge.data.results : responseChallenge.data);
        setNeedChallenge(!needChallenge)
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(!needChallenge);
        }else{
            alert('Cannot load data from Accounts');
            console.log(err);
        }
    }
}

useEffect(() => {
    retrieveAccounts();
}, [])
  return (
    <Container>
        <Items toggle={needChallenge}>
            <Title>
                <strong>Account Info</strong>
            </Title>
            {!needChallenge ? (
                accounts.map(account => (
                    <Account key={account.id}>
                        <Value><strong>ID: </strong><span>{account.id}</span></Value>
                        <Value><strong>Account Name: </strong><span>{account.name}</span></Value>
                        <Value><strong>Account Number: </strong><span>{account.number}</span></Value>
                        <Value><strong>Currency: </strong><span>{account.currency}</span></Value>
                        <Value><strong>Total Balance: </strong><span>{account.balance.current}</span></Value>
                        <Value><strong>Available Balance: </strong><span>{account.balance.available}</span></Value>
                    </Account>
                ))
            ):
                <Challenge 
                    handleChallenge={() => handleChallenge()}
                    challengeValue={challengeValue}
                    setChallengeValue={(event) => setChallengeValue(event)}
                />
            }
        </Items>
    </Container>
  );
}

export default Accounts;