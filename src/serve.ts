import { serve } from "../deps.ts";
import {
  randomDate,
  randomPathName,
  respondImage,
  respondRobots,
  wait,
} from "./utils.ts";

const serveHandler =
  ({ numberOfLinks, delay, accumulateDelay, maxDelay }: ServerOptions) =>
  async (request: Request): Promise<Response> => {
    const path = new URL(request.url).pathname;
    const userAgent = request.headers.get("user-agent") ?? "";

    // if (path === "/favicon.ico") {
    //   return new Response(null, { status: 404 });
    // }

    if (
      [
        "/favicon.ico",
        "/icons/blank.gif",
        "/icons/folder.gif",
        "/icons/generic.gif",
      ].includes(
        path,
      )
    ) {
      return await respondImage(path);
    }

    if (path.startsWith("/icons/")) {
      return new Response(null, { status: 404 });
    }

    console.log("Incoming request", { path, userAgent });

    if (path === "/robots.txt") {
      return respondRobots(numberOfLinks ?? 5);
    }

    if (!path.endsWith("/")) {
      return new Response(null, {
        status: 404,
      });
    }

    const pathSegmentsLength =
      path.split("/").filter((s) => s.length > 0).length;

    const randomLinks = Array.from({ length: numberOfLinks ?? 5 }).map(() => {
      const pathName = randomPathName();
      const date = randomDate();
      return `
    <tr>
    <td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="${pathName}/">${pathName}/</a>        </td><td align="right">${date}  </td><td align="right">  - </td><td>&nbsp;</td>
  </tr>
  `;
    });

    const body = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
    <html>
      <head>
        <title>Index of ${path}</title>
      </head>
      <body>
        <h1>Index of ${path}</h1>
        <table>
          <tr>
            <th>
              <img src="/icons/blank.gif" alt="[ICO]"></th><th><a href="?C=N;O=D">Name</a></th><th><a href="?C=M;O=A">Last modified</a></th><th><a href="?C=S;O=A">Size</a></th><th><a href="?C=D;O=A">Description</a></th></tr><tr><th colspan="5"><hr>
            </th>
          </tr>
          ${
      (pathSegmentsLength > 0)
        ? `
            <tr>
              <td valign="top"><img src="/icons/blank.gif" alt="[PARENTDIR]"></td><td><a href="../">Parent Directory</a>       </td><td align="right">  - </td><td align="right">  - </td><td>&nbsp;</td>
            </tr>
          `
        : ""
    }
          ${randomLinks.join("")}
          ${
      (pathSegmentsLength === 0)
        ? `
      <tr>
        <td valign="top"><img src="/icons/generic.gif" alt="[File]"></td><td><a href="/robots.txt">robots.txt</a>       </td><td align="right">  - </td><td align="right">  - </td><td>&nbsp;</td>
      </tr>
    `
        : ""
    }
          <tr><th colspan="5"><hr></th></tr>
        </table>
      </body>
    </html>
  `;

    let waitTime = accumulateDelay
      ? pathSegmentsLength * (delay ?? 0)
      : (delay ?? 0);
    if (waitTime > (maxDelay ?? 5000)) {
      waitTime = maxDelay ?? 5000;
    }

    await wait(waitTime);

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  };

export interface ServerOptions {
  /**
   * Number of links to generate
   * @default 5
   */
  numberOfLinks?: number;
  /**
   * Port to listen on
   * @default 8080
   */
  port?: number;
  /**
   * Delay in ms to wait before responding
   * @default 0
   */
  delay?: number;
  /**
   * Accumulate delay based on path segments
   * @default false
   */
  accumulateDelay?: boolean;
  /**
   * Maximum delay in ms to wait before responding
   * @default 5000
   */
  maxDelay?: number;
}

export const server = async (
  opts: ServerOptions = { port: 8080 },
): Promise<void> => {
  await serve(serveHandler(opts), { port: opts.port });
};

if (import.meta.main) {
  await server();
}
