import mongoose from "mongoose";

const ttsQuotaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    charactersUsed: {
      type: Number,
      default: 0,
    },

    limit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TTSQuota = mongoose.model("TTSQuota", ttsQuotaSchema);

export { TTSQuota };
