import Config from 'react-native-config';

export default function decideApiURL(
  host: string = 'localhost',
  baseEnpoint: string = '',
  apiVersion: number = 1,
  port: string | number = 3000,
): string {
  let apiURL: string = `https://api.todo.sundayexplore.tech/v${apiVersion}/${baseEnpoint}`;

  const nonProductionApiURL = `http://${host}:${port}/v${apiVersion}/${baseEnpoint}`;

  switch (Config.NODE_ENV || process.env.NODE_ENV) {
    case 'development':
      return nonProductionApiURL;

    case 'test':
      return nonProductionApiURL;

    default:
      return apiURL;
  }
}
