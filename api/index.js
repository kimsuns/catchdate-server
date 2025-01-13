const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const moimRoutes = require("./routes/moimRoutes.js");

dotenv.config();

// const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_URL = process.env.MONGODB_URI;

const app = express();
// const port = process.env.PORT || 3001;

if (!DATABASE_URL) {
  console.error("데이터베이스 URL을 찾을 수 없습니다.");
  process.exit(1);
}

// MongoDB 연결
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB 연결 실패", err);
    process.exit(1);
  });

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

app.use(express.json());
app.use(cors());

// 라우트 설정
app.use("/api/moim", moimRoutes);

// API 엔드포인트
app.get("/", (req, res) =>
  res.send("Hello 코뚱핑! 캐치데이트의 서버가 잘 동작합니다.")
);

// moim 엔드포포인트
app.get("/api/moim", (req, res) =>
  res.send("Hello 코뚱핑! 모임 서버가 잘 동작합니다.")
);

module.exports = app;
