import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';

export class Category {
    constructor(
        public name: string,
        public budgetPercent: number
    ) {}
}

export class Budget {
    total: number;
    categories: Category[];
}

@Injectable()
export class BudgetService {
    categories: Category[];

    data = {};

    constructor() {
        this.categories = [
            {
                "name": "Rent",
                "budgetPercent": 45
            },
            {
                "name": "Groceries",
                "budgetPercent": 30
            },
            {
                "name": "Restaurants",
                "budgetPercent": 10
            },
            {
                "name": "Entertainment",
                "budgetPercent": 5
            },
            {
                "name": "Shopping",
                "budgetPercent": 10
            }
        ]
    }
    
    getCategories(): Category[] {
        return this.categories;
    }

    addCategory(category: Category) {
        this.categories.unshift(category);
    }
}