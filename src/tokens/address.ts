import { Token, TokenFactory } from './token';
import { b58decode } from '../encoding';

export class AddressToken extends Token {
  static prim = 'address';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public ToBigMapKey(val: string) {
    const decoded = b58decode(val);
    return {
      key: { bytes: decoded },
      type: { prim: 'bytes' }
    };
  }

  public Execute(val): { [key: string]: any } {
    return val.string;
  }

  public ExtractSchema() {
    return AddressToken.prim;
  }
}
