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