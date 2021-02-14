import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;
`;
export const Chart = styled.div`
    margin: 10px 20px 10px;
    padding: 10px 20px 20px;
    border-radius: 4px;
    background: #fff;
`;

export const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
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

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px #ddd;
  padding-bottom: 20px;
`;

export const DateRange = styled.div`
  width: 100%;
  margin-left: 10px;

  label {
    color: #575757;
    font-weight: bold;
    font-size: 16px;
    margin-right: 10px;

    span {
      margin-right: 5px;

    }

    input {
      height: 30px;
      border: 1px solid #ddd;
      padding: 10px;
      color: #575757;
    }
  }
`;