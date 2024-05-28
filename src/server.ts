import { connect } from "mongoose";
import app from "./app";
import config from "./config";

const port = config.port;

async function main() {
  try {
    await connect(config.database_url as string);

    app.listen(port, () => {
      console.log(`the running port is : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
