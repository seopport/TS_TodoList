import React from 'react';
import { Slide, toast } from 'react-toastify';

type ToastType = 'warn' | 'error';

const notification = (message: string, type: ToastType) => {
  toast[type](message, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    transition: Slide,
  });
};

export default notification;
