import { Token } from '../tokens/token';

import { BigMapToken } from '../tokens/bigmap';

import { createToken } from '../tokens/createToken';

import { AddressToken } from '../tokens/address';
import { RpcTransaction } from './model';

export class Schema {
  private root: Token;
  private bigMap?: BigMapToken;

  constructor(val) {
    this.root = createToken(val, 0);

    if (val.prim == 'pair' && val.args[0].prim == 'big_map') {
      this.bigMap = new BigMapToken(val.args[0], 0, createToken);
    }
  }

  Execute(val) {
    return this.root.Execute(val);
  }

  ExecuteOnBigMapDiff(diff) {
    if (!this.bigMap) {
      throw new Error('No big map schema');
    }

    return this.bigMap.Execute(diff);
  }

  ExecuteOnBigMapValue(key) {
    if (!this.bigMap) {
      throw new Error('No big map schema');
    }

    return this.bigMap.ValueSchema.Execute(key);
  }

  EncodeBigMapKey(key: string) {
    if (!this.bigMap) {
      throw new Error('No big map schema');
    }

    return (this.bigMap.KeySchema as AddressToken).ToBigMapKey(key);
  }

  ExtractSchema() {
    return this.root.ExtractSchema();
  }

  ComputeState(tx: RpcTransaction[], state: any) {
    if (!this.bigMap) {
      throw new Error('No big map schema');
    }

    const bigMap = tx.reduce((prev, current) => {
      return {
        ...prev,
        ...this.ExecuteOnBigMapDiff(
          current.contents[0].metadata.operation_result.big_map_diff
        )
      };
    }, {});

    return {
      ...this.Execute(state),
      [this.bigMap.annot]: bigMap
    };
  }
}
