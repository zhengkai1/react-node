create database bhxsr_gw;
drop table article;
drop table home_banner;
drop table users;
select * from user_login;

create table article(
	id int primary key auto_increment, 
    title char(128), /**文章标题*/
    cover varchar(255), /**封面图地址*/
    content text, /**文章内容*/
    see int, /**文章阅读数*/
    collect int, /**收藏数*/
    create_time timestamp not null default current_timestamp,
    update_time timestamp null default current_timestamp on update current_timestamp
);
create table home_banner(
	id int primary key auto_increment,
    mark varchar(255), /**描述*/
    url varchar(255), /**图片路径*/
    target varchar(255), /**跳转地址*/
    create_time timestamp not null default current_timestamp,
    update_time timestamp null default current_timestamp on update current_timestamp
);
create table data_base(
	id int primary key auto_increment,
    prev_id int, /**父id*/
    name varchar(20), /**字段名*/
    foreign key(prev_id) references data_base(id)
);
create table user_login(
	id int primary key auto_increment,
    username varchar(255), /**用户名*/
    password varchar(255), /**密码*/
    status tinyint, /**账号状态*/
    atten_status tinyint, /**关注状态 0 未关注 1 关注*/
    role tinyint, /**角色 1 管理员 2普通*/
    reg_time timestamp not null default current_timestamp
);
create table user_info(
	uid int primary key,
    wec_id varchar(255), /**关联的微信id*/
    group_id int, /**分组id*/
	avatar varchar(255), /**头像*/
    email varchar(255), /**邮箱*/
    realname varchar(255), /**真实姓名*/
    birthday datetime, /**生日*/
    id_type int, /**证件类型*/
    id_num varchar(255), /**证件号*/
    phone varchar(255), /**手机*/
    address varchar(255), /**地址*/
    description varchar(255), /**备注*/
    agent_lvl int, /**代理等级*/
    agent_integral int, /**代理积分*/
    agent_integral_max int, /**积分上限*/
    agent_balance int, /**代理账户余额*/
    ref_id int, /**上级代理id*/
    update_time timestamp null default current_timestamp on update current_timestamp,
    foreign key(uid) references user_login(id),
    foreign key(ref_id) references user_info(uid),
    foreign key(group_id) references data_base(id)
);
create table product(
	id int primary key auto_increment,
    name varchar(255), /**商品名称*/
    code varchar(255), /**商品编号*/
    shop_id int, /**店铺id*/
    market_price decimal(11,2) default 0.00, /**市场价*/
    shop_price decimal(11,2) default 0.00, /**售价*/
    cost_price decimal(11,2) default 0.00, /**成本价*/
    stock int, /**库存*/
    unit char(10), /**单位*/
    tips text, /**促销信息*/
    is_sale tinyint default 1, /**是否上架 0 下架 1 上架*/
    is_best tinyint default 0, /**是否精品*/
    is_hot tinyint default 0, /**是否热销*/
    is_new tinyint default 0, /**是否新品*/
    is_recom tinyint default 0, /**是否推荐*/
    sale_type tinyint default 1, /**销售方式 1 零售 2 批发*/
    catid_path varchar(255), /**分类路径*/
    catid int, /**末级商品分类id*/
    brand_id int, /**品牌id*/
	description text, /**商品描述*/
    status tinyint default 0, /**商品状态 -2 已删除 -1 未通过 0 未审核 1 审核*/
	sale_num int, /**销售数量*/
    sale_time timestamp, /**上架时间*/
    visit_num int default 0, /**访问数*/
    appraise_num int default 0, /**评价数*/
    is_spec tinyint default 0, /**是否有规格*/
    is_free_ship tinyint default 0, /**是否包邮*/
    ship_type tinyint, /**计价方式*/
    ship_val decimal(11,2), /**计价量*/
    search_key text, /**搜索关键字 商品名+属性内容*/
    type tinyint default 0 /**0 实物 1 虚拟*/
)