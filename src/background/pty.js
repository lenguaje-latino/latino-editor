const pty = require('node-pty');

function runProcess(command, args) {
  return pty.spawn(command, args, {
    name: 'xterm-color',
    cwd: process.cwd(),
    env: {
      ...process.env,
      SystemRoot: 'C:\\WINDOWS',
    },
  });
}

function killProcess(ptyProcess) {
  if (ptyProcess && ptyProcess.pid) {
    ptyProcess.kill();
  }
}

export { runProcess, killProcess };
