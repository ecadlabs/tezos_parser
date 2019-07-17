import { Token, TokenFactory } from './token';

export class NatToken extends Token {
  static prim = 'nat';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public Execute(val): { [key: string]: any } {
    return val.int;
  }

  public ExtractSchema() {
    return NatToken.prim;
  }
}
