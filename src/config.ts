interface Config {
  webcam: {
    imageUrl: string;
  };
  hue: {
    host: string;
  };
}

const config: Config = {
  webcam: {
    imageUrl: 'http://213.208.241.130:8080/image.jpg',
  },
  hue: {
    host: '192.168.1.137',
  },
}

export default config;
