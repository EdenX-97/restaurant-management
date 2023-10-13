import { Identifier, RaRecord } from 'react-admin';

export type ProductCategory = 'hall' | 'kitchen' | 'sushiBar';

export interface Product extends RaRecord {
    product_id: Identifier;
    name: string;
    uom: string;
    category: ProductCategory;
    current_supplier_id: Identifier;
    scheduled_order: Map<string, number>;
}

export interface Supplier extends RaRecord {
    supplier_id: Identifier;
    name: string;
    phone: string;
    email: string;
    tel: string;
    fax: string;
    delivery_date: string[];
    delivery_due_time: string;
    available_products: Identifier[];
}
