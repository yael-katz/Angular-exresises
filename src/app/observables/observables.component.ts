import { Component } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../sevices/student.service';
import { filter, from, interval, map, Observable } from 'rxjs';

@Component({
  selector: 'observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent {
  students!: Student[] 
  

  studentSourse!: Observable<string>;

  studentSourseFrom!: Observable<string>;

  timer!: Observable<string>;

  time?: string
  time2?: string

  timerInterval!: Observable<string>;

  sendMail!: Observable<string>;

  sendMailOperator!: Observable<string>;

  mailStr1: string[] = []
  mailStr2: string[] = []

  constructor(private _studentService: StudentService){

  }

  async ngOnInit(){
    this.students = await this._studentService.getstudents()

    this.studentSourse = new Observable((obs)=>{
      this.students.forEach(s => obs.next(s.name))
    })

    this.studentSourse.subscribe(val=>console.log('name',val))


    this.studentSourseFrom = from(this.students).pipe(map(s => s.name))


    this.studentSourseFrom.subscribe(val=>console.log('name from ',val))

    this.timer = new Observable(obs => {setInterval(() => {
      obs.next(new Date().toLocaleTimeString())
    }, 1000)})

    this.timer.subscribe((strTime)=> this.time = strTime)

    this.timerInterval = interval(1000).pipe(map(n=>new Date().toLocaleTimeString()))

    this.timerInterval.subscribe((strTime)=> this.time2 = strTime)

    this.sendMail = new Observable((obs)=>{
      this.students.forEach(s=>{
        obs.next(`email sent to ${s.name}@gmail.com successfully`)
      })
    })

    this.sendMail.subscribe(str=>this.mailStr1.push(str))

    this.sendMailOperator = from(this.students).pipe(filter(s=>s.isActive), map(s=>`email sent to ${s.name}@gmail.com successfully`))

    this.sendMailOperator.subscribe(str=>this.mailStr2.push(str))

    
  }

}
