
import React, { useEffect } from 'react';
import { api, setAccessToken } from '../../api/config/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function MainHeader(props) {
    console.log("!!!!!!!!")
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userQueryData = queryClient.getQueryData(["userQuery"]);  // userQuery 데이터를 가져온다

    const handleLogoutOnClick = () => {

		setAccessToken(null);   // 로컬 스토리지에서 access token을 null로 설정하여 로그아웃 처리
		queryClient.invalidateQueries({

            queryKey: ["userQuery"],    // 사용자 정보 관련 쿼리를 무효화하여 최신 데이터를 가져온다

        });
		navigate("/auth/signin");   // 로그인 페이지로 이동
	}

    return (
        <Box display={"flex"} justifyContent={"space-between"} mt={3}>
            <Typography variant="h6">로고</Typography>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                {
                    !!userQueryData      // userQueryData가 존재하면 (로그인 상태)
                    ?
                    <>
                        <Link to={"/user/profile"}><Button>프로필</Button></Link>
                        <Button onClick={handleLogoutOnClick}>로그아웃</Button>
                    </>
                    :
                    <>
                        <Link to={"/auth/signin"}><Button>로그인</Button></Link>
                        <Link to={"/auth/signup"}><Button>회원가입</Button></Link>
                    </>	
                }
            </ButtonGroup>
        </Box>
    );
}

export default MainHeader;
