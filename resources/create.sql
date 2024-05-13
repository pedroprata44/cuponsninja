create schema data
drop schema data cascade 

select * from data.user_account
drop table data.user_account

create table data.user_account(
    id uuid primary key,
    email text not null,
    name text not null,
    cpf text not null,
    phone text not null,
    datesignup date default CURRENT_DATE not null
)

select * from data.company_account
drop table data.company_account

create table data.company_account(
    id uuid primary key,
    email text not null,
    name text not null,
    cnpj text not null,
    phone text not null,
    datesignup date default CURRENT_DATE not null
)