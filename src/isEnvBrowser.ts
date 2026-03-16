export const isEnvBrowser = () => {
  return typeof window !== "undefined" && !(window as any).invokeNative;
};
