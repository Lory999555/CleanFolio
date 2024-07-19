import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
import ScrollSmoother from 'gsap-trial/ScrollSmoother';
import { SmoothService } from '../smooth.service';
import gsap from 'gsap-trial';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  smoother: ScrollSmoother;
  constructor(SmoothService: SmoothService) {
    this.smoother = SmoothService.getSmooth();
  }

  ngAfterViewInit(): void {
    this.initScrollAnchor();
    this.initCursorEvent();
    // this.initCanvas();
    this.animateHome();
  }

  private initScrollAnchor() {
    document.querySelectorAll('[data-target]').forEach((element) => {
      element.addEventListener('click', (e) => {
        const id = (element as HTMLElement).dataset['target'];
        console.log(id);
        this.smoother.scrollTo(`#${id}`, true);
      });
    });
  }

  private initCursorEvent() {
    const cursor = document.getElementById('cursor')!;
    const shadow = document.getElementById('cursor-shadow')!;
    const clickable = document.querySelectorAll('a, button, .clickable')!;
    clickable.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('clickable');
        shadow.classList.add('clickable');
      });
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('clickable');
        shadow.classList.remove('clickable');
      });
    });
  }

  private initCanvas() {
    (async function () {
      const data = [
        { type: 'Design', value: 45 },
        { type: 'Intuitività', value: 35 },
        { type: 'Responsività', value: 25 },
      ];

      new Chart(document.getElementById('grafico') as HTMLCanvasElement, {
        type: 'doughnut',
        options: {
          animation:{
            duration: 4000
          }
        },
        data: {
          labels: data.map((row) => row.type),
          datasets: [
            {
              backgroundColor: [
                '#0f5c4e',
                '#118b75',
                '#8ce6d5'
                
              ],
              label: 'Priorità Web',
              data: data.map((row) => row.value),
            },
          ],
        },
      });
    })();
  }

  private animateHome() {
    /** intro Animation **/
    const introTl = gsap.timeline();
    introTl.from('.intro-p', { x: -500, duration: 1.5, ease: 'power2.out' });
    introTl.from('.intro-h1 span', {
      autoAlpha: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.5,
    });
    introTl.from(
      '#intro',
      { scale: 1.5, duration: 1.5, ease: 'power2.out' },
      0
    );

    /** features Animation **/
    const featuresTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#features',
        start: 'top 100%',
        end: 'bottom 100%',
        scrub: 1,
      },
    });
    featuresTl.from(
      '.features-left',
      {
        x: -1000,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 1,
      },
      0
    );
    featuresTl.from(
      '.features-right',
      {
        x: +1000,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 1,
      },
      0
    );

    /** canva animation **/
    const canvaTl = gsap.timeline({onStart: () => {
      this.initCanvas();
    },
      scrollTrigger: {
        trigger: '#grafico',
        start: 'top 80%',
        end: 'bottom 100%',
      },
    });
    canvaTl.from('#grafico', {
      autoAlpha: 0,
      duration: 3,
      ease: 'power2.out',
    });
    

    /** feedback animation*/
    const feedbackTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#reviews',
        start: '25% 50%',
        end: '85% 50%',
        scrub: 1,
      },
    });
    feedbackTl.to('.horizontal-wrapper', {
      xPercent: -110,
      duration: 1.5,
    });

    /** action animation */
    const actionTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#action',
        start: '25% 50%',
        end: 'bottom 50%',
      },
    });
    actionTl.from('#action img', {
      y: 1000,
      autoAlpha: 0,
      duration: 1,
      ease: 'power4.out',
    });

    /** price animation */
    const priceTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#price',
        start: 'top 50%',
        end: 'bottom 50%',
      },
    });
    priceTl.from('#price .card', {
      autoAlpha: 0,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.8,
    });
  }
}
