import { Component, inject, OnInit } from '@angular/core';
import { CustodialPartyAccordionStep1Component } from './componet/applicant/custodial-party-accordion-step1/custodial-party-accordion-step1.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustodialPartyAccordionStep2Component } from './componet/ncp-info/custodial-party-accordion-step2/custodial-party-accordion-step2.component';
import { CustodialPartyAccordionStep3Component } from './componet/support/custodial-party-accordion-step3/custodial-party-accordion-step3.component';
import { Applicant, CustomFormData, FormDataService } from '../../services/dashboard-service/form-data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustodialPartyAccordionStep4Component } from './componet/insurance/custodial-party-accordion-step4/custodial-party-accordion-step4.component';
import { CustodialPartyAccordionStep5Component } from './componet/file upload/custodial-party-accordion-step5/custodial-party-accordion-step5.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-paper-app',
  standalone: true,
  imports: [CustodialPartyAccordionStep1Component, CustodialPartyAccordionStep2Component, CustodialPartyAccordionStep3Component, CustodialPartyAccordionStep4Component, CustodialPartyAccordionStep5Component, MatStepperModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './paper-app.component.html',
  styleUrl: './paper-app.component.css'
})
export class PaperAppComponent implements OnInit {


  //  formData!: CustomFormData;
  // applicant!: Applicant;

  form!: FormGroup;
  child: any;

  file: File | null = null;

  
  constructor(private _formBuilder: FormBuilder, private formDataService: FormDataService, private http: HttpClient, private router: Router, private authService: AuthService) {

  }

  onClickDashboard(){
    this.router.navigate(['/dashboard']);
    console.log("Dashboard menu button clicked");
    
  }

