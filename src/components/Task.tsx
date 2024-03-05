import React from 'react';
import styled from 'styled-components';
import colors from '../constant/colors';
import { StLine } from './Layout';
import { useQuery } from 'react-query';
import { getTodos } from '../api/todoApi';
import queryKeys from '../constant/queryKeys';
import LoadingSpinner from './LoadingSpinner';
import { Todo } from './TodoPage';

const Task = ({ isDone }: { isDone: boolean }): JSX.Element | null => {
  const { isLoading, isError, data: todos } = useQuery(queryKeys.TODOS, getTodos);
  console.log(todos);

  if (isError) {
    alert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    return null;
  }

  /*
   * 1. 투두 추가
   * 2. 투두 삭제
   * 3. 상태 토글
   */

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {todos
        ?.filter((item: Todo) => item.isDone === isDone)
        ?.map((item: Todo) => {
          return (
            <StTaskBox key={item.id}>
              <StTitleInTaskBox>{item.title}</StTitleInTaskBox>
              <StLine style={{ margin: '8px 0 10px 0', border: '1px solid black' }} />
              <StContentInTaskBox>{item.content}</StContentInTaskBox>
              <StButtonWrap>
                <StProgressButton>{isDone ? '되돌리기' : '완료'}</StProgressButton>
                <StProgressButton>삭제</StProgressButton>
              </StButtonWrap>
            </StTaskBox>
          );
        })}
    </>
  );
};

export const StButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  bottom: 12px;
  right: 15px;
`;

export const StProgressButton = styled.div`
  font-family: 'NanumSquareNeo-Variable';
  background-color: transparent;
  font-size: 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin: 0 7px;
`;

export const StContentInTaskBox = styled.div`
  font-family: 'NanumSquareNeo-Variable';
  font-size: 12px;
  margin: 0 3px;
  word-wrap: break-word;
  min-height: 30px;
  margin-bottom: 25px;
`;

export const StTitleInTaskBox = styled.div`
  font-family: 'NanumSquareNeo-Variable';
  font-size: 13px;
  font-weight: bold;
  margin: 5px 3px 0 3px;
`;

export const StTaskBox = styled.div`
  font-family: 'NanumSquareNeo-Variable';
  width: 100%;
  background-color: ${colors.mainBeige};
  border: 1px solid black;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 18px;
  padding: 12px;
  box-sizing: border-box;
  position: relative;
`;

export default Task;
