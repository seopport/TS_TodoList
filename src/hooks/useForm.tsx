import { useState } from 'react';
import { Todo } from '../components/TodoPage';

const useForm = (values: Pick<Todo, 'title' | 'content'>) => {
  // 초기 state를 받아서 useState 생성
  const [formState, setFormState] = useState(values);

  // 값을 추적할 함수 정의
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    // name은 요소에서 직접 정의한 값, value는 추적하고 있는 값
    const { name, value } = e.target;

    // state를 풀어헤치고 name이라는 키(title, content)에 value 값을 할당
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 초기화
  const resetForm = () => {
    setFormState(values);
  };

  return { formState, handleValueChange, resetForm };
};

export default useForm;
