import {THIRTY_DAYS } from '../constants/index.js';

const options = {
  httpOnly: true,
  expires: new Date(Date.now() + THIRTY_DAYS),
};

export const setUpSession = (res, session) => {
  res.cookie('sessionId', session._id, options);
  res.cookie('refreshToken', session.refreshToken, options);
};
