import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { CheckboxSimpleComponent } from './checkbox-simple/checkbox-simple.component';
import { CheckboxSliderComponent } from './checkbox-slider/checkbox-slider.component';
import { ConfirmPasswordedComponent } from './confirm-passworded/confirm-passworded.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DatePeriodPickerComponent } from './dateperiod-picker/dateperiod-picker.component';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { ErrorNotificationComponent } from './error-notification/errornotification.component';
import { HeadDesktopComponent } from './head-desktop/head-desktop.component';
import { HeadMobileComponent } from './head-mobile/head-mobile.component';
import { LangPanelComponent } from './lang-panel/lang-panel.component';
import { MenuComponent } from './menu/menu.component';
import { MsgDesktopComponent } from './msg-desktop/msg-desktop.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RadioSimpleComponent } from './radio-simple/radio-simple.component';
import {InputNumberComponent} from './input/input-number/input-number.component';
import {InputSearchComponent} from './input/input-search/input-search.component';
import {InputTextComponent} from './input/input-text/input-text.component';
import {AccordionComponent} from "./accordion/accordion.component";
import {QRCustomizeComponent} from "./qr-customize/qr-customize.component";
import {IconsComponent} from "./icons/icons.component";
import {QRPanelComponent} from "./qr-panel/qr-panel.component";
import {RechargeComponent} from './recharge/recharge.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        MenuComponent,
        PaginationComponent,
        HeadDesktopComponent,
        HeadMobileComponent,
        ErrorNotificationComponent,
        DatetimePickerComponent,
        DatePeriodPickerComponent,
        AlertComponent,
        ConfirmComponent,
        ConfirmPasswordedComponent,
        InputNumberComponent,
        InputSearchComponent,
        InputTextComponent,
        CheckboxSimpleComponent,
        CheckboxSliderComponent,
        MsgDesktopComponent,
        LangPanelComponent,
        RadioSimpleComponent,
        RechargeComponent,
        AccordionComponent,
        QRCustomizeComponent,
        QRPanelComponent,
        IconsComponent
    ],
    exports: [
        MenuComponent,
        PaginationComponent,
        HeadDesktopComponent,
        HeadMobileComponent,
        ErrorNotificationComponent,
        DatetimePickerComponent,
        DatePeriodPickerComponent,
        AlertComponent,
        ConfirmComponent,
        ConfirmPasswordedComponent,
        InputNumberComponent,
        InputSearchComponent,
        InputTextComponent,
        CheckboxSimpleComponent,
        CheckboxSliderComponent,
        MsgDesktopComponent,
        LangPanelComponent,
        RadioSimpleComponent,
        RechargeComponent,
        AccordionComponent,
        QRCustomizeComponent,
        QRPanelComponent,
        IconsComponent
    ],
})
export class CCModule {}
