import { Component } from '@angular/core';

import { BLE } from '@ionic-native/ble';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  statusMessage: string;
  devices: any[] = [];
  icons: string[];
  items: Array<{title: string, note: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private ble: BLE
  ) {
    this.items = [];
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  scanBLEDevices() {
    this.statusMessage = 'Scanning for Bluetooth LE Devices';

    this.devices = [] //clear list
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error));

    setTimeout(this.ble.stopScan, 5000, 'Scan complete');
  }

  private onDeviceDiscovered(device) {
    console.log('Discovered: ' + JSON.stringify(device, null, 2))
    this.devices.push(device);
    this.items.push({
      title: device.name || 'Unnamed',
      note: 'ID: ' + device.id + ' RSSI: ' + device.rssi
    });
  }

  private scanError(error: any) {

  }
}
