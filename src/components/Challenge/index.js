import React from 'react';


import { Container } from './styles';

function Challenge({ handleChallenge, challengeValue, setChallengeValue }) {

  return (
        <Container>
            <strong>A challenge code is required to retrieve Owners data</strong>
            <div>
                <input 
                    type="text"
                    placeholder="******" 
                    value={challengeValue} 
                    onChange={(event) => setChallengeValue(event.target.value)}
                    onKeyPress={(event) => { event.key === 'Enter' && handleChallenge()}}
                />
                <button type="button" onClick={() => handleChallenge()}><span>Challenge</span></button>
            </div>
        </Container>
    );
}

export default Challenge;