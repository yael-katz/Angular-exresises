import { Course } from "./course.model";

export class Student {
    static nextId: number = 1

    id: number;
    name: string;
    deparureDate?: Date
    avrage: number
    isActive: boolean
    year?: Year
    course: Course

    constructor(name: string, isActive: boolean, course: Course, year?: Year, dd?: Date, avrage?: number){
        
        this.id = Student.nextId++

        this.name = name
        this.deparureDate = dd
        this.avrage = avrage ? avrage : 0
        this.isActive = isActive
        this.year = year
        this.course = course

    }
}


export enum Year{
    First = 1,
    Second = 2,
    Third = 3
}



