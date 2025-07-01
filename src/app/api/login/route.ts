import bcrypt from "bcryptjs";

import userModel from "@/server/models/user.model";
import connectDB from "@/lib/db";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();
    const { name, password } = await req.json();
    if (!name || !password) {
      return new Response(
        JSON.stringify({ message: "Нэр болон нууц үг шаардлагатай." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await userModel.findOne({ name });
    if (!user) {
      return new Response(JSON.stringify({ message: "Хэрэглэгч олдсонгүй." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Нууц үг буруу байна." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Амжилттай нэвтэрлээ.",
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
    console.error("Error in POST /api/login:", error);
    return new Response(JSON.stringify({ message: "Серверийн алдаа." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(): Promise<Response> {
  try {
    await connectDB();
    const users = await userModel.find();
    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ message: "Хэрэглэгчид олдсонгүй." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET /api/login:", error);
    return new Response(JSON.stringify({ message: "Серверийн алдаа." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
