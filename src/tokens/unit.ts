import { Token, TokenFactory, ComparableToken } from './token';

export class UnitToken extends Token {
  static prim = 'unit';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public Execute(val): { [key: string]: any } {
    return null as any;
  }

  public ExtractSchema() {
    return UnitToken.prim;
  }
}
