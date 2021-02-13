import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;

    strong {
        margin: 15px;
        font-size: 28px;
        color: #575757;
    }

    ::after {
        margin: 20px;
    }
`;

export const Account = styled.div`
    width: 280px;
    margin: 5px;
    border: 1px solid #ddd;
    padding: 5px;
    border-radius: 4px;
`;

export const Items = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  flex-flow: row wrap;
  /* flex-flow: row wrap; */
  /* flex-grow: 1; */
  /* flex-shrink: 2; */
  justify-content: ${props => props.toggle ? 'center' : 'none'};
  align-items: ${props => !props.toggle ? 'center' : 'none'};
  width: 100%;
  margin:10px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 1px 1px 1px 1px #ddd;
  padding-bottom: 20px;
  
`;

export const Value = styled.div`
  margin: 3px;
  strong {
    color: #575757;
  }
`;
