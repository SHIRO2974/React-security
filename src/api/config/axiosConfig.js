import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

//  (모든 요청전에 실행되는 함수)
api.interceptors.request.use(config => {

    // 로컬스토리지에서 AccessToken 가져오기
    const token = localStorage.getItem("AccessToken");

    // 토큰이 존재하면 Authorization 헤더에 Bearer 토큰을 설정
    if (!!token) {

        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export const setAccessToken = (token) => {

    if (!!token) {

        // 토큰이 존재하면 로컬스토리지에 "AccessToken"이라는 키로 저장
        localStorage.setItem("AccessToken", token);
    
    } else {
        
        // 토큰이 없으면 로컬스토리지에서 "AccessToken"을 삭제
        localStorage.removeItem("AccessToken");
    }
};