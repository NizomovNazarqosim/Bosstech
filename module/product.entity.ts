import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { UserEntity } from "./user.entity";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column({unique: true})
    product_title: string;

    @Column()
    product_price: number;

    @CreateDateColumn()
    created_at: Date;

    @Column({nullable:true})
    product_image: string;


    @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.products)
    categoryId: CategoryEntity;
}
