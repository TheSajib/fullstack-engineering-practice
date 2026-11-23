from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from .database import get_db, init_db
from .models import Product


@asynccontextmanager
async def lifespan(_app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="Product Management API",
    description="Product API stored in PostgreSQL",
    version="1.0.0",
    lifespan=lifespan,
)


class ProductCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    price: float = Field(gt=0)
    quantity: int = Field(ge=0)


class ProductRead(BaseModel):
    id: int
    name: str
    price: float
    quantity: int

    model_config = ConfigDict(from_attributes=True)


class ProductResult(BaseModel):
    message: str
    product: ProductRead


def find_product(db: Session, product_id: int) -> Product:
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.get("/")
def home():
    return {"message": "Welcome to FastAPI Product API"}


@app.get("/api/products", response_model=list[ProductRead])
def get_products(db: Session = Depends(get_db)):
    return db.scalars(select(Product).order_by(Product.id)).all()


@app.get("/api/products/{product_id}", response_model=ProductRead)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return find_product(db, product_id)


@app.post("/api/products", status_code=201, response_model=ProductResult)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    new_product = Product(
        name=product.name,
        price=product.price,
        quantity=product.quantity,
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return {
        "message": "Product created successfully",
        "product": new_product,
    }


@app.put("/api/products/{product_id}", response_model=ProductResult)
def update_product(
    product_id: int,
    updated_product: ProductCreate,
    db: Session = Depends(get_db),
):
    product = find_product(db, product_id)
    product.name = updated_product.name
    product.price = updated_product.price
    product.quantity = updated_product.quantity
    db.commit()
    db.refresh(product)
    return {
        "message": "Product updated successfully",
        "product": product,
    }


@app.delete("/api/products/{product_id}", response_model=ProductResult)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = find_product(db, product_id)
    deleted = ProductRead.model_validate(product)
    db.delete(product)
    db.commit()
    return {
        "message": "Product deleted successfully",
        "product": deleted,
    }
