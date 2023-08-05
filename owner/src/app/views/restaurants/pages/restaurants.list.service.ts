export abstract class RestaurantsListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public currentPart: number = 0;
    public filterName: string = "";
    public filterDaysleft: string = "";
    public abstract filterActive: boolean;
}