import { connect, disconnect } from "mongoose";
async function connectDB() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB - " + error.message);
    }
}
async function disconnectDB() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot disconnect from MongoDB - " + error.message);
    }
}
export { connectDB, disconnectDB };
//# sourceMappingURL=connectDb.js.map