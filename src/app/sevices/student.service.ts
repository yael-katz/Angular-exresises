import { Injectable } from "@angular/core";
import { Course } from "../models/course.model";
import { Student, Year } from "../models/student.model";
import { AbsenceDays } from "../models/absenceDays.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const STUDENTS_LIST: Student[] = [
    new Student("Yael", true, new Course(1, "Angulr"), [], Year.First),
    new Student("Noa", true, new Course(2, "React"), [new AbsenceDays(new Date(), 5)], Year.First),
    new Student("Shira", true, new Course(3, "Java"),[], Year.Third)
]

@Injectable()
export class StudentService{
    constructor(private _http: HttpClient) { 
 
    } 

    searchStudents!: Observable<Student[]>

    getStudentsFromServer(): Observable<Student[]> {
        return this._http.get<Student[]>("api/students")
    }

    addStudetToServer(student: Student): Observable<Student> {
        return this._http.post<Student>("api/students", student)
    }

    updateStudentServer(student: Student): Observable<Student>{
        return this._http.put<Student>("api/students",student)
    }

    deleteStudentServer(id: number):Observable<boolean>{
        return this._http.delete<boolean>(`api/students/${id}`)
    }

    getStudentsByActive(showActive: boolean): Observable<Student[]> {
        return this._http.get<Student[]>(`api/students?showActive=${showActive}`)
    }

    setSearchStudents(search: Observable<Student[]>): void{
        this.searchStudents = search
    }

    getSearchStudents():Observable<Student[]> {
        return this.searchStudents
    }

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