import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../constant/colors';
import '../styles/font.css';
import Task from './Task';
import { useMutation, useQueryClient } from 'react-query';
import { addTodo } from '../api/todoApi';
import queryKeys from '../constant/queryKeys';
import { nanoid } from 'nanoid';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addStoreTodo } from '../redux/modules/todoSlice';
import useForm from '../hooks/useForm';
import 'react-toastify/dist/ReactToastify.css';
import notification from '../util/notification';

// todo: RTK + react-query 이용 Todolist

// export type IsDone = {
//   isDone: boolean;
// };

export type Todo = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

const TodoPage = (): JSX.Element => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const [liveTime, setLiveTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date().toLocaleString();
      setLiveTime(date);
    }, 1000);

    return () => clearInterval(timer);
  }, [liveTime]);

  // #region 커스텀 훅 이전
  // const [title, setTitle] = useState<string>('');
  // const [content, setContent] = useState<string>('');

  // const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setTitle(e.target.value);
  // };

  // const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
  //   setContent(e.target.value);
  // };
  // #endregion

  const { formState, handleValueChange, resetForm } = useForm({
    title: '',
    content: '',
  });
  const { title, content } = formState;

  const addMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.TODOS);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!title.trim()) {
      notification('제목을 입력해주세요.', 'warn');
      return;
    }

    if (!content.trim()) {
      notification('내용을 입력해주세요.', 'warn');
      return;
    }

    const newTodo: Todo = {
      id: nanoid(),
      title,
      content,
      isDone: false,
    };

    addMutation.mutate(newTodo);
    dispatch(addStoreTodo(newTodo));

    resetForm();
  };

  return (
    <StContentWrap>
      <StMainTitle>
        To Do List<div style={{ position: 'absolute', left: '100%' }}>🌿</div>
      </StMainTitle>
      {liveTime ? <StDate>{liveTime}</StDate> : <StDate>Loading...</StDate>}
      <StTaskInputBox onSubmit={handleSubmit}>
        <StInputBoxTitle>Task</StInputBoxTitle>
        <StTitleInput
          type='text'
          name='title'
          value={title}
          onChange={handleValueChange}
          placeholder='Enter Your to-do Here'
        />
        <StAddButton type='submit'>추가</StAddButton>
        <StContentTextArea name='content' value={content} onChange={handleValueChange} placeholder='Memo' />
      </StTaskInputBox>
      <StTasksWrap>
        <div>
          <StInProgressTag>
            <StStatusCircle $status={'in-progress'} />
            In Progress
          </StInProgressTag>
          <Task isDone={false} />
        </div>
        <div>
          <StDoneTag>
            <StStatusCircle $status={'done'} />
            Done
          </StDoneTag>
          <Task isDone={true} />
        </div>
      </StTasksWrap>
    </StContentWrap>
  );
};

export const StStatusCircle = styled.div<{ $status: string }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${(props: { $status: string }) => {
    if (props.$status === 'in-progress') {
      return colors.mainYellow;
    } else if (props.$status === 'done') {
      return colors.mainRed;
    }
  }};
  border: 1px solid black;
  border-radius: 40px;
  margin: 0 7px 0 8px;
`;

export const StInProgressTag = styled.div`
  font-size: 14px;
  border: 1px solid black;
  height: 30px;
  width: 200px;
  line-height: 100%;
  background-color: ${colors.backgroundYellow};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

export const StDoneTag = styled(StInProgressTag)`
  background-color: ${colors.backgroundRed};
`;

export const StInputBoxTitle = styled.p`
  font-family: 'NanumSquareNeo-Variable';
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 1.3px;
  margin-top: 10px;
`;

export const StTasksWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const StAddButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 83px;
  right: 61px;
  display: block;
  transition: all 0.2s;
  font-size: 15px;
  background-color: transparent;
  border: none;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.8);
  }
`;

export const StContentTextArea = styled.textarea`
  background-color: transparent;
  resize: none;
  width: 80%;
  border: 1px solid black;
  height: 100px;
  padding: 11px 15px 15px 11px;
  box-sizing: border-box;
  border-radius: 1px;
`;

export const StTitleInput = styled.input`
  background-color: transparent;
  margin: 25px 0 20px 0;
  width: 80%;
  border: none;
  outline: none;
  border-bottom: 1px solid black;
  padding: 5px 35px 7px 5px;
  box-sizing: border-box;
`;

export const StTaskInputBox = styled.form`
  width: 80%;
  padding: 20px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.mainBeige};
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-bottom: 50px;
`;

export const StDate = styled.p`
  color: ${colors.mainBeige};
  margin: 0 0 40px;
  font-size: 15px;
  font-style: italic;
`;

export const StMainTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.mainBeige};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
  letter-spacing: 1px;
`;

export const StContentWrap = styled.div`
  font-family: 'NanumSquareNeo-Variable';
  width: 510px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default TodoPage;
