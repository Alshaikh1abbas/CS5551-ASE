import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {IonicPage, IonicPageModule} from 'ionic-angular';

import { ItemCreatePage } from './item-create';

@IonicPage()
@NgModule({
  declarations: [
    ItemCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    ItemCreatePage
  ]
})
export class ItemCreatePageModule { }
