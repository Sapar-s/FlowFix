import mongoose, { Schema } from "mongoose";

type answerQuestionSchemaType = {
  question: string;
  answer: string;
};

const answerQuestionSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<answerQuestionSchemaType>(
  "AnswerQuestion",
  answerQuestionSchema
);
