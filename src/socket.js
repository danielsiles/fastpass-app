import * as withAbsintheSocket from '@absinthe/socket';
import {Socket as PhoenixSocket} from 'phoenix';

export const absintheSocket = withAbsintheSocket.create(
  new PhoenixSocket('ws://localhost:4000/socket'),
);
