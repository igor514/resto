import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {PaymentSettingsPage} from './payment.settings.page';
import {CCModule} from "../../common.components/cc.module";

const routing = RouterModule.forChild([
  {path: "", component: PaymentSettingsPage, pathMatch: "full"},
]);

@NgModule({
  imports: [
    routing,
    FormsModule,
    CommonModule,
    CCModule,
  ],
  declarations: [
    PaymentSettingsPage,
  ],
  providers: [],
})
export class PaymentSettingsModule {
}
