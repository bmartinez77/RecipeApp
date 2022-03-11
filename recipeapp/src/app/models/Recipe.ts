export class Recipe
{
    private id: number = -1;
    private name: string = "";
    private instructions: string = "";
    private difficulty: number = 0;
    private date: string = "";
 
    constructor(id:number, name:string, instructions:string, difficulty:number, dateTime:string)
    {
        this.id = id;
        this.name = name;
        this.instructions = instructions
        this.difficulty = difficulty
        this.date = dateTime
    }

    get Id():number
    {
        return this.id;
    }
    set Id(id:number)
    {
        this.id = id;
    }

    get Name():string
    {
        return this.name;
    }
    set Name(name:string)
    {
        this.name = name;
    }

    get Instructions():string
    {
        return this.instructions;
    }
    set Instructions(instructions:string)
    {
        this.instructions = instructions;
    }

    get Difficulty():number
    {
        return this.difficulty;
    }
    set Difficulty(difficulty:number)
    {
        this.difficulty = difficulty;
    }

    public get Date(): string 
    {
        return this.date;
    }

    public set Date(date: string) 
    {
        this.Date = date;
    }
}