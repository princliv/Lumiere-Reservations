import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { ensureSeeded } from './seed';

ensureSeeded();

export const worker = setupWorker(...handlers);
