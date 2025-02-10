import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Student } from '../../../models/student.model';
import { StudentService } from '../../../sevices/student.service';

@Component({
  selector: 'search-students',
  templateUrl: './search-students.component.html',
  styleUrls: ['./search-students.component.scss']
})
export class SearchStudentsComponent implements OnInit {
  searchControl = new FormControl('');
  allStudents: Student[] = [];

  @Output() searchResults = new EventEmitter<Student[]>(); // Emit results to parent

  constructor(private _studentService: StudentService) {}

  ngOnInit() {
    this._studentService.getStudentsFromServer().subscribe(data => (this.allStudents = data));

    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(query => this.search(query as string))
      )
      .subscribe(results => this.searchResults.emit(results)); // Emit search results
  }

  search(query: string) {
    if (!query.trim()) {
      return of(this.allStudents); // If query is empty, return all students
    }

    return of(this.allStudents).pipe(
      map(students => students.filter(s => s.name.toLowerCase().includes(query.toLowerCase())))
    );
  }
}
