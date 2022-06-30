import { Entity, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from '@mikro-orm/core'

import Main from './Main'

@Entity()
export default class Dependent {

  @ManyToOne({ primary: true })
  main!: Main;

  @PrimaryKey()
  id!: string

  [PrimaryKeyType]?: [string, string, string];

  @Property()
  bar!: string
}
