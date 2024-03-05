import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../constant/colors';
import '../styles/font.css';
import Task from './Task';

// todo: RTK + react-query 이용 Todolist

export type IsDone = {
  isDone: boolean;
};

const TodoPage = () => {
  const [currentTime, setCurrentTime] = useState('');

  // 페이지가 렌더링될 때와 1초마다 시간을 갱신
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date().toLocaleString();
      setCurrentTime(date);
    }, 1000);

    // 컴포넌트가 언마운트될 때 interval을 정리
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StContentWrap>
      <StMainTitle>
        To Do List<div style={{ position: 'absolute', left: '100%' }}>🌿</div>
      </StMainTitle>
      <StDate>{currentTime}</StDate>
      <StTaskInputBox>
        <StInputBoxTitle>Task</StInputBoxTitle>
        <StTitleInput placeholder='Enter Your to-do Here' />
        <StAddButton>추가</StAddButton>
        <StMemoTextArea placeholder='Memo' />
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

export const StAddButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 83px;
  right: 61px;
  display: block;
  transition: all 0.2s;
  font-size: 15px;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.8);
  }
`;

export const StMemoTextArea = styled.textarea`
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

export const StTaskInputBox = styled.div`
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
