import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';

export class Transaction {
  amount: number;
  date: string;
  name: string;
  category: string;
}

@Injectable()
export class TransactionsService {

  data = {};

  constructor() {
    this.data = {
      transactions: [
        {
            "amount": 78.5,
            "date": "2018-11-07",
            "name": "Golden Crepes",
            "category": "Restaurants",
        },
        {
            "amount": 500.0,
            "date": "2018-11-05",
            "name": "United Airlines",
            "category": "Travel",
        },
        {
            "amount": 5.4,
            "date": "2018-10-23",
            "name": "Uber 063015 SF**POOL**",
            "category": "Travel",
        },
        {
            "amount": 4.33,
            "date": "2018-10-20",
            "name": "Starbucks",
            "category": "Restaurants",
        }
      ]
    };
  }

  getTransactionData(): Observable<Transaction[]> {
    return observableOf(this.data['transactions']);
  }
}
