import { makeJwt, validateJwt, Jose, JwtInput } from '../../../serverDeps.ts';

const key = 'my-key';
const header: Jose = {
  alg: 'HS256',
  typ: 'JWT',
};

type Id = string | number;

export default class Tokenizer {
  async create(uid: Id): Promise<string> {
    const tokenData: JwtInput = {
      header,
      payload: { uid },
      key,
    };
    const token = await makeJwt(tokenData);
    return token;
  }
  async validate(token: string | null): Promise<Id> {
    if (!token) throw new Error('token not provided');
    const check = await validateJwt({ jwt: token, key, algorithm: 'HS256' });
    if (!check.isValid) {
      throw new Error('not authenticated');
    }
    if (check.payload) {
      if (
        typeof check.payload.uid === 'string' ||
        typeof check.payload.uid === 'number'
      ) {
        return check.payload.uid;
      } else {
        throw new Error('Token Payload Not Supported');
      }
    }
    throw new Error('Token Payload Not Supported');
  }
}
