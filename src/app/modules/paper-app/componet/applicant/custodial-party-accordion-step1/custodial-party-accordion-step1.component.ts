import { ChangeDetectionStrategy, Component, EventEmitter, Input, input, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-custodial-party-accordion-step1',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule, MatIcon, MatIconButton, MatTable, MatTableModule, ReactiveFormsModule, FormsModule],
  templateUrl: './custodial-party-accordion-step1.component.html',
  styleUrl: './custodial-party-accordion-step1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustodialPartyAccordionStep1Component implements OnInit {

  @Input() step1Form!: FormGroup;
  @Output() addIncomeEvent = new EventEmitter<void>();  // Output to notify parent
  @Output() addAssetEvent = new EventEmitter<void>();  // Output to notify parent

  incomeForm!: FormGroup;
  assetForm!: FormGroup;
  get income(): FormArray {
    return this.step1Form.get('income') as FormArray;
  }
  get asset(): FormArray {
    return this.step1Form.get('asset') as FormArray;
  }
  totalIncome: number = 0;

  //  step1FormGroup!: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
this.incomeForm = this._formBuilder.group({
  incom_info_type: ['', Validators.required],
  incom_info_frequency: ['', Validators.required],
  incom_info_amount:[0, Validators.required]
});

this.assetForm = this._formBuilder.group({
  asset_type: ['', Validators.required],
  asset_value:[0, Validators.required]
});
  }

  updateTotalIncome(): void {
    this.totalIncome = this.income.controls.reduce((total: number, control: any) => {
      return total + (control.get('incom_info_amount')?.value || 0);
    }, 0);
  }

  addIncome(){
    this.addIncomeEvent.emit(this.incomeForm.value);//Emit event to parent
this.clearIncomeFormFields();
    console.log("print income from child component using income get", this.income.value);
    this.updateTotalIncome();
  }
 // Method to delete a child from the list
 deleteIncome(index: number) {

  this.income.removeAt(index);
  console.log("print income after delete child", this.income.value);
  this.updateTotalIncome();

}

addAsset(){
  this.addAssetEvent.emit(this.assetForm.value);//Emit event to parent
this.clearAssetFormFields();
  console.log("print income from child component using income get", this.asset.value);
  //this.updateTotalIncome();
}

// Method to delete a asset from the list
deleteAsset(index: number) {

  this.asset.removeAt(index);
  console.log("print income after delete asset", this.asset.value);
  //this.updateTotalIncome();

}

clearAssetFormFields(): void {
  this.assetForm.patchValue({
    asset_type: '',
    asset_value:0
  });
}
// Method to clear the income form fields after adding an income
clearIncomeFormFields(): void {
  this.incomeForm.patchValue({
    incom_info_type: '',
    incom_info_frequency: '',
    incom_info_amount:0
  });
}
  ngOnInit(): void {
    //this.formDataService.formDatas.subscribe(data => {
    // Assuming you have access to the parent form group
    // this.step1FormGroup = this.formDataService.getFormData();
    // this.formDataService.formDatas.subscribe(data => {
    //  this.step1Form.patchValue(data.step1FormGroup);
    // })
    //  }); 

    // this.step1FormGroup = this._formBuilder.group({
    //   // firstName: [''],
    //   // lastName: [''],
    //   // personalInfo: {
    //     firstName: ['', Validators.required],
    //     middleName: [''],
    //     lastName: [''],
    //     suffix: [''],
    //     maidenName: [''],
    //     nickName: [''],
    //     dob: [],
    //     ssnItin: [''],
    //     gender: [''],
    //     race: [''],
    //     relationshipToChild: [''],


    //     cpAlternativeFirstName: [''],
    //     cpAlternativeMiddleName: [''],
    //     cpAlternativeLastName: [''],
    //     cpAlternativeSuffix: [''],



    //     mailing_address_source: [''],
    //     mailing_address_interNationalAddress: [''],
    //     //mailing_address_validated: [''],
    //     mailing_address_addressLine1: [''],
    //     mailing_address_addressLine2: [''],
    //     mailing_address_city: [''],
    //     mailing_address_state: [''],
    //     mailing_address_county: [''],
    //     mailing_address_zipcode: [],
    //     mailing_address_country: [''],



    //     residential_address_source: [''],
    //     residential_address_interNationalAddress: [''],
    //     //residential_address_validated: [''],
    //     residential_address_addressLine1: [''],
    //     residential_address_addressLine2: [''],
    //     residential_address_city: [''],
    //     residential_address_state: [''],
    //     residential_address_county: [''],
    //     residential_address_zipcode: [],
    //     residential_address_country: [''],
    //     residential_address_homePhone: [''],
    //     residential_address_businessPhone: [''],
    //     residential_address_cellPhone: [''],
    //     residential_address_email: [''],


    //     nearest_relative_relationship: [''],
    //     nearest_relative_firstName: [''],
    //     nearest_relative_lastName: [''],
    //     nearest_relative_phone: [''],




    //     relative_address_source: [''],
    //     relative_address_interNationalAddress: [''],
    //     // relative_address_addressValidated: [''],
    //     relative_address_addressLine1: [''],
    //     relative_address_addressLine2: [''],
    //     relative_address_city: [''],
    //     relative_address_state: [''],
    //     relative_address_county: [''],
    //     relative_address_zipcode: [''],
    //     relative_address_country: [''],

    //     familyViolence: [''],




    //     employer_info_employed: [''],


    //     incom_info_type: [''],
    //     incom_info_frequency: [''],
    //     incom_info_amount: [],


    //     currentTcaRecipient: [''],
    //     currentMaRecipient: [''],
    //     formerTcaRecipient: [''],
    //     formerMaRecipient: [''],
    //     tcaApplicant: [''],
    //     maApplicant: [''],
    //     finacialStatemet: [''],
    //     serviceFee: [''],



    //     attorney_firstName: [''],
    //     attorney_middleName: [''],
    //     attorney_lastName: [''],
    //     attorney_phone: [],
    //     attorney_source: [''],
    //     attorney_interNationalAddress: [''],
    //     // attorney_addressValidated: [''],
    //     attorney_addressLine1: [''],
    //     attorney_addressLine2: [''],
    //     attorney_city: [''],
    //     attorney_state: [''],
    //     attorney_county: [''],
    //     attorney_zipcode: [],
    //     attorney_country: [''],




    //   // },
    // });


    console.log('FormGroup in step1:', this.step1Form);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['step1Form']) {
  //     console.log('FormGroup in step1:', this.step1Form);  // Log to verify formGroup is passed correctly
  //   }
  // }



  readonly panelOpenState = signal(false);

  // onNextStep() {
  //   if (this.step1FormGroup.valid) {
  //     console.log(this.step1FormGroup.value); // Logs all the form values including nested groups
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }


}
