import { Injectable } from '@nestjs/common';
import { PRIVATE_KEY_CONTENT } from './abs-generation.constants';
import { getSignedCookies } from '@aws-sdk/cloudfront-signer';

const cloudfrontDistributionDomain =
  'mpcsj-video-abs-distribution.mpcsj.online';

const KEYPAIR_ID = '<YOUR KEYPAIR_ID HERE FROM CLOUDFRONT>';

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
  domain: 'mpcsj.online',
  secure: true,
  path: '/',
  sameSite: 'none',
};

@Injectable()
export class AbsVideoDistributionService {
  async getSignedCookiesForFile(s3FileKey: string) {
    const url = `${cloudfrontDistributionDomain}/${encodeURI(s3FileKey)}`; // master .m3u8 file (HLS playlist)
    const privateKey = PRIVATE_KEY_CONTENT;

    const intervalToAddInMs = 86400 * 1000;
    const policy = {
      Statement: [
        {
          Resource: `https://${cloudfrontDistributionDomain}/*`,
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
    const cookies = getSignedCookies({
      keyPairId: KEYPAIR_ID,
      privateKey,
      policy: policyString,
    });

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
