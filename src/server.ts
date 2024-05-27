import { connect } from "mongoose";
import app from "./app";

const port = 4000;

async function main() {
  try {
    await connect("mongodb://127.0.0.1:27017/test");

    app.listen(port, () => {
      console.log(`the running port is : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
