type LogLevel = "info" | "warn" | "error" | "debug";

const COLORS: Record<LogLevel, string> = {
  info: "\x1b[36m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
  debug: "\x1b[90m",
};

const RESET = "\x1b[0m";

const formatMessage = (level: LogLevel, context: string, message: string, meta?: unknown): string => {
  const timestamp = new Date().toISOString();
  const color = COLORS[level];
  const prefix = `${color}[${level.toUpperCase()}]${RESET} ${timestamp} [${context}]`;
  const metaStr = meta !== undefined ? ` ${JSON.stringify(meta)}` : "";
  return `${prefix} ${message}${metaStr}`;
};

const createLogger = (context: string) => ({
  info: (message: string, meta?: unknown) => {
    console.log(formatMessage("info", context, message, meta));
  },
  warn: (message: string, meta?: unknown) => {
    console.warn(formatMessage("warn", context, message, meta));
  },
  error: (message: string, meta?: unknown) => {
    console.error(formatMessage("error", context, message, meta));
  },
  debug: (message: string, meta?: unknown) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(formatMessage("debug", context, message, meta));
    }
  },
});

export default createLogger;
