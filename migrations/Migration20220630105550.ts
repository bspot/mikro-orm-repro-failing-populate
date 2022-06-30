import { Migration } from '@mikro-orm/migrations';

export class Migration20220630105550 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `main` (`pk_one` varchar(255) not null, `pk_two` varchar(255) not null, `type` varchar(255) not null, primary key (`pk_one`, `pk_two`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `dependent` (`main_pk_one` varchar(255) not null, `main_pk_two` varchar(255) not null, `id` varchar(255) not null, `bar` varchar(255) not null, primary key (`main_pk_one`, `main_pk_two`, `id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `dependent` add index `dependent_main_pk_one_main_pk_two_index`(`main_pk_one`, `main_pk_two`);');

    this.addSql('create table `log_entry` (`id` int unsigned not null auto_increment primary key, `dependent_main_pk_one` varchar(255) not null, `dependent_main_pk_two` varchar(255) not null, `dependent_id` varchar(255) not null, `foo` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `log_entry` add index `log_entry_dependent_main_pk_one_dependent_main_pk_t_8dac1_index`(`dependent_main_pk_one`, `dependent_main_pk_two`, `dependent_id`);');

    this.addSql('alter table `dependent` add constraint `dependent_main_pk_one_main_pk_two_foreign` foreign key (`main_pk_one`, `main_pk_two`) references `main` (`pk_one`, `pk_two`) on update cascade;');

    this.addSql('alter table `log_entry` add constraint `log_entry_dependent_main_pk_one_dependent_main_pk_65b74_foreign` foreign key (`dependent_main_pk_one`, `dependent_main_pk_two`, `dependent_id`) references `dependent` (`main_pk_one`, `main_pk_two`, `id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `dependent` drop foreign key `dependent_main_pk_one_main_pk_two_foreign`;');

    this.addSql('alter table `log_entry` drop foreign key `log_entry_dependent_main_pk_one_dependent_main_pk_65b74_foreign`;');

    this.addSql('drop table if exists `main`;');

    this.addSql('drop table if exists `dependent`;');

    this.addSql('drop table if exists `log_entry`;');
  }

}
