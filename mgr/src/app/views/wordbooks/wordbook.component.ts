import { Component, Input, OnInit } from '@angular/core';

import { Lang } from 'src/app/model/orm/lang.model';
import { Word } from 'src/app/model/orm/word.model';
import { Wordbook } from 'src/app/model/orm/wordbook.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-wordbook",
    templateUrl: "./wordbook.component.html"
})
export class WordbookComponent extends ObjectComponent<Wordbook> implements OnInit {        
    @Input() ll: Lang[] = [];       
    public tab: number = 1; 
    public sortBy: string = "pos";
    public sortDir: number = 1; 
    public selectedLang: Lang;
    public subformActive: boolean = false;
    public word: Word = null; 
    
    public eeActive: boolean = false;
    public eeData: string = "";
    public eeEditableObject: Object = null;
    public eeEditableField: string = null;    

    public ngOnInit(): void {        
        this.selectedLang = this.ll[0];        
        this.word = new Word().init(this.ll);
    }

    public onSubformKeyDown(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            event.preventDefault();
            this.addWord();
        }
    }

    public addWord(): void {
        this.x.words.push(this.word);
        this.appService.sort(this.x.words, this.sortBy, this.sortDir);
        this.word = new Word().init(this.ll);
        this.subformActive = false;        
    }

    public changeSorting(sortBy): void {
        if (sortBy === this.sortBy) {
            this.sortDir *= -1;            
        } else {
            this.sortBy = sortBy;
            this.sortDir = 1;
        }

        this.appService.sort(this.x.words, this.sortBy, this.sortDir);        
    }

    public deleteWord(i: number): void {
        if (confirm(this.currentLang.phrases['workspace-sure'])) {
            this.x.words.splice(i, 1);            
        }        
    }

    public eeBind(obj, field): void {
        this.eeEditableObject = obj;
        this.eeEditableField = field;
        this.eeData = obj[field];        
        this.eeActive = true;
    }

    public eeApply(event: string): void {
        this.eeEditableObject[this.eeEditableField] = event;
    }
}
