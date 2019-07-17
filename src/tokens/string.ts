import { Token, TokenFactory } from './token';

export class StringToken extends Token {
  static prim = 'string';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public Execute(val): { [key: string]: any } {
    return val.string;
  }

  public ExtractSchema() {
    return StringToken.prim;
  }
}
