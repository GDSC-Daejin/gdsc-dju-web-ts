import React, { useCallback, useEffect, useState } from 'react';

import {
  MemberPageWrapper,
  MotionSelector,
  StyledColumn,
  StyledLargeColumn,
  StyledMobileTableCategoryWrapper,
  StyledMobileTableWrapper,
  StyledSmallColumn,
  StyledTableCategoryWrapper,
  StyledTableWrapper,
} from './styled';
import { useRecoilState } from 'recoil';
import './MemberPage.css';
import { UserDataState } from '../../../api/types';
import { MODAL_KEY, modalState } from '../../../store/modal';
import { useGetMemberList } from '../../../api/hooks/useGetMemberData';
import { dbService } from '../../../firebase/firebase';
import AdminEditMemberModal from '../../../components/common/Modal/AdminMemberEditModal';
import { MainText } from '../../../components/common/Title/title';
import {
  listAnimate,
  listItemAnimate,
} from '../../../components/common/Variants/Variants';
import {
  ContainerInner,
  LayoutContainer,
  TopMargin,
} from '../../../styles/layouts';
import {
  Badge,
  ButtonMenu,
  Column,
  MenuItem,
  Table,
} from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const AdminMember = () => {
  const [memberData, setMemberData] = useState<UserDataState[]>([]);
  const [selectMember, setSelectMember] = useState<UserDataState>();
  const [modal, setModal] = useRecoilState(modalState);

  const memberSortHandler = (id: string) => {
    console.log(memberData);
    switch (id) {
      case 'warning':
        return memberData?.sort((a, b) => (a.warning > b.warning ? 1 : -1));
      case 'name':
        setMemberData([
          memberData,
          ...memberData?.sort((a, b) => (a.name > b.name ? 1 : -1)),
        ]);
      case 'nickName':
        return memberData?.sort((a, b) => (a.nickName > b.nickName ? 1 : -1));
      case 'email':
        return memberData?.sort((a, b) => (a.email > b.email ? 1 : -1));
      case 'position':
        return memberData?.sort((a, b) => (a.position > b.position ? 1 : -1));
      default:
        return memberData?.sort((a, b) => (a.nickName > b.nickName ? 1 : -1));
    }
  };

  const getMemberList = async () => {
    try {
      await dbService
        .collection('members')
        .get()
        .then((data) => {
          const memberList: any = data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMemberData(memberList);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMemberList();
  }, []);

  return (
    <>
      <AdminEditMemberModal
        selectMember={selectMember}
        setSelectMember={setSelectMember}
      />

      {memberData && (
        <>
          <LayoutContainer>
            <ContainerInner>
              <div>
                <MainText>Total • {memberData?.length}</MainText>
              </div>
              <MemberPageWrapper>
                <StyledTableCategoryWrapper>
                  <StyledSmallColumn
                    id={'name'}
                    onClick={() => memberSortHandler('name')}
                  >
                    name
                  </StyledSmallColumn>
                  <StyledColumn
                    id={'nickname'}
                    onClick={() => setMemberData(memberSortHandler('nickName'))}
                  >
                    nickname
                  </StyledColumn>
                  <StyledLargeColumn
                    onClick={() => setMemberData(memberSortHandler('email'))}
                  >
                    email
                  </StyledLargeColumn>
                  <StyledSmallColumn
                    onClick={() =>
                      setMemberData(memberSortHandler('position '))
                    }
                  >
                    position
                  </StyledSmallColumn>
                  <StyledSmallColumn
                    onClick={() => setMemberData(memberSortHandler('warning'))}
                  >
                    warn
                  </StyledSmallColumn>
                </StyledTableCategoryWrapper>
                <MotionSelector
                  variants={listAnimate}
                  initial="start"
                  animate="end"
                >
                  {memberData.map((data: any, id) => (
                    <StyledTableWrapper
                      variants={listItemAnimate}
                      whileHover={{
                        backgroundColor: '#efefef',
                        color: '#3886f6',
                      }}
                      key={id}
                      className={
                        (data?.warning as number) == 0
                          ? 'count0'
                          : (data?.warning as number) == 1
                          ? 'count1'
                          : (data?.warning as number) == 2
                          ? 'count2'
                          : (data?.warning as number) < 3 &&
                            (data?.warning as number) > 2
                          ? 'last'
                          : (data?.warning as number) == 3
                          ? 'count3'
                          : ''
                      }
                      onClick={() => {
                        setSelectMember(data);
                        setModal({
                          ...modal,
                          [MODAL_KEY.ADMIN_EDIT_MEMBER]: true,
                        });
                      }}
                    >
                      <StyledSmallColumn>{data.name}</StyledSmallColumn>
                      <StyledColumn>{data.nickName}</StyledColumn>
                      <StyledLargeColumn>{data.email}</StyledLargeColumn>
                      <StyledSmallColumn>{data.position}</StyledSmallColumn>
                      <StyledSmallColumn>{data.warning}</StyledSmallColumn>
                    </StyledTableWrapper>
                  ))}
                </MotionSelector>
                <StyledMobileTableCategoryWrapper>
                  <StyledColumn>Nickname</StyledColumn>
                  <StyledSmallColumn>Name</StyledSmallColumn>
                  <StyledSmallColumn>Position</StyledSmallColumn>
                  <StyledSmallColumn>Warn</StyledSmallColumn>
                </StyledMobileTableCategoryWrapper>
                <MotionSelector
                  variants={listAnimate}
                  initial="start"
                  animate="end"
                >
                  {memberData?.map((data: any, id) => (
                    <StyledMobileTableWrapper
                      variants={listItemAnimate}
                      whileHover={{ backgroundColor: '#f2f4f6' }}
                      key={id}
                      className={
                        (data?.warning as number) == 0
                          ? 'count0'
                          : (data?.warning as number) == 1
                          ? 'count1'
                          : (data?.warning as number) == 2
                          ? 'count2'
                          : (data?.warning as number) == 3
                          ? 'count3'
                          : 'none'
                      }
                      onClick={() => {
                        setSelectMember(data);
                        setModal({
                          ...modal,
                          [MODAL_KEY.ADMIN_EDIT_MEMBER]: true,
                        });
                      }}
                    >
                      <StyledColumn>{data.nickName}</StyledColumn>
                      <StyledSmallColumn>{data.name}</StyledSmallColumn>
                      <StyledSmallColumn>{data.position}</StyledSmallColumn>
                      <StyledSmallColumn>{data.warning}</StyledSmallColumn>
                    </StyledMobileTableWrapper>
                  ))}
                  <TopMargin />
                </MotionSelector>
              </MemberPageWrapper>
            </ContainerInner>
          </LayoutContainer>
        </>
      )}
    </>
  );
};

export default AdminMember;
