SET NAMES UTF8;
DROP DATABASE IF EXISTS yw;
CREATE DATABASE yw CHARSET=UTF8;
USE yw;


/****轮播图片****/
CREATE TABLE yw_banner(
  bid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128)
);

INSERT INTO yw_banner VALUES
	(null,"/img/banner/first.jpg"),
	(null,"/img/banner/second.jpg"),
	(null,"/img/banner/third.jpg");

/****商品分类****/
/*一级*/
CREATE TABLE yw_product_group(
  gid INT PRIMARY KEY,
  gname VARCHAR(16),
  img VARCHAR(40),
  color VARCHAR(15)
);
INSERT INTO yw_product_group VALUES
  (1,'儿童玩具','/img/classify/play.png','#f96'),
  (2,'日用百货','/img/classify/multi.png','#6cf'),
  (3,'夏季热卖','/img/classify/hotsale.png','#3c9'),
  (4,'饰品头饰','/img/classify/change.png','#f9c'),
  (5,'五金工具','/img/classify/tool.png','#cc6'),
  (6,'学习用品','/img/classify/study.png',"#6cc"),
  (7,'厨房用品','/img/classify/kitchen.png','#cc9'),
  (8,'电池手电','/img/classify/energy.png','#9cf'),
(9,'冬季热卖','/img/classify/hotsale.png','#3c9');

/*二级*/
CREATE TABLE yw_product_classify(
  yid INT PRIMARY KEY,
  yname VARCHAR(16),
  groupid INT,
  FOREIGN KEY(groupid) REFERENCES yw_product_group(gid)
);
INSERT INTO yw_product_classify VALUES
  (1,'儿童玩具',1),
  (2,'摇铃玩具',1),
  (3,'童年回忆',1),
  (4,'风车泡泡水',1),
  (5,'日用百货',2),
  (6,'夏季热卖',3),
  (7,'皮筋',4),
  (8,'发箍',4),
  (9,'剪刀系列',5),
  (10,'学习用品',6),
  (11,'碗筷餐具',7),
  (12,'手电筒系列',8),
  (16,'电池系列',8),
  (13,'鞋垫袜子',9),
  (14,'袖套口罩手套',9),
(15,'冬季爆款面霜',9);


/****用户信息****/
CREATE TABLE yw_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32) UNIQUE,
  upwd VARCHAR(32),
	avatar VARCHAR(64)
);
INSERT INTO yw_user VALUES
	(null,18801234567,12345678,'/img/avatar/98d39b30-e6c2-11ea-b1b7-cfa3d6e0047f.png'),
	(null,18801234560,12345678,'');

/****购物车****/
CREATE TABLE yw_shopcar(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32),/*用户名*/
  prid INT,/*商品id*/
  buy INT/*购买数量*/
	/* FOREIGN KEY(prid) REFERENCES yw_product(pid)*/
);
INSERT INTO yw_shopcar VALUES
	(null,18801234567,1,120),
	(null,18801234567,10,120),
	(null,18801234562,1,120),
	(null,18801234562,25,120),
	(null,18801234562,65,120),
	(null,18801234562,57,120),
	(null,18801234567,17,120),
	(null,18801234567,39,120);


/****商品****/
CREATE TABLE yw_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,/*商品id*/
  title VARCHAR(64),/*商品名*/
  pic VARCHAR(128),/*图片*/
  pics VARCHAR(256),/*展示图片*/
  intr VARCHAR(128),/*详情图片*/
  price DECIMAL(4,2),/*价格*/
  lowest TINYINT,/*最低购买数量*/
  sales INT,/*销量*/
  stock INT,/*库存*/
  readtimes INT,/*浏览次数*/
  either BOOLEAN,/*分类二*/
  classifyid INT,/*分类*/
  FOREIGN KEY(classifyid) REFERENCES yw_product_classify(yid)

);



