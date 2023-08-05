import { Injectable } from "@nestjs/common";
import { Not, Repository } from "typeorm";

@Injectable()
export class SlugService {
    private in_str: string = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяєіїґ/ ,.!?()\"-&*:\\'—";
    private out_str: string[] = ['a','b','v','g','d','e','yo','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','h','ts','ch','sh','sch','','y','','e','yu','ya','e','i','yi','g','','-','','','','','','','','','','','','','',''];        

    public buildSlug (input: string): string {
        let slug: string = "";
        
        if (input) {            
            input = String(input).toLowerCase ();
        
            for (let i: number = 0, l: number = input.length; i < l; i++) {
                let s: string = input.charAt(i); 
                let n: number = this.in_str.indexOf(s);
                slug += (n >= 0) ? this.out_str[n] : s;                
            }            
        }
        
        return slug;
    }

    // check slug for duplicates globally in table
    public async checkSlug(repository: Repository<any>, slug: string, id: number, iteration: number): Promise<string> {
        let candidate: string = (iteration) ? `${slug}-${iteration}` : slug;
        let filter = id ? {slug: candidate, id: Not(id)} : {slug: candidate}; // because Not(null) is incorrect
        let x = await repository.findOne({where: filter});

        return x ? this.checkSlug(repository, slug, id, iteration + 1) : candidate;        
    }

    // check slug for duplicates within the shop
    public async checkSlugInShop(repository: Repository<any>, slug: string, id: number, shop_id: number, iteration: number): Promise<string> {
        let candidate: string = (iteration) ? `${slug}-${iteration}` : slug;
        let filter = id ? {slug: candidate, shop_id, id: Not(id)} : {slug: candidate, shop_id}; // because Not(null) is incorrect
        let x = await repository.findOne({where: filter});                

        return x ? this.checkSlug(repository, slug, id, iteration + 1) : candidate;        
    }
}
