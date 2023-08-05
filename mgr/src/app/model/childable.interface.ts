export interface Childable {
    children: Childable[]; 
    __shift: string; 
    __level: number;
}
