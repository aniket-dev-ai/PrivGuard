import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";

const Port = process.env.PORT 
console.log(Port);

app.listen(Port, () => {
  console.log("Server is running on port "+Port);
});
