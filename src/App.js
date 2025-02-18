import axios from "axios";
import { useQuery } from "react-query";

import { Link, Route, Routes } from "react-router-dom";

import { Box, ButtonGroup, Container, Typography } from "@mui/material";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import IndexPage from "./pages/Index/IndexPage";
import { healthCheckApi } from "./api/aips/healthCheckApi";
import AuthRoute from "./routes/AuthRoute/AuthRoute";
import { userApi } from "./api/aips/userApi";
import { jwtDecode } from "jwt-decode";

function App() {
	const healthCheckQuery = useQuery(
		["healthCheckQuery"], 
		healthCheckApi, 
		{
			refetchOnWindowFocus: false,
			enabled: true,
			cacheTime: 1000 * 60 * 10, //캐시 유지 시간(언마운트 이후),
			staleTime: 1000 * 60 * 10, //10분마다 최신의 캐시 상태 유지(refetch)
		}
	);

	if(!healthCheckQuery.isLoading) {
		console.log(healthCheckQuery.data.data.status);
	}

	const userQuery = useQuery(

		["userQuery"],
		async () => {

			const decodedJwt = jwtDecode(localStorage.getItem("AccessToken"));
			return userApi();
		},
		{
			retry: 0,
		} 
			

		
	);

  	return (
    	<Container maxWidth="lg">
			{
				!userQuery.isLoading &&
				<>
					<Box display={"flex"} justifyContent={"space-between"}>
						<Typography variant="h6">로고</Typography>
						<ButtonGroup variant="outLined" aria-label="Basic button group">
							{
								!!userQuery.data
								?
								<>
								<Link to={"/user/Profile"}><button>프로필</button></Link> 
								<Link to={"/user/logout"}><button>로그아웃</button></Link>
								</>
								:
								<>
								<Link to={"/auth/Signin"}><button>로그인</button></Link> 
								<Link to={"/auth/Signup"}><button>회원가입</button></Link>
								</>
							}
						</ButtonGroup>
					</Box>
						<Routes>
							<Route path="/" element={<IndexPage/>} />
							<Route path="/user/profile" element={<Profile />} />
							<Route path="/auth/*" element={<AuthRoute />} />
							
						</Routes>
				</>
			}
    	</Container>
  	);
}

export default App;