import {
    Directive, HostListener,
    Input, ElementRef, Renderer2,
    EventEmitter, Output, OnInit
} from '@angular/core';
import { getEleAngle } from '../util';
@Directive({ selector: '[rotating]' })
export class RotatingDirective implements OnInit {
    @Input() rotating: string;
    @Output() rotatingChange: EventEmitter<any> = new EventEmitter();

    @HostListener('rotatemove', ['$event'])
    rotatemove(e: any) {
        this.rotate(e);
    }

    @HostListener('rotateend', ['$event'])
    rotateend(e: any) {
        let angle = getEleAngle(this.ele.nativeElement);
        this.angle = angle;
        this.rotatingChange.emit(this.angle);
    }

    matrixCtrl: any;
    matrix: any;
    angle: any;
    constructor(
        public ele: ElementRef,
        public render: Renderer2
    ) { }

    ngOnInit() {
        let angle = getEleAngle(this.ele.nativeElement);
        this.angle = angle;
        this.rotatingChange.emit(this.angle);
    }

    rotate(e: any) {
        this.render.setStyle(this.ele.nativeElement, 'transform', `rotate(${this.angle + e.angle * 2}deg)`);
    }

}