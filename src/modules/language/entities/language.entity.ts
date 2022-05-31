import { Reading } from "src/modules/reading/entities/reading.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Language{
    @PrimaryGeneratedColumn()
    id_language: number;

    @Column({type: "varchar", length: 15, unique: true, nullable: false})
    name: string;

    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;

    @OneToMany(Type => Reading, (reading) => reading.language)
    @JoinColumn()
    reading: Reading;
}