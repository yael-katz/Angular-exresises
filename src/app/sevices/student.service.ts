import { Injectable } from "@angular/core";
import { Course } from "../models/course.model";
import { Student, Year } from "../models/student.model";

@Injectable()
export class StudentService{
    getstudents(): Student[]{
        return [
            new Student("Yael", true, new Course(1, "Angulr"), Year.First),
            new Student("Noa", true, new Course(2, "React"), Year.First),
            new Student("Shira", true, new Course(3, "Java"), Year.Third)
        ]
    }
}