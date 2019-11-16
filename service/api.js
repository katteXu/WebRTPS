import request from './request';

export const createStream = ({ params } = {}) => {
  return request({
    method: 'get',
    url: '/api/createStream',
    params,
  });
}