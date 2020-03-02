import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { InfoPage } from './info';

@NgModule({
  declarations: [
    InfoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPage),
    TranslateModule.forChild()
  ],
  exports: [
    InfoPage
  ]
})
export class InfoPageModule { }
