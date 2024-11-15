import { Component, EventEmitter, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-custodial-party-accordion-step3',
  standalone: true,
  imports: [MatExpansionModule, MatIconButton, MatTable, MatTableModule, MatIcon,
     CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './custodial-party-accordion-step3.component.html',
  styleUrl: './custodial-party-accordion-step3.component.css'
})
export class CustodialPartyAccordionStep3Component implements OnInit {
  @Input() step3Form!: FormGroup; // Receive the form group from the parent
  @Output() addChildEvent = new EventEmitter<void>();  // Output to notify parent

  childForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    // Initialize the child form group
    this.childForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      suffix: [''],
      race: [''],
      relationshipToApplicant: ['', Validators.required],
      conceptionOccurredState: [''],
      gender: ['', Validators.required],
      state: [''],
      county: [''],
      city: [''],
      ssn: [''],
      dob: [, Validators.required],
      mother_married_father: [false],
      order_for_childSupport: [false],
      ncp_pay_support: [false],
      ncp_pay: ['0']
    });
  }


  get children(): FormArray {
    return this.step3Form.get('children') as FormArray;
  }
  ngOnInit(): void {
    console.log('FormGroup in step1:', this.step3Form);

  }
  readonly panelOpenState = signal(false); //code for expansion panel

  // newChild!: FormGroup;
  showChildForm = false; // Controls the visibility of the form

  // Method to show the form
  addChildForm() {
    // this.addChild();

    this.showChildForm = true;

    // Create a new FormGroup for the child
    // this.newChild = new FormGroup({
    //   firstName: ['', Validators.required],
    //   middleName: [''],
    //   lastName: ['', Validators.required],
    //   suffix: [''],
    //   race: [''],
    //   relationshipToApplicant: [''],
    //   conceptionOccurredState: [''],
    //   gender: [''],
    //   state: [''],
    //   county: [''],
    //   city: [''],
    //   ssn: [''],
    //   dob: [''],
    //   mother_married_father: [false],
    //   order_for_childSupport: [false],
    //   ncp_pay_support: [false],
    //   ncp_pay: ['']
    // });


  }
  addChild() {
    //this.showChildForm = true;

    this.addChildEvent.emit(this.childForm.value);  // Emit event to parent
    //this.childForm.reset();  // Clear the form after saving
    this.clearChildFormFields(); // Clear the form after saving

    console.log("print children from child component", this.step3Form.get('children')?.value);
    console.log("print children from child component using children get", this.children.value);


    // this.childrenData.push({ ...this.childForm });
    this.showChildForm = false;
  }





  // Method to delete a child from the list
  deleteChild(index: number) {

    this.children.removeAt(index);
    console.log("print children after delete child", this.children.value);

  }
  // Method to clear the child form fields after adding a child
  clearChildFormFields(): void {
    this.childForm.patchValue({
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      race: '',
      relationshipToApplicant: '',
      conceptionOccurredState: '',
      gender: '',
      state: '',
      county: '',
      city: '',
      ssn: '',
      dob: '',
    });
  }
}
