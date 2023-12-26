import { CardEntity } from "../entities/card.entity";
import { TokenEntity } from "../entities/token.entity";

export interface TokenRepository {
  store (id: string, card: CardEntity): Promise<TokenEntity> | null;
  find (id: string): Promise<TokenEntity> | null;
}
