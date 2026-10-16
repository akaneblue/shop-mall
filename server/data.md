## mysql - jsdb

create table product(
	id int auto_increment primary key,
    product_name varchar(30) not null,
    price int not null,
    created_at timestamp default current_timestamp
);

