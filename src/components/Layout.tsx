import React, { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import colors from '../constant/colors';

type ChildrenProps = {
  children: ReactNode;
};

const Layout = ({ children }: PropsWithChildren<ChildrenProps>) => {
  return (
    <StBodyWrap>
      <StMainLayout>{children}</StMainLayout>
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
  justify-content: center;
  height: 100px;
`;

export default Layout;
