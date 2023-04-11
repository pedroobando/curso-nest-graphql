export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV,
  // hostapi: process.env.HOST_API,
  defaultLimitPage: +process.env.DEFAULT_LIMIT_PAGE || 10,
  database: {
    host: process.env.DB_HOST,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
});
