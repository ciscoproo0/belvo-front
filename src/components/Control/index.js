import React, { useEffect } from 'react';

import { api } from '../../services/api';
import history from '../../services/history'

import { Container } from './styles';

function Control({ link_id, live }) {
const destroyLink = async () => {
    await api.delete(
        `/links/destroy/${link_id}`, 
        { headers: { mode: !live ? 'sandbox' : 'live' } }
    );

    history.push('/');
}


useEffect(() => {
}, [])
  return (
      <Container>
          <span>Link ID: {link_id}</span>
          <button onClick={() => destroyLink()} type="button"><span>Destroy</span></button>
      </Container>
  );
}

export default Control;