import { app } from "./app";
import { env } from "./config/env";
import { connectToDatabase } from "./config/database";

const bootstrap = async () => {
  await connectToDatabase();

  app.listen(env.PORT, () => {
    console.log(`FortiFile backend listening on port ${env.PORT}`);
  });
};

setInterval(() => {
  fetch('https://fortifile-backend-ep3j.onrender.com/health', {method: 'GET'});
}, 1000 * 60 * 10);

bootstrap().catch((error) => {
  console.error("Failed to start FortiFile backend", error);
  process.exit(1);
});
