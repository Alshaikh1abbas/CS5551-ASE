import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController,} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {


  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage) {
  }

}
