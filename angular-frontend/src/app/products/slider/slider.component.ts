import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {

  slideIndex = 1;
  timer: any;

  constructor() { }

  ngOnInit(): void {
    this.showSlides(this.slideIndex);
    //this.makeTimer();
  }

  showSlides(n: number) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      if (slide instanceof HTMLElement) {
        slide.style.display = "none";
      }
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace("active", "");
    }

    const slide = slides[this.slideIndex - 1];
    if (slide instanceof HTMLElement) {
      slide.style.display = "block";
    }
    dots[this.slideIndex - 1].className += " active";
  }

  plusSlides(n: number) {
    this.slideIndex += n;
    this.showSlides(this.slideIndex);
    //this.makeTimer();
  }

  currentSlide(n: number) {
    this.slideIndex = n;
    this.showSlides(n);
    //this.makeTimer();
  }

  makeTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(()=> {
      this.slideIndex++;
      this.showSlides(this.slideIndex);
    },5000);
  }
}
