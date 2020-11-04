SET NAMES UTF8;
DROP DATABASE IF EXISTS yz;
CREATE DATABASE yz CHARSET=UTF8;
USE yz;


/****首页轮播图片****/
CREATE TABLE yz_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128)
);

/****商品分类****/
CREATE TABLE yz_product_type1(
  fir INT PRIMARY KEY,
  fname VARCHAR(16)
);

CREATE TABLE yz_product_type2(
  sec INT PRIMARY KEY,
  sname VARCHAR(16),
  fpt INT,
  FOREIGN KEY(fpt) REFERENCES yz_product_type1(fir)
);

CREATE TABLE yz_product_type3(
  Thi INT PRIMARY KEY AUTO_INCREMENT,
  tname VARCHAR(16),
  spt INT,
  FOREIGN KEY(spt) REFERENCES yz_product_type2(sec)
);


/****购物车****/
CREATE TABLE yz_shopcar(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32),/*用户名*/
  shid INT,/*商品id*/
  buy INT/*购买数量*/
);

/****用户信息****/
CREATE TABLE yz_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  isOnline BOOLEAN DEFAULT 0
);

/****公司****/
CREATE TABLE yz_company(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  cname VARCHAR(32),
  cimg VARCHAR(32)
);

/****商品****/
CREATE TABLE yz_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,/*商品id*/
  title VARCHAR(64),/*商品名*/
  pic VARCHAR(128),/*图片*/
  mpic VARCHAR(256),/*详情图片*/
  intr VARCHAR(128),/*介绍图片*/
  s_price DECIMAL(10,2),/*最低价*/
  l_price DECIMAL(10,2),/*最高价*/
  sale BOOLEAN,/*卖家*/
  sales INT,/*销量*/
  lastcount INT,/*库存*/
  company VARCHAR(32),/*公司*/
  listtype VARCHAR(32),/*分类*/
  listtype3 VARCHAR(32)/*分类*/
);

/*******************/
/******数据导入******/
/*******************/

/**购物车**/
INSERT INTO yz_shopcar VALUES
(NULL, '13501234567',1,1),
(NULL, '13501234567',1,2);

/**用户信息**/
INSERT INTO yz_user VALUES
(NULL, '13501234567','123456',1),
(NULL, '13501234568','123456',0),
(NULL, '13501234569','123456',0),
(NULL, '13501234560','123456',0);



/****首页轮播广告商品****/
INSERT INTO yz_index_carousel VALUES
(NULL, '../img/index/banner1.jpg'),
(NULL, '../img/index/banner2.jpg'),
(NULL, '../img/index/banner3.jpg'),
(NULL, '../img/index/banner4.jpg');

/****首页商品分类****/
INSERT INTO yz_product_type1 VALUES
(10,"备案印章"),
(20,"电子印章"),
(30,"定制印章"),
(40,"印章石材料"),
(50,"印章石周边耗材"),
(60,"印章机设备");

INSERT INTO yz_product_type2 VALUES
(11,"防伪芯片公章材料",10),
(12,"无芯片公章材料",10),
(13,"智能印章",10),
(21,"智能印章",20),
(31,"智能印章",30),
(41,"智能印章",40),
(51,"智能印章",50),
(61,"智能印章",60);

INSERT INTO yz_product_type3 VALUES
(NULL,"合成印章",11),
(null,"回墨印章",11),
(null,"水晶柄类",11),
(null,"铜印类",11),
(null,"钢印类",11),
(null,"金属类",11),
(null,"橡墨印类",11),
(null,"其他",11),
(null,"电动钢印",11),
(NULL,"合成印章",12),
(NULL,"合成印章",13),
(NULL,"合成印章",21),
(NULL,"合成印章",31),
(NULL,"合成印章",41),
(NULL,"合成印章",51),
(NULL,"合成印章",61);

/****公司****/
INSERT INTO yz_company VALUES
(NULL,"深圳市名胤信息科技有限公司",'../img/index/company1.png'),
(NULL,"日光印",'../img/index/company2.jpg'),
(NULL,"汕头市成章文具实业有限公司",'../img/index/company1.png'),
(NULL,"广州光达印章有限公司",'../img/index/company2.jpg'),
(NULL,"东莞市神光印章器材有限公司",'../img/index/company1.png'),
(NULL,"广州光达印章有限公司",'../img/index/company2.jpg');

