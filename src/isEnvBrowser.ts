export const isEnvBrowser = () => {
  return !(window as any).invokeNative;
};
