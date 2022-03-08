import express from "express";

const PORT = 4000;

const app = express(); // application 생성

const handleHome = (req, res) => {
  return res.send("I still love you."); //request를 받았으니, response를 반환(return)해야한다.
};

const handleLogin = (req, res) => {
  return res.send("this is log-in page");
};

app.get("/", handleHome); // get request 발생 시 실행하는 callback 함수.
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`✅Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // 외부접속을 Listening 한다.
