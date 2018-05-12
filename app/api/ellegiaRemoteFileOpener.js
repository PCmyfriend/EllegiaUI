import { BASE_API_URL } from './constants';
import remoteFileOpener from '../utils/remoteFileOpener';

export const openRemoteFile = (authHeader, relativeFilePath) =>
  remoteFileOpener(
    `${BASE_API_URL}${relativeFilePath}`,
    {
      headers: {
        Authorization: authHeader,
      },
    });
