import { Component, Input } from '@angular/core';
import { StudentService } from '../../../sevices/student.service';

@Component({
  selector: 'student-avrage',
  templateUrl: './student-avrage.component.html',
  styleUrls: ['./student-avrage.component.scss']
})
export class StudentAvrageComponent {

  private _id!: number

  @Input()
  public set id(value: number){
      this._id = value
      this.setAvrage()
  }

  async setAvrage(){
    console.log(this._id,"ssssssssssssssssssssssssssssssssssssssssss");
    
    this.avrage = await this._studentService.getAvrage(this._id)
  }

  avrage!: number

  constructor(private _studentService: StudentService){
    
  }

  async ngOnInit(){
    console.log(this.id,"iiiiiiiiiiiiiiiiiiiiiiinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnniiiiiiiiiiiiiiiiiiiiitttttttttttttttttttt");
    
    this.avrage = await this._studentService.getAvrage(this.id)
  }
}
