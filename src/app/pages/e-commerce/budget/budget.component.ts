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
      title: 'Food',
      budgetRemaining: '158.39',
      activeProgress: '70'
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
