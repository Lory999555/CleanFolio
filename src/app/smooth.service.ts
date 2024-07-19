import { Injectable } from '@angular/core';
import gsap from 'gsap-trial';
import ScrollSmoother from 'gsap-trial/ScrollSmoother';
import ScrollTrigger from 'gsap-trial/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class SmoothService {
  smooth: ScrollSmoother;

  constructor() {
    console.log('SmoothService constructor');
    this.smooth = ScrollSmoother.create({
      smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });
   }

   getSmooth(){
    return this.smooth;
   }
}
