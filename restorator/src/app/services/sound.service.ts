import { Injectable } from "@angular/core";

@Injectable()
export class SoundService {
    private audio: HTMLAudioElement = null;    
    
    constructor() {        
        this.init();        
    }

    private init(): void {
        this.audio = document.createElement("audio");
        document.body.appendChild(this.audio);
        this.unlock = this.unlock.bind(this);
        window.addEventListener("click", this.unlock); // for safari
    }

    private unlock(): void {        
        this.play("empty.mp3");
        console.log("audio unlocked");
        window.removeEventListener("click", this.unlock);
    }

    private play(filename: string): void {
        this.audio.src = `/assets/sounds/${filename}`;        
        this.audio.load();        
        this.audio.play().catch(err => console.log(err));        
    }

    public alertOrderCreated(): void {
        this.play("alert1.mp3");
    }

    public alertOrderUpdated(): void {
        this.play("alert2.mp3");
    }
}