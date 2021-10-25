## How to start aplication for development

1. Make sure latest NodeJS LTS is installed (https://nodejs.org)
2. Make sure Yarn is installed (`npm install --global yarn`)
3. Run `yarn install && yarn rebuild`
4. Run `yarn dev`

## How to add user

1. Open database at `data/db.sqlite` with any sqlite viewer
2. Run sql query:

```sql
insert into users(name, password, role)
values ("user_dev", "$2a$04$UsK/1hlFmzXdZnNcnhE5FOxWEKRwqg14RLuHMm00HkURk6ofIze/e", "director")
```

3. Refresh app and login with `user_dev` and password `6d45` (in database password is encrypted with bcrypt)
