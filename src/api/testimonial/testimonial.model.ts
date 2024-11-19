import { Entity, ObjectIdColumn, Column, BeforeInsert } from 'typeorm';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

@Entity('testimonials')
export class Testimonial {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column({ unique: true })
    id!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ type: 'text', nullable: false })
    image!: string;

    @Column({ type: 'text', nullable: false })
    description!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    designation!: string;

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}