-- Up
pragma foreign_keys = on;

create table users
(
    id       integer not null primary key autoincrement,
    name     text    not null,
    password text    not null,
    role     text    not null check (role in ('supervisor', 'manager', 'director'))
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
create index idx_orders_av_order_id on orders_av (order_id);

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
create index idx_orders_log_order_id on orders_log (order_id);

create trigger update_order_fields_insert
    after insert
    on orders_av
begin
    update orders
    set last_updated_by = new.last_updated_by,
        last_updated_at = new.last_updated_at
    where id = new.order_id;
end;

create trigger update_order_fields_update
    after update
    on orders_av
begin
    update orders
    set last_updated_by = new.last_updated_by,
        last_updated_at = new.last_updated_at
    where id = new.order_id;
end;

create trigger log_orders_av_new
    after insert
    on orders_av
begin
    insert into orders_log(order_id, attribute_id, updated_at, updated_by, from_value, to_value)
    values (new.order_id, new.attribute_id, new.last_updated_at, new.last_updated_by, null, new.value);
end;

create trigger log_orders_av_changes
    after update
    on orders_av
begin
    insert into orders_log(order_id, attribute_id, updated_at, updated_by, from_value, to_value)
    values (new.order_id, new.attribute_id, new.last_updated_at, new.last_updated_by, old.value, new.value);
end;

create trigger log_orders_av_delete
    after delete
    on orders_av
begin
    insert into orders_log(order_id, attribute_id, updated_at, updated_by, from_value, to_value)
    values (old.order_id, old.attribute_id, old.last_updated_at, old.last_updated_by, old.value, null);
end;

-- Down
