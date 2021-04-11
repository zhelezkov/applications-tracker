-- Up
create table users
(
    id   integer primary key,
    name text                                                       not null,
    role text check (role in ('supervisor', 'manager', 'director')) not null
)

-- Down
