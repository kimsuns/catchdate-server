const express = require("express");
const moimController = require("../controllers/moimController.js");

const router = express.Router();
const {
  getMoim,
  createMoim,
  updateMoim,
  updateMoimStatus,
  updateMoimPickDate,
  updateMoimTopDate,
} = moimController;

// 모임 조회
router.get("/:id", getMoim);

// 모임 생성
router.post("/", createMoim);

// 모임 멤버 업데이트
router.put("/member/:id", updateMoim);

// 모임 상태 업데이트
router.put("/status/:id", updateMoimStatus);

// 모임 Pick 날짜 업데이트
router.put("/pick/:id", updateMoimPickDate);

// 모임 Top 날짜 업데이트
router.put("/top/:id", updateMoimTopDate);

module.exports = router;