  ngOnInit(): void {
    // Initialize the form with all form groups for each step
    this.form = this._formBuilder.group({

      step1FormGroup: this._formBuilder.group({

        firstName: ['', Validators.required],
        middleName: [''],
        lastName: [''],
        suffix: [''],
        maidenName: [''],
        nickName: [''],
        dob: [],
        ssnItin: [''],
        gender: [''],
        race: [''],
        relationshipToChild: [''],


        cpAlternativeFirstName: [''],
        cpAlternativeMiddleName: [''],
        cpAlternativeLastName: [''],
        cpAlternativeSuffix: [''],



        mailing_address_source: [''],
        mailing_address_interNationalAddress: [''],
        //mailing_address_validated: [''],
        mailing_address_addressLine1: [''],
        mailing_address_addressLine2: [''],
        mailing_address_city: [''],
        mailing_address_state: [''],
        mailing_address_county: [''],
        mailing_address_zipcode: [],
        mailing_address_country: [''],



        residential_address_source: [''],
        residential_address_interNationalAddress: [''],
        //residential_address_validated: [''],
        residential_address_addressLine1: [''],
        residential_address_addressLine2: [''],
        residential_address_city: [''],
        residential_address_state: [''],
        residential_address_county: [''],
        residential_address_zipcode: [],
        residential_address_country: [''],
        residential_address_homePhone: [''],
        residential_address_businessPhone: [''],
        residential_address_cellPhone: [''],
        residential_address_email: [''],


        nearest_relative_relationship: [''],
        nearest_relative_firstName: [''],
        nearest_relative_lastName: [''],
        nearest_relative_phone: [''],




        relative_address_source: [''],
        relative_address_interNationalAddress: [''],
        // relative_address_addressValidated: [''],
        relative_address_addressLine1: [''],
        relative_address_addressLine2: [''],
        relative_address_city: [''],
        relative_address_state: [''],
        relative_address_county: [''],
        relative_address_zipcode: [''],
        relative_address_country: [''],

        familyViolence: [''],




        employer_info_employed: [''],


        // incom_info_type: [''],
        // incom_info_frequency: [''],
        // incom_info_amount: [],
        income: this._formBuilder.array([]),


        currentTcaRecipient: [''],
        currentMaRecipient: [''],
        formerTcaRecipient: [''],
        formerMaRecipient: [''],
        tcaApplicant: [''],
        maApplicant: [''],
        finacialStatemet: [''],
        serviceFee: [''],



        attorney_firstName: [''],
        attorney_middleName: [''],
        attorney_lastName: [''],
        attorney_phone: [],
        attorney_source: [''],
        attorney_interNationalAddress: [''],
        // attorney_addressValidated: [''],
        attorney_addressLine1: [''],
        attorney_addressLine2: [''],
        attorney_city: [''],
        attorney_state: [''],
        attorney_county: [''],
        attorney_zipcode: [],
        attorney_country: [''],

        asset: this._formBuilder.array([]),




        // },
      }),

      step2FormGroup: this._formBuilder.group({

        firstName: ['', Validators.required],
        middleName: [''],
        lastName: [''],
        suffix: [''],
        relationshipToChild: [''],
        nickName: [''],
        maidenName: [''],
        approx_age: [0],
        source: [''],
        international_address: [''],
        address_line1: [''],
        address_line2: [''],
        city: [''],
        state: [''],
        county: [''],
        zipcode: [''],
        country: [''],
        citizenship_status: [''],
        marital_status: [''],
        email: [''],
        home_phone: [''],
        business_phone: [''],
        cell_phone: [''],
        race: [''],
        gender: [''],
        ssnItin: [''],
        dob: [],

        eye_color: [''],
        height_ft: [''],
        height_in: [''],
        identification_mark: [''],
        hair_colour: [''],
        weight: [0],
        drivers_license_number: [0],
        place_of_birth_city: [''],
        place_of_birth_state: [''],
        member_of_union_or_local: [],


        ncpAlternativeFirstName: [''],
        ncpAlternativeMiddleName: [''],
        ncpAlternativeLastName: [''],
        ncpAlternativeSuffix: [''],

        served_in_military: [],
        been_in_jail: [],



        nearest_relative_firstName: [''],
        nearest_relative_middleName: [''],

        nearest_relative_lastName: [''],
        nearest_relative_relationship: [''],

        nearest_relative_phone: [''],



        relative_address_source: [''],
        relative_address_interNationalAddress: [],
        // relative_address_addressValidated: [''],
        relative_address_addressLine1: [''],
        relative_address_addressLine2: [''],
        relative_address_city: [''],
        relative_address_state: [''],
        relative_address_county: [''],
        relative_address_zipcode: [''],
        relative_address_country: [''],

        ncp_mother_firstName: [''],
        ncp_mother_middleName: [''],
        ncp_mother_lastName: [''],
        ncp_mother_phone: [],
        ncp_mother_source: [''],
        ncp_mother_interNationalAddress: [''],
        ncp_mother_address_line1: [''],
        ncp_mother_address_line2: [''],

        ncp_mother_city: [''],
        ncp_mother_state: [''],
        ncp_mother_county: [''],
        ncp_mother_zipcode: [],
        ncp_mother_country: [''],


        ncp_father_firstName: [''],
        ncp_father_middleName: [''],
        ncp_father_lastName: [''],
        ncp_father_phone: [],
        ncp_father_source: [''],
        ncp_father_interNationalAddress: [''],
        ncp_father_address_line1: [''],
        ncp_father_address_line2: [''],

        ncp_father_city: [''],
        ncp_father_state: [''],
        ncp_fathers_county: [''],
        ncp_father_zipcode: [],
        ncp_father_country: [''],

        employer_info_employed: [],
        permit_to_work: [],
        type_info: [''],
        other_child_cases: [],
        income_state: [''],
        income_type: [''],
        income_frequency: [''],
        income_amount: [0],

        ncp_income: this._formBuilder.array([]),


        ncp_attorney_firstName: [''],
        ncp_attorney_middleName: [''],
        ncp_attorney_lastName: [''],
        ncp_attorney_phone: [],
        ncp_attorney_source: [''],
        ncp_attorney_interNationalAddress: [],
        // attorney_addressValidated: [''],
        ncp_attorney_addressLine1: [''],
        ncp_attorney_addressLine2: [''],
        ncp_attorney_city: [''],
        ncp_attorney_state: [''],
        ncp_attorney_county: [''],
        ncp_attorney_zipcode: [],
        ncp_attorney_country: [''],

        ncp_asset: this._formBuilder.array([]),


      }),

      step3FormGroup: this._formBuilder.group({
        // Relationship between CP and NCP

        relationship: [''],
        date_married: [],
        date_separated: [],
        country_separated: [''],
        state_separated: [''],
        county_separated: [''],
        divorce_pending: [],
        child_support_included: [],
        children: this._formBuilder.array([]),
      }),

      step4FormGroup: this._formBuilder.group({
        insurance: this._formBuilder.array([]),
      }),

      step5FormGroup: this._formBuilder.group({
        // Service Type Requested checkboxes
        fullServices: [false, Validators.required],
        locateOnly: [false],
        paternityOnly: [false],
        medicalSupportOnly: [false],
        childSupportOnly: [false],
        childAndSpousalSupportOnly: [false],

        // File Upload fields
        category: ['', Validators.required],
        document_type: ['', Validators.required],
        // File Upload control can be handled manually in the form submission logic
        fileInput: [null]

      }),


    });
    console.log("mainform", this.form);
    console.log("childform", this.step1FormGroup);
    // this.addChild();
  }

// Getter for ncp_asset FormArray
get ncp_asset(): FormArray {
  return this.step2FormGroup.get('ncp_asset') as FormArray;
}

