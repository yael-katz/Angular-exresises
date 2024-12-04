export class Course {
    constructor(public id: number, public name: string) {

    }
}

export const COURSES_LIST: Course[] = [new Course(1,"Angular"),new Course(2,"React"),new Course(1,"Java"),new Course(1,"C++")]