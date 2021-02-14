import React, { useEffect, useState } from 'react';

import { api } from '../../services/api';

import { Container, Title, Items, Value } from './styles';
import Challenge from '../Challenge';


function Owners({ link_id, live }) {
const [owners, setOwners] = useState([]);
const [needChallenge, setNeedChallenge] = useState(false);
const [challengeValue, setChallengeValue] = useState('');
const [session, setSession] = useState('');

const retrieveOwners = async () => {
    try {
        const responseRetrieve = await api.post(
            `/owners/retrieve/`, 
            { link: link_id },
            { headers: { mode: !live ? 'sandbox' : 'live' } }
        );
        
        setOwners(responseRetrieve.data.results ? responseRetrieve.data.results : responseRetrieve.data);

    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(!needChallenge);
            setSession(err.response.data[0].session);
        }else{
            alert('Cannot load data from Owners');
            console.log(err);
        }
    }
}

const handleChallenge = async () => {
    try {
        const responseChallenge = await api.patch(
            `/owners/resume/`,
            { 
                session: session,
                token: challengeValue,
                link: link_id,
             },
             { headers: { mode: !live ? 'sandbox' : 'live' } }
        );

        setOwners(responseChallenge.data.results ? responseChallenge.data.results : responseChallenge.data);
        setNeedChallenge(!needChallenge)
    } catch(err){
        if(err.response.status === 428){
            console.log("needs challenge code");
            setNeedChallenge(!needChallenge);
        }else{
            alert('Cannot load data from Owners');
            console.log(err);
        }
    }
}

useEffect(() => {
    retrieveOwners();
}, [])

  return (
      <Container>
          <Items>
            <Title>
                <strong>Owner Info</strong>
            </Title>
                {!needChallenge ? (
                    owners.map(owner => (
                        <div key={owner.id}>
                            <Value><strong>ID: </strong><span>{owner.id}</span></Value>
                            <Value><strong>Name: </strong><span>{owner.display_name}</span></Value>
                            <Value><strong>Total accounts: </strong><span>{owner.accounts.length}</span></Value>
                            <Value><strong>Email: </strong><span>{owner.email}</span></Value>
                            <Value><strong>Phone: </strong><span>{owner.phone_number}</span></Value>
                            <Value><strong>Address: </strong><span>{owner.address}</span></Value>
                        </div>
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

export default Owners;