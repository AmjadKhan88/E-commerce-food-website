import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(`${process.env.DB_URL}/food-del`).then(()=>{
        console.log('DB connected successfully');
    });
}


