import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NavDesign = styled.div`
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 999;
`;
export const NavInner = styled.div`
  display: flex;
  flex: 1;
  max-width: 1140px;
  min-width: 320px;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  @media (max-width: 500px) {
    height: 70px;
  }
`;
export const StyledLogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 18px;
`;
export const StyledImg = styled.img`
  margin-top: 3px;
  height: 60px;
`;
export const StyledLogo = styled.div`
  color: #4e4e4e;
  margin-right: 10px;
  font-weight: bold;
  @media (max-width: 600px) {
    display: none;
  }
`;
export const SchoolNameUni = styled.div`
  color: #4e4e4e;
  margin-right: 5px;
  @media (max-width: 740px) {
    display: none;
  }
`;
export const SchoolName = styled.div`
  color: #4e4e4e;
  margin-right: 5px;
  @media (max-width: 670px) {
    display: none;
  }
`;
export const WideNavigation = styled.div`
  z-index: 999;
  @media (max-width: 560px) {
    display: none;
  }
`;
export const NavigationWapper = styled.div`
  position: sticky;
`;
export const ShortNavigation = styled(motion.nav)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  @media (min-width: 560px) {
    display: none;
  }
`;

export const StyledLink = styled(motion.div)`
  text-decoration: none;
  list-style: none;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
  &:hover {
    color: #4e5968;
    background: #f2f4f6;
    text-decoration: none;
  }
`;

export const NavTask = styled.li`
  display: flex;
  align-items: center;
  margin: 0px 5px;
  cursor: pointer;
  color: #4e5968;
  font-size: 16px;
  font-style: normal;
  word-break: keep-all;
  list-style: none;
  text-decoration: none;
  border-radius: 8px;
`;

export const NavTaskWrapper = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding-left: 0px;
`;
export const NavIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  padding: 7px 7px;
  border-radius: 10px;
  transition-delay: 0.05s;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  :hover {
    background: #f2f4f6;
    cursor: pointer;
  }
`;
