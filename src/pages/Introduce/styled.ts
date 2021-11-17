import styled from 'styled-components';

export const MemberCardWrapper = styled.div`
  width: 33.33%;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  cursor: pointer;

  box-sizing: border-box;
  @media screen and (max-width: ${(props) => props.theme.windowSize.desk}px) {
    width: 33.33%;
  }
  @media screen and (max-width: ${(props) => props.theme.windowSize.tablet}px) {
    min-width: 50%;
    width: 50%;
  }
  @media screen and (max-width: 500px) {
    min-width: 100%;
    width: 100%;
  }
`;
