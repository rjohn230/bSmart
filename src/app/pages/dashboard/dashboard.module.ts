import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { TeamComponent } from './team/team.component';
import { KittenComponent } from './kitten/kitten.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { PlayerComponent } from './rooms/player/player.component';
import { ECommerceUserTransactionsComponent } from './transactions/transactions.component';
import { TransactionsService } from '../../@core/data/transactions.service';
import { BudgetComponent } from './budget/budget.component';
import { BudgetEditComponent } from './budget-edit/budget-edit.component';
import { BudgetService } from '../../@core/data/budget.service';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ContactsComponent,
    RoomSelectorComponent,
    RoomsComponent,
    TeamComponent,
    KittenComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    PlayerComponent,
    ECommerceUserTransactionsComponent,
    BudgetComponent,
    BudgetEditComponent,
  ],
  providers: [
    TransactionsService,
    BudgetService
  ]
})
export class DashboardModule { }
