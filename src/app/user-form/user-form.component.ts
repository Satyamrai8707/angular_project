import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  readonly MAX_FILE_SIZE_MB = 2;
  readonly ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

  userForm: FormGroup;
  profileImage: File | null = null;
  imagePreview: string | null = null;
  imageError: string = '';
  isSubmitting = false;

  constructor() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+\d{1,3}-\d{10}$/)]],
      profileImage: [null]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) return;

    const fileSize = file.size / 1024 / 1024;
    const fileType = file.type;

    if (fileSize > this.MAX_FILE_SIZE_MB) {
      this.setFileError('File size must be less than 2MB', input);
    } else if (!this.ALLOWED_FILE_TYPES.includes(fileType)) {
      this.setFileError('Only JPG and PNG files are allowed', input);
    } else {
      this.setValidFile(file, input);
      this.previewImage(file);
    }
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  private setFileError(message: string, input: HTMLInputElement): void {
    this.imageError = message;
    this.profileImage = null;
    this.imagePreview = null;
    input.value = '';
    this.userForm.patchValue({ profileImage: null });
  }

  private setValidFile(file: File, input: HTMLInputElement): void {
    this.imageError = '';
    this.profileImage = file;
    this.userForm.patchValue({ profileImage: file.name });
  }

  async submitForm(): Promise<void> {
    if (this.userForm.invalid || !this.profileImage) {
      this.markFormGroupTouched(this.userForm);
      this.scrollToFirstError();
      return;
    }

    this.isSubmitting = true;

    try {
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Create new user object with Base64 image
      const newUser = {
        id: Date.now(), // Unique ID
        ...this.userForm.value,
        profileImage: this.imagePreview, // Store Base64 image
        imageType: this.profileImage.type
      };

      // Add new user and save
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Navigate to list with success message
      this.router.navigate(['/list'], {
        state: { successMessage: 'User saved successfully!' }
      });
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }

  private scrollToFirstError(): void {
    const firstErrorElement = document.querySelector('.ng-invalid');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    alert('Please correct the form errors before submitting.');
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel(): void {
    if (this.userForm.dirty) {
      if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        this.navigateToList();
      }
    } else {
      this.navigateToList();
    }
  }

  private navigateToList(): void {
    this.router.navigate(['/list']);
  }
}