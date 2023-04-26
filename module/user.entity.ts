import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { ProductEntity } from "./product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { OrderEntity } from "./order.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Nazarqosim'
    })
    @Column()
    name: string;

    @ApiProperty({
        example: 'nazarqosim@gmail.com'
    })
    @Column({unique: true})
    email: string;
    
    @Column({unique: true})
    password: string;

    @Column({nullable: true})
    address: string;
    
    @Column({nullable: true})
    user_image: string;

    @Column({default: 'user'})
    user_role: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.userId)
    orders: OrderEntity[];
}