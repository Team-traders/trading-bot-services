interface MongoConfig {
  url: string;
  options?: {
    [key: string]: any;
  };
}

export default MongoConfig;
