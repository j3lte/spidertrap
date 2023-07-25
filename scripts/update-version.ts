// Copyright 2023 J.W. Lagendijk. All rights reserved. MIT license.

async function update(args: string[]) {
  const version = args[0];
  if (!version) {
    console.error("No version provided.");
    Deno.exit(1);
  }

  const filePath = new URL(import.meta.url).pathname;
  const dirPath = filePath.split("/").slice(0, -1).join("/");
  const cliPath = `${dirPath}/../cli.ts`;

  const cli = await Deno.readTextFile(cliPath);
  const updatedCli = cli.replace(
    /const VERSION = ".*";/,
    `const VERSION = "${version}";`,
  );
  await Deno.writeTextFile(cliPath, updatedCli);

  console.log(`Updated version to ${version}.`);
}

update(Deno.args);
