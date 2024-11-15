import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-custodial-party-accordion-step2',
  standalone: true,
  imports: [ReactiveFormsModule, MatExpansionModule, MatTable, MatIconButton, MatIcon, MatTableModule, CommonModule],
  templateUrl: './custodial-party-accordion-step2.component.html',
  styleUrl: './custodial-party-accordion-step2.component.css'
})
export class CustodialPartyAccordionStep2Component implements OnInit{
  @Input() step2Form!: FormGroup;
  @Output() addIncomeEvent = new EventEmitter<void>();  // Output to notify parent
  @Output() addAssetEvent = new EventEmitter<void>();  // Output to notify parent

  ncp_incomeForm!: FormGroup;
  ncp_assetForm!: FormGroup;
  get ncp_income(): FormArray {
    return this.step2Form.get('ncp_income') as FormArray;
  }
  get ncp_asset(): FormArray {
    return this.step2Form.get('ncp_asset') as FormArray;
  }
  constructor(private _formBuilder: FormBuilder) {
    this.ncp_incomeForm = this._formBuilder.group({
      income_type: ['', Validators.required],
      income_frequency: ['', Validators.required],
      income_amount:[0, Validators.required]
    });
    
    this.ncp_assetForm = this._formBuilder.group({
      asset_type: ['', Validators.required],
      asset_value:[0, Validators.required]
    });
      }


      addIncome(){
        this.addIncomeEvent.emit(this.ncp_incomeForm.value);//Emit event to parent
    this.clearIncomeFormFields();
        console.log("print income from child component using income get", this.ncp_income.value);
        //this.updateTotalIncome();
      }

      deleteIncome(index: number) {

        this.ncp_income.removeAt(index);
        console.log("print income after delete child", this.ncp_income.value);
       // this.updateTotalIncome();
      
      }
      addAsset(){
        this.addAssetEvent.emit(this.ncp_assetForm.value);//Emit event to parent
      this.clearAssetFormFields();
        console.log("print income from child component using income get", this.ncp_asset.value);
        //this.updateTotalIncome();
      }

      // Method to delete a asset from the list
deleteAsset(index: number) {

  this.ncp_asset.removeAt(index);
  console.log("print income after delete asset", this.ncp_asset.value);
  //this.updateTotalIncome();

}
// Method to clear the income form fields after adding an income
clearIncomeFormFields(): void {
  this.ncp_incomeForm.patchValue({
    income_type: '',
    income_frequency: '',
    income_amount:0
  });
}
clearAssetFormFields(): void {
  this.ncp_assetForm.patchValue({
    asset_type: '',
    asset_value:0
  });
}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log('FormGroup in step2:', this.step2Form);

  }
  readonly panelOpenState = signal(false);

}
