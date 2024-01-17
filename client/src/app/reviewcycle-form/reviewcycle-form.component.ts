import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reviewcycle-form',
  templateUrl: './reviewcycle-form.component.html',
  styleUrl: './reviewcycle-form.component.scss'
})
export class ReviewcycleFormComponent {
  reviewCycleForm!: FormGroup;
  reviewcycles: any[] = [];
  reviewCycleId: number | undefined;

  searchReviewCycleId: number | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.loadReviewCycles(); // Assuming you want to load existing users on component initialization
  }

  initForm() {
    this.reviewCycleForm = this.formBuilder.group({
      userId: [''],
      startDate: [''],
      endDate: [''],
      period: [''],
      reviewStatus: ['']
    });
  }

  registerOrUpdateReviewCycle() {
    const reviewcycle = this.reviewCycleForm.value;

    const apiUrl = 'http://localhost:8080/reviewCycle/';

    // Check if ID is present for update
    if (this.searchReviewCycleId) {
      this.http.put(`${apiUrl}reviewCycleById/${this.searchReviewCycleId}`, reviewcycle).subscribe(
        (response) => {
          console.log('Review Cycle updated successfully:', response);
          this.loadReviewCycles();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating Review Cycle:', error);
        }
      );
    } else {
      this.http.post('http://localhost:8080/reviewCycle/register', reviewcycle).subscribe(
        (response) => {
          console.log('Review Cycle registered successfully:', response);
          this.loadReviewCycles();
          this.resetForm();
        },
        (error) => {
          console.error('Error registering Review Cycle:', error);
        }
      );
    }
  }

  loadReviewCycles() {
    const apiUrl = 'http://localhost:8080/reviewCycle';
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.reviewcycles = data;
        } else {
          console.error('Invalid data received from the server. Expected an array.');
        }
      },
      (error) => {
        console.error('Error loading reviewcycles:', error);
      }
    );
  }

  searchReviewCycle(reviewCycleId: number | undefined) {
    if (reviewCycleId) {
      this.searchReviewCycleId = reviewCycleId;
      const apiUrl = `http://localhost:8080/reviewCycle/reviewCycleById/${reviewCycleId}`;
      this.http.get(apiUrl).subscribe(
        (data: any) => {
          this.reviewCycleForm.patchValue(data); // Autofill the form with the fetched data
        },
        (error) => {
          console.error('Error fetching Review Cycle:', error);
        }
      );
    }
  }

  resetForm() {
    this.reviewCycleForm.reset();
    this.searchReviewCycleId = undefined;
  }

}
