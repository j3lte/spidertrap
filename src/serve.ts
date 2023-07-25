// Copyright 2023 J.W. Lagendijk. All rights reserved. MIT license.

import { serve } from "../deps.ts";
import type { ConnInfo, Handler, Logger } from "../deps.ts";
import type { ServerOptions } from "./types.ts";

import {
  createLogger,
  dateLogFormat,
  randomDate,
  randomPathName,
  respondImage,
  respondRobots,
  respondSitemap,
  wait,
} from "./utils.ts";

const createServeHandler = (
  {
    numberOfLinks,
    delay,
    accumulateDelay,
    maxDelay,
    sitemapLevels,
    disableRobots,
    disableSitemap,
  }: ServerOptions,
  logger: Logger,
): Handler =>
async (
  request: Request,
  connInfo: ConnInfo,
): Promise<Response> => {
  let connection = "[UNKNOWN]";
  if (connInfo.remoteAddr.transport === "tcp") {
    connection = `${connInfo.remoteAddr.hostname}:${connInfo.remoteAddr.port}`;
  }

  const path = new URL(request.url).pathname;
  const userAgent = request.headers.get("user-agent") ?? "";

  const dateLog = dateLogFormat();
  const requestString =
    `${connection} - - [${dateLog}] "${request.method} ${path} HTTP/1.1"`;

  if (
    [
      "/favicon.ico",
      "/icons/back.gif",
      "/icons/blank.gif",
      "/icons/folder.gif",
      "/icons/generic.gif",
    ].includes(
      path,
    )
  ) {
    logger.info(`${requestString} 200 ${userAgent}`);
    return await respondImage(path);
  }

  if (path.startsWith("/icons/")) {
    logger.info(`${requestString} 404 ${userAgent}`);
    return new Response(null, {
      status: 404,
      headers: {
        "Server": "Apache",
      },
    });
  }

  if (path === "/robots.txt" && !disableRobots) {
    logger.info(`${requestString} 200 ${userAgent}`);
    return respondRobots(numberOfLinks ?? 5);
  }

  if (path === "/sitemap.xml" && !disableSitemap) {
    logger.info(`${requestString} 200 ${userAgent}`);
    return respondSitemap(numberOfLinks ?? 5, sitemapLevels ?? 3);
  }

  if (!path.endsWith("/")) {
    logger.info(`${requestString} 404 ${userAgent}`);
    return new Response(null, {
      status: 404,
      headers: {
        "Server": "Apache",
      },
    });
  }

  logger.info(`${requestString} 200 ${userAgent}`);

  const pathSegmentsLength = path.split("/").filter((s) => s.length > 0).length;

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
              <td valign="top"><img src="/icons/back.gif" alt="[PARENTDIR]"></td><td><a href="../">Parent Directory</a>       </td><td align="right">  - </td><td align="right">  - </td><td>&nbsp;</td>
            </tr>
          `
      : ""
  }
          ${randomLinks.join("")}
          ${
    (pathSegmentsLength === 0 && !disableRobots)
      ? `
      <tr>
        <td valign="top"><img src="/icons/generic.gif" alt="[FILE]"></td><td><a href="/robots.txt">robots.txt</a>       </td><td align="right">  - </td><td align="right">  - </td><td>&nbsp;</td>
      </tr>
    `
      : ""
  }
          ${
    (pathSegmentsLength === 0 && !disableSitemap)
      ? `
      <tr>
        <td valign="top"><img src="/icons/generic.gif" alt="[FILE]"></td><td><a href="/sitemap.xml">sitemap.xml</a>       </td><td align="right">  - </td><td align="right">  - </td><td>&nbsp;</td>
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
      "Server": "Apache",
    },
  });
};

export const server = async (
  opts: ServerOptions = { port: 8080 },
): Promise<void> => {
  const dateLog = dateLogFormat();
  const logger = await createLogger(opts.logDir ?? "");
  const handler = createServeHandler(opts, logger);

  const exitListener = () => {
    logger.info(`[${dateLog}] Spidertrap shutting down`);
    Deno.exit(0);
  };

  Deno.addSignalListener("SIGINT", exitListener);
  Deno.addSignalListener("SIGTERM", exitListener);

  await serve(handler, {
    port: opts.port,
    onListen: ({ hostname, port }) => {
      logger.info(
        `[${dateLog}] Spidertrap listening on http://${hostname}:${port}`,
      );
    },
  });
};

if (import.meta.main) {
  await server();
}
