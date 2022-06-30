import { Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql'

import Main from './entities/Main'
import Dependent from './entities/Dependent'
import LogEntry from './entities/LogEntry'

const config: Options<MySqlDriver> = {
  entities: [
    Main,
    Dependent,
    LogEntry
  ],
  type: 'mysql',
  password: 'root-secret',
  clientUrl: 'mysql://root@localhost:3306/test_006',
  debug: true,
};

export default config;
