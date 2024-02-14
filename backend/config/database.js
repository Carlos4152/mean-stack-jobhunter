import mongoose from "mongoose";

//  Connecting to moongo data base
const connectDataBase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("You are connected to Data base")
    }
    catch(error) {
        console.log('Connection failed!');
        process.exit(1); // tell server to stop
    }
};

export default connectDataBase;