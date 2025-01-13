const Moim = require("../models/Moim.js");

// 모임 그룹 조회
const getMoim = async (req, res) => {
  const _id = req.params.id;
  console.log("아이디값", _id);
  try {
    const moim = await Moim.findOne({ _id });

    if (!moim) {
      return res
        .status(400)
        .json({ message: "해당 모임은 존재하지 않습니다." });
    }

    res.status(200).json(moim);
  } catch (error) {
    res.status(500).json({ message: "모임 조회 실패", error: error.message });
  }
};

// 모임 그룹 생성
const createMoim = async (req, res) => {
  const { title, status, members, startDate, endDate, time, pickDate, top3 } =
    req.body;
  try {
    const newMoim = new Moim({
      title,
      status,
      members,
      startDate,
      endDate,
      time,
      pickDate,
      top3,
    });

    const savedMoim = await newMoim.save(); // MongoDB에 데이터 저장

    if (!savedMoim) {
      return res.status(404).json({ message: "모임 생성 실패" });
    }

    res
      .status(201)
      .json({ message: "모임 생성 성공", data: { id: savedMoim._id } });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

// 모임 멤버 업데이트
const updateMoim = async (req, res) => {
  const moimId = req.params.id;
  const memberData = req.body;
  const memberId = memberData._id;
  try {
    if (!moimId || !memberData) {
      return res.status(400).json({ message: "모임이 존재하지 않습니다." });
    }

    const updateMoim = await Moim.findByIdAndUpdate(
      moimId,
      {
        $set: {
          "members.$[member]": memberData,
        },
      },
      {
        new: true,
        arrayFilters: [{ "member._id": memberId }],
      }
    );

    if (!updateMoim) {
      return res.status(404).json({ message: "멤버를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "모임 데이터 업데이트 성공" });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

// 모임 상태 업데이트
const updateMoimStatus = async (req, res) => {
  const moimId = req.params.id;

  try {
    if (!moimId) {
      return res.status(400).json({ message: "모임이 존재하지 않습니다." });
    }

    const updateMoimStatus = await Moim.findByIdAndUpdate(
      moimId,
      {
        $set: {
          status: "completed",
        },
      },
      {
        new: true,
      }
    );

    if (!updateMoimStatus) {
      return res.status(404).json({ message: "모임 상태 업데이트 실패" });
    }
    res.status(200).json({ message: "모임 상태 업데이트 성공" });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

// 모임 pick 날짜 업데이트
const updateMoimPickDate = async (req, res) => {
  const moimId = req.params.id;
  const pickDate = req.body;

  try {
    if (!moimId) {
      return res.status(400).json({ message: "모임이 존재하지 않습니다." });
    }

    const updateMoimPickDate = await Moim.findByIdAndUpdate(
      moimId,
      {
        $set: {
          allPickDate: pickDate,
        },
      },
      {
        new: true,
      }
    );

    if (!updateMoimPickDate) {
      return res.status(400).json({ message: "모임 Pick 날짜 업데이트 실패" });
    }
    res.status(200).json({ message: "모임 Pick 날짜 업데이트 성공" });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

// 모임 top 날짜 업데이트
const updateMoimTopDate = async (req, res) => {
  const moimId = req.params.id;
  const topDate = req.body;

  try {
    if (!moimId) {
      return res.status(400).json({ message: "모임이 존재하지 않습니다." });
    }

    const updateMoimTopDate = await Moim.findByIdAndUpdate(
      moimId,
      {
        $set: {
          topDate: topDate,
        },
      },

      {
        new: true,
      }
    );

    if (!updateMoimTopDate) {
      return res.status(400).json({ message: "모임 Top 날짜 업데이트 실패" });
    }
    res.status(200).json({ message: "모임 Top 날짜 업데이트 성공" });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

module.exports = {
  getMoim,
  createMoim,
  updateMoim,
  updateMoimStatus,
  updateMoimPickDate,
  updateMoimTopDate,
};
