Spidertrap
==========

Spidertrap is a simple web server that can be used to trap web crawlers. It is written in Typescript and runs on Deno. You can use it standalone or as a library.

<center><img src="./img.png" width="50%" /></center>

## Features

- Runs a webserver that responds to all requests with a list of random links. It mimics an Apache directory index.
- Adds a `robots.txt` file that baits certain crawlers to crawl random links
- Optionally add a delay to the response which can be accumulated based on the path segments (the further down the path, the longer the delay)

## Installation

### Standalone

You can install Spidertrap as a standalone application using the following command:

```bash
deno install --allow-net --allow-read --allow-write -n spidertrap https://deno.land/x/spidertrap@0.2.0/cli.ts
```

> Note: You will only need the `allow-write` permission if you want to enable file logging.

### Library

You can also use Spidertrap as a library. To do so, add the following to your `deps.ts` file:

```typescript
export { server } from "https://deno.land/x/spidertrap@0.2.0/mod.ts";
```

## Usage

### Standalone

<!-- START SNIPPET -->

```bash

Usage:   spidertrap
Version: 0.2.0

Description:

  A simple web server that traps web crawlers.

Options:

  -h, --help                          - Show this help.
  -V, --version                       - Show the version number for this program.
  -p, --port              <port>      - Port to listen on.                              (Default: 8080)
  -l, --number-of-links   <links>     - Number of links to generate.                    (Default: 5)
  -d, --delay             <delay>     - Delay in ms to wait before responding.          (Default: 0)
  -a, --accumulate-delay              - Accumulate delay based on path segments.        (Default: false)
  -m, --max-delay         <maxDelay>  - Maximum delay in ms to wait before responding.  (Default: 5000)
  -L, --log-dir           <logDir>    - Directory to log to. Default disabled.          (Default: "")

```
<!-- END SNIPPET -->

## Development

### Upcoming features

- Add a `sitemap.xml` file that baits certain crawlers to crawl random links

## License

Spidertrap is licensed under the [MIT license](LICENSE).

<!-- START LICENSE -->

```
The MIT License (MIT)

Copyright © J.W. Lagendijk 2023-2023. All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

```
<!-- END LICENSE -->
