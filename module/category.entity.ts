import { Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    category_id: string;

    @Column({unique: true})
    category_title: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => ProductEntity, (productEntity) => productEntity.categoryId, {cascade: true})
    products: ProductEntity[]
}
