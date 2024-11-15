import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-custodial-party-accordion-step4',
  standalone: true,
  imports: [MatExpansionModule,MatIcon, MatTable, MatTableModule, MatIconButton, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './custodial-party-accordion-step4.component.html',
  styleUrl: './custodial-party-accordion-step4.component.css'
})
export class CustodialPartyAccordionStep4Component {
  readonly panelOpenState = signal(false);
  @Input() step4Form!: FormGroup;
  @Output() addInsuranceEvent = new EventEmitter<void>();  // Output to notify parent
  get insurance(): FormArray {
    return this.step4Form.get('insurance') as FormArray;
  }
  showInsuranceForm = false;
  selectedFile: File | null = null;
  insuranceForm!: FormGroup;
  constructor(private fb: FormBuilder){
    // Initialize the insurance form group
    this.insuranceForm = this.fb.group({
      policyNumber: ['', Validators.required],
      agentName: [''],
      documents: ['', Validators.required],
    });
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      this.selectedFile = fileInput.files[0];
      // this.insuranceForm.patchValue({
      //   documents: this.selectedFile
      // });
    }

    // const file = event.target.files[0] as HTMLInputElement;
    // if (file) {
    //   this.insuranceForm.patchValue({
    //     documents: file
    //   });
    // }
    
  }

  // Method to show the form
  addInsuranceForm() {
    this.showInsuranceForm = true;

  }

  addInsurance(){
  
     this.addInsuranceEvent.emit({...this.insuranceForm.value, documents: this.selectedFile} );  // Emit event to parent
     this.clearInsuranceFormFields(); // Clear the form after saving
  
    // console.log("print children from child component",this.step3Form.get('children')?.value);
    // console.log("print children from child component using children get",this.children.value);
  
   
    this.showInsuranceForm= false;
  }

  // Method to delete a child from the list
  deleteInsurance(index: number) {

    this.insurance.removeAt(index);
    console.log("print children after delete child", this.insurance.value);

  }

  clearInsuranceFormFields(){
    this.insuranceForm.patchValue({
      policyNumber: '',
      agentName: '',
      documents: '',
    });
  }

}
