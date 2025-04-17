import { Output as MediaConvertOutput } from '@aws-sdk/client-mediaconvert'; // ES Modules import

export const outputHLS1080p: MediaConvertOutput = {
  ContainerSettings: {
    Container: 'M3U8',
    M3u8Settings: {},
  },
  VideoDescription: {
    Width: 1920,
    Height: 1080,
    CodecSettings: {
      Codec: 'H_264',
      H264Settings: {
        MaxBitrate: 5000000,
        RateControlMode: 'QVBR',
        SceneChangeDetect: 'TRANSITION_DETECTION',
      },
    },
  },
  AudioDescriptions: [
    {
      CodecSettings: {
        Codec: 'AAC',
        AacSettings: {
          Bitrate: 128000,
          CodingMode: 'CODING_MODE_2_0',
          SampleRate: 48000,
        },
      },
    },
  ],
  OutputSettings: {
    HlsSettings: {},
  },
  NameModifier: '_1080p',
};

export const outputHLS720p: MediaConvertOutput = {
  ContainerSettings: {
    Container: 'M3U8',
    M3u8Settings: {},
  },
  VideoDescription: {
    Width: 1280,
    Height: 720,
    CodecSettings: {
      Codec: 'H_264',
      H264Settings: {
        MaxBitrate: 3000000,
        RateControlMode: 'QVBR',
        SceneChangeDetect: 'TRANSITION_DETECTION',
      },
    },
  },
  AudioDescriptions: [
    {
      CodecSettings: {
        Codec: 'AAC',
        AacSettings: {
          Bitrate: 96000,
          CodingMode: 'CODING_MODE_2_0',
          SampleRate: 48000,
        },
      },
    },
  ],
  OutputSettings: {
    HlsSettings: {},
  },
  NameModifier: '_720p',
};

export const outputHLS480p: MediaConvertOutput = {
  ContainerSettings: {
    Container: 'M3U8',
    M3u8Settings: {},
  },
  VideoDescription: {
    Width: 854,
    Height: 480,
    CodecSettings: {
      Codec: 'H_264',
      H264Settings: {
        MaxBitrate: 1500000,
        RateControlMode: 'QVBR',
        SceneChangeDetect: 'TRANSITION_DETECTION',
      },
    },
  },
  AudioDescriptions: [
    {
      CodecSettings: {
        Codec: 'AAC',
        AacSettings: {
          Bitrate: 64000,
          CodingMode: 'CODING_MODE_2_0',
          SampleRate: 48000,
        },
      },
    },
  ],
  OutputSettings: {
    HlsSettings: {},
  },
  NameModifier: '_480p',
};

export const outputHLS360p: MediaConvertOutput = {
  ContainerSettings: {
    Container: 'M3U8',
    M3u8Settings: {},
  },
  VideoDescription: {
    Width: 640,
    Height: 360,
    CodecSettings: {
      Codec: 'H_264',
      H264Settings: {
        MaxBitrate: 800000, // Lowered bitrate for 360p
        RateControlMode: 'QVBR',
        SceneChangeDetect: 'TRANSITION_DETECTION',
      },
    },
  },
  AudioDescriptions: [
    {
      CodecSettings: {
        Codec: 'AAC',
        AacSettings: {
          Bitrate: 64000,
          CodingMode: 'CODING_MODE_2_0',
          SampleRate: 48000,
        },
      },
    },
  ],
  OutputSettings: {
    HlsSettings: {},
  },
  NameModifier: '_360p',
};

export const AWS_MEDIA_CONVERT_QUEUE =
  '<PUT YOUR MEDIA CONVERT ARN QUEUE HERE>';

export const AWS_MEDIA_CONVERT_IAM_ROLE = '<PUT YOUR IAM ROLE ARN HERE>';

export const DEFAULT_HLS_SEGMENT_LENGTH_IN_SEC = 10;

export const HLS_CONTENT_PREFIX = 'hls';

