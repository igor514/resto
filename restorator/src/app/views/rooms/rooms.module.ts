import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CCModule} from 'src/app/common.components/cc.module';
import {IndexRoomsPage} from './pages/index/index.rooms.page';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RoomComponent} from './components/room/room.component';
import {CreateRoomComponent} from './components/create-room/create-room.component';

const routes = RouterModule.forChild([
  {path: '', component: IndexRoomsPage, pathMatch: 'full'},
  {path: '**', redirectTo: '/rooms'},
]);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DragDropModule,
    routes,
    CCModule,
  ],
  declarations: [
    IndexRoomsPage,
    CreateRoomComponent,
    RoomComponent,
  ],
})
export class RoomsModule {
}
