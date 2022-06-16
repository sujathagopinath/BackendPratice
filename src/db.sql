use backendhapi

create table Users
(
    userId int primary key identity(1,1),

name varchar
(50),
    email varchar
(50),
    password varchar
(max),
);

select * from Users
------------------------------------------------
SET XACT_ABORT ON;
BEGIN TRAN
GO 

create procedure [dbo].[spcreateuser]
(

@name VARCHAR
(50), @email VARCHAR
(50), @password VARCHAR
(MAX)
)
AS

SET NOCOUNT ON

IF NOT EXISTS (Select email
from Users
where email = @email)
            BEGIN

INSERT into Users
values(@name, @email, @password)
SELECT name, email
from Users
where email = @email
END
SET NOCOUNT OFF
RETURN 
GO
COMMIT TRAN
SET XACT_ABORT OFF;
GO
----------------------------------------------------------------------
SET XACT_ABORT ON;
BEGIN TRAN
GO 

create procedure [dbo].[sploginuser]
(

@email VARCHAR
(50) 
)
AS

SET NOCOUNT ON

IF  EXISTS (Select email
from Users
where  email = @email )
        SELECT userId, email, password
from Users
where email = @email
SET NOCOUNT OFF
RETURN 
GO
COMMIT TRAN
SET XACT_ABORT OFF;
GO
---------------------------------------------------------------
SET XACT_ABORT ON;
BEGIN TRAN 
GO

create procedure [dbo].[spgetuser]
(
    @userId Int
)
AS

SET NOCOUNT ON

SELECT name, email
from Users
where userId = @userId
SET NOCOUNT OFF
RETURN
GO
COMMIT TRAN
SET XACT_ABORT OFF;
GO


