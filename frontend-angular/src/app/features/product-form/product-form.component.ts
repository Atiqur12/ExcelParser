import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SendProductListUseCase} from '../../core/application/use-cases/send-product-list.use-case';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  excelForm: FormGroup;
  file: File | null = null;

  constructor(
    private fb: FormBuilder,
    private sendProductListUseCase: SendProductListUseCase
  ) {
    this.excelForm = this.fb.group({
      excelFile: [null]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.excelForm.patchValue({excelFile: this.file});
    }
  }

  async sendData(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.file) {
      return;
    }

    try {
      await this.sendProductListUseCase.execute(this.file);

      alert("Data sent successfully");
    } catch (error) {
      alert(error);
    }
  }
}
