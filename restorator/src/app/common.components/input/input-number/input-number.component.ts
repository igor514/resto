import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: "input-number",
  templateUrl: "input-number.component.html",
  styleUrls: ["input-number.component.scss"],
})
export class InputNumberComponent implements OnInit, OnDestroy {
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 999999999;
  @Input() step: number = 1;
  @Input() editable: boolean = false;
  @Input() disabled: boolean = false;
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  changesSub: Subscription
  changes$ = new EventEmitter<number>()

  public constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    const DEBOUNCE_DELAY_MS = 500;
    this.changesSub = this.changes$
      .pipe(debounceTime(DEBOUNCE_DELAY_MS))
      .subscribe((value) => this.emit(value))
  }

  emit(value: number) {
    this.value = value;
    this.valueChange.emit(value)
    this.ref.detectChanges()
  }

  ngOnDestroy() {
    this.changesSub.unsubscribe()
  }

  public increase(): void {
    if (this.value + this.step <= this.max) {
      this.emit(this.value + this.step)
    }
  }

  public decrease(): void {
    if (this.value - this.step >= this.min) {
      this.emit(this.value - this.step)
    }
  }

  private sanitize(val: number) {
    let value: number = Number.parseInt(val.toString(), 10);

    if (Number.isNaN(value)) {
      value = this.min;
    } else if (value > this.max) {
      value = this.max;
    } else if (value < this.min) {
      value = this.min;
    }

    this.changes$.emit(value)
  }
}
