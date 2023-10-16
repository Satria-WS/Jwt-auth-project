import http from "http";
import app from "./app.js";
import { config } from "dotenv";
import mongoose from "mongoose";
import { connect } from "./config/database.js";



// config({ path: "../.env" });
config();
const server = http.createServer(app);
const port = process.env.PORT || 3003;

const MONGO_URI = process.env.MONGO_URI;

console.log(process.env.MONGO_URI);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});
mongoose.connection.on("connected", () => {
  console.log("Koneksi ke MongoDB berhasil");
});

mongoose.connection.on("error", (err) => {
  console.error("Koneksi MongoDB gagal: " + err);
});
// connect(MONGO_URI)

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
