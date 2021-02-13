import React, { useEffect } from 'react';

import { api } from '../../services/api';
import history from '../../services/history'

import { Container } from './styles';

function Control({link_id}) {
const destroyLink = async () => {
    await api.delete(
        `/links/destroy/${link_id}`, 
        { headers: { mode: 'sandbox' } }
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