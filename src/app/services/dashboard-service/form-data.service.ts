import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CustomFormData{
  //Add more sections as needed
  applicant: Applicant;


}

export interface Applicant{
  
  personalInfo:{
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
  maidenName: string;
    nickName: string;
    dob: string;
    ssnItin: string;
    gender: string;
    race: string;
    relationshipToChild: string;
  
    cpAlternative: {
      cpAlternativeFirstName: string;
      cpAlternativeMiddleName: string;
      cpAlternativeLastName: string;
      cpAlternativeSuffix: string;
    };
  
    applicantMailingAddress:{
      source: string;
      interNationalAddress: string;
      addressValidated: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      county: string;
      zipcode: number;
      country: string;
    };
    applicantResidentialAddress:{
      source: string;
      interNationalAddress: string;
      addressValidated: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      county: string;
      zipcode: number;
      country: string;
      homePhone: string;
      businessPhone: string;
      cellPhone: string;
      email: string;
    };
    applicantNearestRelative:{
      relationship: string;
      firstName: string;
      lastName: string;
      phone: string;
     
    };
  
    relativeAddress:{
      source: string;
      interNationalAddress: string;
      addressValidated: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      county: string;
      zipcode: number;
      
      familyViolence: string;
    };
  };

employerInfo:{
  cpEmployed: string;
};
incomInfo: {
 type: string;
 frequency: string;
 amount: number;
};
  benefitInfo: {
    currentTcaRecipient: string;
    currentMaRecipient: string;
    formerTcaRecipient: string;
    formerMaRecipient: string;
tcaApplicant: string;
maApplicant: string;
finacialStatemet: string;
serviceFee: string;
  };

  attorneyInfo:{
    firstName: string;
    middleName: string;
    lastName: string;
    phone: number;
    source: string;
      interNationalAddress: string;
      addressValidated: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      county: string;
      zipcode: number;
      country: string;

  };
  


}

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }

  private formData = new BehaviorSubject<any>({
    // applicant: {
    //   personalInfo: {
    //     firstName: '',
    //     middleName: '',
    //     lastName: '',
    //     suffix: '',
    //     maidenName: '',
    //     nickName: '',
    //     dob: '',
    //     ssnItin: '',
    //     gender: '',
    //     race: '',
    //     relationshipToChild: '',
    //     cpAlternative: {
    //       cpAlternativeFirstName: '',
    //       cpAlternativeMiddleName: '',
    //       cpAlternativeLastName: '',
    //       cpAlternativeSuffix: ''
    //     },
    //     applicantMailingAddress: {
    //       source: '',
    //       interNationalAddress: '',
    //       addressValidated: '',
    //       addressLine1: '',
    //       addressLine2: '',
    //       city: '',
    //       state: '',
    //       county: '',
    //       zipcode: 0,
    //       country: ''
    //     },
    //     applicantResidentialAddress: {
    //       source: '',
    //       interNationalAddress: '',
    //       addressValidated: '',
    //       addressLine1: '',
    //       addressLine2: '',
    //       city: '',
    //       state: '',
    //       county: '',
    //       zipcode: 0,
    //       country: '',
    //       homePhone: '',
    //       businessPhone: '',
    //       cellPhone: '',
    //       email: ''
    //     },
    //     applicantNearestRelative: {
    //       relationship: '',
    //       firstName: '',
    //       lastName: '',
    //       phone: ''
    //     },
    //     relativeAddress: {
    //       source: '',
    //       interNationalAddress: '',
    //       addressValidated: '',
    //       addressLine1: '',
    //       addressLine2: '',
    //       city: '',
    //       state: '',
    //       county: '',
    //       zipcode: 0,
    //       familyViolence: ''
    //     }
    //   },
    //   employerInfo: {
    //     cpEmployed: ''
    //   },
    //   incomInfo: {
    //     type: '',
    //     frequency: '',
    //     amount: 0
    //   },
    //   benefitInfo: {
    //     currentTcaRecipient: '',
    //     currentMaRecipient: '',
    //     formerTcaRecipient: '',
    //     formerMaRecipient: '',
    //     tcaApplicant: '',
    //     maApplicant: '',
    //     finacialStatemet: '',
    //     serviceFee: ''
    //   },
    //   attorneyInfo: {
    //     firstName: '',
    //     middleName: '',
    //     lastName: '',
    //     phone: 0,
    //     source: '',
    //     interNationalAddress: '',
    //     addressValidated: '',
    //     addressLine1: '',
    //     addressLine2: '',
    //     city: '',
    //     state: '',
    //     county: '',
    //     zipcode: 0,
    //     country: ''
    //   }
    // }
  });
  formDatas = this.formData.asObservable();

  updateApplicantInfo(data: Applicant) {
    const currentData = this.formData.value;
    this.formData.next({ ...currentData, applicant: data });
  }

  // setFormData(data: any) {
  //   this.formData.next(data);
  // }
  setFormData(data: any) {
    this.formData.next({ ...this.formData.value, ...data });
  }
  // getFormData(): Applicant {
  //   return this.formData.getValue();
  // }
  getFormData() {
    return this.formData.getValue();
  }
}
