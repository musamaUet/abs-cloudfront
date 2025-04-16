import { Injectable } from '@nestjs/common';
import { PRIVATE_KEY_CONTENT } from './abs-generation.constants';
import { getSignedCookies } from '@aws-sdk/cloudfront-signer';

const cloudfrontDistributionDomain = 'dpftuiyrs4sf9.cloudfront.net';

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
  // domain: 'mpcsj.online',
  secure: false,
  path: '/',
  sameSite: 'lax',
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

    console.log('cookies', cookies);

    const cookiesResult: CookiesData = {};
    Object.keys(cookies).forEach((key) => {
      cookiesResult[key] = {
        value: cookies[key],
        options: cookiesOptions,
      };
    });

    console.log('cookiesResult', cookiesResult);

    return {
      fileUrl: `https://${url}`, // master playlist url
      cookies: cookiesResult, // cookies for frontend
    };
  }
}
