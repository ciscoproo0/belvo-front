import React, { useEffect, useState } from 'react';

import { api } from '../../services/api';

import { Container, Title, Account, Items, Value } from './styles';
import Challenge from '../Challenge';

function Accounts({link_id}) {
const [accounts, setAccounts] = useState([]);
const [needChallenge, setNeedChallenge] = useState(false);
const [challengeValue, setChallengeValue] = useState('');
const [session, setSession] = useState('');

const retrieveAccounts = async () => {
    try {
        const responseRetrieve = await api.post(
            `/accounts/retrieve/`, 
            { link: link_id},
            { headers: { mode: 'sandbox' } }
        );

        setAccounts(responseRetrieve.data);
        
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(!needChallenge);
            setSession(err.response.data[0].session);
        }else{
            alert('Cannot load data from Accounts');
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
             { headers: { mode: "sandbox" } }
        );

        setAccounts(responseChallenge.data);
        console.log(responseChallenge.data)
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(!needChallenge);
        }else{
            alert('Cannot load data from Accounts');
        }
    }
}

useEffect(() => {
    retrieveAccounts();
}, [accounts])
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