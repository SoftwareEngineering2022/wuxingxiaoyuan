USE [TradingSystem]
GO

/****** Object:  Table [dbo].[Orders]    Script Date: 2022/10/19 16:03:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Orders](
	[OrderNo] [char](8) NOT NULL,
	[GoodsNo] [char](12) NOT NULL,
	[GoodsCategory] [char](4) NULL,
	[OrderStatus] [char](6) NULL,
	[OrderTime] [datetime] NULL,
	[ReceiverUserId] [char](12) NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[OrderNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Goods] FOREIGN KEY([GoodsNo])
REFERENCES [dbo].[Goods] ([GoodsNo])
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Goods]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_User] FOREIGN KEY([ReceiverUserId])
REFERENCES [dbo].[User] ([UserId])
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_User]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [CK_Orders_GoodsCategory] CHECK  (([GoodsCategory]='购买' OR [GoodsCategory]='置换'))
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [CK_Orders_GoodsCategory]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [CK_Orders_OrderStatus] CHECK  (([OrderStatus]='待支付' OR [OrderStatus]='待同意' OR [OrderStatus]='待收货' OR [OrderStatus]='已完成' OR [OrderStatus]='已取消'))
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [CK_Orders_OrderStatus]
GO

