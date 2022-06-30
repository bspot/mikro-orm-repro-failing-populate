import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'

import Dependent from './Dependent'

@Entity()
export default class LogEntry {

  @PrimaryKey()
  id!: number

  @ManyToOne({ onDelete: 'cascade' })
  dependent!: Dependent;

  @Property()
  foo!: string
}