export const PRIVATE_KEY_CONTENT =
  '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDNNz76TEHrf2Ku\ndgXL1qUDuzpnpuysr2TzdzDTT7hbOoP2UXWYifyfu0Bd4ksv5OKbq93dXAjXDe88\nypdlmGTXPyFN/RvDu6Ahqu0lhe8SuxRA+V4+U/xJ77T30qEbVISPcpGvN9gunBnv\nracUEIsUuq1dDap6immzLEZIUo/HNjz1Dq7jbBNm4TcMJa9K5rv71IwNCviOOLWT\ngH/L96AwB2xrBAgOWKJGV+kfR1iAk+IQ2fIzrtTk/sFg+dVWrTV7TaLtxRDbf9E8\naCKn6+PDNF5J7guLiDFNqrRN7sGA5goWLP6B8wAj03ZrwRUrZoJmttc9dljUWgPa\neXFKa56FAgMBAAECggEAJiik8QFfi5T9CkA/bSsNNY+puU7geO7HSH9MCKrs9qe/\nlHyKr5HO8/uraRm0TeRTX8t6PphHu4dniigItVc8PwsJ3BjZwhBgIwqHvL+2GAdJ\n6ZgE9nWC9tOYFLHpi62wVYUiAlERxX740qi5ZeF6nyDkLialodIde/faXMXfXtUJ\nFDPpwyYsvTvn7HmBbRdkz2TPs+7A32Vlex+6vPry3DNL6oeqBEClI3SzxP5/wGbS\nIxofRYSMr7pTVeYRdQ06Q/LWcTaPQjbmFSy1RaxJN1YEG5BFCWn/OGu1TmCfI338\n9nwR1CCGY4Oh66Q9qvQP56SBCfmbXwQUhVrCaT0twQKBgQD+lcZV+MKmmwVs1yps\nyaua0EdjGbgabEoBqsrwtcHIVJciaypoelI+5aNzJkyNyOErhPRAzj58HJnREQvs\nbt4i6XCXU9Dd62KrHDrEkfDs2Wr5njf6eTN4M3lEY1tB1DLeuIXGGMfX4MqujPNj\nCfC8pxxmd91gQelByszMNF77xQKBgQDOWzp2VgavFNsWi3A9rSUt1NtnoY8cNLfB\na+k5V1Q3w0bm+t/7efDmaJdcaxiYlfV5MOocxaPk9rxxdy2fZgRJrxZx28e6JpvT\nvSSNA2ynKsHhCu3ljRjH/NpJ+FkTv09GhLB2VLXnoHrAewKgr3GFfk3WweWuq8wa\nKXHG4bKDwQKBgBUFAroobtHYrMr+vOb8g6mllq9M+VFdLYMTuevD5fsHWO8jj/3O\nU6oTxboFKH7wXf783DnZjXkr11tWn/hmcvrI8V3dMrqP67aa/xMpxY2YqedwM8j/\nZst+3H1UAr3dqlGPRKRFeYKOcc2Vn6bGtFSvK34eWW3QI1UmTGBz1n/NAoGAWyYI\nyMRu51769xZYWaXlSj0/PKMsJ3VRxWn49o8QcCEdbGFcFiRiuCNy2CumDaAPcZyd\njF/waO5jhmryB/pz4mgoLdq6egsbwYdGYdMlZyGHyfOd6UtNquiRMyMzlXlnduqd\nV2dLgihskCDFpFxadHC5ySaUYXcZDGVKEGMZCwECgYBQGbByIXwN5xGCxOMu/7BO\nUI1iTnBchqaZySY7bax2pySJPysqDdBLMnHebQg52DvWo6s9f9Sc+YcLWR/wLWp2\n0LuYjelE8kY3pzLurluRNDdfIlU2JgR5mokEWgK/5tsoCheI60cgaqQ5AEL+VCi6\njwSRt0szGlrVMDFP0ACxfA==\n-----END PRIVATE KEY-----\n';
