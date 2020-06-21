import Config from 'react-native-config';
import NetInfo, { NetInfoWifiState } from '@react-native-community/netinfo';

export default function decideApiURL(
  baseEnpoint: string = '',
  apiVersion: number = 1,
  port: string | number = 3000,
): string {
  let localhost: string | any;

  console.log(`Localhost Before\t ${localhost}`);

  NetInfo.fetch().then((netInfoState) => {
    const { details } = netInfoState as NetInfoWifiState;
    localhost = details.ipAddress;
  });

  console.log(`Localhost After\t ${localhost}`);

  const defaultAPI = `http://${localhost}:${port}/v${apiVersion}/${baseEnpoint}`;
  switch (Config.NODE_ENV || process.env.NODE_ENV) {
    case 'development':
      return defaultAPI;

    case 'test':
      return defaultAPI;

    default:
      return `https://api.todo.sundayexplore.tech/v${apiVersion}/${baseEnpoint}`;
  }
}

console.log(decideApiURL('users', 1));

