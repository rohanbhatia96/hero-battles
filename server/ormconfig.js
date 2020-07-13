module.exports = {
   "type": "postgres",
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "database": process.env.DB_NAME,
   "username": process.env.DB_USER,
   "password": process.env.DB_PWD,
   "extra": {
      "ssl": true
   },
   "synchronize": true,
   "logging": true,
   "entities": [
      "src/entity/*.*"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}