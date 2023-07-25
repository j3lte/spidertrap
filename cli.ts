import { Command } from "./deps.ts";
import { server } from "./mod.ts";

export const VERSION = "0.3.0";

if (import.meta.main) {
  await new Command()
    .name("spidertrap")
    .description("A simple web server that traps web crawlers.")
    .version(VERSION)
    .option("-p, --port <port:number>", "Port to listen on", { default: 8080 })
    .option(
      "-l, --number-of-links <links:number>",
      "Number of links to generate",
      {
        default: 5,
      },
    )
    .option(
      "-d, --delay <delay:number>",
      "Delay in ms to wait before responding",
      {
        default: 0,
      },
    )
    .option(
      "-a, --accumulate-delay",
      "Accumulate delay based on path segments",
      {
        default: false,
      },
    )
    .option(
      "-m, --max-delay <maxDelay:number>",
      "Maximum delay in ms to wait before responding",
      {
        default: 5000,
      },
    )
    .option(
      "-L, --log-dir <logDir:string>",
      "Directory to log to. Disabled by default",
      {
        default: "",
      },
    )
    .option(
      "-r, --disable-robots",
      "Disable robots.txt",
      {
        default: false,
      },
    )
    .option(
      "-x, --disable-sitemap",
      "Disable sitemap.xml",
      {
        default: false,
      },
    )
    .option(
      "-s, --sitemap-levels <sitemapLevels:number>",
      "Sitemap levels",
      {
        default: 3,
      },
    )
    .example(
      "> spidertrap --port 8000 --number-of-links 15 --delay 300 -a --max-delay 5000",
      "Start a server on port 8000 with 15 links, a delay of 300ms that accumulates, and a maximum delay of 5000ms.",
    )
    .action(
      async (opts) => {
        await server(opts);
      },
    )
    .parse();
}
