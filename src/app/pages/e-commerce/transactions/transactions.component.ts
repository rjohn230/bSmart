import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { TransactionsService, Transaction } from '../../../@core/data/transactions.service';

@Component({
  selector: 'ngx-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class ECommerceUserTransactionsComponent implements OnInit {

  private alive = true;

  transactions: Transaction[] = [];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private transactionsService: TransactionsService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  ngOnInit() {
    this.getTransactions();
    console.log(this.transactions);
  }

  getTransactions() {
    this.transactionsService.getTransactionData()
      .subscribe(transactionsData => {
        this.transactions = transactionsData;
      });
  }
}
