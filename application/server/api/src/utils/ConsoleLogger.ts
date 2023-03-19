import { Logger } from '@food-captain/server-utils';

export class ConsoleLogger extends Logger {
  log(message: string, eventKind: 'debug' | 'info' | 'warning' | 'error') {
    console.log(`\n${new Date().toISOString()}`);

    switch (eventKind) {
      case 'debug':
        console.log('DEBUG');
        break;

      case 'info':
        console.log('\x1b[34m%s\x1b[0m', 'INFO');
        break;

      case 'warning':
        console.log('\x1b[33m%s\x1b[0m', 'WARNING');
        break;

      case 'error':
        console.log('\x1b[31m%s\x1b[0m', 'ERROR');
        break;

      default:
        throw new Error(`Invalid eventKind: ${eventKind}`);
    }

    console.log(message);
  }

  debug(message: Parameters<ConsoleLogger['log']>[0]) {
    this.log(message, 'debug');
  }

  info(message: Parameters<ConsoleLogger['log']>[0]) {
    this.log(message, 'info');
  }

  warning(message: Parameters<ConsoleLogger['log']>[0]) {
    this.log(message, 'warning');
  }

  error(message: Parameters<ConsoleLogger['log']>[0]) {
    this.log(message, 'error');
  }
}
