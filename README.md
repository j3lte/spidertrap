Spidertrap
==========

Spidertrap is a simple web server that can be used to trap web crawlers. It is written in Typescript and runs on Deno. You can use it standalone or as a library.

## Installation

### Standalone

You can install Spidertrap as a standalone application using the following command:

```bash
deno install --allow-net --allow-read https://xxxxxx/spidertrap.ts
```

### Library

You can also use Spidertrap as a library. To do so, add the following to your `deps.ts` file:

```typescript
export { server } from "https://xxxxxx/spidertrap.ts";
```

## Usage

### Standalone

<!-- START SNIPPET -->

```bash

Usage:   spidertrap
Version: 0.1.0

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

```
<!-- END SNIPPET -->

## License

Spidertrap is licensed under the MIT license. See [LICENSE](LICENSE) for more information.
