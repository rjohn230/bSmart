import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';

export class Category {
    name: string;
    budgetPercent: number;
}

export class Budget {
    total: number;
    categories: Category[];
}

@Injectable()
export class BudgetService {
    data = {};

    constructor() {
        this.data = {
            budget: {
                "total": 1000.0,
                "categories": [
                    {
                        "name": "Rent",
                        "budgetPercent": 0.5
                    },
                    {
                        "name": "Food",
                        "budgetPercent": 0.4
                    },
                    {
                        "name": "Entertainment",
                        "budgetPercent": 0.1
                    }
                ]
            }
        };
    }
}