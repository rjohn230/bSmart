import { Component, OnInit, } from '@angular/core';
import { Category, BudgetService,  } from '../../../@core/data/budget.service';

@Component({
  selector: 'ngx-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.scss']
})
export class BudgetEditComponent implements OnInit {

  categories: Category[];
  totalPercent: number;
  category: Category;
  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.categories = this.budgetService.getCategories();
    this.category = new Category("",0);

    this.updateTotalPercent();
  }

  updateTotalPercent() {
    let total = 0;
    this.categories.forEach(element => {
      total += Number(element.budgetPercent);
    });
    this.totalPercent = total;
  }

  onSubmit() {
    console.log("submitted: "+ this.category.name);
    this.budgetService.addCategory(this.category);
    this.category = new Category("",0);
  }

  onDeleteClicked(category: Category) {
    
    console.log(category.name)
    this.category
  }
}
