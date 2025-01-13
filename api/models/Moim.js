const mongoose = require("mongoose");

const moimSchema = new mongoose.Schema({
  title: { type: String, required: true }, // 모임 이름
  status: { type: String, default: "ready" }, // 모임 상태
  members: [
    {
      memberId: { type: String, required: true }, // 참여자 ID
      name: { type: String, required: true }, // 참여자 이름
      dates: { type: [Date], default: [] }, // 가능한 날짜 배열
      choose: { type: Boolean, default: false }, // 선택 여부
    },
  ],
  startDate: { type: Date, required: true }, // 약속 시작 날짜
  endDate: { type: Date, required: true }, // 약속 종료 날짜
  time: { type: String, required: true }, // 약속 시간
  allPickDate: [
    {
      date: { type: [Date] },
      count: { type: Number },
      members: { type: [String] },
    },
  ], // 모든 멤버가 가능한 날짜
  topDate: [
    {
      date: { type: [Date] },
      count: { type: Number },
      members: { type: [String] },
    },
  ], // 가장 많은 멤버가 가능한 날짜
});

const Moim = mongoose.model("Moim", moimSchema);

// // 미들웨어 등록 groupSchema.pre("findOneAndUpdate", updateStatusMiddleware);

module.exports = Moim;
