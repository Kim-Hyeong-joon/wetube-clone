import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`β Server listening on port http://localhost:${PORT} π`);

app.listen(PORT, handleListening); // μΈλΆμ μμ Listening νλ€.
