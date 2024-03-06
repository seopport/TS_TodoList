import React from 'react';
import { StDoneTag, StInProgressTag, StStatusCircle, StTaskInputBox } from './TodoPage';
import { useAppSelector } from '../hooks/reduxHooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StLine } from './Layout';
import styled from 'styled-components';
import { RootState } from '../redux/config/configstore';
import { StProgressButton } from './Task';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Detail = () => {
  const navigate = useNavigate();

  const storeTodos = useAppSelector((state: RootState) => state?.todoSlice.todos);

  const [searchParams, setSearchParams] = useSearchParams();
  const targetId = searchParams.get('id');

  return (
    <StTaskInputBox
      style={{
        width: '450px',
        minHeight: '300px',
        justifyContent: 'flex-start',
        fontFamily: 'NanumSquareNeo-Variable',
      }}
    >
      {storeTodos
        ?.filter((item) => item.id === targetId)
        ?.map((item) => {
          return (
            <React.Fragment key={item.id}>
              {!item.isDone ? (
                <StInProgressTag style={{ width: '100%' }}>
                  <StStatusCircle $status={'in-progress'} />
                  In Progress
                </StInProgressTag>
              ) : (
                <StDoneTag style={{ width: '100%' }}>
                  <StStatusCircle $status={'done'} />
                  Done
                </StDoneTag>
              )}
              <br />
              <StContentsContainer>{item.title}</StContentsContainer>
              <StLine style={{ margin: '8px 0 10px 0', border: '1px solid black' }} />
              <StContentsContainer style={{ alignSelf: 'flex-start' }}>{item.content}</StContentsContainer>
            </React.Fragment>
          );
        })}
      <div style={{ display: 'flex', alignSelf: 'flex-end', marginTop: 'auto', alignItems: 'center' }}>
        <IoMdArrowRoundBack />
        <StBackButton onClick={() => navigate(-1)}>돌아가기</StBackButton>
      </div>
    </StTaskInputBox>
  );
};

export const StContentsContainer = styled.div`
  line-height: 30px;
  margin: 10px 0;
`;

export const StBackButton = styled(StProgressButton)`
  font-size: 13px;
`;

export default Detail;
