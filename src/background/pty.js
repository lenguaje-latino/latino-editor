const pty = require('node-pty');

function runProcess(command, args) {
  try {
    return pty.spawn(command, args, {
      name: 'xterm-color',
      cwd: process.cwd(),
      env: process.env,
    });
  } catch (error) {
    return null;
  }
}

function killProcess(ptyProcess) {
  if (ptyProcess && ptyProcess.pid) {
    ptyProcess.kill();
  }
}

export { runProcess, killProcess };
