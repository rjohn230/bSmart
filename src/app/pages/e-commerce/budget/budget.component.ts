import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  categories = [
    {
      title: 'Entertainment',
      budgetRemaining: '35.03',
      activeProgress: '40'
    },
    {
      title: 'Groceries',
      budgetRemaining: '158.39',
      activeProgress: '70'
    },
    {
      title: 'Shopping',
      budgetRemaining: '20.21',
      activeProgress: '30'
    },
    {
      title: 'Restaurants',
      budgetRemaining: '54.70',
      activeProgress: '60'
    },
    {
      title: 'Rent',
      budgetRemaining: '0.00',
      activeProgress: '100'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
