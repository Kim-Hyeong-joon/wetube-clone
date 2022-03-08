import express from "express";

const PORT = 4000;

const app = express(); // application 생성

const handleHome = () => console.log("Somebody is trying to go home.");

app.get("/", handleHome); // get request 발생 시 실행하는 callback 함수.

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // 외부접속을 Listening 한다.
