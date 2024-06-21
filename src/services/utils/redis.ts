import Redis from 'ioredis'

const redisAddress = process.env.REDIS_ADDRESS || 'localhost:6379'
const redisPassword = process.env.REDIS_PASSWORD || ''
const redisDb = process.env.REDIS_DB || '0'

const redis = new Redis({
  host: redisAddress.split(':')[0], // Redis host
  port: parseInt(redisAddress.split(':')[1]), // Redis port
  password: redisPassword, // Redis password
  db: parseInt(redisDb), // Redis db
})

export default redis
