import { Component, OnInit } from '@angular/core';
import { Category } from '../../../@core/data/budget.service';

@Component({
  selector: 'ngx-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.scss']
})
export class BudgetEditComponent implements OnInit {

  categories: Category[];
  totalPercent: number;

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
    this.updateTotalPercent();
  }

  updateTotalPercent() {
    let total = 0;
    this.categories.forEach(element => {
      total += Number(element.budgetPercent);
    });
    this.totalPercent = total;
  }

  
}
