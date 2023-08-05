import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CCModule} from 'src/app/common.components/cc.module';
import {CreateFloorsPage} from './pages/create/create.floors.page';
import {EditFloorsPage} from './pages/edit/edit.floors.page';
import {IndexFloorsPage} from './pages/index/index.floors.page';
import {IndexFloorsService} from './pages/index/index.floors.service';
import {FloorComponent} from './components/floor/floor.component';

const routes = RouterModule.forChild([
  {path: '', component: IndexFloorsPage, pathMatch: 'full'},
  {path: 'create', component: CreateFloorsPage, pathMatch: 'full'},
  {path: 'edit/:id', component: EditFloorsPage},
  {path: '**', redirectTo: '/floors'},
]);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    routes,
    CCModule,
  ],
  declarations: [
    IndexFloorsPage,
    CreateFloorsPage,
    EditFloorsPage,
    FloorComponent,
  ],
  providers: [
    IndexFloorsService,
  ],
})
export class FloorsModule {
}
