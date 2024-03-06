import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Dialog, DialogContent, TextField, Button, Backdrop, Checkbox } from "@mui/material";
// import "../style.css";
import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // const navigate = useNavigate();
  const methods = useForm();
  const [isOpen, setIsOpen] = useState(true);

  const signUp =  (data) => {
    console.log(data)
  // try {
  //   const response = apiSignup(data.email, data.password, data.confirmPassword);
  //   console.log("sign up",response);
  //   handleClose();
  // } catch (error) {
  //   console.log(error)
  // }
};
  const handleClose = () => {
    // setIsOpen(false);
    // navigate('/');
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} className="login-dialog fontcss">
        <div sx={{ margin: "20px" }}>
          <DialogContent  className="fontcss" sx={{ padding: "24px"}}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Sign up</h1>
              <CloseIcon className="Icon2" onClick={handleClose} />
            </div>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(signUp)}>
                <div style={{ display: "flex", marginBottom: "16px", justifyContent: "space-between" }}>
                  <Controller
                    name="firstName"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        sx={{ marginRight: "4px" }}
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={methods.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        sx={{ marginLeft: "4px" }}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="email"
                  control={methods.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: "16px" }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={methods.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: "16px" }}
                    />
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={methods.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: "16px" }}
                    />
                  )}
                />
                <Controller
                    name="acceptTerms"
                    control={methods.control}
                    render={({ field }) => (
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <Checkbox
                            {...field}
                            checked={field.value}
                            color="primary"
                            sx={{ marginRight: "8px" }}
                        />
                        <p style={{ margin: 0 }}>I accept the terms and conditions</p>
                    </div>
                    )}
                />

                <Button type="submit" variant="contained" sx={{ width: "150px", margin: "10px 0px 5px 200px" }}>
                  Signup
                </Button>
              </form>
            </FormProvider>
          </DialogContent>
          <div style={{ paddingLeft: "200px" }}>
            {/* <p onClick={() => navigate("/")}>Already have an account? Login</p> */}
          </div>
        </div>
      </Dialog>
      {isOpen && <Backdrop open={true} onClick={handleClose} />}
    </>
  );
};

export default Signup;
