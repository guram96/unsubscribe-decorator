import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

export function Unsubscribe(params?: { destroyFunc: string }) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function (target: any, propertyKey: string | symbol): void {
    params = {
      destroyFunc: 'ngOnDestroy',
      ...params
    };
    const destroy$: Subject<void> = new Subject();
    let observable: Observable<any>;

    Object.defineProperty(target, propertyKey, {
      get(this: any) {
        return observable;
      },
      set(val) {
        observable = val.pipe(takeUntil(destroy$));
      }
    });

    if (typeof target[params.destroyFunc] !== 'function') {
      throw new Error(
        `${target.constructor.name} must implement ${params.destroyFunc}() lifecycle hook`
      );
    }

    target[params.destroyFunc] = ngOnDestroyDecorator(
      target[params.destroyFunc]
    );

    function ngOnDestroyDecorator(f) {
      return function () {
        destroy$.next();
        destroy$.complete();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        // eslint-disable-next-line prefer-rest-params
        return f.apply(target, arguments);
      };
    }

    return target;
  };
}
