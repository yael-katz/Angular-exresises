import { AbsenceDays } from "./absenceDays.model";
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
    absenceDays: AbsenceDays[]

    constructor(name: string, isActive: boolean, course: Course, absenceDays: AbsenceDays[], year?: Year, avrage?: number, dd?: Date){
        
        this.id = Student.nextId++

        this.name = name
        this.deparureDate = dd
        this.avrage = avrage ? avrage : 0
        this.isActive = isActive
        this.year = year
        this.course = course
        this.absenceDays =  [...absenceDays]

    }
}


export enum Year{
    First = 1,
    Second = 2,
    Third = 3
}



