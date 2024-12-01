export class Student {
    static nextId: number = 1
    id: number;
    name: string;
    deparureDate?: Date
    avrage: number
    isActive?: boolean
    constructor(name: string, dd?: Date, avrage?: number, isActive?: boolean){
        console.log(name,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        
        this.id = Student.nextId++
        this.name = name
        this.deparureDate = dd
        this.avrage = avrage ? avrage : 0
        this.isActive = isActive

    }
}


