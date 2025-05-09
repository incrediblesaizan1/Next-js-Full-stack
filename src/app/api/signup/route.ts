import { connectDB } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await connectDB();

  try {

    const { username, email, password } = await request.json();

    const isUserExist = await UserModel.findOne({
        username
    }) 

    if(isUserExist){
       return Response.json({
            message: "User Already registered"
        },{status: 400})
    }else{
       const hashedPassword = await bcrypt.hash(password, 10)

    const user = new UserModel({
        username,
        email,
        password: hashedPassword,
        messages:[]
       })

       await user.save()
    }


  } catch (error) {
    console.log("Something went wrong while registering User", error);
    return Response.json(
      {
        success: false,
        message: "Error registering User",
      },
      { status: 500 }
    );
  }
}
