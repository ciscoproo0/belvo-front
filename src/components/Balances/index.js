import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { api } from '../../services/api';

import { Container, Chart, Title, Wrap } from './styles';
import Challenge from '../Challenge';

function Balances({link_id}) {
const [balances, setBalances] = useState([]);
const [data, setData] = useState({});
const [needChallenge, setNeedChallenge] = useState(false);
const [challengeValue, setChallengeValue] = useState('');
const [session, setSession] = useState('');

const retrieveBalances = async () => {
    try{
        let dateValues = [];
        let dateParsing = '';
        let balanceValues = [];
        const responseRetrieve = await api.post(
            `/balances/retrieve/`, 
            { 
                link: link_id,
                date_from: "2021-01-01",
                date_to: "2021-01-02"
            },
            { headers: { mode: 'sandbox' } }
        );

        for ( let dataObj of responseRetrieve.data ){
            dateParsing = new Date(dataObj.collected_at);
            dateValues.push(`${dateParsing.getDate()}/${dateParsing.getMonth()}/${dateParsing.getFullYear()} at ${dateParsing.getHours()}:${dateParsing.getMinutes()}`);
            balanceValues.push(dataObj.current_balance)
        };

        setBalances(responseRetrieve.data);
        setData({
            labels: dateValues,
            datasets: [{
                label: 'Balance',
                data: balanceValues,
                backgroundColor: '#2173fb',
            }],
        })
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(!needChallenge);
            setSession(err.response.data[0].session);
        }else{
            alert('Cannot load data from Balances');
        }
    }
}

const handleChallenge = async () => {
    let dateValues = [];
    let dateParsing = '';
    let balanceValues = [];
    try {
        const responseChallenge = await api.patch(
            `/balances/resume/`,
            { 
                session: session,
                token: challengeValue,
                link: link_id,
             },
             { headers: { mode: "sandbox" } }
        );

        setBalances(responseChallenge.data);
        setBalances(responseChallenge.data);

        for ( let dataObj of responseChallenge.data ){
            dateParsing = new Date(dataObj.collected_at);
            dateValues.push(`${dateParsing.getDate()}/${dateParsing.getMonth()}/${dateParsing.getFullYear()} at ${dateParsing.getHours()}:${dateParsing.getMinutes()}`);
            balanceValues.push(dataObj.current_balance)
        };

        setBalances(responseChallenge.data);
        setData({
            labels: dateValues,
            datasets: [{
                label: 'Balance',
                data: balanceValues,
                backgroundColor: '#2173fb',
            }],
        })
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(!needChallenge);
            setSession(err.response.data[0].session);
        }else{
            alert('Cannot load data from Balances');
        }
    }
}

useEffect(() => {
    retrieveBalances();
}, [balances])

  return (
    <Container>
        <Chart>
            <Title>
                <strong>Balance Info</strong>
            </Title>
            {!needChallenge ? (
                <Line 
                    data={data}
                    height={80}
                    options={{
                        legend: {
                            display: false
                        },
                    }}
            />
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
        </Chart>
    </Container>
  );
}

export default Balances;