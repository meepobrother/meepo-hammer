import {
  Component, ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  type: string;
  rotating: any;

  tap(e: any, event: any) {
    this.type = e;
    console.log(this.type);
  }

  doPanMove() {

  }

  rotateRefChange(e: any) {
    this.type = e;
  }

  tapRefChange(e: any) {
    this.type = e;
  }

}
