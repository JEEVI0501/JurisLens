import {React, useState, useEffect,useContext} from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Dialog, DialogContent, TextField, Button , Backdrop, } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import CloseIcon from "@mui/icons-material/Close";
import { login as apiLogin } from "../API_layer/auth";
const Login = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const login = async (data) => {
    console.log(data);
  try {
    const response = await apiLogin(data.email, data.password);
    // updateAccessToken(response.access);
    console.log("login",response)
    console.log("responseAccess",response.access_token)
    localStorage.setItem('accessToken', response.access_token);
    // localStorage.setItem('refreshToken', response.refresh);
    console.log("accessitem",localStorage.getItem('accessToken'));
    handleClose();
  } catch (error) {
    
    console.log(error)
  }
};

  const handleClose = () => {
    localStorage.getItem('accessToken') && setIsOpen(false);
    localStorage.getItem('accessToken') ? navigate('/', { state: { accessToken: localStorage.getItem('accessToken') } }):navigate('/');
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
