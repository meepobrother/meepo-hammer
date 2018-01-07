import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
declare const Hammer: any;
export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'swipe': { direction: Hammer.DIRECTION_ALL },
        'tap': {},
        'pan': { direction: Hammer.DIRECTION_ALL },
        'pinch': {},
        'press': {},
        'rotate': {}
    }
}
import { RotatingDirective } from './rotating/rotating';
import { PanMoveDirective } from './pan-move/pan-move';
import { MeepoCoreServiceModule } from 'meepo-core';
import { UuidModule } from 'meepo-uuid';
import { StoreModule } from 'meepo-store';

@NgModule({
    imports: [
        CommonModule,
        MeepoCoreServiceModule,
        UuidModule,
        StoreModule
    ],
    exports: [
        RotatingDirective,
        PanMoveDirective,
    ],
    declarations: [
        RotatingDirective,
        PanMoveDirective
    ],
    providers: [
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig
        }
    ],
})
export class HammerModule { }
