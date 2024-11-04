export interface ENV {
  apiEndPoint: string;
}
const env: ENV = {
  apiEndPoint: import.meta.env.VITE_BASE_URL || "",
};

export default env;
