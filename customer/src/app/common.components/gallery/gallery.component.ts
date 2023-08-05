import {AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild} from "@angular/core";
import { IImagable } from "src/app/model/imagable.interface";
import { IProductImage } from "src/app/model/orm/product.image.interface";
import { AppService } from "src/app/services/app.service";
import {STATIC_TOKEN} from "../../tokens";

@Component({
    selector: "the-gallery",
    templateUrl: "gallery.component.html",
    styleUrls: ["gallery.component.scss"],
})
export class GalleryComponent implements AfterViewInit, OnInit {
    @Input() images: IImagable[];
    @Input() dir: string = "products";
    @ViewChild("win", {static: false}) winRef: ElementRef;
    @ViewChild("container", {static: false}) containerRef: ElementRef;
    public xl: IImagable[] = [];
    public n: number = 0;
    private w: number = 0;
    // movement
    public step: number = 0;
    public left: number = 0;
    private moving: boolean = false;
    private startX: number = 0;
    private startXOffsetted: number = 0;
    public startY: number = 0;
    private prevX: number = 0;

    constructor(
      @Inject(STATIC_TOKEN) protected staticPath: string,
      private appService: AppService
    ) {}

    get win(): HTMLElement {return this.winRef.nativeElement;}
    get container(): HTMLElement {return this.containerRef.nativeElement;}

    public ngOnInit(): void {
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
        this.onFirstTouchMove = this.onFirstTouchMove.bind(this);

        this.xl = [];
        this.images.forEach(image => this.xl.push(image));
        this.xl.unshift(this.images[this.images.length-1]);
        this.xl.push(this.images[0]);
        this.n = this.images.length;
    }

    public async ngAfterViewInit(): Promise<void> {
        await this.appService.pause(1);
        this.w = this.win.offsetWidth;
        this.buildLeft();
    }

    private buildLeft(): void {
        this.left = (this.step + 1) * this.w;
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: any): void {
        this.w = this.win.offsetWidth;
        this.buildLeft();
    }

    public moveTo(i: number): void {
        if (!this.moving && this.step !== i) {
            this.moving = true;
            this.step = i;
            this.buildLeft();
        }
    }

    public moveLeft(): void {
        this.moveTo(this.step - 1);
    }

    public moveRight(): void {
        this.moveTo(this.step + 1);
    }

    public onDragStart (event: TouchEvent | MouseEvent): void {
        if (!this.moving) {
            this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
            this.startY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
            this.startXOffsetted = this.startX - this.container.offsetLeft;

            if (event instanceof MouseEvent) {    // just start moving
                this.container.style.transition = "none";
                window.addEventListener("mousemove", this.onDragMove, {passive: false});
                window.addEventListener("mouseup", this.onDragEnd);
            } else { // detect if moving is more by X than by Y
                window.addEventListener("touchmove", this.onFirstTouchMove);
            }
        }
    }

    public onFirstTouchMove(event: TouchEvent): void {
        let deltaX = Math.abs(this.startX - event.touches[0].clientX);
        let deltaY = Math.abs(this.startY - event.touches[0].clientY);
        window.removeEventListener("touchmove", this.onFirstTouchMove);

        if (deltaX > deltaY && !this.moving) {
            this.container.style.transition = "none";
            window.addEventListener("touchmove", this.onDragMove, {passive: false});
            window.addEventListener("touchend", this.onDragEnd);
        }
    }

    public onDragEnd (): void {
        window.removeEventListener("mousemove", this.onDragMove);
        window.removeEventListener("touchmove", this.onDragMove);
        window.removeEventListener("mouseup", this.onDragEnd);
        window.removeEventListener("touchend", this.onDragEnd);
        this.container.style.transition = "0.3s";

        // доводка
        if (this.moving) {
            if (this.prevX < this.startX - 30) {
                this.step++;
            } else if (this.prevX > this.startX + 30) {
                this.step--;
            }
        }

        this.buildLeft();
    }

    public onDragMove (event: TouchEvent | MouseEvent): void {
        event.cancelable ? event.preventDefault() : null;
        this.moving = true;
        const x: number = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
        let nextX: number = this.startXOffsetted - x;

        if (nextX > 0 && nextX < (this.xl.length - 1) * this.w) {
            this.left = nextX;
        }

        this.prevX = x;
    }

    public async adjustInfiniteMotion(): Promise<void> {
        this.container.style.transition = "none";

        if (this.step === -1) {
            this.step = this.n - 1;
            this.buildLeft();
        }

        if (this.step === this.n) {
            this.step = 0;
            this.buildLeft();
        }

        await this.appService.pause(1);
        this.container.style.transition = "0.3s";
        this.moving = false;
    }
}
