import { Entity, Column, BeforeInsert, BeforeUpdate, ObjectIdColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column({ unique: true })
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    name!: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    mobile!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column({ type: 'timestamp', nullable: true })
    passwordUpdatedAt!: Date;

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }

    // Hash the password before saving it
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    // Method to compare password with hashed password in DB
    async comparePassword(pswd: string): Promise<boolean> {
        return await bcrypt.compare(pswd, this.password);
    }
}