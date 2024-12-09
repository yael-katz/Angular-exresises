import { Injectable } from "@angular/core";
import { Course } from "../models/course.model";
import { Student, Year } from "../models/student.model";
import { AbsenceDays } from "../models/absenceDays.model";

const STUDENTS_LIST: Student[] = [
    new Student("Yael", true, new Course(1, "Angulr"), [], Year.First),
    new Student("Noa", true, new Course(2, "React"), [new AbsenceDays(new Date(), 5)], Year.First),
    new Student("Shira", true, new Course(3, "Java"),[], Year.Third)
]

@Injectable()
export class StudentService{
    getstudentsOld(): Student[]{
        return STUDENTS_LIST
    }

    getstudents(): Promise<Student[]> {
        return new Promise((res, rej )=>{
            setTimeout(() => {
                res(STUDENTS_LIST)
            }, 3000);
        } )
    }

    getAvrage(id: number): Promise<number> {
        let studentInd: number = STUDENTS_LIST.findIndex((studentEle: Student, index: number, obj: Student[]) => {
            return studentEle.id == id;
        });
        return new Promise((res, rej)=>{
            res(STUDENTS_LIST[studentInd].avrage)
        })
    }

    getAllAbsenceDays(id: number): Promise<number> {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", id);
        
        const student = STUDENTS_LIST.find(studentEle => studentEle.id === id);
        if (!student) {
            return Promise.reject(`Student with id ${id} not found`);
        }
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
        
        const allDays = student.absenceDays.reduce((sum, absence) => sum + absence.days, 0);
        console.log(allDays,"alldays");
        
        return Promise.resolve(allDays);
    }
}