import React, { useState, useEffect } from "react";import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    TextField,
    Button,
    Divider,
} from "@mui/material";
import AdminStyle from "../Admin/AdminStyle";
import axios from "axios";
import TM from "../../asset/Data/VanTM.json";
import Logo from "../../asset/images/GLogo.png";
import { Style } from "@mui/icons-material";

export default function InputForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get("token");
    const [token, setToken] = useState(resetToken);

    useEffect(() => {
        if (resetToken) {
            console.log(`Reset token: ${resetToken}`);
            setToken(resetToken);
        } else {
            console.error("Reset token not found in URL");
        }
    }, [resetToken]); 


    // ------------------- CREATING-TIME-FUNCTION -------------------//
    const timeFunction = () => console.log("timeFunction");

    // ------------------- IF-NO-TEAMMEMBER-SELECTED -------------------//
    const noTM = {
        name: "Pending...",
        image: Logo,
    };

    const handleCreateTicket = async (user) => {
        console.log(user);
        const config = {
            method: "PATCH",
            baseURL: `${process.env.REACT_APP_VERCEL_URL}`,
            url: `/resetPassword/${token}`,
            data:  user ,
        };
        const response = await axios(config);
        console.log(response.data);
        token = null;
        
    }
    // ------------------- TICKET-ADD -------------------//
    const addLiveWillCall = (e) => {
        console.log("addLiveWillCall");
        e.preventDefault();

        const formData = e.target;
        const user = {
            password: formData.password.value,
            passwordConfirm: formData.confirm_password.value,
        };
        handleCreateTicket(user);
        document.getElementById("ticketForm").reset();
    };

    return (
        <Box sx={AdminStyle.customerInputContainer2}>
            <form
                style={AdminStyle.formStyle}
                id='ticketForm'
                onSubmit={(e) => {
                    console.log("addLiveWillCall");
                    addLiveWillCall(e);
                }}
            >
                <Box sx={AdminStyle.inputBox2}>
                    <Box sx={AdminStyle.customerInfoBox2}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                width: "100%",
                            }}
                        ></Box>
                        <Typography sx={AdminStyle.customerText} variant='h6'>
                            Password
                        </Typography>
                        <TextField
                            sx={AdminStyle.customerTextField}
                            id='outlined-basic'
                            label='Password'
                            variant='outlined'
                            name='password'
                        />
                        <Typography sx={AdminStyle.customerText} variant='h6'>
                            Confirm Password
                        </Typography>
                        <TextField
                            sx={AdminStyle.customerTextField}
                            id='outlined-basic'
                            label='Confirm Password'
                            variant='outlined'
                            name='confirm_password'
                        />
                    </Box>

                    <Box sx={{ height: "10%" }}></Box>

                    <Button
                        sx={AdminStyle.submitButton}
                        type='submit'
                        onClick={timeFunction}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
