import axios from "axios";
import { useState, useEffect } from "react";
import { VideoInfo } from "./VideoPlayer/useVideoPlayer";

const SAMPLE_S3_FILE_KEY = "file1/result/hls/sample_video_1080p.m3u8";
const HLS_MIME_TYPE = "application/x-mpegURL"; // mime-type for HLS protocol

interface AbsContentResult {
  accessQueryString?: string;
  fileUrl: string;
  cookies: {
    [key: string]: {
      value: string;
      options?: object;
    };
  };
}

/**
 * Continue :
 * 1. Finish frontend function call to backend
 * 2. Init new service to grant access to Cloudfront + Signed cookies
 * 3. Create Cloudfront distribution
 * 4. Finish second service to grant access to Cloudfront
 * 5. Setup CORS on backend
 * 6. Talk about deployments
 */
const useApp = () => {
  const [videoContent, setVideoContent] = useState<VideoInfo | undefined>(
    undefined
  );

  const handleGetFileInfo = async () => {
    const mimeType = HLS_MIME_TYPE;

    const result = await axios.get(
      `https://api-medialive.arkeosai.com/abs/MSN17311-ai-2.m3u8/access`,
      {
        withCredentials: true, // to set cookies from backend to frontend
      }
    );
    const data = result.data as AbsContentResult;
    console.log("result.data", data);
    setTimeout(() => {
      Object.entries(data.cookies).forEach(([key, { value }]) => {
        document.cookie = `${key}=${value}; path=/; SameSite=None; Secure`;
      });
    }, 110)

    setTimeout(() => {
      setVideoContent({
        videoSrc: data.fileUrl, // Cloudfront playlist file url (.m3u8)
        videoMimeType: mimeType,
      });
    }, 3000);
  };

  useEffect(() => {
    handleGetFileInfo();
  }, []);

  return {
    videoContent,
  };
};

export default useApp;
