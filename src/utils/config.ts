import Config from 'react-native-config';

export const decideAPI = (baseEnpoint: string = '', port: string | number = 3000) => {
  const defaultAPI = `http://localhost:${port}/${baseEnpoint}`;
  switch (Config.NODE_ENV) {
    case 'development':
      return defaultAPI;
  
    case 'test':
      return defaultAPI;

    default:
      return `https://sunday-fancy-todo-api.herokuapp.com/${baseEnpoint}`;
  }
};
