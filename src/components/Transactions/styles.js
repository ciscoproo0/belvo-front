import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #fff;
  border-radius: 4px;
  padding: 10px;
  margin: 30px 20px 10px;
  box-shadow: 1px 1px 1px 1px #ddd;
  padding-bottom: 20px;
`;

export const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #ddd;

    strong {
        margin: 15px;
        font-size: 28px;
        color: #575757;
    }

    ::after {
        margin: 20px;
    }
 `;

export const Table = styled.table`
  border-spacing: 0 15px;
  overflow-x: auto;
  margin: 10px;

  thead th {
    background: #eee;
    color: #575757;
    text-align: center;
    padding: 6px;
    border-radius: 4px;
  }
  tbody tr td {
    background: #fff;
    color: #575757;
    padding: 10px;
    border-radius: 4px;
    text-align: center;

  }
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  margin: 10px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 1px 1px 1px 1px #ddd;
  padding-bottom: 20px;
`;