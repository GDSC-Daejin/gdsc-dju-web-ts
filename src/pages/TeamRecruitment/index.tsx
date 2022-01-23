import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BannerWrapper,
  ContainerInner,
  LayoutContainer,
  TopMargin,
} from '../../styles/layouts';
import { MainText, SubTitle, Title } from '../../components/common/Title/title';
import {
  IntroduceWrapper,
  JoinInner,
  JoinWrapper,
  MoblieBottomElementWrapper,
  MoblieTopElementWrapper,
  SectionWrapper,
} from './styled';
import { teamRecruitmentDefaultText } from '../../api/pageData/teamRecruitmentDefaultText';
import { StyledButton } from '../../components/common/Button/styled';
import { TeamInfomation } from '../../api/pageData/teamInfomation';
import { Banner } from '../../img/Banner/Banner';
import BlueBanner from '../../img/Banner/BlueBanner.png';
import BulletList from '../../components/common/BulletList';
import InformationBar from './InformationBar';

export const Recruitment: React.FC = () => {
  const { id } = useParams();
  const aboutTeam = TeamInfomation.find((aboutTeam) => aboutTeam.id === id);
  const navigate = useNavigate();
  return (
    <>
      <BannerWrapper>
        <Banner src={BlueBanner} />
      </BannerWrapper>
      {aboutTeam && (
        <LayoutContainer>
          <ContainerInner>
            <TopMargin />
            <Title>{aboutTeam?.name}</Title>
            <TopMargin />
            <MoblieTopElementWrapper>
              <JoinInner>
                <InformationBar name={aboutTeam.name} />
              </JoinInner>
            </MoblieTopElementWrapper>
            <MainText>열정적인 동료를 얻기 위해 이 자리에 모였습니다.</MainText>
            <MainText>
              우리는 함께 고민을 나누고 도전하며 목표를 향해 달리고 있습니다.
            </MainText>
            <TopMargin />
            <SectionWrapper>
              {aboutTeam && (
                <IntroduceWrapper>
                  {aboutTeam.activity ? (
                    <>
                      <SubTitle>합류하시면 함께 할 활동입니다.</SubTitle>
                      <BulletList text={aboutTeam.activity} />
                      <TopMargin />
                    </>
                  ) : null}
                  <SubTitle>이런 분을 찾습니다</SubTitle>
                  <MainText>
                    <BulletList text={teamRecruitmentDefaultText.findMember} />
                    {aboutTeam.people && <BulletList text={aboutTeam.people} />}
                  </MainText>
                  <TopMargin />
                  <SubTitle>이런 경험이 있다면 더 좋습니다</SubTitle>
                  <MainText>
                    <BulletList text={teamRecruitmentDefaultText.goodMember} />
                    {aboutTeam.preferential && (
                      <BulletList text={aboutTeam.preferential} />
                    )}
                  </MainText>
                  <TopMargin />
                  <SubTitle>GDSC의 혜택</SubTitle>
                  <MainText>
                    <BulletList text={teamRecruitmentDefaultText.benefits} />
                  </MainText>
                  <TopMargin />
                </IntroduceWrapper>
              )}
              <JoinWrapper>
                <JoinInner>
                  <InformationBar name={aboutTeam.name} />
                  <TopMargin />
                  <StyledButton
                    onClick={() => {
                      window.open(
                        'https://forms.gle/FwoDUZSCcHHow8iC7',
                        '_blank',
                      );
                    }}
                  >
                    지원하기
                  </StyledButton>
                  <StyledButton
                    onClick={() => {
                      navigate('/faq');
                    }}
                  >
                    자주 하는 질문
                  </StyledButton>
                  <TopMargin />
                </JoinInner>
              </JoinWrapper>
            </SectionWrapper>
            <MoblieBottomElementWrapper>
              <StyledButton
                onClick={() => {
                  navigate('/faq');
                }}
              >
                자주 하는 질문
              </StyledButton>
              <StyledButton
                onClick={() => {
                  window.open('https://forms.gle/FwoDUZSCcHHow8iC7', '_blank');
                }}
              >
                지원하기
              </StyledButton>
            </MoblieBottomElementWrapper>
          </ContainerInner>
        </LayoutContainer>
      )}
      <TopMargin />
    </>
  );
};
