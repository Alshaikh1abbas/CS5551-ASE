import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { APIInfoPage } from './APIinfo';

@NgModule({
  declarations: [
    APIInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(APIInfoPage),
  ],
})
export class APIInfoPageModule {}
