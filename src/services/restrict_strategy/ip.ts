import RestrictStrategy from './base'
import redis from '../utils/redis'

const MAX_USE_COUNT = 2

export default class IpStrategy implements RestrictStrategy {
  async canVisit(ipAddress: string, funName: string): Promise<boolean> {
    if(ipAddress === undefined || ipAddress === '') {
      return false
    }
    
    const key = `${funName}_${ipAddress}`
    const count = await redis.get(key)
    // console.log('count ->', count)
    if (count === null) {
      await redis.set(key, '1', 'EX', 60 * 60 * 24 * 1)
      return true
    } else if (parseInt(count) >= MAX_USE_COUNT) {
      return false
    }
    await redis.incr(key)

    return true
  }
}
