import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursorService {
  constructor() {
    const cursor = document.getElementById('cursor')!;
    const shadow = document.getElementById('cursor-shadow')!;

    const coords = {
      x: 0,
      y: 0,
    };
    const prevCoords = {
      x: 0,
      y: 0,
    };

    window.addEventListener('mousemove', function (e) {
      // console.log(e.clientX, e.clientY)
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function update() {
      cursor.style.top = `${coords.y}px`;
      cursor.style.left = `${coords.x}px`;

      const y = lerp(prevCoords.y, coords.y, 0.3);
      const x = lerp(prevCoords.x, coords.x, 0.3);

      shadow.style.top = `${y}px`;
      shadow.style.left = `${x}px`;

      prevCoords.x = x;
      prevCoords.y = y;

      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    function lerp(a: number, b: number, t: number) {
      return a * (1 - t) + b * t;
    }
  }
}
