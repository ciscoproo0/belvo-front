import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  color: #575757;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  height: 60px;
  padding: 30px;

  span {
      font-weight: bold;
      color: #575757;
  }

  button {
    color: #fff;
    border: 1px solid #eee;
    background: #d4554c;
    height: 30px;
    width: 70px;
    border-radius: 4px;
    padding: 2px;

    span {
      font-weight: bold;
      color: #fff;
  }
  }
`;
