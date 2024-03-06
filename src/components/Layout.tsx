import React, { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import colors from '../constant/colors';

type ChildrenProps = {
  children: ReactNode;
};

const Layout = ({ children }: PropsWithChildren<ChildrenProps>) => {
  return (
    <StBodyWrap>
      <StMainLayout>
        <StLine />
        {children}
      </StMainLayout>
    </StBodyWrap>
  );
};

const StBodyWrap = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.mainGreen};
  min-height: 100vh;
`;

const StMainLayout = styled.div`
  width: 800px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
`;

export const StLine = styled.hr`
  margin: 40px 0;
  opacity: 60%;
  width: 100%;
`;

export default Layout;
