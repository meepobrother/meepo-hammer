# hammer

```html
<div (tap)="tap($event.type)"></div>
<div (tap)="swiperleft($event.type)"></div>
<div (tap)="swiperright($event.type)"></div>
<div (tap)="swiperup($event.type)"></div>
<div (tap)="swiperdown($event.type)"></div>
```

```html
<div class="pan" panMove="pan1">
    pan
</div>

<div class="pinch-scale" panMove [(rotating)]="rotating">
    {{rotating|json}}
</div>
```