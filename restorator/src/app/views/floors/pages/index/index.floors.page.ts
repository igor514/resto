import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IChunk } from 'src/app/model/chunk.interface';
import { Employee } from 'src/app/model/orm/employee.model';
import { Lang } from 'src/app/model/orm/lang.model';
import { Words } from 'src/app/model/orm/words.type';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { WordRepository } from 'src/app/services/repositories/word.repository';
import { IndexFloorsService } from './index.floors.service';
import {Floor} from '../../../../model/orm/floor.model';
import {FloorRepository} from '../../../../services/repositories/floor.repository';

@Component({
    selector: 'index-floors-page',
    templateUrl: 'index.floors.page.html',
    styleUrls: ['../../../../common.styles/data.scss'],
})
export class IndexFloorsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public flChunk: IChunk<Floor> = null;
    public flLoading = false;
    public hlSortingVariants: any[][] = // для мобильной верстки
        [['number', 1], ['number', -1]];
    public deleteConfirmActive = false;
    public deleteConfirmMsg = '';
    private deleteId: number = null;

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private floorRepository: FloorRepository,
        private authService: AuthService,
        private listService: IndexFloorsService,
        private router: Router,
    ) {}

    get words(): Words {return this.wordRepository.words; }
    get currentLang(): Lang {return this.appService.currentLang.value; }
    get employee(): Employee {return this.authService.authData.value.employee; }
    get restaurantId(): number {return this.employee.restaurant_id; }
    get fl(): Floor[] {return this.flChunk.data; }
    get flAllLength(): number {return this.flChunk.allLength; }
    get flCurrentPart(): number {return this.listService.currentPart; }
    set flCurrentPart(v: number) {this.listService.currentPart = v; }
    get flLength(): number {return this.floorRepository.chunkLength; }
    get flSortBy(): string {return this.listService.sortBy; }
    set flSortBy(v: string) {this.listService.sortBy = v; }
    get flSortDir(): number {return this.listService.sortDir; }
    set flSortDir(v: number) {this.listService.sortDir = v; }
    get flFilter(): any {return {restaurant_id: this.restaurantId}; }

    public ngOnInit(): void {
        this.initTitle();
        this.initAuthCheck();
        this.initFloors();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words['restorator-floors']['title-index'][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words['restorator-floors']['title-index'][lang.slug]));
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl('/') : null);
    }

    public async initFloors(): Promise<void> {
        try {
            this.flLoading = true;
            this.flChunk = await this.floorRepository.loadChunk(this.flCurrentPart, this.flSortBy, this.flSortDir, this.flFilter);

            if (this.flCurrentPart > 0 && this.flCurrentPart > Math.ceil(this.flAllLength / this.flLength) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again
                this.flCurrentPart = 0;
                this.initFloors();
            } else {
                await this.appService.pause(500);
                this.flLoading = false;
            }
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.flSortBy === sortBy) {
            this.flSortDir *= -1;
        } else {
            this.flSortBy = sortBy;
            this.flSortDir = 1;
        }

        this.initFloors();
    }

    public setSorting(i: string): void {
        const sorting = this.hlSortingVariants[parseInt(i, 10)];
        this.flSortBy = sorting[0];
        this.flSortDir = sorting[1];
        this.initFloors();
    }

    public onDelete(f: Floor): void {
        this.deleteId = f.id;
        this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${f.number}"?`;
        this.deleteConfirmActive = true;
    }

    public async delete(): Promise<void> {
        try {
            this.deleteConfirmActive = false;
            this.flLoading = true;
            await this.floorRepository.delete(this.deleteId);
            this.initFloors();
        } catch (err) {
            this.appService.showError(err);
            this.flLoading = false;
        }
    }
}
