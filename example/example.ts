// Import path would be replaced by @ecadlabs/tezos-parser in your application
import { Schema } from '../src/parser';

// rpcContractResponse is a real reponse response that we take for demo purpose
import { rpcContractResponse, bigMapDiff } from '../data/sample1';

// Create a schema from the contract rpc reponse (GET ../<block_id>/context/contracts)
const schema = Schema.fromRPCResponse(rpcContractResponse);

// Here we assign the actual contract storage snapshot to a local variable
console.log('Initial storage object:');
const storage = rpcContractResponse.script.storage;

// Log the unformatted version
console.log(storage);

// Log the unformatted version
console.log('\nResult once we parse according to the schema:');

console.log(schema.Execute(storage));

// Now if we want to parse partial big map from the big map diff result in transaction

console.log('\nParsed Big map diff result:');
console.log(schema.ExecuteOnBigMapDiff(bigMapDiff));
