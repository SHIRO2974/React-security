import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, setAccessToken } from '../../api/config/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';

/**
 * 로그인 요구사항
 * 각 필드가 공백인지만 체크(공백이면 아래 오류 메세지로 출력)
 * 로그인 버튼 클릭시 /api/auth/signin 요청 
 * -> 응답받은 AccessToken을 localstorage에 AccessToken이라는 키값으로 저장. 
 * Index페이지로 이동.
 * 계정이 없으신가요? 회원가입
 * 
 */

function SigninPage(props) {
    const navigate = useNavigate(); // 로그인 시 이동 할 페이지를 결정하는 훅
    const queryClient = useQueryClient();   // 데이터 캐시 무효화

    //  로그인 초기값 설정
    const [ signinInput, setSigninInput ] = useState({

        username: "",
        password: "",
    });

    //  error 초기값 설정
    const [ errors, setErrors ] = useState({

        username: "",
        password: "",
    });

    // 로그인 오류가 발생했는지 여부를 나타내는 상태
    const [ isSigninError, setSigninError ] = useState(false);

    const handleInputOnBlur = (e) => {

        const { name, value } = e.target;
        setErrors(prev => ({

            ...prev,
            [name]: !(value.trim()) ? `${name}을 입력하세요.` : "", 
        }));
    }

    const handleSigninInputOnChange = (e) => {

        setSigninInput({

            ...signinInput,
            [e.target.name]: e.target.value,
        });
    }

    const handleSigninButtonOnClick = async () => {

        // 오류 메시지가 있는 경우 로그인 요청을 하지 않음
        if(Object.entries(errors).filter(entry => !!entry[1]).length > 0) {
            return;
        }

        try {

            // 로그인 API 요청 보내기
            const response = await api.post("/api/auth/signin", signinInput);
            console.log(response);

            // 응답 받은 access token을 localStorage에 저장
            const accessToken = response.data.data;
            setAccessToken(accessToken);
            queryClient.invalidateQueries({queryKey: ["userQuery"]});   // 사용자 정보 캐시 무효화
            setSigninError(false);

            navigate("/");
            // window.location.href = "/";
        } catch(error) {
            
            setSigninError(true);
        }
    }

    return (
        <Box mt={10}>
            <Container maxWidth={"xs"}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h4' textAlign={'center'}>로그인</Typography>
                        <Box display={"flex"} flexDirection={'column'} gap={2}>
                            <TextField type='text' label="username" name='username' 
                                onChange={handleSigninInputOnChange} value={signinInput.username}
                                onBlur={handleInputOnBlur}
                                error={!!errors.username}
                                helperText={errors.username} />
                            <TextField type='password' label="password" name='password' 
                                onChange={handleSigninInputOnChange} value={signinInput.password}
                                onBlur={handleInputOnBlur}
                                error={!!errors.password}
                                helperText={errors.password} />
                            {
                                isSigninError && 
                                <Typography variant='body2' textAlign={'center'} color='red'>
                                    사용자 정보를 다시 확인하세요.
                                </Typography>
                            }
                            
                            <Button variant='contained' onClick={handleSigninButtonOnClick}>로그인</Button>
                        </Box>
                        <Typography variant='h6' textAlign={'center'}>
                            계정이 없으신가요? <Link to={"/signup"}>회원가입</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default SigninPage;