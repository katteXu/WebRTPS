import axios from 'axios';
import { message } from 'antd';
const instance = axios.create({
  baseURL: process.env.BASE_URL || '/',
  withCredentials: true,
});

export default function fetch(options) {
  
  return instance(options)
    .then(response => {
      const { data } = response;
      return Promise.resolve({
        ...data,
      });
    })
    .catch(error => {
      if (typeof window !== 'undefined') {
        message.error(error.message || 'Network Error');
      }
      throw Error(error);
    });
}
