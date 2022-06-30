import { MikroORM, RequestContext } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'
import assert from 'assert'

import Main from './entities/Main'
import Dependent from './entities/Dependent'
import LogEntry from './entities/LogEntry'
import mikroOrmConfig from './mikro-orm.config'

async function test01(mikroOrm: MikroORM) {
  // Create some entities
  await RequestContext.createAsync(mikroOrm.em, async () => {
    const main = mikroOrm.em.create(Main, {
      pk_one: 'one-1',
      pk_two: 'two-1',
      type: 'some-type'
    })

    const dependent = mikroOrm.em.create(Dependent, {
      id: 'app-1',
      main,
      bar: 'some-bar'
    })

    const logEntry = mikroOrm.em.create(LogEntry, {
      dependent,
      foo: 'some-foo'
    })

    mikroOrm.em.persist([main, dependent, logEntry])
    await mikroOrm.em.flush()
  })

  // Loading with `populate` from `Dependent` fully populates `Main`.
  await RequestContext.createAsync(mikroOrm.em, async () => {
    const result = await mikroOrm.em.findOneOrFail(Dependent, { id: 'app-1' }, {populate: ['main']})

    console.log(result)

    assert(result.main.type === 'some-type')
  })

  // Loading with `populate` from `LogEntry` fails to fully populate `Main`.
  await RequestContext.createAsync(mikroOrm.em, async () => {
    const result = await mikroOrm.em.findOneOrFail(LogEntry, { id: 1 }, {populate: ['dependent.main']})

    console.log(result)

    assert(result.dependent.main.type === 'some-type')
  })
}

async function main() {
  const mikroOrm = await MikroORM.init<MySqlDriver>(mikroOrmConfig);
  try {
    await test01(mikroOrm)
  }
  finally {
    await mikroOrm.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
