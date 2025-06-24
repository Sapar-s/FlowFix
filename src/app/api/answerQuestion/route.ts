import dbConnect from "@/lib/db";
import answerQuestionModel from "@/server/models/answerQuestion.model";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    await dbConnect();
    const answerQuestion = await req.json();
    console.log("Received answerQuestion:", answerQuestion);
    if (!answerQuestion.question || !answerQuestion.answer) {
      return new NextResponse(
        JSON.stringify({ error: "Question and answer are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const newAnswerQuestion = await answerQuestionModel.create(answerQuestion);
    return new NextResponse(JSON.stringify(newAnswerQuestion), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /api/answerQuestion:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function GET(): Promise<Response> {
  try {
    await dbConnect();
    const answerQuestions = await answerQuestionModel.find();
    if (!answerQuestions || answerQuestions.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No questions found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new NextResponse(JSON.stringify(answerQuestions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET /api/answerQuestion:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
