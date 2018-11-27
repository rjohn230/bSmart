import { Component, OnInit } from '@angular/core';
import { Category } from '../../../@core/data/budget.service';

@Component({
  selector: 'ngx-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.scss']
})
export class BudgetEditComponent implements OnInit {

  categories = new Category("Food", 30);

  constructor() {}

  ngOnInit() {
  }

}
