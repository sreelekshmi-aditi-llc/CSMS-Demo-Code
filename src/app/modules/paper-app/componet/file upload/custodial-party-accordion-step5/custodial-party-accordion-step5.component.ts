import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-custodial-party-accordion-step5',
  standalone: true,
  imports: [MatExpansionModule, MatIcon, FormsModule, ReactiveFormsModule],
  templateUrl: './custodial-party-accordion-step5.component.html',
  styleUrl: './custodial-party-accordion-step5.component.css'
})
export class CustodialPartyAccordionStep5Component {
  readonly panelOpenState = signal(false);
  @Input() step5Form!: FormGroup;
  // @Input()
  // onFileChangeMethod!: (event: any) => void;

  @Output() fileSelected = new EventEmitter<File>();

  ngOnChanges() {
    if (!this.step5Form) {
      console.error('step5Form FormGroup is undefined');
    }
  }

  ngOnInit() {
    // Check if FormGroup is initialized
    if (this.step5Form) {
      console.log('Child Component - Form Group 5:', this.step5Form);
    } else {
      console.error('Form Group is not initialized in Child Component');
    }
  }

  // Optional: If you need access to the selected file in the child
  selectedFile: File | null = null;

  handleFileChange(event: any) {
    // if (this.step5Form && this.onFileChangeMethod) {
    //   this.onFileChangeMethod(event); // Call the parent's method
    //   this.selectedFile = event.target.files[0]; // You can also handle the file locally in the child
    //   console.log('File selected in child:', this.selectedFile);
    // }

    const file = event.target.files[0];
    if (file) {
      console.log('File selected in child:', file);
      this.fileSelected.emit(file); // Emit the selected file to the parent
    }
  }

  // handleFileInput(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input && input.files) {
  //     const file = input.files[0];
  //     this.step5Form.patchValue({ fileInput: file });
  //     console.log("file input value",this.step5Form.get('fileInput')?.value);

  //   }
  // }

}
