 💪 An easy way to unsubscribe from observables and subjects

> Unsubscribe decorator for Rxjs and Angular

Decorator will pipe the observable with `takeUntil(destroy$)` operator and will complete when `destroyFunc` will be called.

Usage 
``` npm i unsubscribe-decorator
```
 @Component({})
 export class MyComponent extends OnInit, OnDestroy {

     @Unsubscribe()
     myObservableSource = interval(100)

     ngOnInit() {
         this.myObservableSource.subscribe(res => console.log(res))
     }

     ngOnDestroy() {}
 }
```

You pass  `destoyFunc` argument if you want to unsubscribe to be called in other place then onDestroy

```
 @Component({})
 export class MyComponent extends OnInit, AfterViewInit {

     @Unsubscribe({ destroyFunc: 'ngAfterViewInit' })
     myObservableSource = interval(100)

     ngOnInit() {
         this.myObservableSource.subscribe(res => console.log(res))
     }

     ngAfterViewInit() {}
 }
```