import { Entity, ObjectIdColumn, Column, BeforeInsert } from 'typeorm';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

@Entity('dishes')
export class Dish {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column({ unique: true })
    id!: string;

    @Column({ type: 'text', nullable: false })
    image!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ type: 'text', nullable: false })
    description!: string;

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}