/****商品****/
INSERT INTO yz_product VALUES
(NULL,"HXCM水晶炳-灰","../img/product/product01.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details03.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr1.jpg",37.00,45.00,0,1516,10000,"汕头市成章文具实业有限公司","防伪芯片公章材料","合成印章"),
(NULL,"HXCM水晶炳-灰","../img/product/product01.jpg","../img/product/details06.jpg|../img/product/details07.jpg|../img/product/details02.jpg|../img/product/details03.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr1.jpg",37.00,45.00,0,1235,10000,"汕头市成章文具实业有限公司","防伪芯片公章材料","合成印章"),
(NULL,"HXCM水晶炳-灰","../img/product/product01.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details03.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr1.jpg",37.00,45.00,0,1235,10000,"汕头市成章文具实业有限公司","防伪芯片公章材料","合成印章"),
(NULL,"HXCM水晶炳-灰","../img/product/product01.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details03.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr1.jpg",37.00,45.00,0,1235,10000,"汕头市成章文具实业有限公司","防伪芯片公章材料","合成印章"),
(NULL,"HXCM水晶炳-灰","../img/product/product01.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details03.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr1.jpg",37.00,45.00,0,1235,10000,"汕头市成章文具实业有限公司","防伪芯片公章材料","合成印章"),
(NULL,"HXCM水晶炳-灰","../img/product/product01.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details03.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr1.jpg",37.00,45.00,0,1235,10000,"汕头市成章文具实业有限公司","防伪芯片公章材料","合成印章"),
(NULL,"HXCM水晶炳-灰","../img/product/product01.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details03.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr1.jpg",37.00,45.00,0,1235,10000,"汕头市成章文具实业有限公司","防伪芯片公章材料","合成印章"),
(NULL,"HXCM水晶炳-灰","../img/product/product01.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details03.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr1.jpg",37.00,45.00,0,1235,10000,"汕头市成章文具实业有限公司","防伪芯片公章材料","合成印章"),

(NULL,"创业合成红(无芯片)","../img/product/product02.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",5.00,10.00,0,900,10000,"深圳市名胤信息科技有限公司","无芯片公章材料","合成印章"),
(NULL,"创业合成红(无芯片)","../img/product/product02.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",5.00,10.00,0,900,10000,"深圳市名胤信息科技有限公司","无芯片公章材料","合成印章"),
(NULL,"创业合成红(无芯片)","../img/product/product02.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",5.00,10.00,0,1900,10000,"深圳市名胤信息科技有限公司","无芯片公章材料","合成印章"),
(NULL,"创业合成红(无芯片)","../img/product/product02.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",5.00,10.00,0,900,10000,"深圳市名胤信息科技有限公司","无芯片公章材料","合成印章"),
(NULL,"创业合成红(无芯片)","../img/product/product02.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",5.00,10.00,0,900,10000,"深圳市名胤信息科技有限公司","无芯片公章材料","合成印章"),
(NULL,"创业合成红(无芯片)","../img/product/product02.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",5.00,10.00,0,900,10000,"深圳市名胤信息科技有限公司","无芯片公章材料","合成印章"),
(NULL,"创业合成红(无芯片)","../img/product/product02.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",5.00,10.00,0,900,10000,"深圳市名胤信息科技有限公司","无芯片公章材料","合成印章"),
(NULL,"创业合成红(无芯片)","../img/product/product02.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",5.00,10.00,0,900,10000,"深圳市名胤信息科技有限公司","无芯片公章材料","合成印章"),

(NULL,"日本久慈琥珀印章","../img/product/product03.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",1400.00,5000.00,1,1452,10000,"日光印","非公章材料","回墨印章"),
(NULL,"日本久慈琥珀印章","../img/product/product03.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",1400.00,5000.00,1,800,10000,"日光印","非公章材料","回墨印章"),
(NULL,"日本久慈琥珀印章","../img/product/product03.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",1400.00,5000.00,1,800,10000,"日光印","非公章材料","回墨印章"),
(NULL,"日本久慈琥珀印章","../img/product/product03.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",1400.00,5000.00,1,800,10000,"日光印","非公章材料","回墨印章"),
(NULL,"日本久慈琥珀印章","../img/product/product03.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",1400.00,5000.00,1,800,10000,"日光印","非公章材料","回墨印章"),
(NULL,"日本久慈琥珀印章","../img/product/product03.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",1400.00,5000.00,1,800,10000,"日光印","非公章材料","回墨印章"),
(NULL,"日本久慈琥珀印章","../img/product/product03.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",1400.00,5000.00,1,800,10000,"日光印","非公章材料","回墨印章"),
(NULL,"日本久慈琥珀印章","../img/product/product03.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",1400.00,5000.00,1,800,10000,"日光印","非公章材料","回墨印章"),
(NULL,"日本久慈琥珀印章","../img/product/product03.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",1400.00,5000.00,1,800,10000,"日光印","非公章材料","回墨印章"),

