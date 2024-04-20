import React from 'react';
import { toast as toasify } from 'react-toastify';

const Msg = ({ title, content }) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
};

const messageFactory = (message) => {
  if (typeof message === 'string') return message;
  return <Msg title={message.title} content={message.content} />;
};

export const toast = {
  success: (message = {}) => {
    const msg = messageFactory(message);
    return toasify.success(msg);
  },
  info: (message = {}) => {
    const msg = messageFactory(message);
    return toasify.info(msg);
  },
  error: (message = {}) => {
    const msg = messageFactory(message);
    return toasify.error(msg);
  },
};
