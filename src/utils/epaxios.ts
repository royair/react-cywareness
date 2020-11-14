import axios from 'axios';

import {rootStore} from '../store/RootStore'

const epaxios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/`,
});

// add cognito's token to each request
epaxios.interceptors.request.use(
    async (config) => {
      try {
        if (rootStore.userStore.isAuthenticated) {
          const token = rootStore.userStore.user.auth_token
          config.headers.Authorization = "Bearer " + token;
        }

        return config;
      } catch (e) {
        return config;
      }
    },
    (error) => {
      return Promise.reject(error);
    });

export default epaxios;
