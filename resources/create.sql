create schema data
drop schema data cascade 

create table data.user_account(
    id uuid primary key,
    email text not null,
    name text not null,
    cpf text not null,
    phone text not null,
    datesignup text not null
)
select * from data.user_account
drop table data.user_account

create table data.company_account(
    id uuid primary key,
    email text not null,
    name text not null,
    cnpj text not null,
    phone text not null,
    datesignup text not null
)
select * from data.company_account
drop table data.company_account

create table data.coupon(
    id uuid primary key,
    code text not null,
    discount text not null,
    expiration_date date not null,
    created_by uuid not null,
    describe text not null,
    quantity integer not null,
    creation_date text not null
)
select * from data.coupon
drop table data.coupon

create table data.sell(
    id uuid primary key,
    user_id uuid,
    coupon_id text not null,
    date timestamp
)
select * from data.sell
drop table data.sell