USE [TradingSystem]
GO

/****** Object:  Table [dbo].[DonationDetails]    Script Date: 2022/10/19 16:06:27 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DonationDetails](
	[DetailsNo] [char](8) NOT NULL,
	[GoodsNo] [char](12) NULL,
	[ActivitiyNo] [char](4) NOT NULL,
	[JoinId] [char](16) NOT NULL,
 CONSTRAINT [PK_DonationDetails] PRIMARY KEY CLUSTERED 
(
	[DetailsNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[DonationDetails]  WITH CHECK ADD  CONSTRAINT [FK_DonationDetails_GoodsNo] FOREIGN KEY([GoodsNo])
REFERENCES [dbo].[Goods] ([GoodsNo])
GO

ALTER TABLE [dbo].[DonationDetails] CHECK CONSTRAINT [FK_DonationDetails_GoodsNo]
GO

ALTER TABLE [dbo].[DonationDetails]  WITH CHECK ADD  CONSTRAINT [FK_DonationDetails_JoinId] FOREIGN KEY([JoinId])
REFERENCES [dbo].[Join] ([JoinId])
GO

ALTER TABLE [dbo].[DonationDetails] CHECK CONSTRAINT [FK_DonationDetails_JoinId]
GO

