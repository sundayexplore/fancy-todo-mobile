import Config from 'react-native-config';

export default function decideApiURL(baseEnpoint: string = '', apiVersion: number = 1, port: string | number = 3000): string {
  const defaultAPI = `http://localhost:${port}/v${apiVersion}/${baseEnpoint}`;
  switch (Config.NODE_ENV) {
    case 'development':
      return defaultAPI;
  
    case 'test':
      return defaultAPI;

    default:
      return `https://api.todo.sundayexplore.tech/${baseEnpoint}`;
  }
};
