import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Client } from 'plaid';

export class Plaid {
  
}



@Injectable()
export class PlaidService {

  constructor(client: Client) {
/*
   client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      //prettyPrintResponse(error);
      //return response.json({
        //error: error,
     // });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
        //prettyPrintResponse(tokenResponse);

        //setPredictions(1,request,response,next)

         }); 
*/
  }
}
