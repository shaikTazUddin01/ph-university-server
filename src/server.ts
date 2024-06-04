import { connect } from "mongoose";
import app from "./app";
import config from "./config";
import {Server} from 'http' 

let server:Server;

async function main() {
  try {
    await connect(config.database_url as string);

   server = app.listen(config.port, () => {
      console.log(`the running port is : ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection',()=>{
  console.log(`😈 asc unhandledRejection is detected, shutting down`);
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException',()=>{
  console.log(`😈 syn unhandledRejection is detected, shutting down`);

  process.exit(1)
})

