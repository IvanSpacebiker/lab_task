create table readers (
    readerid int generated always as identity primary key not null, 
    readername varchar(100) not null, 
    readersurname varchar(100) not null
    );
create table books (
    bookid int generated always as identity primary key not null, 
    booktitle varchar(100) not null, 
    bookauthor varchar(100) not null
    );
create table events (
    eventid int generated always as identity primary key not null, 
    eventtype varchar(100) not null, 
    eventtime timestamp not null, 
    bookid int not null, 
    readerid int not null
    );
insert into readers (readername, readersurname) values ('John', 'Snow'), ('Bilbo', 'Baggins');
insert into books (booktitle, bookauthor) values ('Witcher', 'Sapkovsky'), ('Hobbit', 'Tolkien');