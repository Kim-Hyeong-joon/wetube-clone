import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express(); // application 생성
const logger = morgan("dev");

const handleLogin = (req, res) => {
  return res.send("login");
};

const handleHome = (req, res) => {
  console.log("I will respond");
  return res.send("hello");
};

app.use(logger);
app.get("/", handleHome); // get request 발생 시 실행하는 callback 함수.
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`✅Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // 외부접속을 Listening 한다.
