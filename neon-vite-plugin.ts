import { postgres } from "vite-plugin-neon-new";

export default postgres({
  dotEnvKey: "DATABASE_URL",
  referrer: "create-tanstack",
});
