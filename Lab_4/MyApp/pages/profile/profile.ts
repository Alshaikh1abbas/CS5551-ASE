import { Component } from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Profile} from "../../models/profile";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {GoogleCloudVisionServiceProvider} from "../../providers/google-cloud-vision-service/google-cloud-vision-service";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile = {} as Profile;
  ProPicItems: FirebaseListObservable<any[]>;
  SaveProPicItems:FirebaseListObservable<any[]>;
  // @ts-ignore
  UploadPicItems: [];
  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertController,
    private  afDatabase: AngularFireDatabase,
    private afdb: AngularFireDatabase,
    public camera: Camera,
    private actionSheetCtrl: ActionSheetController) {

    this.afAuth.authState.take(1).subscribe(data => {
      // @ts-ignore
      this.ProPicItems = this.afDatabase.object(`/profile/${data.uid}`);
      // @ts-ignore
      this.SaveProPicItems = this.afDatabase.object(`/profile/${data.uid}`)
    });
      // this.afDatabase.list("profile/").subscribe(_data => {
      //   // @ts-ignore
      //   this.ProPicItems = _data;
      //   console.log(this.ProPicItems);
      // });
  }

  createProfile() {
    this.afAuth.authState.take(1).subscribe(auth =>{
      this.afDatabase.object(`profile/${auth.uid}`).set({Profile: this.profile, imageData: this.UploadPicItems})
        .then(()=> this.navCtrl.setRoot('TabsPage'))
    })
  }

  ProPictake1() {
    // @ts-ignore
    this.actionSheetCtrl.create({
      buttons:[
        {
          text: 'From Camera',
          handler: async () => {
            try {
              const options: CameraOptions = {
                quality: 50,
                targetHeight: 600,
                targetWidth: 600,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.PNG,
                mediaType: this.camera.MediaType.PICTURE,
              };
              this.camera.getPicture(options).then((imageData) => {
                // @ts-ignore
                this.ProsaveResults(imageData);
              }, err => {
                this.ProshowAlert(err);
              });
            }
            catch (e) {
              console.error(e);
            }
          }
        },
        {
          text: 'From Gallery',
          handler: async () => {
            try {
              const options: CameraOptions = {
                quality: 100,
                targetHeight: 500,
                targetWidth: 500,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.PNG,
              };
              this.camera.getPicture(options).then((imageData) => {
                // @ts-ignore
                this.ProsaveResults(imageData);
              }, err => {
                this.ProshowAlert(err);
              });
            }
            catch (e) {
              console.error(e);
            }
          }
        },
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log("The user has selected the cancel button");
          }
        }
      ]
    }).present();
  }

  ProsaveResults(imageData) {
    // this.ProPicItems.push({ imageData: imageData})
    this.UploadPicItems = imageData;
    this.afAuth.authState.take(1).subscribe(data => {
      // @ts-ignore
      this.SaveProPicItems = this.afDatabase.object(`profile/${data.uid}`).set({imageData: imageData})
        .then(_ => { })
        .catch(err => { this.ProshowAlert(err) });
    })
      // this.ProPicItems.set({imageData: imageData})

  }

  ProshowAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }




}
