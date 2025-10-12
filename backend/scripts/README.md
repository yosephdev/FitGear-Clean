# Seed script for production database

This directory contains a small script to seed the production MongoDB with
sample products if the `products` collection is empty.

How to run
----------

Run the script on the target host (do NOT commit your production credentials):

MONGO_URL="mongodb://username:password@host:27017/fitgear" python seed_prod_db.py

Notes
-----

- The script will only insert products if the collection is empty.
- Do not store secrets in the repository. Pass credentials via environment variables or your host's secret manager.
- If you want to run it from CI/CD or a container, pass `MONGO_URL` into the runtime environment.
