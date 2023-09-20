import { connect } from "@/dbConfig/dbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect(); // this is used for connecting the database

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log("from api signup ",reqBody);

    // check if user if exists or not
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // now create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
