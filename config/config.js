// config.js

module.exports = {
    development: {
      // Database configuration for development environment
      database: {
        username: 'postgres',
        password: 'password',
        database: 'shopify_plus_db', // Your database name
        host: 'localhost',
        dialect: 'postgres', // Or any other dialect you are using (e.g., 'mysql', 'sqlite')
      },
      // Other configurations for development environment
      // For example, you might want to set environment variables specific to development
    },
    production: {
      // Database configuration for production environment
      database: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres', // Or any other dialect you are using (e.g., 'mysql', 'sqlite')
      },
      // Other configurations for production environment
      // For example, you might want to set environment variables specific to production
    },
  };
  