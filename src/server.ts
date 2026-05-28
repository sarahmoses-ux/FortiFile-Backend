import { app } from "./app";
import { env } from "./config/env";
import { connectToDatabase } from "./config/database";

const bootstrap = async () => {
  await connectToDatabase();

  app.listen(env.PORT, () => {
    console.log(`FortiFile backend listening on port ${env.PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start FortiFile backend", error);
  process.exit(1);
});
