import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  noteForm: FormGroup;
  modalRef?: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {
    this.noteForm = this.fb.group({
      note: ['', Validators.required],
      attachment: [null]
    });
  }

  open(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md modal-dialog-centered' });
  }

  onFileChange(e: Event) {
    const f = (e.target as HTMLInputElement).files;
    if (f?.length) this.noteForm.patchValue({attachment: f[0]});
  }

  save() {
    if (!this.noteForm.valid) return;
    console.log('Saved', this.noteForm.value);
    this.modalRef?.hide();
  }
}
