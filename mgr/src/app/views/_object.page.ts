import { Repository } from '../services/repositories/_repository';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import { Model } from '../model/model';
import { SectionPage } from './_section.page';
import { AdmLangRepository } from '../services/repositories/admlang.repository';

export abstract class ObjectPage<T extends Model> extends SectionPage {
    public x: T = null;
    public ready: boolean = false;
    public reloading: boolean = false;      
    public requiredFields: string[] = [];    
    public homeUrl: string = null;
	
    constructor(        
        protected admlangRepository: AdmLangRepository,
        protected repository: Repository<any>,
        protected appService: AppService,
        protected router: Router,
    ) {
        super(admlangRepository);
    }

    public async create(): Promise<void> {
		try {
			this.reloading = true;
			this.appService.monitorLog(`creating object...`);
			await this.repository.create(this.x);
			this.appService.monitorLog(`object created`);            
            setTimeout(() => {
                this.reloading = false;
                this.router.navigateByUrl(this.homeUrl);			
            }, 500);            
		} catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            setTimeout(() => {this.reloading = false;}, 500);                
		}
    }
    
    public async update(): Promise<boolean> {
		try {
			this.reloading = true;
            this.appService.monitorLog(`updating object...`);
            await this.repository.update(this.x);
            this.appService.monitorLog(`object updated`);            
            setTimeout(() => {
                this.reloading = false;
                this.router.navigateByUrl(this.homeUrl);			
            }, 500);                            
            
            return true;
		} catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            setTimeout(() => {this.reloading = false;}, 500);    

            return  false;
		}
    }     
}
