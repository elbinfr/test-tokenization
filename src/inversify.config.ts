import "reflect-metadata";

import { Container } from "inversify";
import TYPES from "./types";

//domain
import { TokenRepository } from "./domain/repositories/token.repository";

//application
import { TokenUseCase } from "./application/tokenUseCase";

//infrastructure
import { TokenRedisRepository } from "./infrastructure/dataSource/token.redis.repository";

const container: Container = new Container();

container.bind<TokenRepository>(TYPES.TokenRepository).to(TokenRedisRepository);
container.bind<TokenUseCase>(TYPES.TokenUseCase).to(TokenUseCase);

export default container;
