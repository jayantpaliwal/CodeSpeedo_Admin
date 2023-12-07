import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { UserdetailsComponent } from './userdetails.component';
import { UserdetailsRoutingModule } from './userdetails-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';

@NgModule({
  imports: [
    UserdetailsRoutingModule,
    CardModule,
    GridModule,
    IconModule,
    CommonModule,
    DocsComponentsModule
  ],
  declarations: [
    UserdetailsComponent  ]
})
export class UserdetailsModule {
}
