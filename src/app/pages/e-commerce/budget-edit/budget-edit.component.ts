import { Component, OnInit } from '@angular/core';
import { Category } from '../../../@core/data/budget.service';

@Component({
  selector: 'ngx-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.scss']
})
export class BudgetEditComponent implements OnInit {

  categories: Category[];

  constructor() {}

  ngOnInit() {
    this.categories = [
      {
        "name": "Rent",
        "budgetPercent": 50
      },
      {
        "name": "Food",
        "budgetPercent": 40
      },
      {
        "name": "Entertainment",
        "budgetPercent": 10
      }
    ]
  }
}
