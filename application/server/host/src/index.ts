'use strict';
import { Host } from './Host';

const host = new Host();
try {
  host.start();
} catch (error) {
  console.error(error);
} finally {
  console.log('finally');
}
