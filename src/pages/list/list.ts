import { Component } from '@angular/core';

import { BLE } from '@ionic-native/ble';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ble: BLE
  ) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  scanBLEDevices() {
    console.log('started to search');
    // this.ble.startScan([])
    //   .subscribe(device => {
    //     console.log(JSON.stringify(device));
    //     this.items.push({
    //       title: 'BLE device - ',
    //       note: 'Note',
    //       icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //     });
    //   });
		//
    // setTimeout(this.ble.stopScan,
    //   5000,
    //   function () {
    //     console.log("Scan complete");
    //   },
    //   function () {
    //     console.log("stopScan failed");
    //   }
    // );
  }

}
