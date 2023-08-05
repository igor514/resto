import {Ingredient} from "./orm/ingredient.model";

export class Model {
    // real data
    public id: number;
    public defended?: boolean;
    // utils
    public __selected: boolean = false;

    public build (o: Object): any {
        for (let field in o) {
            if (field === "date") {
                this[field] = new Date (o[field]);
            } else {
                this[field] = o[field];
            }
        }

        return this;
    }

    protected twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }

    protected randomString(length: number, mode: string = "full"): string {
        let result: string = '';
        let characters: string = "";

        if (mode === "full") characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        if (mode === "lowercase") characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        if (mode === "digits") characters = "0123456789";

        var charactersLength = characters.length;

        for (let i: number = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}
