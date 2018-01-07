import {
    Directive, Input, EventEmitter, Output,
    HostListener, ElementRef, Renderer2, OnInit,
    HostBinding, ChangeDetectorRef
} from '@angular/core';
import { UtilService } from 'meepo-core';
import { StoreService } from 'meepo-store';
import { UuidService } from 'meepo-uuid';

@Directive({ selector: '[panMove]' })
export class PanMoveDirective implements OnInit {
    _position: any;
    width: string;
    height: string;
    _point: any = {
        right: undefined,
        bottom: undefined
    };

    // @HostBinding('style.left.px') _left: number;
    // @HostBinding('style.right.px') _right: number;
    // @HostBinding('style.top.px') _top: number;
    // @HostBinding('style.bottom.px') _bottom: number;

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
    // 位置
    _pointSetting: any = {};
    @Input()
    set point(val: any) {
        this._point = val;
        this.initSetting();
    }
    get point() {
        return this._point;
    }

    constructor(
        public ele: ElementRef,
        public render: Renderer2,
        public util: UtilService,
        public store: StoreService,
        public cd: ChangeDetectorRef
    ) { }

    initSetting() {
        if (!this.util.isBlank(this._point.left)) {
            this._pointSetting.left = true;
        } else {
            this._pointSetting.left = false;
        }
        if (!this.util.isBlank(this._point.right)) {
            this._pointSetting.right = true;
        } else {
            this._pointSetting.right = false;
        }
        if (!this.util.isBlank(this._point.bottom)) {
            this._pointSetting.bottom = true;
        } else {
            this._pointSetting.bottom = false;
        }
        if (!this.util.isBlank(this._point.top)) {
            this._pointSetting.top = true;
        } else {
            this._pointSetting.top = false;
        }
    }

    initStyle() {
        if (this._pointSetting.left) {
            this.render.setStyle(this.ele.nativeElement, 'left', this._point.left);
        }
        if (this._pointSetting.right) {
            this.render.setStyle(this.ele.nativeElement, 'right', this._point.right);
        }
        if (this._pointSetting.bottom) {
            this.render.setStyle(this.ele.nativeElement, 'bottom', this._point.bottom);
        }
        if (this._pointSetting.top) {
            this.render.setStyle(this.ele.nativeElement, 'top', this._point.top);
        }
        this.cd.markForCheck();
    }

    ngOnInit() {
        if (!this.util.isBlank(this.panMove) && this.panMove) {
            let point: any = this.store.get(this.panMove, this.point);
            this.initSetting();
            if (this._pointSetting.left) {
                this.ele.nativeElement.style.left = point.left + 'px';
                this.checkStyle();
            }
            if (this._pointSetting.top) {
                this.ele.nativeElement.style.top = point.top + 'px';
                this.checkStyle();
            }
            if (this._pointSetting.bottom) {
                this.ele.nativeElement.style.bottom = point.bottom + 'px';
                this.checkStyle();
            }
            if (this._pointSetting.right) {
                this.ele.nativeElement.style.right = point.right + 'px';
                this.checkStyle();
            }
        }
        let styles = window.getComputedStyle(this.ele.nativeElement);
        // this.position = styles.position;
        this.width = styles.width;
        this.height = styles.height;
        this.initStyle();
    }

    checkStyle() {
        let styles = window.getComputedStyle(this.ele.nativeElement);
        let position = styles.position;
        if (position !== 'absolute' && position !== 'fixed') {
            this.render.setStyle(this.ele.nativeElement, 'position', 'absolute');
            this.render.setStyle(this.ele.nativeElement, 'width', this.width);
            this.render.setStyle(this.ele.nativeElement, 'height', this.height);
        }
    }
    moveElement(x: number, y: number) {
        if (this._pointSetting.left) {
            this.ele.nativeElement.style.left = (parseInt(this._point.left) + x) + 'px';
        }
        if (this._pointSetting.top) {
            this.ele.nativeElement.style.top = (parseInt(this._point.top) + y) + 'px';
        }
        if (this._pointSetting.bottom) {
            this.ele.nativeElement.style.bottom = (parseInt(this._point.bottom) - y) + 'px';
        }
        if (this._pointSetting.right) {
            this.ele.nativeElement.style.right = (parseInt(this._point.right) - x) + 'px';
        }
    }
    getElementStyleSize(ele: HTMLElement) {
        let styles = window.getComputedStyle(this.ele.nativeElement);
        if (this._pointSetting.left) {
            this._point.left = styles.left;
        }
        if (this._pointSetting.top) {
            this._point.top = styles.top;
        }
        if (this._pointSetting.bottom) {
            this._point.bottom = styles.bottom;
        }
        if (this._pointSetting.right) {
            this._point.right = styles.right;
        }
    }
}