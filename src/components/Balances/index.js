import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { api } from '../../services/api';

import { Container, Chart, Title, DateRange, Wrap } from './styles';
import Challenge from '../Challenge';

function Balances({ link_id, live }) {
const [balances, setBalances] = useState([]);
const [data, setData] = useState({});
const [needChallenge, setNeedChallenge] = useState(false);
const [challengeValue, setChallengeValue] = useState('');
const [session, setSession] = useState('');
const [dateFrom, setDateFrom] = useState('2021-01-01');
const [dateTo, setDateTo] = useState('2021-01-01');

const retrieveBalances = async () => {
    try{
        let dateValues = [];
        let balanceValues = [];
        let parseDateFrom = new Date(dateFrom).toISOString();
        let parseDateTo = new Date(dateTo).toISOString();
        const responseRetrieve = await api.post(
            `/balances/retrieve/`, 
            { 
                link: link_id,
                date_from: parseDateFrom.split("T")[0],
                date_to: parseDateTo.split("T")[0]
            },
            { headers: { mode: !live ? 'sandbox' : 'live' } }
        );

        for ( let dataObj of responseRetrieve.data ){
            dateValues.push(dataObj.value_date);
            balanceValues.push(dataObj.current_balance)
        };
        setNeedChallenge(false);
        setBalances(responseRetrieve.data.results ? responseRetrieve.data.results : responseRetrieve.data);
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
            setNeedChallenge(true);
            setSession(err.response.data[0].session);
        }else{
            alert('Cannot load data from Balances');
            console.log(err);
        }
    }
}

const handleChallenge = async () => {
    let dateValues = [];
    let balanceValues = [];
    try {
        const responseChallenge = await api.patch(
            `/balances/resume/`,
            { 
                session: session,
                token: challengeValue,
                link: link_id,
             },
             { headers: { mode: !live ? 'sandbox' : 'live' } }
        );

        setBalances(responseChallenge.data.results ? responseChallenge.data.results : responseChallenge.data);

        for ( let dataObj of responseChallenge.data ){
            dateValues.push(dataObj.value_date);
            balanceValues.push(dataObj.current_balance)
        };

        setNeedChallenge(false)
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
            setNeedChallenge(true);
            setSession(err.response.data[0].session);
        }else{
            alert('Cannot load data from Balances');
            console.log(err);
        }
    }
}

useEffect(() => {
    retrieveBalances();
}, [dateTo])

  return (
    <Container>
        <Chart>
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
                        onChange={(event) => setDateTo(event.target.value)} 
                    />
                </label>
            </DateRange>
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