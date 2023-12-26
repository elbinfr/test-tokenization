import { injectable, inject } from "inversify";
import jwt from 'jsonwebtoken';
import { CardEntity } from '../domain/entities/card.entity';
import { TokenRepository } from "../domain/repositories/token.repository";
import TYPES from "../types";

@injectable()
export class TokenUseCase {
  private secretKey = 'my_secret_key';

  constructor (@inject(TYPES.TokenRepository) private tokenRepository: TokenRepository) {}

  public async storeToken (card: CardEntity) {
    const token = jwt.sign({data: card}, this.secretKey, {expiresIn: "1m"});
    await this.tokenRepository.store(token, card);
    return token;
  }

  public async getToken (id: string) {
    try {
      jwt.verify(id, this.secretKey);
      let token = await this.tokenRepository.find(id);
      let data = JSON.parse(token.data);

      return {
        card_number: data.card_number,
        expiration_month: data.expiration_month,
        expiration_year: data.expiration_year,
        email: data.email
      };

    } catch (error) {
      let message = error.message;
      if (error instanceof jwt.TokenExpiredError) {
        message = "el token a expirado";
      }else if (error instanceof jwt.JsonWebTokenError) {
        message = "el token es inválido";
      }
      throw new Error(message);
    }
  }

}
