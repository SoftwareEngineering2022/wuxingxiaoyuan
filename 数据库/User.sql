USE [TradingSystem]
GO

/****** Object:  Table [dbo].[User]    Script Date: 2022/10/19 16:00:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[User](
	[UserId] [char](12) NOT NULL,
	[UserName] [nchar](16) NOT NULL,
	[Contact] [varchar](32) NULL,
	[Area] [char](32) NULL,
	[School] [char](32) NULL,
	[Role] [char](4) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [CK_User] CHECK  (([Role]='买家' OR [Role]='卖家'))
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [CK_User]
GO

