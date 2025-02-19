import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/config/axiosConfig';

function Signup(props) {
    const [ signupInput, setSignupInput ] = useState({  // 회원가입 초기값 설정
        username: "",
        password: "",
        name: "",
        email: "",
    });

    const [ errors, setErrors ] = useState({    // 각 입력 필드의 error 초기값 설정
        username: "",
        password: "",
        name: "",
        email: "",
    });

    const handleSignupInputOnChange = (e) => {
        setSignupInput({
            ...signupInput,
            [e.target.name]: e.target.value,
        });
    }

    //  유효성 검사
    const handleInputOnBlur = (e) => {
        const { name, value } = e.target;
        let message = "";

        // Validation for each field
        if (name === "username" && !(/^[a-zA-Z0-9_]{4,16}$/.test(value))) {
            message = "올바른 사용자 이름을 입력하세요.";
        }
        if (name === "password" && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|{}:;'<>,.?/-])[A-Za-z\d!@#$%^&*()_+~`|{}:;'<>,.?/-]{8,}$/.test(value))) {
            message = "영어 대소문자, 숫자, 특수문자를 하나 이상 포함하며 8자 이상으로 작성하세요.";
        }
        if (name === "name" && !(/^[가-힇]{2,}$/.test(value))) {
            message = "한글 이름만 가능합니다.";
        }
        if (name === "email" && !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value))) {
            message = "올바른 이메일을 입력하세요.";
        }

        // 유효성 검사 후 error 상태 업데이트
        setErrors({
            ...errors,
            [name]: message,
        });
    };
    const handleSignupButtonOnClick = async () => {

    }

    // const handleSignupButtonOnClick = async () => {
    //     try {
    //         const response = await api.post("/api/auth/signup", signupInput);
    //         console.log(response.data);
    //     }catch(error) {
    //         console.error(error.response.data.data);
    //         let newError = {};
    //         const responseErrors = error.response.data.data;
    //         for(let e of responseErrors) {
    //             const errorEntry = Object.entries(e)[0];
    //             newError = {
    //                 ...newError,
    //                 [errorEntry[0]]: errorEntry[1],
    //             };
    //         }
    //         setErrors({
    //             username: "",
    //             password: "",
    //             name: "",
    //             email: "",
    //             ...newError
    //         });
    //     }
    // }

    console.log(errors);

    return (
        <Box mt={10}>
            <Container maxWidth={"xs"}> 
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h4' textAlign={'center'}>회원가입</Typography>
                        <Box display={"flex"} flexDirection={'column'} gap={2}>
                            
                            <TextField type='text' label="username" name='username' 
                                onChange={handleSignupInputOnChange} value={signupInput.username}
                                onBlur={handleInputOnBlur} 
                                error={!!errors.username}
                                helperText={errors.username} />

                            <TextField type='password' label="password" name='password' 
                                onChange={handleSignupInputOnChange} value={signupInput.password} 
                                onBlur={handleInputOnBlur} 
                                error={!!errors.password}
                                helperText={errors.password} />

                            <TextField type='text' label="name" name='name' 
                                onChange={handleSignupInputOnChange} value={signupInput.name} 
                                onBlur={handleInputOnBlur} 
                                error={!!errors.name}
                                helperText={errors.name} />

                            <TextField type='email' label="email" name='email' 
                                onChange={handleSignupInputOnChange} value={signupInput.email} 
                                onBlur={handleInputOnBlur} 
                                error={!!errors.email}
                                helperText={errors.email} />

                            <Button variant='contained' onClick={handleSignupButtonOnClick}>가입하기</Button>
                        </Box>
                        <Typography variant='h6' textAlign={'center'}>
                            이미 계정이 있나요? <Link>로그인</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default Signup;