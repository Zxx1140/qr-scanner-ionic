import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements AfterViewInit, OnDestroy {

  qrCodeString = 'This is a secret qr code message';
  scannedResult: any;



  constructor() { }
  ngAfterViewInit(): void {

  }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }

      document.body.classList.add("qrscanner");


      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.body.classList.remove("qrscanner");



      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    document.body.classList.remove("qrscanner");
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();

  }

  ngOnDestroy(): void {
    this.stopScan();
  }

}
