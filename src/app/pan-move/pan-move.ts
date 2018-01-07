import { Directive, Input, EventEmitter, Output, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';
import { UtilService } from 'meepo-core';
import { StoreService } from 'meepo-store';
import { UuidService } from 'meepo-uuid';

@Directive({ selector: '[panMove]' })
export class PanMoveDirective implements OnInit {
    position: string;
    width: string;
    height: string;
    point: any = {
        left: undefined,
        top: undefined
    };
    @HostListener('panstart', ['$event'])
    panstart(e: any) {
        this.checkStyle();
        this.getElementStyleSize(this.ele.nativeElement);
    }
    @HostListener('panmove', ['$event'])
    panmove(e: any) {
        this.moveElement(e.deltaX, e.deltaY);
    }
    @HostListener('panend', ['$event'])
    panend(e: any) {
        this.getElementStyleSize(this.ele.nativeElement);
        if (!this.util.isBlank(this.panMove) && this.panMove) {
            this.store.set(this.panMove, this.point);
        }
    }
    @Input() panMove: string;
    constructor(
        public ele: ElementRef,
        public render: Renderer2,
        public util: UtilService,
        public store: StoreService
    ) { }

    ngOnInit() {
        if (!this.util.isBlank(this.panMove) && this.panMove) {
            let point: any = this.store.get(this.panMove, this.point);
            if (!this.util.isBlank(point.left)) {
                this.ele.nativeElement.style.left = point.left + 'px';
                this.checkStyle();
            }
            if (!this.util.isBlank(point.top)) {
                this.ele.nativeElement.style.top = point.top + 'px';
                this.checkStyle();
            }
        }
        let styles = window.getComputedStyle(this.ele.nativeElement);
        this.position = styles.position;
        this.width = styles.width;
        this.height = styles.height;
    }

    checkStyle() {
        if (this.position !== 'absolute' && this.position !== 'fixed') {
            this.render.setStyle(this.ele.nativeElement, 'position', 'absolute');
            this.render.setStyle(this.ele.nativeElement, 'width', this.width);
            this.render.setStyle(this.ele.nativeElement, 'height', this.height);
        }
    }
    moveElement(x: number, y: number) {
        if (!this.util.isBlank(this.point.left)) {
            this.ele.nativeElement.style.left = (parseInt(this.point.left) + x) + 'px';
        }
        if (!this.util.isBlank(this.point.top)) {
            this.ele.nativeElement.style.top = (parseInt(this.point.top) + y) + 'px';
        }
    }
    getElementStyleSize(ele: HTMLElement) {
        this.point.top = ele.offsetTop + ele.parentElement.scrollTop;
        this.point.left = ele.offsetLeft + ele.parentElement.scrollLeft;
    }
}