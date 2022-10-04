import { Component, OnInit } from '@angular/core';
import { navigatorHelper } from 'src/app/libs/helpers/navigator.helper';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {

  public position: any = {};
  public time: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  getLocation() {
    navigatorHelper.getLocation().then(
      location => {
        console.log('location > ',location);
      }).catch(err => {
        console.log('err > ',err);
      })
  }

  getLocationC() {
    navigatorHelper.getLocationC(
      position => {
        console.log(position);
        this.position = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        },
        //this.time = new Date(this.time = position.timestamp).toLocaleDateString()
        this.time = position.timestamp
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit(){
    console.log(this.position, '>' , this.time);
  }

  start(video: HTMLVideoElement, stop: HTMLButtonElement){
    console.log('>>>', video);
    navigatorHelper.startRecord(video, stop)
    
  }

  getDevices(){
    navigatorHelper.getDevices()
  }

  getAudio(audio: HTMLAudioElement, stop: HTMLButtonElement){
    navigatorHelper.getAudio(audio, stop)
  }
}
