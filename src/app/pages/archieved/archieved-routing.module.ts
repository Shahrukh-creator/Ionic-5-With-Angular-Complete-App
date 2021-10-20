import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchievedPage } from './archieved.page';

const routes: Routes = [
  {
    path: '',
    component: ArchievedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchievedPageRoutingModule {}
