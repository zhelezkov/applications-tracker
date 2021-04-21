-- Up
pragma foreign_keys = on;
create table users
(
    id   integer primary key autoincrement,
    name text                                                       not null,
    role text check (role in ('supervisor', 'manager', 'director')) not null
);

create table orders
(
    id integer primary key autoincrement
);

create table attributes
(
    id   integer primary key autoincrement,
    name text not null
);

create table orders_av
(
    order_id     integer not null,
    attribute_id integer not null,
    value        blob,
    foreign key (attribute_id) references attributes (id),
    foreign key (order_id) references orders (id)
);


-- Down
