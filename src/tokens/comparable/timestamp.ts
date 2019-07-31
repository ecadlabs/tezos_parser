import { Token, TokenFactory, ComparableToken } from '../token';

export class TimestampToken extends Token implements ComparableToken {
  static prim = 'timestamp';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public Execute(val): { [key: string]: any } {
    return val.timestamp;
  }

  public ExtractSchema() {
    return TimestampToken.prim;
  }

  public ToKey({ timestamp }) {
    return timestamp;
  }

  public ToBigMapKey(val: string) {
    return {
      key: { timestamp: val },
      type: { prim: TimestampToken.prim }
    };
  }
}
