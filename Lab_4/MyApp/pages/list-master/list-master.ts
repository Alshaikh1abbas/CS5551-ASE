import { Component } from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController} from 'ionic-angular';
import { MovieService } from "../../services/rest/movie-service";
import { APIInfoPage } from "../APIinfo/APIinfo";
import {Camera, CameraOptions} from "@ionic-native/camera";
import firebase from "firebase";

import { GoogleCloudVisionServiceProvider} from "../../providers/google-cloud-vision-service/google-cloud-vision-service";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {getResponseURL} from "@angular/http/src/http_utils";

// @ts-ignore
@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  Dresult=[];
  apiItems: Array<any>;
  private picdata: any;
  private picfire: firebase.storage.Reference;
  private mypicurl: string;

  PicItems: FirebaseListObservable<any[]>;
  constructor(
    private vision: GoogleCloudVisionServiceProvider,
    private afdb: AngularFireDatabase,
    private alert: AlertController,
    public navCtrl: NavController,
    private movieService: MovieService,
    public camera: Camera,
    private actionSheetCtrl: ActionSheetController) {

    this.PicItems = afdb.list('items');
  }
  Pictake1() {
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
                this.vision.getLabels(imageData).subscribe((result) => {
                  this.saveResults(imageData, result);
                }, err => {
                  this.showAlert(err);
                });
              }, err => {
                this.showAlert(err);
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
                this.vision.getLabels(imageData).subscribe((result) => {
                  // @ts-ignore
                  //this.Dresult = result.responses[0].labelAnnotations;
                  this.Dresult =  result.responses[0].webDetection.webEntities;
                  this.saveResults(imageData, this.Dresult);
                  }, err => {
                  this.showAlert(err);
                });
              }, err => {
                this.showAlert(err);
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

  private uid(): any {
    var d =new Date().getTime();
    // @ts-ignore
    var uid1 = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uid1;
  }

  searchForapiItems(event, key) {
    if(event.target.value.length > 2) {
      this.movieService.searchapiItems(event.target.value).subscribe(
        data => {
          this.apiItems = data.items;
          console.log(data);
        },
        err => {
          console.log(err);
        },
        () => console.log('Product Search Complete')
      );
    }
  }

  selectapiItem(event, apiItem) {
    console.log(apiItem);
    this.navCtrl.push(APIInfoPage, {
      apiItem: apiItem
    });
  }

  saveResults(imageData, results) {
    this.PicItems.push({ imageData: imageData, results: results})
      .then(_ => { })
      .catch(err => { this.showAlert(err) });
  }
  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  deleteResult(i) {
    this.afdb.list("/items/").remove(this.PicItems[i]);
  }


}


