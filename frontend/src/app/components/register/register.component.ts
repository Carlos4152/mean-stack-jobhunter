import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Registration } from 'src/app/Interfaces/register.interface';
// THIRD PARTY SOURCE
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    userService = inject(UserService);
    // REGULAR EXPRESSION - FORM VALIDATORS
    passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:,<.>])/;

    constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

    // FORM BUILDER
    registerForm = this.formBuilder.group(
        {
            firstname: ["", Validators.required],
            lastname: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.pattern(this.passwordPattern)]]
        }
    );
    // SUBMIT ACTION - COMPLETE USER REGISTRATION
     onSubmit() {
        if (this.registerForm.valid) {
            const confirmFormValue: Registration = {
                firstname: this.registerForm.get('firstname')!.value || "",
                lastname: this.registerForm.get('lastname')!.value || "",
                email: this.registerForm.get('email')!.value || "",
                password: this.registerForm.get('password')!.value || "",
              };

            this.userService.createUser(confirmFormValue).subscribe({
                next: (response) => {
                    this.toastr.success("Success!", "Account created");
                    this.registerForm.reset()
                },
                error: (error) => {
                    console.log(error)
                    this.toastr.error("Contact Support 😥", "Something went wrong")
                }
            })
        }
        
    }

    // REQUIREMENT VALIDATORS FORM  
    isRequirementMet(requirement: string): boolean {
        const passwordControl = this.registerForm.get('password');
        //NULLISH COALESCING OPERATOR
        //Provide a default value (an empty string, for instance) when passwordValue is null.
        const passwordValue = passwordControl?.value ?? '';

        if (passwordValue === undefined) {
            return false;
        }

        switch (requirement) {
            case 'length':
                return passwordValue.length >= 8;
            case 'number':
                return /\d/.test(passwordValue);
            case 'capitalLetter':
                return /[A-Z]/.test(passwordValue);
            case 'lowercaseLetter':
                return /[a-z]/.test(passwordValue);
            case 'specialCharacter':
                return /[!@#$%^&*()-_=+{};:,<.>]/.test(passwordValue);
            default:
                return false;
        }
    }


}
