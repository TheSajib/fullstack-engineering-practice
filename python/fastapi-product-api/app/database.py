import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine, select
from sqlalchemy.orm import DeclarativeBase, sessionmaker

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is missing. Copy .env.example to .env")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    from .models import Product

    Base.metadata.create_all(bind=engine)

    with SessionLocal() as db:
        already_seeded = db.scalars(select(Product).limit(1)).first()
        if already_seeded is not None:
            return

        db.add_all(
            [
                Product(name="Laptop", price=75000, quantity=5),
                Product(name="Mouse", price=800, quantity=20),
            ]
        )
        db.commit()
