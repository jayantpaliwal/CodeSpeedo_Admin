import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManualSubscriptionComponent } from './manual-subscription.component';

const routes: Routes = [
  {
    path: '',
    component: ManualSubscriptionComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualSubscriptionRoutingModule {
}
