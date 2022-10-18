import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  headers: {
    'Content-type': 'application/json',
    channel: 'administration-panel',
  },
});
