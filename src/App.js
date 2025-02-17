import axios from "axios";
import { useQuery } from "react-query";

import { Route, Routes } from "react-router-dom";

import { Container } from "@mui/material";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import IndexPage from "./pages/Index/IndexPage";
import { healthCheckApi } from "./api/aips/healthCheckApi";

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

  	return (
    	<Container maxWidth="lg">
			<Routes>
				<Route path="/" element={<IndexPage/>} />
				<Route path="/profile" element={<Profile/>} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
    	</Container>
  	);
}

export default App;