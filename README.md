User Registration Form with Image Upload
This is an Angular-based project that allows users to submit a registration form along with their profile image. The image is uploaded to an external API and then stored along with the user's data. The project includes form validation, file validation (image size and type), and integration with an external API.

Features
User registration with fields: First Name, Last Name, Gender, Email, Phone, and Profile Image.

Form validation for required fields and patterns.

Image upload with file size and type validation.

CORS handling with Heroku proxy.

Displaying success or failure messages based on the form submission outcome.

Technologies Used
Angular: Frontend framework for building the application.

Reactive Forms: Used for building and validating the form.

HttpClient: For making HTTP requests to external APIs.

Heroku CORS Proxy: To bypass CORS restrictions while uploading the image.

Setup Instructions
Prerequisites
Node.js (v14 or higher)

Angular CLI (v12 or higher)

Steps to Run the Project
Clone this repository to your local machine:


git clone https://github.com/your-username/user-registration-form.git
Navigate to the project directory:


cd user-registration-form
Install the required dependencies:


npm install
Start the Angular development server:


ng serve
Open your browser and go to http://localhost:4200/ to view the application.

API Details
Image Upload API:
Endpoint: POST https://dummyapi.com/upload
Description: Uploads the profile image.

User Registration API:
Endpoint: POST https://dummyapi.com/users
Description: Registers the user with their details and image URL.

Note: The app uses the Heroku proxy to bypass CORS issues for the API calls.

Form Validation
First Name: Required, minimum length of 3 characters.

Last Name: Required, minimum length of 3 characters.

Gender: Required.

Email: Required, must be a valid email format.

Phone: Required, must follow the pattern +<country-code>-<10-digit-phone-number>.

Profile Image: Required, file size should be less than 2MB, and only JPG or PNG images are allowed.

Contributing
Fork the repository.

Create a new branch (git checkout -b feature-name).

Commit your changes (git commit -am 'Add new feature').

Push the branch (git push origin feature-name).

Create a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

