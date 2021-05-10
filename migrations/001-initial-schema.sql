-- Up
pragma foreign_keys = on;

create table users
(
    id   integer not null primary key autoincrement,
    name text    not null,
    role text    not null check (role in ('supervisor', 'manager', 'director'))
);

create table orders
(
    id              integer not null primary key autoincrement,
    last_updated_at integer,
    last_updated_by integer,
    foreign key (last_updated_by) references users (id)
);

create table orders_av
(
    order_id        integer not null,
    attribute_id    text    not null,
    last_updated_at integer not null,
    last_updated_by integer not null,
    value           text,
    foreign key (order_id) references orders (id),
    foreign key (last_updated_by) references users (id)
);

create table orders_log
(
    order_id     integer not null,
    attribute_id text    not null,
    updated_at   integer not null,
    updated_by   integer not null,
    from_value   text,
    to_value     text,
    foreign key (order_id) references orders (id),
    foreign key (updated_by) references users (id)
);

create trigger update_order_fields
    after insert
    on orders_av
begin
    update orders
    set last_updated_by = new.last_updated_by,
        last_updated_at = new.last_updated_at
    where id = new.order_id;
end;


-- Down
