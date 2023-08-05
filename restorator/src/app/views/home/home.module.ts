import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CCModule} from "src/app/common.components/cc.module";
import {HomePage} from "./home.page";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CCModule,
  ],
  declarations: [
    HomePage,
  ],
})
export class HomeModule {
}
