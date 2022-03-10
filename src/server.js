import express from "express";
import { handle } from "express/lib/application";
import morgan from "morgan";

const PORT = 4000;

const app = express(); // application 생성
const logger = morgan("dev");
app.use(logger);

const globalRouter = express.Router();

const handleHome = (req, res) => {
  return res.send("Home");
};

globalRouter.get("/", handleHome);

const userRouter = express.Router();

const handleEditUser = (req, res) => {
  return res.send("Edit User");
};

userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();

const handleWatchVideo = (req, res) => {
  return res.send("Watch Video");
};

videoRouter.get("/watch", handleWatchVideo);

const handleVideo = (req, res) => {
  return res.send("/video and then all");
};

app.use("/", globalRouter);
app.get("/videos", handleVideo);
app.use("/user", userRouter);

const handleListening = () =>
  console.log(`✅Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // 외부접속을 Listening 한다.
