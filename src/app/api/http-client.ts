import axios from 'axios';
import { baseURL } from '../config/constants';

export const httpClient = axios.create({
  baseURL,
});
