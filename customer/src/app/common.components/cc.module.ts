import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { CartPanelComponent } from './cart-panel/cart-panel.component';
import { CheckboxSimpleComponent } from './checkbox-simple/checkbox-simple.component';
import { CheckboxSliderComponent } from './checkbox-slider/checkbox-slider.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ErrorNotificationComponent } from './error-notification/errornotification.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderComponent } from './header/header.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InvoicePanelComponent } from './invoice-panel/invoice-panel.component';
import { LangPanelComponent } from './lang-panel/lang-panel.component';
import { RadioSimpleComponent } from './radio-simple/radio-simple.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ErrorNotificationComponent,        
        AlertComponent,
        ConfirmComponent,
        InputNumberComponent,
        CheckboxSimpleComponent,
        CheckboxSliderComponent,
        HeaderComponent,
        FooterComponent,
        GalleryComponent,
        CartPanelComponent,
        InvoicePanelComponent,
        RadioSimpleComponent,
        LangPanelComponent,
    ],
    exports: [
        ErrorNotificationComponent,        
        AlertComponent,
        ConfirmComponent,
        InputNumberComponent,
        CheckboxSimpleComponent,
        CheckboxSliderComponent,
        HeaderComponent,
        FooterComponent,
        GalleryComponent,
        CartPanelComponent,
        InvoicePanelComponent,
        RadioSimpleComponent,
        LangPanelComponent,
    ],    
})
export class CCModule {}
