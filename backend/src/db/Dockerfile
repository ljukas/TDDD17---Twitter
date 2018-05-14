# Base image
FROM postgres:10-alpine

# run create.sql on init
ADD create.sql /docker-entrypoint-initdb.d

# Connect psql on this database with
# docker run -it --rm --network infosec_tddd17_default postgres psql -h twitter-db -U postgres