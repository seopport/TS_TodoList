import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import colors from '../constant/colors';
import { StLine } from './Layout';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTodo, getTodos, updateTodo } from '../api/todoApi';
import queryKeys from '../constant/queryKeys';
import LoadingSpinner from '../util/LoadingSpinner';
import { Todo } from './TodoPage';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { deleteStoreTodo, setStoreTodo, updateStoreTodo } from '../redux/modules/todoSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/config/configstore';

/*
 * 1. 투두 추가 (완료)
 * 2. 투두 삭제 (완료)
 * 3. 상태 토글 (완료)
 *
 * 선택
 * 1. form으로 변경 (완료)
 * 2. 인터셉터 로직 추가(완료)
 *
 */

const Task = ({ isDone }: { isDone: boolean }): JSX.Element | null => {
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, data: todos } = useQuery<Todo[]>(queryKeys.TODOS, getTodos);
  const storeTodos = useAppSelector((state: RootState) => state?.todoSlice.todos);

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setStoreTodo(todos));
    }
  }, [dispatch, isLoading, isError, todos]);

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.TODOS);
    },
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.TODOS);
    },
  });

  if (isError) {
    return null;
  }

  // 상태 토글
  const handleStatusButtonClick = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(updateStoreTodo(id));
    const newTodo = { isDone: !isDone };
    updateMutation.mutate({ id, newTodo });
  };

  // 할일 삭제
  const handleDeleteButtonClick = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
      dispatch(deleteStoreTodo(id));
    } else return;
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {storeTodos
        ?.filter((item: Todo) => item.isDone === isDone)
        ?.map((item: Todo) => {
          return (
            <StTaskBox key={item.id} onClick={() => navigate(`/detail?id=${item.id}`)}>
              <StTitleInTaskBox>{item.title}</StTitleInTaskBox>
              <StLine style={{ margin: '8px 0 10px 0', border: '1px solid black' }} />
              <StContentInTaskBox>{item.content}</StContentInTaskBox>
              <StButtonWrap ref={containerRef}>
                <StProgressButton onClick={(e) => handleStatusButtonClick(item.id, e)}>
                  {item.isDone ? '되돌리기' : '완료'}
                </StProgressButton>
                <StProgressButton onClick={(e) => handleDeleteButtonClick(item.id, e)}>삭제</StProgressButton>
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
  overflow: hidden; // 벗어나면 안보이게
  text-overflow: ellipsis; // ...으로 표시하겠다
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const StTitleInTaskBox = styled.div`
  font-family: 'NanumSquareNeo-Variable';
  font-size: 13px;
  font-weight: bold;
  margin: 5px 3px 0 3px;
`;

export const StTaskBox = styled.div`
  font-family: 'NanumSquareNeo-Variable';
  width: 200px;
  background-color: ${colors.mainBeige};
  border: 1px solid black;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 18px;
  padding: 12px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  max-height: 200px;
  line-height: 16px;
`;

export default Task;
