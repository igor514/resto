import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from "@angular/core";
import {Subscription} from "rxjs";
import {Order} from "../../model/orm/order.model";
import {Words} from "../../model/orm/words.type";
import {Lang} from "../../model/orm/lang.model";
import {WordRepository} from "../../services/repositories/word.repository";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'order-accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.scss', '../../common.styles/data.scss']
})
export class AccordionComponent implements AfterViewInit, OnDestroy {
  @Input() title: string;
  @Input() isActive: boolean = false;
  @Input() parentEmitter: EventEmitter<number[]>
  @Input() emitter: EventEmitter<{id: number, value: boolean}>
  @Input() order: Order;

  @Output() unNeed = new EventEmitter<string>()

  @ViewChild('panel') panel: ElementRef<HTMLDivElement>;
  private sub: Subscription;

  constructor(
    private wordRepository: WordRepository,
    private appService: AppService,
  ) {}

  public onUnNeed(event: Event, value: string): void {
    event.stopPropagation()
    this.unNeed.emit(value)
  }

  ngAfterViewInit() {
    this.setHeight()
    this.sub = this.parentEmitter?.subscribe((values) => {
      if (values.indexOf(this.order.id) !== -1) {
        this.setActive(false)
      }
    })
  }

  get words(): Words {return this.wordRepository.words;}
  get currentLang(): Lang {return this.appService.currentLang.value;}

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }

  setActive(isActive = !this.isActive) {
    this.isActive = isActive;
    this.emitter.emit({id: this.order.id, value: isActive})
    this.setHeight()
  }

  setHeight() {
    const panel = this.panel.nativeElement
    if (!this.isActive) {
      panel.classList.remove('active')
    } else {
      panel.classList.add('active')
    }
  }
}
