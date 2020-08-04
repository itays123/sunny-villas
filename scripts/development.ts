let worker: any = null;

function runWorker() {
  worker = Deno.run({
    cmd: [
      "deno",
      "run",
      "-A",
      "--unstable",
      "-c",
      `${Deno.cwd()}/tsconfig.json`,
      `${Deno.cwd()}/server.tsx`,
    ]
  });
}

const startWatcher = async (path: string) => {
  const watcher = Deno.watchFs(path);
  for await (const event of watcher) {
    console.log("\nRestarting due to the file has been changed. :)")
    if (worker) {
      if (Deno.build.os === "windows") {
        worker.close()
      }
      else {
        worker.kill(Deno.Signal.SIGKILL)
      }

      runWorker();
    }
  }
}

runWorker()
const watchers = [`${Deno.cwd()}/view`, `${Deno.cwd()}/controllers`].map(async (p) => await startWatcher(p))
await Promise.all(watchers);

