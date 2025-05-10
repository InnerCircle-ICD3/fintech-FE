let initialized = false;
let sdkKey: string | undefined;

export function initialize(key: string) {
  sdkKey = key;
  initialized = true;
}
