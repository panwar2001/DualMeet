import { AccessToken } from 'livekit-server-sdk';

const apiKey = process.env.LK_API_KEY;
const apiSecret = process.env.LK_API_SECRET;

const createToken = (userInfo, grant) => {
  const at = new AccessToken(apiKey, apiSecret, userInfo);
  at.addGrant(grant);
  return at.toJwt();
};

export default async function handleToken(req, res) {
  try {
    const { roomName, identity, name, metadata } = req.query;
    if (typeof identity !== 'string') {
      throw Error('provide one (and only one) identity');
    }
    if (typeof roomName !== 'string') {
      throw Error('provide one (and only one) roomName');
    }

    if (Array.isArray(name)) {
      throw Error('provide max one name');
    }
    if (Array.isArray(metadata)) {
      throw Error('provide max one metadata string');
    }

    const grant = {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    };
    const token = createToken({ identity, name, metadata }, grant);
    res.status(200).json({ identity, accessToken: token });
  } catch (e) {
    res.statusMessage = (e).message;
    res.status(500).end();
  }
}
