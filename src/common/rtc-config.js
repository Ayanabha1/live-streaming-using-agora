import {
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-sdk-ng/esm";

const APP_ID = import.meta.env.VITE_AGORA_APP_ID || window.AGORA_APP_ID;
const roomId = "main";
const token = null;

export const config = {
  mode: "rtc",
  codec: "vp8",
  APP_ID: APP_ID,
  token: token,
};

export const useRTCClient = createClient;
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks;
