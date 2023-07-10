import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  images = [
    'assets/images/1.jpg',
    'assets/images/2.jpg',
    'assets/images/3.jpg',
    'assets/images/4.jpg',
  ];



  qrCodeString = 'This is a secret qr code message';
  scannedResult: any;


  swiperSlideChange(e: any) {
    console.log('change', e);
  }


  constructor() { }

  SwiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;


  }

  swiperSlideChang(e: any) {
    console.log('change: ', e);
  }

  ngOnInit(): void {

  }
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
