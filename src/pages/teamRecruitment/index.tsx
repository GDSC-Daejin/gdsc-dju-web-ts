import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  BannerWrapper,
  ContainerInner,
  LayoutContainer,
  List,
  SmallTopMargin,
  Tage,
  TopMargin,
  BannerImage,
} from '../../Layout';
import { MainText, SubTitle, Title } from '../../components/common/Title/title';
import {
  ElementWrapper,
  JoinWrapper,
  SectionWrapper,
  IntroduceWrapper,
  MinText,
  MinTitle,
} from './styled';

import yellowBanner from '../../img/YellowBanner.png';
import { StyledButton } from '../../components/common/Button/styled';
import { TeamList } from '../../hooks/teamList';
import GreenBanner from '../../img/GreenBanner.png';

export const Recuritment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const aboutTeam = TeamList.find((aboutTeam) => aboutTeam.id === id);

  return (
    <>
      <BannerWrapper>
        <BannerImage src={yellowBanner} />
      </BannerWrapper>
      <LayoutContainer>
        <ContainerInner>
          <TopMargin />
          <Title>{aboutTeam?.name}</Title>

          <TopMargin />
          <MainText>열정적인 동료를 얻기 위해 이 자리에 모였습니다.</MainText>
          <MainText>
            우리는 함께 고민을 나누고 도전하며 목표를 향해 달리고 있습니다.
          </MainText>
          <TopMargin />
          <SectionWrapper>
            <IntroduceWrapper>
              <SubTitle>이런 분을 찾습니다</SubTitle>
              <MainText>
                <List>
                  <Tage />
                  코딩에 대한 남다른 애정을 가지신 분
                </List>
                <List>
                  <Tage />
                  1년이상 활동이 가능하신 분
                </List>
                <List>
                  <Tage />
                  책임감이 있으신 분
                </List>
                <List>
                  <Tage />
                  주도적으로 의견을 얘기하거나 반박하는데 거리낌이 없으신 분
                </List>
                <List>
                  <Tage />
                  동료들에게 좋은 시너지를 줄 수 있으신 분
                </List>
                <List>
                  <Tage />
                  타인의 의견을 적극적으로 수용하고 개선하려고 노력하시는 분
                </List>
              </MainText>
              <TopMargin />
              <SubTitle>이런 경험이 있다면 더 좋습니다</SubTitle>
              <MainText>
                <List>
                  <Tage />
                  Github, git에 대한 경험이나 프로젝트 경험이 있는 분이면
                  좋습니다.
                </List>
                <List>
                  <Tage />
                  FrameWork나 Library 사용이 능숙하신 분이면 좋습니다.
                </List>
                <List>
                  <Tage />
                  React, Android, Spring에 관한 이해도가 높으신 분이면 좋습니다.
                </List>
                <List>
                  <Tage />
                  코딩에 대하여 잘 모르더라도 매일 학습하실 의지를 가지신 분이면
                  좋습니다.
                </List>
              </MainText>
              <TopMargin />
              <SubTitle>GDSC의 혜택</SubTitle>
              <MainText>
                <List>
                  <Tage />
                  여러 국가의 GDSC 및 GDSC Korea와의 커뮤니케이션
                </List>
                <List>
                  <Tage />
                  GDG 개발자와의 컨택 기회
                </List>
                <List>
                  <Tage />
                  google에서 지원하는 소소한 기념품
                </List>
                <List>
                  <Tage />
                  자체 스터디를 위한 google의 코세라, 퀵랩 바우처 지급
                </List>
              </MainText>
            </IntroduceWrapper>
            <JoinWrapper>
              <ElementWrapper>
                <MinTitle>소속</MinTitle>
                <MinText>android Team</MinText>
              </ElementWrapper>
              <ElementWrapper>
                <MinTitle>지원 형태</MinTitle>
                <MinText>어쩌고 저쩌고</MinText>
              </ElementWrapper>
              <ElementWrapper>
                <MinTitle>활동기간</MinTitle>
                <MinText>6개월 ~ 1년</MinText>
              </ElementWrapper>
              <TopMargin />
              <StyledButton> 지원하기 </StyledButton>
              <SmallTopMargin />
              <StyledButton> 자주 하는 질문 </StyledButton>
            </JoinWrapper>
          </SectionWrapper>
        </ContainerInner>
      </LayoutContainer>
      <TopMargin />
    </>
  );
};