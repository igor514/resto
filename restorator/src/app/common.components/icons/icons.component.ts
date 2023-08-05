import {Component, EventEmitter, Inject, Input, Output} from "@angular/core";
import {Icon} from "../../model/orm/icon.model";
import {AppService} from "../../services/app.service";
import {WordRepository} from "../../services/repositories/word.repository";
import {Words} from "../../model/orm/words.type";
import {Lang} from "../../model/orm/lang.model";
import {STATIC_TOKEN} from "../../tokens";

@Component({
  selector: 'icons',
  templateUrl: 'icons.component.html',
  styleUrls: ['./icons.component.scss']

})
export class IconsComponent {
  @Input() icons: Icon[] = []
  @Input() showFilter = true;
  @Input() selected: number;
  @Output() selectIcon = new EventEmitter<number>()

  constructor(
    @Inject(STATIC_TOKEN) public staticPath: string,
    protected appService: AppService,
    protected wordRepository: WordRepository,
  ) {}

  get words(): Words {return this.wordRepository.words;}
  get currentLang(): Lang {return this.appService.currentLang.value;}

  filter: string = ''

  get filterIcons(): Icon[] {
    if (!this.filter) {
      return this.icons
    } else {
      const filter = this.filter.toLowerCase()
      const slug = this.currentLang.slug
      return this.icons.filter(i => (i.name[slug] as string)
        .toLowerCase()
        .includes(filter)
      );
    }
  }

  select(icon_id: number) {
    if (icon_id === this.selected) {
      this.selectIcon.emit(null)
    } else {
      this.selectIcon.emit(icon_id)
    }
  }

  resetFilter() {
    this.filter = ''
  }
}