INSERT INTO yw_product VALUES
  (null,'碎花蕾丝毛巾圈 网红同款小肠发圈 一元店货源批发','/img/products/0001.jpg','/img/products/0001_01.jpg|/img/products/0001_02.jpg|/img/products/0001_03.jpg','/img/products/0001d.png',0.38,100,8579,45771,625455,1,8),
  (null,'碎花蕾丝毛巾圈 网红同款小肠发圈 一元店货源批发','/img/products/0001.jpg','/img/products/0001_01.jpg|/img/products/0001_02.jpg|/img/products/0001_03.jpg','/img/products/0001d.png',0.38,100,100,45771,625455,1,8),
  (null,'碎花蕾丝毛巾圈 网红同款小肠发圈 一元店货源批发','/img/products/0001.jpg','/img/products/0001_01.jpg|/img/products/0001_02.jpg|/img/products/0001_03.jpg','/img/products/0001d.png',0.38,100,100,45771,625455,1,8),
  (null,'碎花蕾丝毛巾圈 网红同款小肠发圈 一元店货源批发','/img/products/0001.jpg','/img/products/0001_01.jpg|/img/products/0001_02.jpg|/img/products/0001_03.jpg','/img/products/0001d.png',0.38,100,100,45771,625455,1,8),
  (null,'碎花蕾丝毛巾圈 网红同款小肠发圈 一元店货源批发','/img/products/0001.jpg','/img/products/0001_01.jpg|/img/products/0001_02.jpg|/img/products/0001_03.jpg','/img/products/0001d.png',0.38,100,100,45771,625455,1,8),
  (null,'碎花蕾丝毛巾圈 网红同款小肠发圈 一元店货源批发','/img/products/0001.jpg','/img/products/0001_01.jpg|/img/products/0001_02.jpg|/img/products/0001_03.jpg','/img/products/0001d.png',0.38,100,100,45771,625455,1,8),
  (null,'碎花蕾丝毛巾圈 网红同款小肠发圈 一元店货源批发','/img/products/0001.jpg','/img/products/0001_01.jpg|/img/products/0001_02.jpg|/img/products/0001_03.jpg','/img/products/0001d.png',0.38,100,100,45771,625455,1,8),
  (null,'碎花蕾丝毛巾圈 网红同款小肠发圈 一元店货源批发','/img/products/0001.jpg','/img/products/0001_01.jpg|/img/products/0001_02.jpg|/img/products/0001_03.jpg','/img/products/0001d.png',0.38,100,100,45771,625455,1,8),

  (null,'6寸黑色剪刀 14厘米学生剪刀 散装 1元店货源','/img/products/0002.jpg','/img/products/0002_01.jpg|/img/products/0002_02.jpg|/img/products/0002_03.jpg','/img/products/0002d.png',0.61,20,5633,13623,622587,1,9),
  (null,'6寸黑色剪刀 14厘米学生剪刀 散装 1元店货源','/img/products/0002.jpg','/img/products/0002_01.jpg|/img/products/0002_02.jpg|/img/products/0002_03.jpg','/img/products/0002d.png',0.61,20,133,13623,622587,1,9),
  (null,'6寸黑色剪刀 14厘米学生剪刀 散装 1元店货源','/img/products/0002.jpg','/img/products/0002_01.jpg|/img/products/0002_02.jpg|/img/products/0002_03.jpg','/img/products/0002d.png',0.61,20,133,13623,622587,1,9),
  (null,'6寸黑色剪刀 14厘米学生剪刀 散装 1元店货源','/img/products/0002.jpg','/img/products/0002_01.jpg|/img/products/0002_02.jpg|/img/products/0002_03.jpg','/img/products/0002d.png',0.61,20,133,13623,622587,1,9),
  (null,'6寸黑色剪刀 14厘米学生剪刀 散装 1元店货源','/img/products/0002.jpg','/img/products/0002_01.jpg|/img/products/0002_02.jpg|/img/products/0002_03.jpg','/img/products/0002d.png',0.61,20,133,13623,622587,1,9),
  (null,'6寸黑色剪刀 14厘米学生剪刀 散装 1元店货源','/img/products/0002.jpg','/img/products/0002_01.jpg|/img/products/0002_02.jpg|/img/products/0002_03.jpg','/img/products/0002d.png',0.61,20,133,13623,622587,1,9),
  (null,'6寸黑色剪刀 14厘米学生剪刀 散装 1元店货源','/img/products/0002.jpg','/img/products/0002_01.jpg|/img/products/0002_02.jpg|/img/products/0002_03.jpg','/img/products/0002d.png',0.61,20,133,13623,622587,1,9),
  (null,'6寸黑色剪刀 14厘米学生剪刀 散装 1元店货源','/img/products/0002.jpg','/img/products/0002_01.jpg|/img/products/0002_02.jpg|/img/products/0002_03.jpg','/img/products/0002d.png',0.61,20,133,13623,622587,1,9),

  (null,'哨子风车玩具 笛子风车 可以吹响的风车 一元店地摊货源批发','/img/products/0003.jpg','/img/products/0003_01.jpg|/img/products/0003_02.jpg|/img/products/0003_03.jpg|/img/products/0003_04.jpg','/img/products/0003d.png',0.80,20,8133,36521,623498,1,1),
  (null,'哨子风车玩具 笛子风车 可以吹响的风车 一元店地摊货源批发','/img/products/0003.jpg','/img/products/0003_01.jpg|/img/products/0003_02.jpg|/img/products/0003_03.jpg|/img/products/0003_04.jpg','/img/products/0003d.png',0.80,20,130,36521,623498,1,1),
  (null,'哨子风车玩具 笛子风车 可以吹响的风车 一元店地摊货源批发','/img/products/0003.jpg','/img/products/0003_01.jpg|/img/products/0003_02.jpg|/img/products/0003_03.jpg|/img/products/0003_04.jpg','/img/products/0003d.png',0.80,20,130,36521,623498,1,1),
  (null,'哨子风车玩具 笛子风车 可以吹响的风车 一元店地摊货源批发','/img/products/0003.jpg','/img/products/0003_01.jpg|/img/products/0003_02.jpg|/img/products/0003_03.jpg|/img/products/0003_04.jpg','/img/products/0003d.png',0.80,20,130,36521,623498,1,1),
  (null,'哨子风车玩具 笛子风车 可以吹响的风车 一元店地摊货源批发','/img/products/0003.jpg','/img/products/0003_01.jpg|/img/products/0003_02.jpg|/img/products/0003_03.jpg|/img/products/0003_04.jpg','/img/products/0003d.png',0.80,20,130,36521,623498,1,1),
  (null,'哨子风车玩具 笛子风车 可以吹响的风车 一元店地摊货源批发','/img/products/0003.jpg','/img/products/0003_01.jpg|/img/products/0003_02.jpg|/img/products/0003_03.jpg|/img/products/0003_04.jpg','/img/products/0003d.png',0.80,20,130,36521,623498,1,1),
  (null,'哨子风车玩具 笛子风车 可以吹响的风车 一元店地摊货源批发','/img/products/0003.jpg','/img/products/0003_01.jpg|/img/products/0003_02.jpg|/img/products/0003_03.jpg|/img/products/0003_04.jpg','/img/products/0003d.png',0.80,20,130,36521,623498,1,1),
  (null,'哨子风车玩具 笛子风车 可以吹响的风车 一元店地摊货源批发','/img/products/0003.jpg','/img/products/0003_01.jpg|/img/products/0003_02.jpg|/img/products/0003_03.jpg|/img/products/0003_04.jpg','/img/products/0003d.png',0.80,20,130,36521,623498,1,1),
  (null,'哨子风车玩具 笛子风车 可以吹响的风车 一元店地摊货源批发','/img/products/0003.jpg','/img/products/0003_01.jpg|/img/products/0003_02.jpg|/img/products/0003_03.jpg|/img/products/0003_04.jpg','/img/products/0003d.png',0.80,20,130,36521,623498,1,1),

  (null,'蚊香盘 带钉大子号蚊香座 蚊香架 蚊香托 蚊香支架一元货源批发','/img/products/0004.jpg','/img/products/0004_01.jpg|/img/products/0004_02.jpg|/img/products/0004_03.jpg|/img/products/0004_04.jpg','/img/products/0004d.png',0.48,50,9773,38215,605467,1,6),
  (null,'蚊香盘 带钉大子号蚊香座 蚊香架 蚊香托 蚊香支架一元货源批发','/img/products/0004.jpg','/img/products/0004_01.jpg|/img/products/0004_02.jpg|/img/products/0004_03.jpg|/img/products/0004_04.jpg','/img/products/0004d.png',0.48,50,97,38215,605467,1,6),
  (null,'蚊香盘 带钉大子号蚊香座 蚊香架 蚊香托 蚊香支架一元货源批发','/img/products/0004.jpg','/img/products/0004_01.jpg|/img/products/0004_02.jpg|/img/products/0004_03.jpg|/img/products/0004_04.jpg','/img/products/0004d.png',0.48,50,97,38215,605467,1,6),
  (null,'蚊香盘 带钉大子号蚊香座 蚊香架 蚊香托 蚊香支架一元货源批发','/img/products/0004.jpg','/img/products/0004_01.jpg|/img/products/0004_02.jpg|/img/products/0004_03.jpg|/img/products/0004_04.jpg','/img/products/0004d.png',0.48,50,97,38215,605467,1,6),
  (null,'蚊香盘 带钉大子号蚊香座 蚊香架 蚊香托 蚊香支架一元货源批发','/img/products/0004.jpg','/img/products/0004_01.jpg|/img/products/0004_02.jpg|/img/products/0004_03.jpg|/img/products/0004_04.jpg','/img/products/0004d.png',0.48,50,97,38215,605467,1,6),
  (null,'蚊香盘 带钉大子号蚊香座 蚊香架 蚊香托 蚊香支架一元货源批发','/img/products/0004.jpg','/img/products/0004_01.jpg|/img/products/0004_02.jpg|/img/products/0004_03.jpg|/img/products/0004_04.jpg','/img/products/0004d.png',0.48,50,97,38215,605467,1,6),
  (null,'蚊香盘 带钉大子号蚊香座 蚊香架 蚊香托 蚊香支架一元货源批发','/img/products/0004.jpg','/img/products/0004_01.jpg|/img/products/0004_02.jpg|/img/products/0004_03.jpg|/img/products/0004_04.jpg','/img/products/0004d.png',0.48,50,97,38215,605467,1,6),
  (null,'蚊香盘 带钉大子号蚊香座 蚊香架 蚊香托 蚊香支架一元货源批发','/img/products/0004.jpg','/img/products/0004_01.jpg|/img/products/0004_02.jpg|/img/products/0004_03.jpg|/img/products/0004_04.jpg','/img/products/0004d.png',0.48,50,97,38215,605467,1,6),

  (null,'玻璃烟灰缸家居烟缸 居家用品  一元两元店货源百货地摊货源','/img/products/0005.jpg','/img/products/0005_01.jpg|/img/products/0005_02.jpg|/img/products/0005_03.jpg|/img/products/0005_04.jpg','/img/products/0005d.png',0.80,108,11518,30295,46150,1,5),
  (null,'玻璃烟灰缸家居烟缸 居家用品  一元两元店货源百货地摊货源','/img/products/0005.jpg','/img/products/0005_01.jpg|/img/products/0005_02.jpg|/img/products/0005_03.jpg|/img/products/0005_04.jpg','/img/products/0005d.png',0.80,108,115,30295,46150,1,5),
  (null,'玻璃烟灰缸家居烟缸 居家用品  一元两元店货源百货地摊货源','/img/products/0005.jpg','/img/products/0005_01.jpg|/img/products/0005_02.jpg|/img/products/0005_03.jpg|/img/products/0005_04.jpg','/img/products/0005d.png',0.80,108,115,30295,46150,1,5),
  (null,'玻璃烟灰缸家居烟缸 居家用品  一元两元店货源百货地摊货源','/img/products/0005.jpg','/img/products/0005_01.jpg|/img/products/0005_02.jpg|/img/products/0005_03.jpg|/img/products/0005_04.jpg','/img/products/0005d.png',0.80,108,115,30295,46150,1,5),
  (null,'玻璃烟灰缸家居烟缸 居家用品  一元两元店货源百货地摊货源','/img/products/0005.jpg','/img/products/0005_01.jpg|/img/products/0005_02.jpg|/img/products/0005_03.jpg|/img/products/0005_04.jpg','/img/products/0005d.png',0.80,108,115,30295,46150,1,5),
  (null,'玻璃烟灰缸家居烟缸 居家用品  一元两元店货源百货地摊货源','/img/products/0005.jpg','/img/products/0005_01.jpg|/img/products/0005_02.jpg|/img/products/0005_03.jpg|/img/products/0005_04.jpg','/img/products/0005d.png',0.80,108,115,30295,46150,1,5),
  (null,'玻璃烟灰缸家居烟缸 居家用品  一元两元店货源百货地摊货源','/img/products/0005.jpg','/img/products/0005_01.jpg|/img/products/0005_02.jpg|/img/products/0005_03.jpg|/img/products/0005_04.jpg','/img/products/0005d.png',0.80,108,115,30295,46150,1,5),
  (null,'玻璃烟灰缸家居烟缸 居家用品  一元两元店货源百货地摊货源','/img/products/0005.jpg','/img/products/0005_01.jpg|/img/products/0005_02.jpg|/img/products/0005_03.jpg|/img/products/0005_04.jpg','/img/products/0005d.png',0.80,108,115,30295,46150,1,5),

  (null,'特厚仿皮电话本笔记本  足60页笔记本 一元店地摊货源批发','/img/products/0006.jpg','/img/products/0006_01.jpg|/img/products/0006_02.jpg|/img/products/0006_03.jpg|/img/products/0006_04.jpg','/img/products/0006d.png',0.76,24,11276,73899,623626,1,10),
  (null,'特厚仿皮电话本笔记本  足60页笔记本 一元店地摊货源批发','/img/products/0006.jpg','/img/products/0006_01.jpg|/img/products/0006_02.jpg|/img/products/0006_03.jpg|/img/products/0006_04.jpg','/img/products/0006d.png',0.76,24,99,73899,623626,1,10),
  (null,'特厚仿皮电话本笔记本  足60页笔记本 一元店地摊货源批发','/img/products/0006.jpg','/img/products/0006_01.jpg|/img/products/0006_02.jpg|/img/products/0006_03.jpg|/img/products/0006_04.jpg','/img/products/0006d.png',0.76,24,99,73899,623626,1,10),
  (null,'特厚仿皮电话本笔记本  足60页笔记本 一元店地摊货源批发','/img/products/0006.jpg','/img/products/0006_01.jpg|/img/products/0006_02.jpg|/img/products/0006_03.jpg|/img/products/0006_04.jpg','/img/products/0006d.png',0.76,24,99,73899,623626,1,10),
  (null,'特厚仿皮电话本笔记本  足60页笔记本 一元店地摊货源批发','/img/products/0006.jpg','/img/products/0006_01.jpg|/img/products/0006_02.jpg|/img/products/0006_03.jpg|/img/products/0006_04.jpg','/img/products/0006d.png',0.76,24,99,73899,623626,1,10),
  (null,'特厚仿皮电话本笔记本  足60页笔记本 一元店地摊货源批发','/img/products/0006.jpg','/img/products/0006_01.jpg|/img/products/0006_02.jpg|/img/products/0006_03.jpg|/img/products/0006_04.jpg','/img/products/0006d.png',0.76,24,99,73899,623626,1,10),
  (null,'特厚仿皮电话本笔记本  足60页笔记本 一元店地摊货源批发','/img/products/0006.jpg','/img/products/0006_01.jpg|/img/products/0006_02.jpg|/img/products/0006_03.jpg|/img/products/0006_04.jpg','/img/products/0006d.png',0.76,24,99,73899,623626,1,10),
  (null,'特厚仿皮电话本笔记本  足60页笔记本 一元店地摊货源批发','/img/products/0006.jpg','/img/products/0006_01.jpg|/img/products/0006_02.jpg|/img/products/0006_03.jpg|/img/products/0006_04.jpg','/img/products/0006d.png',0.76,24,99,73899,623626,1,10),

  (null,'一元5双火锅筷 家用筷子公筷 厨房用品酒店筷 一元两元店百货批发','/img/products/0007.jpg','/img/products/0007_01.jpg|/img/products/0007_02.jpg|/img/products/0007_03.jpg|/img/products/0007_04.jpg','/img/products/0007d.png',0.68,20,3015,57353,526750,0,11),
  (null,'一元5双火锅筷 家用筷子公筷 厨房用品酒店筷 一元两元店百货批发','/img/products/0007.jpg','/img/products/0007_01.jpg|/img/products/0007_02.jpg|/img/products/0007_03.jpg|/img/products/0007_04.jpg','/img/products/0007d.png',0.68,20,125,57353,526750,0,11),
  (null,'一元5双火锅筷 家用筷子公筷 厨房用品酒店筷 一元两元店百货批发','/img/products/0007.jpg','/img/products/0007_01.jpg|/img/products/0007_02.jpg|/img/products/0007_03.jpg|/img/products/0007_04.jpg','/img/products/0007d.png',0.68,20,125,57353,526750,0,11),
  (null,'一元5双火锅筷 家用筷子公筷 厨房用品酒店筷 一元两元店百货批发','/img/products/0007.jpg','/img/products/0007_01.jpg|/img/products/0007_02.jpg|/img/products/0007_03.jpg|/img/products/0007_04.jpg','/img/products/0007d.png',0.68,20,125,57353,526750,0,11),
  (null,'一元5双火锅筷 家用筷子公筷 厨房用品酒店筷 一元两元店百货批发','/img/products/0007.jpg','/img/products/0007_01.jpg|/img/products/0007_02.jpg|/img/products/0007_03.jpg|/img/products/0007_04.jpg','/img/products/0007d.png',0.68,20,125,57353,526750,0,11),
  (null,'一元5双火锅筷 家用筷子公筷 厨房用品酒店筷 一元两元店百货批发','/img/products/0007.jpg','/img/products/0007_01.jpg|/img/products/0007_02.jpg|/img/products/0007_03.jpg|/img/products/0007_04.jpg','/img/products/0007d.png',0.68,20,125,57353,526750,0,11),
  (null,'一元5双火锅筷 家用筷子公筷 厨房用品酒店筷 一元两元店百货批发','/img/products/0007.jpg','/img/products/0007_01.jpg|/img/products/0007_02.jpg|/img/products/0007_03.jpg|/img/products/0007_04.jpg','/img/products/0007d.png',0.68,20,125,57353,526750,0,11),
  (null,'一元5双火锅筷 家用筷子公筷 厨房用品酒店筷 一元两元店百货批发','/img/products/0007.jpg','/img/products/0007_01.jpg|/img/products/0007_02.jpg|/img/products/0007_03.jpg|/img/products/0007_04.jpg','/img/products/0007d.png',0.68,20,125,57353,526750,0,11),

  (null,'中超卡装7号电池卡装电子 空调遥控器电池地摊货源','/img/products/0008.jpg','/img/products/0008_01.jpg|/img/products/0008_02.jpg|/img/products/0008_03.jpg','/img/products/0008d.png',0.64,30,3891,59476,534885,1,16),
  (null,'中超卡装7号电池卡装电子 空调遥控器电池地摊货源','/img/products/0008.jpg','/img/products/0008_01.jpg|/img/products/0008_02.jpg|/img/products/0008_03.jpg','/img/products/0008d.png',0.64,30,91,59476,534885,1,16),
  (null,'中超卡装7号电池卡装电子 空调遥控器电池地摊货源','/img/products/0008.jpg','/img/products/0008_01.jpg|/img/products/0008_02.jpg|/img/products/0008_03.jpg','/img/products/0008d.png',0.64,30,91,59476,534885,1,16),
  (null,'中超卡装7号电池卡装电子 空调遥控器电池地摊货源','/img/products/0008.jpg','/img/products/0008_01.jpg|/img/products/0008_02.jpg|/img/products/0008_03.jpg','/img/products/0008d.png',0.64,30,91,59476,534885,1,16),
  (null,'中超卡装7号电池卡装电子 空调遥控器电池地摊货源','/img/products/0008.jpg','/img/products/0008_01.jpg|/img/products/0008_02.jpg|/img/products/0008_03.jpg','/img/products/0008d.png',0.64,30,91,59476,534885,1,16),
  (null,'中超卡装7号电池卡装电子 空调遥控器电池地摊货源','/img/products/0008.jpg','/img/products/0008_01.jpg|/img/products/0008_02.jpg|/img/products/0008_03.jpg','/img/products/0008d.png',0.64,30,91,59476,534885,1,16),
  (null,'中超卡装7号电池卡装电子 空调遥控器电池地摊货源','/img/products/0008.jpg','/img/products/0008_01.jpg|/img/products/0008_02.jpg|/img/products/0008_03.jpg','/img/products/0008d.png',0.64,30,91,59476,534885,1,16),
  (null,'中超卡装7号电池卡装电子 空调遥控器电池地摊货源','/img/products/0008.jpg','/img/products/0008_01.jpg|/img/products/0008_02.jpg|/img/products/0008_03.jpg','/img/products/0008d.png',0.64,30,91,59476,534885,1,16),

(null,'玻璃烟灰缸家居烟缸 居家用品  一元两元店货源百货地摊货源','/img/products/0009.jpg','/img/products/0009_01.jpg|/img/products/0009_02.jpg|/img/products/0009_03.jpg|/img/products/0009_04.jpg','/img/products/0009d.png',0.67,24,2680,52738,530948,1,14);