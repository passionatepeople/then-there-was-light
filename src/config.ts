interface Config {
  webcam: {
    imageUrl: string
  };
  hue: {
    host: string
    port?: number
  };
}

const config: Config = {
  webcam: {
    imageUrl: 'http://213.208.241.130:8080/image.jpg',
  },
  hue: {
    host: '213.208.241.130',
    port: 8081,
  },
}

export default config;
