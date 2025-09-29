const env = import.meta.env;
const isDev = env.MODE.includes("development");
const isLocal = () => window.origin.includes("http://localhost");

export { isDev, isLocal, env };
