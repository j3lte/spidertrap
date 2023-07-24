import { stripColor } from "@devdeps";

async function update() {
  const filePath = new URL(import.meta.url).pathname;
  const dirPath = filePath.split("/").slice(0, -1).join("/");
  const readmePath = `${dirPath}/../README.md`;
  const cliPath = `${dirPath}/../cli.ts`;

  const command = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      cliPath,
      "--help",
    ],
  });

  const readme = await Deno.readTextFile(readmePath);

  const startSnippetPos = readme.indexOf("<!-- START SNIPPET -->");
  const endSnippetPos = readme.indexOf("<!-- END SNIPPET -->");

  const startSnippet = readme.slice(0, startSnippetPos + 23);
  const endSnippet = readme.slice(endSnippetPos);

  const { code, stdout, stderr } = await command.output();

  const output = stripColor(new TextDecoder().decode(stdout));
  const err = new TextDecoder().decode(stderr);

  if (code !== 0) {
    console.error(err);
    Deno.exit(1);
  }

  const updatedReadme =
    `${startSnippet}\n\`\`\`bash\n${output}\`\`\`\n${endSnippet}`;

  await Deno.writeTextFile(readmePath, updatedReadme);
}

update();
