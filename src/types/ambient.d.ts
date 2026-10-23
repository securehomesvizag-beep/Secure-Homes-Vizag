declare module 'fs' {
  export function existsSync(path: string): boolean;
  export function readFileSync(path: string, encoding: string): string;
  export function writeFileSync(path: string, data: string, encoding: string): void;
  export function mkdirSync(path: string, options?: { recursive?: boolean }): void;
  const fs: {
    existsSync: typeof existsSync;
    readFileSync: typeof readFileSync;
    writeFileSync: typeof writeFileSync;
    mkdirSync: typeof mkdirSync;
  };
  export default fs;
}

declare module 'path' {
  export function join(...paths: string[]): string;
  const path: {
    join: typeof join;
  };
  export default path;
}

declare namespace NodeJS {
  interface Process {
    cwd(): string;
    env: Record<string, string | undefined>;
  }
}

declare const process: NodeJS.Process;
