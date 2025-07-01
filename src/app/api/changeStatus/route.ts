import connectDB from "@/lib/db";
import userModel from "@/server/models/user.model";
import mongoose from "mongoose";

export async function PUT(req: Request): Promise<Response> {
  try {
    await connectDB();
    const { _id, status } = await req.json();
    if (!_id || !status) {
      return new Response(
        JSON.stringify({ message: "ID болон статус шаардлагатай." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await userModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(_id) },
      { status },
      { new: true }
    );

    if (!user) {
      return new Response(JSON.stringify({ message: "Хэрэглэгч олдсонгүй." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Статус амжилттай өөрчлөгдлөө.",
        user: {
          name: user.name,
          role: user.role,
          buddyUrl: user.buddyUrl,
          buddyName: user.buddyName,
          status: user.status,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in PUT /api/changeStatus:", error);
    return new Response(JSON.stringify({ message: "Серверийн алдаа." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
