import React from 'react';
import { BounceLoader } from 'react-spinners';
import colors from '../constant/colors';

const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '40px', alignItems: 'center' }}>
      <BounceLoader color={colors.mainBeige} />
      <p style={{ marginTop: '10px', fontSize: '14px' }}>로딩 중..</p>
    </div>
  );
};

export default LoadingSpinner;
