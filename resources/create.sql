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
    createdBy uuid not null,
    describe text not null,
    quantity integer not null,
    creationdate text not null
)
select * from data.coupon
drop table data.coupon