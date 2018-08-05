import { Component, NgZone } from '@angular/core';

import { BLE } from '@ionic-native/ble';
import { NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
// import * as ByteBuffer from 'bytebuffer';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  statusMessage: string;
  accelerometryData = '';
  devices: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private ngZone: NgZone,
    private ble: BLE,
    private bluetoothSerial: BluetoothSerial
  ) {
  }

  deviceSelected(device) {
    console.log('Connecting to ' + device.name || device.id);

    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    );

  }

  scanBLEDevices() {
    this.statusMessage = 'Scanning for Bluetooth LE Devices';

    this.devices = []; //clear list
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error));

    // setTimeout(this.ble.stopScan(), 5000, 'Scan complete');
  }

  private onDeviceDiscovered(device) {
    console.log('Discovered: ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  private scanError(error: any) {
    console.log('Error : ' + error);
  }

  pairActibelt() {
    console.log("Trying to connect to Actibelt");
    this.statusMessage = 'Trying to connect to Actibelt';

    this.bluetoothSerial.connectInsecure("A0:E6:F8:68:0F:CD").subscribe(
      data =>  this.onConnected(data),
      data =>  this.onDeviceDisconnected(data));
  }

  private onConnected(peripheral: any) {
    console.log("SUCCESS - Actibelt connected");
    this.ngZone.run(() => {
      this.statusMessage = 'SUCCESS - Actibelt connected';
    });


    /**
     * Wraps a buffer or a string. Sets the allocated ByteBuffer's ByteBuffer#offset to 0 and its ByteBuffer#limit to the length of the wrapped data.
     * @param buffer Anything that can be wrapped
     * @param encoding String encoding if buffer is a string ("base64", "hex", "binary", defaults to "utf8")
     * @param littleEndian Whether to use little or big endian byte order. Defaults to ByteBuffer.DEFAULT_ENDIAN.
     * @param noAssert Whether to skip assertions of offsets and values. Defaults to ByteBuffer.DEFAULT_NOASSERT.

  static wrap( buffer: ByteBuffer | ArrayBuffer | Uint8Array | string, enc?: string | boolean, littleEndian?: boolean, noAssert?: boolean ): ByteBuffer;
     */

    // this.bluetoothSerial.subscribeRawData().subscribe((dt) => {
    //   this.bluetoothSerial.read().then((dd) => {
    //     let rawStream = new ByteBuffer(6, true, false);
    //     let byteBuffer: ByteBuffer = ByteBuffer.wrap(rawStream, "hex", ByteBuffer.LITTLE_ENDIAN, ByteBuffer.DEFAULT_NOASSERT);
    //     console.log("X: " + byteBuffer.readShort(0) + "Y: " + byteBuffer.readShort(1) + "Z: " + byteBuffer.readShort(2));
		//
    //     console.log("Inside READ" + dd);
    //     this.ngZone.run(() => {
    //       this.accelerometryData = dd;
    //     });
    //   });
    // });


  }

  private onDeviceDisconnected(data: any) {
    console.log("Error - Actibelt not connected");
    this.ngZone.run(() => {
      this.statusMessage = 'Error - Actibelt not connected';
    });

  }

}
