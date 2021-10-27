import { readAll, writeAll } from "./deps.ts";
import { toSampleData } from "./schema.ts";

// read content from stdin - allows content to be piped into the program
const stdinBytes = await readAll(Deno.stdin);
const data = new TextDecoder().decode(stdinBytes);

// convert the schema into a sample json structure
const schema = JSON.parse(data);
const sampleData = toSampleData(schema);

// write the data to stdout - allows output to be piped into another program
const output = JSON.stringify(sampleData);
const stdoutBytes = new TextEncoder().encode(output);
await writeAll(Deno.stdout, stdoutBytes);
