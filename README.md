# Tezos parser

A typescript tool for decoding Tezos RPC response for smart contracts storage into usable json object


## Running the example

```
npm install

npm run example
```

## Data type supported

- [x] Address
- [x] String
- [x] Big Map
- [x] Map
- [x] Bool
- [x] Nat
- [x] Mutez
- [x] Or
- [x] Pair
- [x] Left
- [x] Right
- [ ] Contract
- [ ] List


### In short

It turns this:

```json
{
  prim: 'storage',
  args: [
    {
      prim: 'pair',
      args: [
        {
          prim: 'big_map',
          args: [
            { prim: 'address' },
            {
              prim: 'pair',
              args: [
                { prim: 'nat', annots: ['%balance'] },
                {
                  prim: 'map',
                  args: [{ prim: 'address' }, { prim: 'nat' }],
                  annots: ['%allowances']
                }
              ],
              annots: [':account']
            }
          ],
          annots: [':accounts']
        },
        {
          prim: 'pair',
          args: [
            { prim: 'nat', annots: ['%version'] },
            {
              prim: 'pair',
              args: [
                { prim: 'nat', annots: ['%totalSupply'] },
                {
                  prim: 'pair',
                  args: [
                    { prim: 'string', annots: ['%name'] },
                    {
                      prim: 'pair',
                      args: [
                        { prim: 'string', annots: ['%symbol'] },
                        { prim: 'address', annots: ['%owner'] }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      annots: [':storage']
    }
  ]
}          
```

Into:

```json
{ 
  accounts: {},
  version: '1',
  totalSupply: '1000',
  name: 'Token B',
  symbol: 'B',
  owner: 'tz1ccqAEwfPgeoipnXtjAv1iucrpQv3DFmmS' 
}
```