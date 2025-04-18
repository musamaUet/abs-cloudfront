import { Injectable } from '@nestjs/common';
import { PRIVATE_KEY_CONTENT } from './abs-generation.constants';
import { getSignedCookies } from '@aws-sdk/cloudfront-signer';

const cloudfrontDistributionDomain = 'development.arkeosai.com';

const KEYPAIR_ID = 'K4IURCX44QYAP';

export interface CookiesData {
  [key: string]: {
    value: string;
    options?: object;
  };
}

/**
 * This does not work on localhost
 */
const cookiesOptions = {
  domain: 'arkeosai.com',
  secure: true,
  path: '/',
  sameSite: 'none',
};

@Injectable()
export class AbsVideoDistributionService {
  async getSignedCookiesForFile(s3FileKey: string) {
    const url = `${cloudfrontDistributionDomain}/live/65a20334e5c423cbd34ac201_1731060377890/hls/${s3FileKey}`; // master .m3u8 file (HLS playlist)

    console.log('url', url);

    const privateKey = PRIVATE_KEY_CONTENT;

    const intervalToAddInMs = 86400 * 1000;
    const policy = {
      Statement: [
        {
          Resource: `https://${cloudfrontDistributionDomain}/live/65a20334e5c423cbd34ac201_1731060377890/hls/*`,
          Condition: {
            DateLessThan: {
              'AWS:EpochTime': Math.floor(
                (Date.now() + intervalToAddInMs) / 1000,
              ),
            },
          },
        },
      ],
    };

    const policyString = JSON.stringify(policy);
    console.log('policyString', policyString);

    const cookies = getSignedCookies({
      keyPairId: KEYPAIR_ID,
      privateKey,
      policy: policyString,
    });

    console.log('policyString', policyString);

    const cookiesResult: CookiesData = {};
    Object.keys(cookies).forEach((key) => {
      cookiesResult[key] = {
        value: cookies[key],
        options: cookiesOptions,
      };
    });

    return {
      fileUrl: `https://${url}`, // master playlist url
      cookies: cookiesResult, // cookies for frontend
    };
  }
}
