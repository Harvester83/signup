import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";

interface FormValue {
  fullname: string;
  email: string;
  password: string;
  repassword: string;
}

const SignUp: React.FC = () => {
  const initialValues: FormValue = {
    fullname: "",
    email: "",
    password: "",
    repassword: "",
  };

  const validate = (values: FormValue) => {
    const errors: Partial<FormValue> = {};
    if (!values.fullname) {
      errors.fullname = "Full name is required";
    } else if (values.fullname.length < 3) {
      errors.fullname = "Full name must be at least 3 characters long";
    } else {
      // Separate the full name into first name and last name
      const names = values.fullname.split(' ');
      if (names.length < 2) {
        errors.fullname = "Please enter both first name and last name";
      } else {
        const [firstName, lastName] = names;
        if (firstName.length < 3) {
          errors.fullname = "First name must be at least 3 characters long";
        }
        if (lastName.length < 3) {
          errors.fullname = "Last name must be exactly 3 characters long";
        }
      }
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (
      !/(?=.*[A-Z])/.test(values.password) ||
      !/(?=.*[0-9])/.test(values.password) ||
      !/(?=.*[!@#$%^&*])/.test(values.password)
    ) {
      errors.password = "Password must contain one uppercase letter, one number, and one special symbol";
    }

    if (!values.repassword) {
      errors.repassword = "Please re-enter your password";
    } else if (values.password !== values.repassword) {
      errors.repassword = "Passwords do not match";
    }

    return errors;
  };

  const onSubmit = async (values: FormValue) => {
    // Request to server
    console.log(values)
  };

  return (
    <Grid container sx={{ justifyContent: "center", width: 1000}} style={{height: "100%", display: "flex", justifyContent: "flex-end"}}>
      <Grid
        item
        xs={4}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 style={{marginBottom: "10px"}} className="title-h2">SigUp</h2>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ handleChange, errors, isValid, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>

              <TextField
                error={!!errors.fullname}
                onBlur={handleBlur}
                onChange={handleChange}
                id="fullname"
                name="fullname"
                placeholder="Fullname*"
                className="input-wrapper"
                label="Full name"
                type="text"
                helperText={errors.fullname ? errors.fullname : ""}
              />

              <TextField
                error={!!errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                id="email"
                name="email"
                className="input-wrapper"
                label="Email"
                type="email"
                helperText={errors.email ? errors.email : ""}
              />

              <TextField
                error={!!errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                id="password"
                name="password"
                className="input-wrapper"
                placeholder="Password*"
                label="Password"
                type="password"
                autoComplete="current-password"
                helperText={errors.password ? errors.password : ""}
              />

              <TextField
                error={!!errors.repassword}
                onBlur={handleBlur}
                onChange={handleChange}
                id="repassword"
                name="repassword"
                className="input-wrapper"
                placeholder="Confirm Password*"
                label="Re password"
                type="password"
                autoComplete="current-password"
                helperText={errors.repassword ? errors.repassword : ""}
              />

              <div>
              <Button type="submit" variant="contained" disabled={!isValid} className="block">
                Sign up
              </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default SignUp;
