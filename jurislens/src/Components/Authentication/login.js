import {React, useState, useEffect} from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Dialog, DialogContent, TextField, Button , Backdrop, } from "@mui/material";
// import "../style.css";
import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from 'react-router-dom';

const Login = () => {
//   const navigate = useNavigate();
  const methods = useForm();
  const [isOpen, setIsOpen] = useState(true);

  const login = async (data) => {
    console.log(data);
//   try {
//     const response = await apiLogin(data.email, data.password);
//     updateAccessToken(response.access);
//     console.log("login",response)
//     console.log("responseAccess",response.access)
//     localStorage.setItem('accessToken', response.access);
//     localStorage.setItem('refreshToken', response.refresh);
//     console.log("accessitem",localStorage.getItem('accessToken'));
//     handleClose();
//   } catch (error) {
    
//     console.log(error)
//   }
};

  const handleClose = () => {
    // localStorage.getItem('accessToken') && setIsOpen(false);
    // localStorage.getItem('accessToken') ? navigate('/users', { state: { accessToken: localStorage.getItem('accessToken') } }):navigate('/');
  };

  return (
    <>
    <Dialog open={isOpen} onClose={handleClose} className="login-dialog fontcss" >
    <div sx={{margin:"20px",}}>
      <DialogContent className="fontcss" sx={{ padding: "24px"}}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>LOGIN</h1>
            <CloseIcon className="Icon2" onClick={handleClose} />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(login)}>
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
            <Button type="submit" variant="contained" sx={{width:"150px",margin:"10px 0px 5px 200px"}}>
              Login
            </Button>
          </form>
        </FormProvider>
        
      </DialogContent>
      <div style={{paddingLeft:"200px"}}>
        {/* <p onClick={() => navigate("/signup")}>Don't have an account?  Sign up </p> */}
      </div>
      </div>
    </Dialog>
    {isOpen && <Backdrop open={true} onClick={handleClose} />}
    </>
  );
};

export default Login;
