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
  /**
   * Directory to log to
   * @default ""
   */
  logDir?: string;
  /**
   * Disable robots.txt
   * @default false
   */
  disableRobots?: boolean;
  /**
   * Disable sitemap.xml
   * @default false
   */
  disableSitemap?: boolean;
  /**
   * Sitemap levels
   * @default 5
   */
  sitemapLevels?: number;
}
