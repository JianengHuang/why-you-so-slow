import styled from 'styled-components';

const ColoredBox = styled.div`
  background-color: ${(props) => props.color};
  height: 40vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export default ColoredBox;
