import {APIGatewayEvent, APIGatewayProxyResult, APIGatewayProxyHandler, APIGatewayProxyEvent, Context} from "aws-lambda";
import { store, show } from '../src/infrastructure/handlers/tokens';

describe ('test token', () => {

  test('should get REST response object', async () => {

    const body = {"card_number": "4474097358594997",
      "cvv": "123",
      "expiration_month": "10",
      "expiration_year": "2024",
      "email": "elbin@gmail.com"
    }

    const event = {body: JSON.stringify(body)};

    const res:APIGatewayProxyResult = await store(event);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual("{\"token\":\"default-default\"}" );
    expect(JSON.parse(res.body)).toEqual({ token : "default-default" });

    expect( await store( event ) ).toEqual(  {
      "statusCode": 201,
      "body": "{\"token\":\"default-default\"}"
    } );
  });

});
