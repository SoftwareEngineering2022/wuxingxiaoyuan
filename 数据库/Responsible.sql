USE [TradingSystem]
GO

/****** Object:  Table [dbo].[Responsible]    Script Date: 2022/10/19 16:04:20 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Responsible](
	[ResponsibleId] [char](2) NOT NULL,
	[ResponsibleName] [char](10) NOT NULL,
 CONSTRAINT [PK_Responsible] PRIMARY KEY CLUSTERED 
(
	[ResponsibleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

