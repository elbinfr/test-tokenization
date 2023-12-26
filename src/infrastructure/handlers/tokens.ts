import container from "../../inversify.config";
import TYPES from "../../types";
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Redis from "ioredis";

import { CardEntity } from "../../domain/entities/card.entity"; 
import { TokenUseCase } from "../../application/tokenUseCase";

export const store = async (event): Promise<APIGatewayProxyResult>  => {
  let body = JSON.parse(event.body);
  let card = new CardEntity();
  try {
    card.setCardNumber = body.card_number;
    card.setCvv = body.cvv;
    card.setExpirationMonth = body.expiration_month;
    card.setExpirationYear = body.expiration_year;
    card.setEmail = body.email;

    let tokenUseCase = container.get<TokenUseCase>("TokenUseCase");
    let tokenCreated = await tokenUseCase.storeToken(card);

    return {
      statusCode: 201,
      body: JSON.stringify({token: tokenCreated})
    }

  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: error.message})
    }
  }
}

export const show = async (event): Promise<APIGatewayProxyResult> => {
  let tokenUseCase = container.get<TokenUseCase>("TokenUseCase");
  let params = event.queryStringParameters;

  try {
    let token = await tokenUseCase.getToken(params.token);

    return {
      statusCode: 200,
      body: JSON.stringify(token)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message
      })
    }
  }
}
