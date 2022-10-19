USE [TradingSystem]
GO

/****** Object:  Table [dbo].[DonateActivities]    Script Date: 2022/10/19 16:05:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DonateActivities](
	[ActivitiyNo] [char](4) NOT NULL,
	[ActivityName] [char](32) NOT NULL,
	[ActivityCategory] [char](32) NULL,
	[StartTime] [datetime] NOT NULL,
	[EndTime] [datetime] NULL,
	[ResponsibleId] [char](2) NULL,
 CONSTRAINT [PK_DonateActivities] PRIMARY KEY CLUSTERED 
(
	[ActivitiyNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[DonateActivities]  WITH CHECK ADD  CONSTRAINT [FK_DonateActivities_ResponsibleId] FOREIGN KEY([ResponsibleId])
REFERENCES [dbo].[Responsible] ([ResponsibleId])
GO

ALTER TABLE [dbo].[DonateActivities] CHECK CONSTRAINT [FK_DonateActivities_ResponsibleId]
GO

