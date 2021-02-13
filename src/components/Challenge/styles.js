import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  border: 1px solid #ddd;
  margin: 10px;
  padding: 10px;
  border-radius: 4px;
  color: #575757;

  div {
    align-self: center;
    margin: 10px;
    padding:5px;

    input {
      height: 30px;
      border-radius: 4px;
      border: 1px solid #ddd;
      padding: 10px;
      margin-right: 10px;
      color: #999;
      width: 200px;
    }

    button {
      height: 30px;
      border-radius: 4px;
      border: none;
      padding: 8px;
      color: #fff;
      background: #2173fb;
    }
  }
`;
