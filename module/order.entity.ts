import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


interface OrderedItems {
    id: string;
    title: string;
    price: number;
    quantity: number;
    created_at?: any;
    product_image?: string;
}



@Entity('orders')
export class OrderEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.orders)
    userId: UserEntity;

    @Column('text', {array: true})
    arrayOfOrders: OrderedItems[]

    @CreateDateColumn()
    created_at: Date;
}