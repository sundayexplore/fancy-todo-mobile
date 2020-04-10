import Constants from 'expo-constants';

const { manifest } = Constants;

export const decideAPI = (baseEnpoint: string = '', port: string | number = 3000) => {
  const defaultAPI = `http://${manifest.debuggerHost?.split(':').shift()?.concat(`:${port}`)}/${baseEnpoint}`;
  switch (process.env.NODE_ENV) {
    case 'development':
      return defaultAPI;
  
    case 'test':
      return defaultAPI;

    default:
      return `https://sunday-fancy-todo-api.herokuapp.com/${baseEnpoint}`;
  }
};
