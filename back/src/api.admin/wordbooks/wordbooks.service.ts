import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, IsNull, Not, Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { Wordbook } from "../../model/orm/wordbook.entity";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IWordbookUpdate } from "./dto/wordbook.update.interface";
import { IWordbookCreate } from "./dto/wordbook.create.interface";
import { Sortdir } from "src/model/sortdir.type";
import { Word } from "src/model/orm/word.entity";

@Injectable()
export class WordbooksService extends APIService {
    constructor (
        @InjectRepository(Wordbook) private wordbookRepository: Repository<Wordbook>,
        @InjectRepository(Word) private wordRepository: Repository<Word>,
    ) {
        super();
    }    

    public async chunk(dto: IGetChunk): Promise<IAnswer<Wordbook[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Wordbook[] = await this.wordbookRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});
            let allLength: number = await this.wordbookRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in WordbooksService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Wordbook>> {
        try {            
            // to sort joined array we need to use QueryBuilder instead of simple repository API!
            let data: Wordbook = await this.wordbookRepository
                .createQueryBuilder("wordbooks")
                .where("wordbooks.id = :id", {id})
                .leftJoinAndSelect("wordbooks.words", "words")
                .leftJoinAndSelect("words.translations", "translations")
                .orderBy("words.pos", "ASC")
                .getOne();
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in WordbooksService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IWordbookCreate): Promise<IAnswer<void>> {        
        try {            
            let x: Wordbook = this.wordbookRepository.create(dto);
            await this.wordbookRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in WordbooksService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: IWordbookUpdate): Promise<IAnswer<void>> {
        try {                
            let x: Wordbook = this.wordbookRepository.create(dto);
            await this.wordbookRepository.save(x);            
            await this.deleteUnbindedWords();
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in WordbooksService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
    
    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.wordbookRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in WordbooksService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.wordbookRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in WordbooksService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    private deleteUnbindedWords(): Promise<DeleteResult> {
        return this.wordRepository.delete({wordbook_id: IsNull()});
    }  
}
