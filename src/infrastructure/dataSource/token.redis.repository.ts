import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from "../../types"; 
import { CardEntity } from "../../domain/entities/card.entity";
import { TokenEntity } from "../../domain/entities/token.entity";
import { TokenRepository } from "../../domain/repositories/token.repository";
import Redis from "ioredis";

@injectable()
export class TokenRedisRepository implements TokenRepository {
  clientRedis = new Redis("redis://default:9d4f8c7664cb4300b2c5303d2c3e6d14@us1-absolute-aphid-37508.upstash.io:37508");

  async store(id: string, card: CardEntity): Promise<TokenEntity> {
    let token = new TokenEntity(id, JSON.stringify(card));
    await this.clientRedis.set(id, JSON.stringify(card), "EX", 60000);
    return token;
  }

  async find(id: string): Promise<TokenEntity> {
    let data = await this.clientRedis.get(id) || '';
    let token = new TokenEntity(id, data);
    return token;
  }
}
