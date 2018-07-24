import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'products',
    component: ListComponent
  },
  {
    path: 'products/new',
    component: NewComponent
  },
  {
    path: 'product/:ID',
    component: DetailsComponent,
  },
  {
    path: 'product/:ID/edit',
    component: EditComponent
  },
  {
    path: '',
    pathMatch:'full',
    redirectTo: 'products'
  },
  {
    path: '**',
    redirectTo: 'products'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
