import  { Component, Input, Renderer, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'top-button',
  template: `
  <a (click)='moveTop(duration)' href='#'
  class='btn-floating btn-large waves-effect waves-light red blue darken-4'>
  <i class='material-icons'>
    <i class='material-icons'>arrow_upward</i>
  </i>
  </a>
`,
  styleUrls: ['./top-button.component.scss']
})
export class TopButtonComponent {
  @Input() duration;
  windowScrollPosition = 0;
  elementObj: any;

  constructor(private renderer: Renderer, public element: ElementRef) {
    this.renderer.listenGlobal('window', 'scroll', (evt) => {
       this.windowScrollPosition = window.scrollY;
       this.elementObj = this.element.nativeElement.querySelector('a');
       if (this.windowScrollPosition) {
         this.elementObj.style.top = '20px';
         this.elementObj.style.visibility = 'visible';
       } else {
         this.elementObj.style.visibility = 'hidden';
         this.elementObj.style.top = '-100px';
       }
     });
  }

  moveTop(duration) {
    event.preventDefault();
    const   scrollHeight = window.scrollY,
        scrollStep = Math.PI / ( duration / 15 ),
        cosParameter = scrollHeight / 2;
    let     scrollCount = 0,
        scrollMargin,
        scrollInterval = setInterval( function() {
            if ( window.scrollY !== 0 ) {
                scrollCount = scrollCount + 1;
                scrollMargin = cosParameter -
                cosParameter * Math.cos( scrollCount * scrollStep );
                window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
            } else {
              clearInterval(scrollInterval);
            }
        }, 15 );
  }
}
