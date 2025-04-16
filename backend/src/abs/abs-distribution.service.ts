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
 * IMPORTANT:
 * - Update domain for your actual frontend domain
 * - `secure: true` ensures it's sent over HTTPS
 * - `sameSite: 'none'` is required for cross-domain cookies (e.g., backend sets cookie for frontend)
 */
const cookiesOptions = {
  domain: 'live-medialive.arkeosai.com', // your deployed React frontend domain
  secure: true,
  path: '/',
  sameSite: 'none',
};

@Injectable()
export class AbsVideoDistributionService {
  async getSignedCookiesForFile(s3FileKey: string) {
    const url = `${cloudfrontDistributionDomain}/${encodeURI(s3FileKey)}`;
    const privateKey = PRIVATE_KEY_CONTENT;

    const intervalToAddInMs = 86400 * 1000; // 24 hours
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
      fileUrl: `https://${url}`,
      cookies: cookiesResult,
    };
  }
}
