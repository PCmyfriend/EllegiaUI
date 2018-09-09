import { BASE_URL, BASE_API_URL } from './constants';
import generalRequest from '../utils/request';

export const request = (authHeader = null) =>
  generalRequest(BASE_URL, authHeader);

export const apiRequest = (authHeader = null) =>
  generalRequest(BASE_API_URL, authHeader);
