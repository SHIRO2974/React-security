import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { api } from '../../api/config/axiosConfig';

function Signin(props) {

    
    const [ signinInput, setSigninInput ] = useState({  // 로그인인 초기값 설정
        username: "",
        password: "",
    });

    const [ errors, setErrors ] = useState({    // 각 입력 필드의 error 초기값 설정
            username: "",
            password: "",
        });
    

    const handleInputOnBlur = (e) => {

        const { name, value } = e.target;
        setErrors(prev =>({
            ...prev
        
        }))
       
        
    }

    const handleSigninInputOnChange = (e) => {
        setSigninInput({
            ...signinInput,
            [e.target.name]: e.target.value,
        });
    }

    const handleSigninButtonOnClick = async () => {

        if (Object.entries(errors).filter(entry => entry[1]) ) {
           
            return;
        }

        try {
            
            const response = api.post("/api/auth/signin", signinInput)
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
        
    }

    return (
        <Box mt={10}>
            <Container>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h4' textAlign={'center'}>로그인</Typography>
                        <Box display={"flex"} flexDirection={'column'} gap={2}>
                            <TextField type='text' label="username" name='username' onChange={handleSigninInputOnChange} value={signinInput.username} 
                            onBlur={handleInputOnBlur} />
                            <TextField type='password' label="password" name='password' onChange={handleSigninInputOnChange} value={signinInput.password} 
                            onBlur={handleInputOnBlur} />
                            <Button variant='contained' onClick={handleSigninButtonOnClick}>로그인</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default Signin;