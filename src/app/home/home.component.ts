import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';

import { DataRepository } from '../services/data-repository.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  languages = [];
  model: Employee = new Employee('Bat', 'Dorj', true, '1099', 'Swedish');
  isLanguageInvalid: boolean = false;

  constructor(private repository: DataRepository) { 
  }

  ngOnInit(): void {
    this.repository.getLanuages()
      .subscribe(
        data => this.languages = data.languages,
        error => console.log("get error: ", error)
      );
  }

  submitForm(form: NgForm) {
    // validation can go here
    if (this.isLanguageInvalid)
      return;

    this.repository.postEmpployeeForm(form.value)
      .subscribe(
        data => console.log('Success: ', data),
        error => console.log('Error: ', error)
      )
  }

  toUpperCase(value: string): void {
    if (value.length > 0)
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    else
      this.model.firstName = value;
  }

  validateLanguage(value): void {
    console.log(value);
    this.isLanguageInvalid = this.model.language === 'default';
  }
}
