import { Component } from '@angular/core';

/**
 * Generated class for the ReviewDescComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'review-desc',
  templateUrl: 'review-desc.html'
})
export class ReviewDescComponent {

  text: string;

  constructor() {
    console.log('Hello ReviewDescComponent Component');
    this.text = 'Hello World';
  }

}
