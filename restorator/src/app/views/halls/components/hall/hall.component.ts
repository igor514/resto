import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-hall",
    templateUrl: "hall.component.html",    
})
export class HallComponent implements OnInit, OnDestroy {
    @Input() x: Hall;    
    @Input() loading: boolean = false;   
    @Input() cmdSave: BehaviorSubject<boolean> = null;     
    @Output() save: EventEmitter<void> = new EventEmitter();    

    private cmdSaveSubscription: Subscription = null;
    public errorName: boolean = false;    

    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,            
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}        

    public ngOnInit(): void {
        this.cmdSaveSubscription = this.cmdSave?.subscribe(cmd => cmd ? this.onSave() : null);
    }

    public ngOnDestroy(): void {
        this.cmdSaveSubscription?.unsubscribe();
    }

    public onSave(): void {
        if (this.validate()) {
            this.save.emit();
        }
    }
    
    private validate(): boolean {
        let error = false;
        this.x.name = this.appService.trim(this.x.name);        

        if (!this.x.name.length) {
            this.errorName = true;
            error = true;
        } else {
            this.errorName = false;
        }

        return !error;
    }
}