import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import { Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root } from '../';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {Profile} from "../../models/profile";
import {AngularFireAuth} from "angularfire2/auth";
import 'rxjs/add/operator/take';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  tab5Title = " ";

  profileData: FirebaseObjectObservable<Profile>;

  constructor(
    private toast: ToastController,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE', "TAB5_TITLE"]).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
      this.tab4Title = values['TAB4_TITLE'];
      this.tab5Title = values['TAB5_TITLE'];
    });
  }
  ionViewWillLoad() {
    this.afAuth.authState.take(1).subscribe(data =>{
      if(data && data.email && data.uid) {
        this.toast.create({
          message: "Welcome to DealSuperior",
          duration: 1000
        }).present();
        this.profileData = this.afDatabase.object(`profile/${data.uid}`)
      }
      else {
        this.toast.create({
          message: 'Could not find authentication details',
          duration: 1000
        }).present();
      }
    });
  }


}
