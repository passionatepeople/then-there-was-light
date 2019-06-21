import axios from 'axios';
import { Hue } from 'hue-sdk';
import config from '../config';

export const auth = () => {
  const createUser = async (username: string) => {
    try {
      const {
        data: [result],
      } = await axios.post(`http://${config.hue.host}:${config.hue.port || 80}/api`, { devicetype: username });

      if (result.error) {
        return [null, result.error.description];
      }

      return [result.success.username, null];
    } catch (error) {
      return [null, error.message];
    }
  };

  return {
    createUser,
  };
};

let client;

// Quick semi-"singleton" before the actual implementation
export const HueApi = (username: string) => {
  if (client) return client;

  client = new Hue({ host: config.hue.host, port: config.hue.port || 80, user: username });

  return client;
};