(NULL,"铜章定制礼品盒套装","../img/product/product04.jpg","../img/product/details01.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details05.jpg","../img/product/intr2.jpg",398.00,398.00,1,1825,10000,"日光印","耗材产品","回墨印章"),
(NULL,"铜章定制礼品盒套装","../img/product/product04.jpg","../img/product/details05.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",398.00,398.00,1,1000,10000,"日光印","耗材产品","回墨印章"),
(NULL,"铜章定制礼品盒套装","../img/product/product04.jpg","../img/product/details05.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",398.00,398.00,1,1000,10000,"日光印","耗材产品","回墨印章"),
(NULL,"铜章定制礼品盒套装","../img/product/product04.jpg","../img/product/details05.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",398.00,398.00,1,1000,10000,"日光印","耗材产品","回墨印章"),
(NULL,"铜章定制礼品盒套装","../img/product/product04.jpg","../img/product/details05.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",398.00,398.00,1,1000,10000,"日光印","耗材产品","回墨印章"),
(NULL,"铜章定制礼品盒套装","../img/product/product04.jpg","../img/product/details05.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",398.00,398.00,1,1000,10000,"日光印","耗材产品","回墨印章"),
(NULL,"铜章定制礼品盒套装","../img/product/product04.jpg","../img/product/details05.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",398.00,398.00,1,1000,10000,"日光印","耗材产品","回墨印章"),
(NULL,"铜章定制礼品盒套装","../img/product/product04.jpg","../img/product/details05.jpg|../img/product/details02.jpg|../img/product/details06.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",398.00,398.00,1,1000,10000,"日光印","耗材产品","回墨印章"),

(NULL,"神光激光刻章机","../img/product/product05.jpg","../img/product/details06.jpg|../img/product/details02.jpg|../img/product/details05.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",9500.00,9500.00,1,900,10000,"日光印","设备产品","回墨印章"),
(NULL,"神光激光刻章机","../img/product/product05.jpg","../img/product/details06.jpg|../img/product/details02.jpg|../img/product/details05.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",9500.00,9500.00,1,900,10000,"日光印","设备产品","回墨印章"),
(NULL,"神光激光刻章机","../img/product/product05.jpg","../img/product/details06.jpg|../img/product/details02.jpg|../img/product/details05.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",9500.00,9500.00,1,900,10000,"日光印","设备产品","回墨印章"),
(NULL,"神光激光刻章机","../img/product/product05.jpg","../img/product/details06.jpg|../img/product/details02.jpg|../img/product/details05.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",9500.00,9500.00,1,900,10000,"日光印","设备产品","回墨印章"),
(NULL,"神光激光刻章机","../img/product/product05.jpg","../img/product/details06.jpg|../img/product/details02.jpg|../img/product/details05.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",9500.00,9500.00,1,900,10000,"日光印","设备产品","回墨印章"),
(NULL,"神光激光刻章机","../img/product/product05.jpg","../img/product/details06.jpg|../img/product/details02.jpg|../img/product/details05.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",9500.00,9500.00,1,900,10000,"日光印","设备产品","回墨印章"),
(NULL,"神光激光刻章机","../img/product/product05.jpg","../img/product/details06.jpg|../img/product/details02.jpg|../img/product/details05.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",9500.00,9500.00,1,1600,10000,"日光印","设备产品","回墨印章"),
(NULL,"神光激光刻章机","../img/product/product05.jpg","../img/product/details06.jpg|../img/product/details02.jpg|../img/product/details05.jpg|../img/product/details04.jpg|../img/product/details07.jpg","../img/product/intr2.jpg",9500.00,9500.00,1,900,10000,"日光印","设备产品","回墨印章");