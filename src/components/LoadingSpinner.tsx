import React from 'react';
import { BounceLoader } from 'react-spinners';
import colors from '../constant/colors';

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: 'center', margin: '40px' }}>
      <BounceLoader color={colors.mainBeige} />
      <p style={{ marginTop: '10px' }}>로딩 중..</p>
    </div>
  );
};

export default LoadingSpinner;
