import axios from 'axios';

export const API_URL = 'http://185.155.18.145:9999';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '53c2c87f-e6be-4e56-8769-afdff1712ac7',
  },
});