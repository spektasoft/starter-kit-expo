interface ServerConfig {
    host: string;
    port: number;
  }
  interface Config {
    server: ServerConfig;
    environment: string;
  }
  
  const config: Config = {
    server: {
      host: 'localhost',
      port: 500,
    },
    environment: process.env.NODE_ENV || 'development',
  };
  
  export default config;
