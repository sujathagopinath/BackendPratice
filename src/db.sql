use backendhapi

create table Users(
userId int primary key identity(1,1),
Name varchar(50),
Email varchar(50),
Password varchar(max),
);

select * from Users
------------------------------------------------
SET XACT_ABORT ON;
BEGIN TRAN
GO 

create procedure [dbo].[spcreate]
(@Name VARCHAR(50), @Email VARCHAR(50), @Password VARCHAR(MAX))
AS

SET NOCOUNT ON
IF NOT EXISTS (Select Email from Users where Email = @Email)
BEGIN
INSERT into Users values(@Name,@Email,@Password)
select Name, Email  from Users  where Email = @Email 
END
SET NOCOUNT OFF
RETURN 
GO
COMMIT TRAN
SET XACT_ABORT OFF;
GO
----------------------------------------------------------------------