 // Add a new ncp_asset form group to the FormArray
 addNcpAsset(assetData: any) {
  console.log('Adding a new ncp asset form');
  const ncp_assetForm = this._formBuilder.group({
    asset_type: [assetData.asset_type, Validators.required],
    asset_value: [assetData.asset_value],
  });
  console.log('Before Adding:', this.ncp_asset.value);  // Debug current state
  this.ncp_asset.push(ncp_assetForm);
  console.log('After Adding:', this.ncp_asset.value);  // Debug after adding
  console.log('Total income:', this.ncp_asset.length);

}

// Save the ncp_asset form data
saveNcpAsset(assetData: any) {
  this.addNcpAsset(assetData);  // Add the income data to the array
}


// Getter for ncp_income FormArray
get ncp_income(): FormArray {
  return this.step2FormGroup.get('ncp_income') as FormArray;
}


// Add a new ncp_income form group to the FormArray
addNcpIncome(incomeData: any) {
  console.log('Adding a new income form');
  const incomForm = this._formBuilder.group({
    income_type: [incomeData.income_type, Validators.required],
    income_frequency: [incomeData.income_frequency],
    income_amount: [incomeData.income_amount],
  });
  console.log('Before Adding:', this.ncp_income.value);  // Debug current state
  this.ncp_income.push(incomForm);
  console.log('After Adding:', this.ncp_income.value);  // Debug after adding
  console.log('Total income:', this.ncp_income.length);

}

// Save the ncp income form data
saveNcpIncome(incomeData: any) {
  this.addNcpIncome(incomeData);  // Add the income data to the array
}


  // Getter for asset FormArray
  get asset(): FormArray {
    return this.step1FormGroup.get('asset') as FormArray;
  }

  // Add a new asset form group to the FormArray
  addAsset(assetData: any) {
    console.log('Adding a new asset form');
    const assetForm = this._formBuilder.group({
      asset_type: [assetData.asset_type, Validators.required],
      asset_value: [assetData.asset_value],
    });
    console.log('Before Adding:', this.asset.value);  // Debug current state
    this.asset.push(assetForm);
    console.log('After Adding:', this.asset.value);  // Debug after adding
    console.log('Total income:', this.asset.length);

  }

  // Save the asset form data
  saveAsset(assetData: any) {
    this.addAsset(assetData);  // Add the income data to the array
  }

  // Getter for income FormArray
  get income(): FormArray {
    return this.step1FormGroup.get('income') as FormArray;
  }

  // Add a new child form group to the FormArray
  addIncome(incomeData: any) {
    console.log('Adding a new income form');
    const incomForm = this._formBuilder.group({
      incom_info_type: [incomeData.incom_info_type, Validators.required],
      incom_info_frequency: [incomeData.incom_info_frequency],
      incom_info_amount: [incomeData.incom_info_amount],
    });
    console.log('Before Adding:', this.income.value);  // Debug current state
    this.income.push(incomForm);
    console.log('After Adding:', this.income.value);  // Debug after adding
    console.log('Total income:', this.income.length);

  }

  // Save the income form data
  saveIncome(incomeData: any) {
    this.addIncome(incomeData);  // Add the income data to the array
  }

  // Getter for children FormArray
  get children(): FormArray {
    return this.step3FormGroup.get('children') as FormArray;
  }
  // Add a new child form group to the FormArray
  addChild(childData: any) {
    console.log('Adding a new child form');
    const childForm = this._formBuilder.group({
      firstName: [childData.firstName, Validators.required],
      middleName: [childData.middleName],
      lastName: [childData.lastName],
      suffix: [childData.suffix],
      race: [childData.race],
      relationshipToApplicant: [childData.relationshipToApplicant],
      conceptionOccurredState: [childData.conceptionOccurredState],

      gender: [childData.gender],
      state: [childData.state],
      county: [childData.county],
      city: [childData.city],
      ssn: [childData.ssn],
      dob: [childData.dob],

      mother_married_father: [childData.mother_married_father],
      order_for_childSupport: [childData.order_for_childSupport],
      ncp_pay_support: [childData.ncp_pay_support],
      ncp_pay: [childData.ncp_pay],

    });
    console.log('Before Adding:', this.children.value);  // Debug current state
    this.children.push(childForm);
    console.log('After Adding:', this.children.value);  // Debug after adding
    console.log('Total children:', this.children.length);

  }

