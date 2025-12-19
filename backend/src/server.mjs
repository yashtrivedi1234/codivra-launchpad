import "dotenv/config.js";
import app from "./app.mjs";
import { PORT } from "./config/env.mjs";

app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});
