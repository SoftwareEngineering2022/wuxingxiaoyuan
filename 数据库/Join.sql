USE [TradingSystem]
GO

/****** Object:  Table [dbo].[Join]    Script Date: 2022/10/19 16:05:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Join](
	[JoinId] [char](16) NOT NULL,
	[UserId] [char](12) NOT NULL,
	[ActivitiyNo] [char](4) NOT NULL,
 CONSTRAINT [PK_Join] PRIMARY KEY CLUSTERED 
(
	[JoinId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Join]  WITH CHECK ADD  CONSTRAINT [FK_Join_ActivitiyNo] FOREIGN KEY([ActivitiyNo])
REFERENCES [dbo].[DonateActivities] ([ActivitiyNo])
GO

ALTER TABLE [dbo].[Join] CHECK CONSTRAINT [FK_Join_ActivitiyNo]
GO

ALTER TABLE [dbo].[Join]  WITH CHECK ADD  CONSTRAINT [FK_Join_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO

ALTER TABLE [dbo].[Join] CHECK CONSTRAINT [FK_Join_UserId]
GO

