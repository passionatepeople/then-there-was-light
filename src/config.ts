interface Config {
  webcam: {
    imageUrl: string
    updateInterval?: number
  };
  hue: {
    host: string
    port?: number
  };
}

const config: Config = {
  webcam: {
    imageUrl: 'http://192.168.1.130/image.jpg',
    updateInterval: 100, // ms
  },
  hue: {
    host: '192.168.1.137',
  },
}

export default config;
