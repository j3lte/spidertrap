import { Command } from "./deps.ts";
import { server } from "./mod.ts";

export const VERSION = "0.2.1";

if (import.meta.main) {
  await new Command()
    .name("spidertrap")
    .description("A simple web server that traps web crawlers.")
    .version(VERSION)
    .option("-p, --port <port:number>", "Port to listen on.", { default: 8080 })
    .option(
      "-l, --number-of-links <links:number>",
      "Number of links to generate.",
      {
        default: 5,
      },
    )
    .option(
      "-d, --delay <delay:number>",
      "Delay in ms to wait before responding.",
      {
        default: 0,
      },
    )
    .option(
      "-a, --accumulate-delay",
      "Accumulate delay based on path segments.",
      {
        default: false,
      },
    )
    .option(
      "-m, --max-delay <maxDelay:number>",
      "Maximum delay in ms to wait before responding.",
      {
        default: 5000,
      },
    )
    .option(
      "-L, --log-dir <logDir:string>",
      "Directory to log to. Default disabled.",
      {
        default: "",
      },
    )
    .action(
      async (
        { port, numberOfLinks, delay, maxDelay, accumulateDelay, logDir },
      ) => {
        await server({
          port,
          numberOfLinks,
          delay,
          maxDelay,
          accumulateDelay,
          logDir,
        });
      },
    )
    .parse();
}
