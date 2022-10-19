USE [TradingSystem]
GO

/****** Object:  Table [dbo].[Goods]    Script Date: 2022/10/19 16:02:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Goods](
	[GoodsNo] [char](12) NOT NULL,
	[GoodsCategory] [nchar](20) NULL,
	[TradingMethod] [char](10) NULL,
	[Price] [float] NULL,
	[UseDegree] [nvarchar](32) NULL,
	[OwnerId] [char](12) NOT NULL,
 CONSTRAINT [PK_Goods] PRIMARY KEY CLUSTERED 
(
	[GoodsNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Goods]  WITH CHECK ADD  CONSTRAINT [FK_Goods_OwnerId] FOREIGN KEY([OwnerId])
REFERENCES [dbo].[User] ([UserId])
GO

ALTER TABLE [dbo].[Goods] CHECK CONSTRAINT [FK_Goods_OwnerId]
GO

ALTER TABLE [dbo].[Goods]  WITH CHECK ADD  CONSTRAINT [CK_Goods_Price] CHECK  (([Price]>=(0)))
GO

ALTER TABLE [dbo].[Goods] CHECK CONSTRAINT [CK_Goods_Price]
GO

ALTER TABLE [dbo].[Goods]  WITH CHECK ADD  CONSTRAINT [CK_Goods_TradingMethod] CHECK  (([TradingMethod]='可买' OR [TradingMethod]='可换' OR [TradingMethod]='可买且可换'))
GO

ALTER TABLE [dbo].[Goods] CHECK CONSTRAINT [CK_Goods_TradingMethod]
GO

