import { Command } from "@deps";
import { server } from "./mod.ts";

export const VERSION = "0.1.0";

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
    .action(
      async ({ port, numberOfLinks, delay, maxDelay, accumulateDelay }) => {
        await server({
          port,
          numberOfLinks,
          delay,
          maxDelay,
          accumulateDelay,
        });
      },
    )
    .parse();
}
