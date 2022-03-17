import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import { SubTitle, Title } from '../../../components/common/Title/title';
import { ContainerInner, LayoutContainer } from '../../../styles/layouts';
import {
  FormArticleWrapper,
  FormLabel,
  FormLi,
  FormMargin,
  FormMarginXS,
  FormSubmitButton,
  FormText,
  RecruitFormInner,
  RecruitFormWrapper,
} from './styled';
import TextInput from '../../../components/common/input/TextInput';
import { useNavigate, useParams } from 'react-router-dom';
import { positionSelect } from './FormFunctions';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase/firebase.config';
import { dbService } from '../../../firebase/firebase';
import { useRecoilState } from 'recoil';
import { loaderState } from '../../../store/loader';
import { alertState } from '../../../store/alert';
import { FormikProvider, useFormik } from 'formik';
import { recruitFormSchema } from '../../../components/Validation/profileEdit';
import FileInput from '../../../components/common/input/FileInput';

const RecruitForm = () => {
  const { id } = useParams();
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useRecoilState(loaderState);
  const [alerts, setAlerts] = useRecoilState(alertState);
  const [uploadProgress, setUploadProgress] = useState(0);
  const onSubmit = async () => {
    {
      input.current && (await uploadFiles(input.current));
    }
  };
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const recruitItem = {
    uploadDate: new Date(),
    name: '',
    phoneNumber: '',
    email: '',
    major: '',
    studentID: '',
    position: positionSelect[id as keyof typeof positionSelect],
    link0: '',
    link1: '',
    fileURL: '',
  };
  const recruitFormik = useFormik({
    initialValues: recruitItem,
    onSubmit: () => {
      return;
    },
    validationSchema: recruitFormSchema,
  });
  useLayoutEffect(() => {
    setPosition(positionSelect[id as keyof typeof positionSelect]);
  }, [id]);
  const uploadFiles = async (data: HTMLInputElement) => {
    if (data.files !== null) {
      const file = data.files[0];
      if (!file) return;
      if (file.size > 50000001) {
        alert('파일 사이즈는 50MB 이하로 선택해주세요.');
        return;
      }
      if (file.type !== 'application/pdf') {
        alert('PDF 파일만 업로드 가능합니다.');
        return 0;
      } else {
        setLoading({ ...loading, load: true });
        const storageRef = ref(storage, `${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask.on('state_changed', (snapshot: any) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setUploadProgress(progress);
        }),
          uploadTask.then(() => {
            getDownloadURL(storageRef).then(async (url: string) => {
              await dbService
                .collection('applicants')
                .doc()
                .set({
                  ...recruitFormik.values,
                  fileURL: url,
                });
              setLoading({ ...loading, load: false });
              navigate(
                `/recruit/apply-success?username=${recruitFormik.values.name}&position=${position}`,
              );
            });
          });
      }
    }
  };
  const requiredSchema = !!(
    recruitFormik.values.email &&
    recruitFormik.values.name &&
    recruitFormik.values.phoneNumber &&
    recruitFormik.values.major &&
    recruitFormik.values.studentID &&
    recruitFormik.values.position &&
    recruitFormik.values.link0.length > 0 &&
    input.current?.files
  );
  return (
    <>
      <LayoutContainer>
        <ContainerInner>
          <FormMargin />
          <FormikProvider value={recruitFormik}>
            <button
              onClick={() =>
                navigate(
                  `/recruit/apply-success?username=정준혁&position=Frontend Developer`,
                )
              }
            >
              asd
            </button>
            <RecruitFormWrapper>
              <RecruitFormInner>
                <Title>지원서 작성하기</Title>
                <SubTitle>{position}</SubTitle>
                <FormMargin />
                <div>
                  <FormLabel essential={true}>이름(실명)</FormLabel>
                  <TextInput
                    placeholder={'김구글'}
                    name={'name'}
                    value={recruitFormik.values.name}
                    onChange={recruitFormik.handleChange}
                    touched={recruitFormik.touched.name}
                    error={recruitFormik.errors.name}
                  />
                </div>

                <div>
                  <FormLabel essential={true}>전화번호</FormLabel>
                  <TextInput
                    placeholder={'010-0000-0000'}
                    name={'phoneNumber'}
                    value={recruitFormik.values.phoneNumber}
                    onChange={recruitFormik.handleChange}
                    touched={recruitFormik.touched.phoneNumber}
                    error={recruitFormik.errors.phoneNumber}
                  />
                </div>

                <div>
                  <FormLabel essential={true}>이메일(gmail)</FormLabel>
                  <TextInput
                    placeholder={'googledev@gmail.com'}
                    name={'email'}
                    value={recruitFormik.values.email}
                    onChange={recruitFormik.handleChange}
                    touched={recruitFormik.touched.email}
                    error={recruitFormik.errors.email}
                  />
                </div>
                <div>
                  <FormLabel essential={true}>학과</FormLabel>
                  <TextInput
                    placeholder={'구글개발학과'}
                    name={'major'}
                    value={recruitFormik.values.major}
                    onChange={recruitFormik.handleChange}
                    touched={recruitFormik.touched.major}
                    error={recruitFormik.errors.major}
                  />
                </div>

                <div>
                  <FormLabel essential={true}>학번</FormLabel>
                  <TextInput
                    placeholder={'20221234'}
                    name={'studentID'}
                    value={recruitFormik.values.studentID}
                    onChange={recruitFormik.handleChange}
                    touched={recruitFormik.touched.studentID}
                    error={recruitFormik.errors.studentID}
                  />
                </div>
                <div>
                  <FormLabel essential={true}>포지션</FormLabel>
                  <TextInput
                    disabled={true}
                    name={'position'}
                    placeholder={position}
                  />
                </div>

                <div>
                  <FormLabel essential={true}>지원서</FormLabel>
                  <FileInput
                    defaultPlaceholder={'지원서 / 포트폴리오 PDF'}
                    ref={input}
                  />
                  <FormText>
                    * 파일은 최대 50MB로 업로드 하실 수 있습니다.
                  </FormText>
                  <FormText>
                    * 원활한 검토를 위해 PDF 형식으로 제출해주세요.
                  </FormText>
                  <FormText>
                    * 지원서는 자유 양식이며 아래 항목을 포함하여 제출해주세요.
                  </FormText>
                  <FormArticleWrapper>
                    <FormLi>활용할 수 있는 기술스택을 알려주세요.</FormLi>
                    <FormLi>
                      프로젝트 협업 경험이 있다면 자세하게 알려주세요.
                    </FormLi>
                    <FormLi>
                      팀 리드 해보신 경험과 어떤 리드가 좋은 리드라고
                      생각하시는지 알려주세요.
                    </FormLi>
                    <FormLi>
                      팀원과 갈등상황은 어떻게 해결하시나요? 커뮤니케이션 방식을
                      알려주세요.
                    </FormLi>
                    <FormLi>
                      본인만의 공부방법이 있다면 어떤 것이 있나요? 이뤄낸 성과가
                      있다면 자세히 알려주세요.
                    </FormLi>
                  </FormArticleWrapper>
                </div>
                <div>
                  <FormLabel essential={true}>링크 1</FormLabel>
                  <TextInput
                    placeholder={'https://'}
                    name={'link0'}
                    value={recruitFormik.values.link0}
                    onChange={recruitFormik.handleChange}
                    touched={recruitFormik.touched.link0}
                    error={recruitFormik.errors.link0}
                  />
                  <FormMarginXS />
                  <FormLabel>링크 2 (선택사항)</FormLabel>
                  <TextInput
                    placeholder={'https://'}
                    name={'link1'}
                    value={recruitFormik.values.link1}
                    onChange={recruitFormik.handleChange}
                    touched={recruitFormik.touched.link1}
                    error={recruitFormik.errors.link1}
                  />
                  <FormText>
                    자신을 잘 나타낼 수 있는 개인블로그, 노션, Github링크 등을
                    입력해주세요.
                  </FormText>
                  <FormText>
                    *포트폴리오를 업로드하셔야할 경우 클라우드/드라이브에 파일을
                    업로드 후 공유링크를 입력해주세요.
                  </FormText>
                </div>
                <FormMargin />
                <FormSubmitButton
                  onClick={() => onSubmit()}
                  disable={!(recruitFormik.isValid && requiredSchema)}
                >
                  제출하기
                </FormSubmitButton>
                <FormMargin />
              </RecruitFormInner>
            </RecruitFormWrapper>
          </FormikProvider>
        </ContainerInner>
      </LayoutContainer>
    </>
  );
};

export default memo(RecruitForm);
