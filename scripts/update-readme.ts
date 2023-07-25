// Copyright 2023 J.W. Lagendijk. All rights reserved. MIT license.

import { stripColor } from "../dev_deps.ts";

import { updateText } from "./utils.ts";
import { VERSION } from "../cli.ts";

async function update() {
  const filePath = new URL(import.meta.url).pathname;
  const dirPath = filePath.split("/").slice(0, -1).join("/");
  const readmePath = `${dirPath}/../README.md`;
  const cliPath = `${dirPath}/../cli.ts`;
  const licensePath = `${dirPath}/../LICENSE`;

  const command = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      cliPath,
      "--help",
    ],
  });

  const readme = await Deno.readTextFile(readmePath);
  const license = await Deno.readTextFile(licensePath);

  const { code, stdout, stderr } = await command.output();

  const output = stripColor(new TextDecoder().decode(stdout));
  const err = new TextDecoder().decode(stderr);

  if (code !== 0) {
    console.error(err);
    Deno.exit(1);
  }

  let updatedReadme = updateText(
    "SNIPPET",
    readme,
    `\`\`\`bash\n${output}\`\`\``,
  );
  updatedReadme = updateText(
    "LICENSE",
    updatedReadme,
    `\`\`\`\n${license}\n\`\`\``,
  );
  updatedReadme = updatedReadme.replace(
    /deno\.land\/x\/spidertrap(.*)\//g,
    `deno.land/x/spidertrap@${VERSION}/`,
  );

  await Deno.writeTextFile(readmePath, updatedReadme);
}

update();
