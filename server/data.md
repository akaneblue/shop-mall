## mysql - jsdb

create table product(<br>
	id int auto_increment primary key,<br>
    product_name varchar(30) not null,<br>
    price int not null,<br>
    created_at timestamp default current_timestamp<br>
);

