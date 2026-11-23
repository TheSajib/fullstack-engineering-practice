# Product Management API

FastAPI app for learning product routes. Products are stored in PostgreSQL. The database name comes from `DATABASE_URL` in `.env`.

## Install

From this folder (`python/fastapi-product-api`):

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

`requirements.txt` installs FastAPI, Uvicorn, and the other pinned packages.

If PowerShell blocks the activate script, run this once, then activate again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## Database

PostgreSQL must be running on `localhost` port `5432`. The connection string lives in `.env`, not in the Python code.

```powershell
Copy-Item .env.example .env
```

`.env` looks like this:

```text
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/postgres
```

Change the database name at the end of that line if you want a different database. The `postgres` database already exists, so this value can be used as it is. `.env` is ignored by git. `.env.example` is the copy you can commit.

On the first start, the app creates the `products` table and inserts Laptop and Mouse when the table is empty. Later restarts keep the rows already saved.

## Run

Keep the virtual environment active, stay in `python/fastapi-product-api`, and start the server:

```powershell
uvicorn app.main:app --reload
```

Then open:

- http://127.0.0.1:8000/ — welcome message
- http://127.0.0.1:8000/docs — Swagger UI for every route
- http://127.0.0.1:8000/redoc — ReDoc for the same API
- http://127.0.0.1:8000/api/products — the product list

Stop the server with `Ctrl+C`.

## Try the API

In a second terminal, with the server still running:

```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/products

Invoke-RestMethod http://127.0.0.1:8000/api/products/1

$body = @{ name = "Keyboard"; price = 1500; quantity = 10 } | ConvertTo-Json
Invoke-RestMethod http://127.0.0.1:8000/api/products -Method Post -Body $body -ContentType "application/json"

$body = @{ name = "Keyboard"; price = 1800; quantity = 8 } | ConvertTo-Json
Invoke-RestMethod http://127.0.0.1:8000/api/products/3 -Method Put -Body $body -ContentType "application/json"

Invoke-RestMethod http://127.0.0.1:8000/api/products/3 -Method Delete
```

The same calls are available from http://127.0.0.1:8000/docs. A new product id depends on what is already in the list. Laptop is `1` and Mouse is `2` on a fresh start, so the first product you add is `3`.