  // Save the child form data
  saveChild(childData: any) {
    this.addChild(childData);  // Add the child data to the array
  }


  // Getter for insurance FormArray
  get insurance(): FormArray {
    return this.step4FormGroup.get('insurance') as FormArray;
  }

  // Add a new insurance form group to the FormArray
  addInsurance(insuranceData: any) {
    console.log('Adding a new child form');
    const insuranceForm = this._formBuilder.group({
      policyNumber: [insuranceData.policyNumber, Validators.required],
      agentName: [insuranceData.agentName],
      documents: [insuranceData.documents],

    });
    console.log('Before Adding insurance:', this.insurance.value);  // Debug current state
    this.insurance.push(insuranceForm);
    console.log('After Adding insurance:', this.insurance.value);  // Debug after adding
    console.log('Total insurance:', this.insurance.length);
  }

  // Save the insurance form data
  saveInsurance(insuranceData: any) {
    this.addInsurance(insuranceData);  // Add the child data to the array
  }

  get step1FormGroup(): FormGroup {

    // console.log("step1FormGroup", this.form.get('step1FormGroup')?.value);

    return this.form.get('step1FormGroup') as FormGroup;

  }
  get step2FormGroup(): FormGroup {

    // console.log("step1FormGroup", this.form.get('step1FormGroup')?.value);

    return this.form.get('step2FormGroup') as FormGroup;

  }
  get step3FormGroup(): FormGroup {

    // console.log("step1FormGroup", this.form.get('step1FormGroup')?.value);

    return this.form.get('step3FormGroup') as FormGroup;

  }

  get step4FormGroup(): FormGroup {

    // console.log("step1FormGroup", this.form.get('step1FormGroup')?.value);

    return this.form.get('step4FormGroup') as FormGroup;

  }
  get step5FormGroup(): FormGroup {

    // console.log("step5FormGroup", this.form.get('step5FormGroup')?.value);

    return this.form.get('step5FormGroup') as FormGroup;

  }

  submit() {
    // Send the formData to the backend
    this.http.post('http://localhost:3000/submit-form', this.form.get('step1FormGroup')?.value).subscribe(
      response => {
        console.log('Form submitted successfully', response);
        // Handle success (e.g., navigate to a success page)
      },
      error => {
        console.error('Error submitting form', error);
        // Handle error (e.g., display error message)
      }
    );
    //  console.log('Form submitted successfully', this.form.get('step1FormGroup')?.value);
  }

  step2FormSubmit() {
    // Send the formData to the backend
    this.http.post('http://localhost:3000/ncp-form-submit', this.form.get('step2FormGroup')?.value).subscribe(
      response => {
        console.log('Form submitted successfully', response);
        // Handle success (e.g., navigate to a success page)
      },
      error => {
        console.error('Error submitting form', error);
        // Handle error (e.g., display error message)
      }
    );
    //  console.log('Form submitted successfully', this.form.get('step2FormGroup')?.value);
  }

  step3FormSubmit() {
    // Send the formData to the backend

    console.log("childform3", this.step3FormGroup);
    console.log("child array", this.step3FormGroup.get('children')?.value);

    console.log('Form submitted successfully', this.form.get('step3FormGroup')?.value);

    if (this.step3FormGroup.valid) {
      // Get the entire form data including the children data
      const formData = this.step3FormGroup.value;

      // Log the formData for debugging (optional)
      console.log('Form Data to Submit:', formData);

      // Send data to the backend
      this.http.post('http://localhost:3000/parent-child', formData)
        .subscribe({
          next: (response) => {
            console.log('Form submitted successfully', response);
          },
          error: (error) => {
            console.error('Error submitting form', error);
          }
        });
    } else {
      console.log('Form is invalid');
    }


  }

