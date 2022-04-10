import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

const pty = require('node-pty')

@WebSocketGateway({
  cors: true,
})
export class LatinoGateway {
  @SubscribeMessage('execute')
  executeLatino(client: any, payload: any): any {
    let ptyProcess = pty.spawn(__dirname + '/assets/latino', ['-e', payload], {
      name: 'xterm-color',
      cols: 80,
      rows: 24,
      cwd: process.env.HOME,
      env: process.env
    })

    ptyProcess.on('data', (data) => {
      client.emit('output', data);
    });

    client.on('input', (data) => {
      console.log(['client input', data]);
      ptyProcess.write(data);
    });
  }
}
