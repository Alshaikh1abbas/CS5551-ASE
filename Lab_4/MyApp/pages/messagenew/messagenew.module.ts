import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MessagenewPage } from './messagenew';

@NgModule({
  declarations: [
    MessagenewPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagenewPage),
    TranslateModule.forChild()
  ],
  exports: [
    MessagenewPage
  ]
})
export class InfoPageModule { }