  step4FormSubmit() {
    // Send the formData to the backend

    console.log("insurance form", this.step4FormGroup);
    console.log("insurance array", this.step4FormGroup.get('insurance')?.value);

    console.log('Form submitted successfully', this.form.get('step4FormGroup')?.value);

    if (this.step4FormGroup.valid) {

      const formData = new FormData();
      // Get the entire form data including the children data
      // const insuranceArray  = this.step4FormGroup.value;
      const insuranceArray = this.step4FormGroup.get('insurance') as FormArray;

      // Log the formData for debugging (optional)
      console.log('Insurance Data in step4FormGroup', insuranceArray);
      console.log("Type of insuranceArray:", typeof insuranceArray);

      // Iterate through the form array and append each field to FormData
      insuranceArray.controls.forEach((insuranceControl: any, index: number) => {
        const insurance = insuranceControl.value;
        console.log('insuranceControl.value:', insuranceControl.value);
        console.log('Appending policyNumber:', insurance.policyNumber); // Check the value

        formData.append(`insurance[${index}][policyNumber]`, insurance.policyNumber);

        console.log('Appending agentName:', insurance.agentName); // Check the value

        formData.append(`insurance[${index}][agentName]`, insurance.agentName);
        console.log("Type of insurance.documents:", typeof insurance.documents);

        // If there's a file, append it to the FormData
        if (insurance.documents instanceof File) {
          console.log("insurance.documents is a File instance");
          console.log('Appending document:', insurance.documents.name); // Check the file name
          // formData.append(`insurance[${index}][documents]`, insurance.documents);
          formData.append('documents', insurance.documents);

        }


      });
      // Log FormData contents for debugging
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      // Log the formData for debugging (optional)
      console.log('Insurance Data to Submit:', formData);

      // Send data to the backend
      this.http.post('http://localhost:3000/insurance-submit', formData)
        .subscribe({
          next: (response) => {
            console.log('insurance data submitted successfully', response);
          },
          error: (error) => {
            console.error('Error submitting insurance data', error);
          }
        });
    } else {
      console.log('insurance form is invalid');
    }


  }

  // Method to handle the file selected event from the child
  onFileSelected(file: File) {
    this.file = file;
    console.log('File received in parent:', this.file);
  }



  step5FormSubmit() {
    if (this.step5FormGroup.valid) {
      const formData = new FormData();
      formData.append('fullServices', this.step5FormGroup.get('fullServices')?.value);
      formData.append('locateOnly', this.step5FormGroup.get('locateOnly')?.value);
      formData.append('paternityOnly', this.step5FormGroup.get('paternityOnly')?.value);
      formData.append('medicalSupportOnly', this.step5FormGroup.get('medicalSupportOnly')?.value);
      formData.append('childSupportOnly', this.step5FormGroup.get('childSupportOnly')?.value);
      formData.append('childAndSpousalSupportOnly', this.step5FormGroup.get('childAndSpousalSupportOnly')?.value);
      formData.append('category', this.step5FormGroup.get('category')?.value);
      formData.append('document_type', this.step5FormGroup.get('document_type')?.value);


      console.log('File selected parent :', this.file);
      // console.log('File selected stored in fileInput :', this.step5FormGroup.get('fileInput')?.value);
      // formData.append('fileInput', this.step5FormGroup.get('fileInput')?.value);

      if (this.file) {
        console.log('Appending document:', this.file.name); // Check the file name

        formData.append('fileInput', this.file, this.file.name);
      }

      // Log FormData contents for debugging
      formData.forEach((value, key) => {
        console.log("formData", key, value);
      });
      // Send the formData to the backend
      this.http.post('http://localhost:3000/service-request', formData).subscribe(
        response => {
          console.log('Form submitted successfully', response);
          // Handle success (e.g., navigate to a success page)
        },
        error => {
          console.error('Error submitting form', error);
          // Handle error (e.g., display error message)
        }
      );
      //  console.log('Form submitted successfully', this.form.get('step1FormGroup')?.value);

    }
  }

  //  private _formBuilder = inject(FormBuilder);
  //  firstFormGroup = this._formBuilder.group({
  // firstCtrl:['', Validators.required],
  // firstname : ['',Validators.required]
  //  });
  //  secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  // thirdFormGroup = this._formBuilder.group({
  //   thirdCtrl: ['', Validators.required],
  // });
  // forthFormGroup = this._formBuilder.group({
  //   forthCtrl: ['', Validators.required],
  // });
  // fifthFormGroup = this._formBuilder.group({
  //   fithCtrl: ['', Validators.required],
  // });
  // sixthFormGroup = this._formBuilder.group({
  //   sixthCtrl: ['', Validators.required],
  // });
  isLinear = false;
}
