import Env from './env';

const [remoteBaseUrl, remoteAdminBaseUrl, mockBaseUrl] = ['http://localhost:9096', 'http://localhost:9096/admin', 'http://www.api.test'];


let config = {
    env: Env,
    remoteBaseUrl,
    mockBaseUrl,
    axiosBaseUrl : remoteAdminBaseUrl
};
export default config;