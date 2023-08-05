import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Lang } from 'src/app/model/orm/lang.model';
import { Words } from 'src/app/model/orm/words.type';
import { AppService } from 'src/app/services/app.service';
import { WordRepository } from 'src/app/services/repositories/word.repository';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',  
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
    @Input() allLength: number = 0; // quantity of all objects
    @Input() length: number = 0; // quantity of objects in fragment
    @Input() current: number = 0; // current fragment
    @Output() currentChanged: EventEmitter<number> = new EventEmitter ();    
    public changeTo: string | null = null;

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    
    get parts (): number[] {
        let parts = [];
        let n: number = Math.ceil(this.allLength / this.length);
        
        for (let i: number = 0; i < n; i++) {
            if (!i || i == n - 1) { // first and last            
                parts.push(i);
            } else { // middle            
                if (i - this.current > 1) {
                    parts.push(-1);
                } else if (this.current - i > 1) {
                    parts.push(-2);
                } else {
                    parts.push(i);
                }
            }            
        }

        parts = parts.filter((v, i, a) => a.indexOf(v) === i); // array_unique

        return parts;
    }    

    public setCurrent (v: number): void {        
        if (v >= 0 && v !== this.current) {            
            this.currentChanged.emit(v);                
        }        
    }

    public back(): void {
        if (this.current > 0) {
            this.currentChanged.emit(this.current - 1);            
        }
    }

    public forward(): void {
        if (this.current < Math.ceil(this.allLength / this.length) - 1) {                        
            this.currentChanged.emit(this.current + 1);            
        }
    }

    public setCurrentManual(): void {        
        let changeTo: number = parseInt(this.changeTo);
        this.changeTo = null;

        if (changeTo > 0 && changeTo <= Math.ceil(this.allLength / this.length)) {            
            this.setCurrent(changeTo - 1);
        }        
    }
}
