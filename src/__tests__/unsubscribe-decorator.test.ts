import { interval } from 'rxjs/internal/observable/interval';
import { Unsubscribe } from '../unsubscribe-decorator';

describe('@Unsubscribe', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call unsubscribe on destroy', () => {
    class TestComponent {
      @Unsubscribe()
      mock = interval(1000);

      constructor() {
        this.mock.subscribe(res => console.log(res));
      }
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      ngOnDestroy() {}
    }

    const Test = new TestComponent();
    Test.ngOnDestroy();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(Test.mock.operator.notifier.observers.length).toBe(0);
  });
});
