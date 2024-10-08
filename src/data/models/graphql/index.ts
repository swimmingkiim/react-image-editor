
export type Cart = {
    uuid: String;
    products: Product[];
};

export type Product = {
    uuid: String;
    product_name: String;
    product_code: String;
    product_supplier: String;
    product_group: String;
    image: String;
    blank: String;
    dtf: String;
    dtg: String;
    emb: String;
    scr: String;
    sub: String;
    trf: String;
};

export type ProductPart = {
    uuid: String;
    image: String;
    priority: Number;
    decorationAreas: ProductPartDecorationArea[];
};

export type ProductPartDecorationArea = {
    uuid: String;
    area_name: String;
    x: Number;
    y: Number;
    width: Number;
    height: Number;
};