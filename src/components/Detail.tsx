import React from 'react';
import { StTaskInputBox } from './TodoPage';
import { useAppSelector } from '../hooks/reduxHooks';
import { useSearchParams } from 'react-router-dom';
import { StLine } from './Layout';
import styled from 'styled-components';
import { RootState } from '../redux/config/configstore';

const Detail = () => {
  const storeTodos = useAppSelector((state: RootState) => state?.todoSlice.todos);
  console.log(storeTodos);
  const [searchParams, setSearchParams] = useSearchParams();
  const targetId = searchParams.get('id');
  console.log(targetId);

  return (
    <StTaskInputBox style={{ minHeight: '200px', justifyContent: 'flex-start' }}>
      {storeTodos
        ?.filter((item) => item.id === targetId)
        ?.map((item) => {
          return (
            <>
              <StContentsContainer>{item.title}</StContentsContainer>
              <StLine style={{ margin: '8px 0 10px 0', border: '1px solid black' }} />
              <StContentsContainer style={{ alignSelf: 'flex-start' }}>{item.content}</StContentsContainer>
            </>
          );
        })}
    </StTaskInputBox>
  );
};

export const StContentsContainer = styled.div`
  margin: 10px 0;
`;

export default Detail;
