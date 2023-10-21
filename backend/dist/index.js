import app from "./app.js";
import { connectDB } from "./db/connectDb.js";
const port = 5000;
connectDB()
    .then(() => {
    app.listen(port, () => console.log(`server running on port ${port} and connected to Database`));
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map