import database from '../controllers/utils/helpers/database.ts';

async function ask(
  question: string = '',
  stdin = Deno.stdin,
  stdout = Deno.stdout
) {
  const buf = new Uint8Array(1024);

  // Write question to console
  await stdout.write(new TextEncoder().encode(question));

  // Read console's input into answer
  const n = <number>await stdin.read(buf);
  const answer = new TextDecoder().decode(buf.subarray(0, n));

  return answer.trim();
}

async function newRow() {
  await Deno.stdout.write(new TextEncoder().encode('\n'));
}

await Deno.stdout.write(new TextEncoder().encode('building new deal...'));
await newRow();
await newRow();

// getting the title with validation
let title: string;
do {
  title = await ask('deal title: ');
} while (title.split(' ').length < 2);

// get the description with validation
let description: string;
do {
  description = await ask('deal description: ');
} while (description.length <= 20);

// getting the price with validation
let price: number;
do {
  price = Number(await ask('deal price: '));
} while (isNaN(price));

let limited: number;
do {
  limited = Number(await ask('number of rooms: '));
} while (isNaN(limited));

const confirmed = /^y|yes|ok|true/i.test(
  await ask('are you ready to proceed? (Y/n)')
);

if (!confirmed) {
  Deno.exit();
}

await Deno.stdout.write(new TextEncoder().encode('inserting...'));

await database.query({
  text:
    'INSERT INTO deals (title, description, price, ordered, limited) VALUES ($1, $2, $3, $4, $5);',
  args: [title, description, price, 0, limited],
});
