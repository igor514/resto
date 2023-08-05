import { AppService } from '../services/app.service';
import { Repository } from '../services/repositories/_repository';
import { Model } from '../model/model';
import { SectionPage } from './_section.page';
import { AdmLangRepository } from '../services/repositories/admlang.repository';

export abstract class ListPage<T extends Model> extends SectionPage {
    public ready: boolean = false;
    public reloading: boolean = false;
    public allSelected: boolean = false;

    public abstract homeUrl: string;

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected repository: Repository<any>,
        protected appService: AppService,
    ) {
        super(admlangRepository);
    }

    get currentPart(): number {return this.repository.chunkCurrentPart;}
    set currentPart(v: number) {this.repository.chunkCurrentPart = v;}
    get sortBy(): string {return this.repository.chunkSortBy;}
    set sortBy(v: string) {this.repository.chunkSortBy = v;}
    get sortDir(): number {return this.repository.chunkSortDir;}
    set sortDir(v: number) {this.repository.chunkSortDir = v;}
    get xl(): T[] {return this.repository.xlChunk;}
    get length(): number {return this.repository.chunkLength;}
    get allLength(): number {return this.repository.allLength;}
    get canDeleteBulk(): boolean {return !!this.xl.filter(x => x.__selected).length;}

    public async rebuildList(): Promise<void> {
        try {
            this.reloading = true;
            this.allSelected = false;
            await this.repository.loadChunk();
            this.appService.monitorLog(`data reloaded, currentPart=${this.currentPart}, sortBy=${this.sortBy}, sortDir=${this.sortDir}`);

            if (this.currentPart > 0 && this.currentPart > Math.ceil(this.allLength / this.length) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again
                this.currentPart = 0;
                this.rebuildList();
            } else {
                setTimeout(() => {this.reloading = false;}, 500);
            }
        } catch (err) {
            this.appService.monitorLog(err, true);
            setTimeout(() => {this.reloading = false;}, 500);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.sortBy === sortBy) {
            this.sortDir *= -1;
        } else {
            this.sortBy = sortBy;
            this.sortDir = 1;
        }

        this.rebuildList();
    }

    public async updateParam (id: number, p: string, v: any): Promise<void> {
        try {
            this.appService.monitorLog(`updating object: id=${id} param=${p} value=${v}`);
            await this.repository.updateParam(id, p, v);
            this.appService.monitorLog("ok");
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
        }
    }

    public async updateMlParam (id: number, p: string, v: any): Promise<void> {
        try {
            this.appService.monitorLog(`updating multilang object: id=${id} param=${p} value=${v}`);
            await this.repository.updateMlParam(id, p, v);
            this.appService.monitorLog("ok");
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
        }
    }

    // egoistic param - boolean that can be true only in one element, other must be false
    public async updateEgoisticParam (id: number, p: string, v: boolean): Promise<void> {
        try {
            if (v) {
                this.xl.filter(x => x.id !== id).forEach(x => {
                    x[p] = false;
                });
            }

            this.appService.monitorLog(`updating egoistic parameter: id=${id} param=${p} value=${v}`);
            await this.repository.updateEgoisticParam(id, p, v);
            this.appService.monitorLog("ok");
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            if (confirm(this.currentLang.phrases['workspace-sure'])) {
                this.appService.monitorLog(`deleting object: id=${id}`);
                await this.repository.delete(id);
                this.appService.monitorLog("ok");
                this.rebuildList();
            }
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
        }
    }

    public async deleteBulk(): Promise<void> {
        try {
            if (this.canDeleteBulk && confirm(this.currentLang.phrases['workspace-sure'])) {
                let ids: number[] = this.xl.filter(x => x.__selected).map(x => x.id);
                this.appService.monitorLog(`deleting multiple objects: id=${ids.toString()}`);
                await this.repository.deleteBulk(ids);
                this.appService.monitorLog("ok");
                this.rebuildList();
            }
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
        }
    }

    public onSelect(): void {
        let allSelected: boolean = true;

        for (let x of this.xl) {
            if (!x.__selected && !x.defended) {
                allSelected = false;
                break;
            }
        }

        this.allSelected = allSelected;
    }

    public onSelectAll(): void {
        this.xl.filter(x => !x.defended).forEach(x => {x.__selected = this.allSelected});
    }
}
