import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ManualSubscriptionComponent } from './manual-subscription.component';
import { ManualSubscriptionRoutingModule } from './manual-subscription-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DragScrollModule } from 'ngx-drag-scroll';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    ManualSubscriptionRoutingModule,
    CardModule,
    GridModule,
    IconModule,
    CommonModule,
    DocsComponentsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule, 
    MatCardModule, 
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,
    MatSelectModule,
    DragScrollModule,
    MatTableModule
  ],
  declarations: [
    ManualSubscriptionComponent ]
})
export class ManualSubscriptionModule {


}
