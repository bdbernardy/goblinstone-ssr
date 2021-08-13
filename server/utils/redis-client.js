const redis = require("redis");
const {promisify} = require("util");

class RedisClient {
  constructor() {
    this.client = redis.createClient(6380, process.env.REDISCACHEHOSTNAME, {
      auth_pass: process.env.REDISCACHEKEY,
      tls: {
        servername: process.env.REDISCACHEHOSTNAME
      }
    });

    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.setexAsync = promisify(this.client.setex).bind(this.client);
  }

  set = async (key, value, expires = Infinity) => {
    if (!expires || !(Number.isInteger(expires) || expires === Infinity)) {
      throw new Error('The expire argument must either be Infinity or an integer');
    }
    
    if (expires === Infinity) {
      return await this.setAsync(key, value);
    } else {
      return await this.setexAsync(key, expires, value);
    }
  };

  get = async (key) => {
    return await this.getAsync(key);
  }
}

module.exports = new RedisClient();
