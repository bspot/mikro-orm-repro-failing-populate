import { Entity, PrimaryKeyType, Property } from '@mikro-orm/core'

@Entity()
export default class Main {

  @Property({ primary: true })
  pk_one!: string

  @Property({ primary: true })
  pk_two!: string

  [PrimaryKeyType]?: [string, string];

  @Property()
  type!: string
}
