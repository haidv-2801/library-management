--
-- Script was generated by Devart dbForge Studio 2020 for MySQL, Version 9.0.597.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 7/4/2022 8:45:59 PM
-- Server version: 10.4.22
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

DROP DATABASE IF EXISTS library;

CREATE DATABASE IF NOT EXISTS library
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_general_ci;

--
-- Set default database
--
USE library;

--
-- Create table `post`
--
CREATE TABLE IF NOT EXISTS post (
  PostID CHAR(36) NOT NULL DEFAULT 'UUID',
  MenuID CHAR(36) NOT NULL DEFAULT '',
  Title VARCHAR(255) DEFAULT NULL,
  Slug VARCHAR(255) DEFAULT NULL,
  Description TEXT DEFAULT NULL,
  Content LONGTEXT DEFAULT NULL,
  Image TEXT DEFAULT NULL,
  ViewCount INT(11) DEFAULT NULL,
  Type INT(11) DEFAULT NULL,
  CreatedDate TIMESTAMP NULL DEFAULT current_timestamp,
  CreatedBy VARCHAR(255) DEFAULT NULL,
  ModifiedDate TIMESTAMP NULL DEFAULT current_timestamp,
  ModifiedBy VARCHAR(255) DEFAULT NULL,
  Status BIT(1) DEFAULT b'1',
  IsDeleted BIT(1) DEFAULT b'0',
  PRIMARY KEY (PostID)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 862,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

DELIMITER $$

--
-- Create procedure `Proc_UpdatePost`
--
CREATE PROCEDURE Proc_UpdatePost(IN v_postid CHAR(36), IN v_menuid CHAR(36), IN v_title VARCHAR(255), IN v_slug VARCHAR(255), IN v_description TEXT, IN v_content LONGTEXT, IN v_image TEXT, IN v_viewcount INT, IN v_type INT, IN v_modifieddate TIMESTAMP, IN v_modifiedby VARCHAR(255), IN v_status BIT, IN v_isdeleted BIT)
  SQL SECURITY INVOKER
BEGIN
UPDATE post
SET Title = v_title,
    MenuID = v_menuid,
    Slug = v_slug,
    Description = v_description,
    Image = v_image,
    Content = v_content,
    ViewCount = v_viewcount,
    Type = v_type,
    ModifiedDate = v_modifieddate,
    ModifiedBy = v_modifiedby,
    Status = v_status,
    IsDeleted = v_isdeleted
WHERE PostID = v_postid
AND IsDeleted = b'0';
END
$$

--
-- Create procedure `Proc_InsertPost`
--
CREATE PROCEDURE Proc_InsertPost(IN v_postid CHAR(36),IN v_menuid CHAR(36), IN v_title VARCHAR(255), IN v_slug VARCHAR(255), IN v_description TEXT, IN v_content LONGTEXT,IN v_image TEXT, IN v_viewcount INT, IN v_type INT, IN v_createddate TIMESTAMP, IN v_createdby VARCHAR(255), IN v_modifieddate TIMESTAMP, IN v_modifiedby VARCHAR(255), IN v_status BIT, IN v_isdeleted BIT)
  SQL SECURITY INVOKER
BEGIN
INSERT INTO post (PostID, MenuID, Title, Slug, Description, Content, Image, ViewCount, Type, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, Status, IsDeleted)
  VALUES (v_postid, v_menuid, v_title, v_slug, v_description, v_content, v_image, v_viewcount, v_type, v_createddate, v_createdby, v_modifieddate, v_modifiedby, v_status, b'0');
END
$$

--
-- Create procedure `Proc_GetPostsFilterPaging`
--
CREATE PROCEDURE Proc_GetPostsFilterPaging(IN v_filter VARCHAR(255), IN v_page_number INT, IN v_page_size INT, OUT v_total_record INT)
  SQL SECURITY INVOKER
BEGIN
 
  SET @FilterValue = ( SELECT
    v_filter);
  SET v_page_number = (v_page_number - 1) * v_page_size;
  IF v_page_size > 0 THEN
IF @FilterValue IS NULL THEN
SELECT
  *
FROM post p
WHERE p.IsDeleted = FALSE LIMIT v_page_size OFFSET v_page_number;
      SET v_total_record = ( SELECT
    COUNT(*)
  FROM post p
  WHERE p.IsDeleted = FALSE);
ELSE

SELECT
  *
FROM post p
WHERE p.IsDeleted = FALSE
AND (p.Title LIKE CONCAT('%', @FilterValue, '%')
OR p.Slug LIKE CONCAT('%', @FilterValue, '%'))
LIMIT v_page_size OFFSET v_page_number;
    SET v_total_record = ( SELECT
    COUNT(*)
  FROM post p
  WHERE p.IsDeleted = FALSE
  AND (p.Title LIKE CONCAT('%', @FilterValue, '%')
  OR p.Slug LIKE CONCAT('%', @FilterValue, '%')));
END IF;
END IF;
END
$$

--
-- Create procedure `Proc_GetPosts`
--
CREATE PROCEDURE Proc_GetPosts()
  SQL SECURITY INVOKER
BEGIN
SELECT
  *
FROM post
WHERE IsDeleted = FALSE;
END
$$

--
-- Create procedure `Proc_GetPostById`
--
CREATE PROCEDURE Proc_GetPostById(IN v_postid CHAR(36))
  SQL SECURITY INVOKER
BEGIN
SELECT
  *
FROM post
WHERE PostID = v_postid
AND IsDeleted = FALSE;
END
$$

--
-- Create procedure `Proc_DeletePostById`
--
CREATE PROCEDURE Proc_DeletePostById(IN v_postid CHAR(36))
  SQL SECURITY INVOKER
BEGIN
UPDATE post
SET IsDeleted = TRUE
WHERE PostID = v_postid
AND IsDeleted = FALSE;
END
$$

DELIMITER ;

--
-- Create table `menu`
--
CREATE TABLE IF NOT EXISTS menu (
  MenuID CHAR(36) NOT NULL DEFAULT 'UUID',
  Title VARCHAR(255) DEFAULT NULL,
  Slug VARCHAR(255) DEFAULT NULL,
  ParentID CHAR(36) DEFAULT '00000000-0000-0000-0000-000000000000',
  IsShowHome BIT(1) DEFAULT b'1',
  Link TEXT DEFAULT NULL,
  DisplayOrder INT(11) DEFAULT NULL,
  Type INT(11) DEFAULT NULL,
  CreatedDate TIMESTAMP NULL DEFAULT current_timestamp,
  CreatedBy VARCHAR(255) DEFAULT NULL,
  ModifiedDate TIMESTAMP NULL DEFAULT current_timestamp,
  ModifiedBy VARCHAR(255) DEFAULT NULL,
  Status BIT(1) DEFAULT b'1',
  IsDeleted BIT(1) DEFAULT b'0',
  PRIMARY KEY (MenuID)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 1820,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

DELIMITER $$

--
-- Create procedure `Proc_UpdateMenu`
--
CREATE PROCEDURE Proc_UpdateMenu(IN v_menuid CHAR(36), IN v_title VARCHAR(255), IN v_slug VARCHAR(255), IN v_parentid CHAR(36), IN v_isshowhome BIT,IN v_link TEXT, IN v_displayorder INT, IN v_type INT, IN v_modifieddate TIMESTAMP, IN v_modifiedby VARCHAR(255), IN v_status BIT, IN v_isdeleted BIT)
  SQL SECURITY INVOKER
BEGIN
UPDATE MENU
SET Title = v_title,
    Slug = v_slug,
    ParentID = v_parentid,
    IsShowHome = v_isshowhome,
    Link = v_link,
    DisplayOrder = v_displayorder,
    Type = v_type,
    ModifiedDate = v_modifieddate,
    ModifiedBy = v_modifiedbY,
    Status = v_status,
    IsDeleted = v_isdeleteD
WHERE IsDeleted = FALSE
AND MenuID = v_menuid;
END
$$

--
-- Create procedure `Proc_InsertMenu`
--
CREATE PROCEDURE Proc_InsertMenu(IN v_menuid CHAR(36), IN v_title VARCHAR(255), IN v_slug VARCHAR(255), IN v_parentid CHAR(36), IN v_isshowhome BIT,IN v_link TEXT, IN v_displayorder INT, IN v_type INT, IN v_createddate TIMESTAMP, IN v_createdby VARCHAR(255), IN v_modifieddate TIMESTAMP, IN v_modifiedby VARCHAR(255), IN v_status BIT, IN v_isdeleted BIT)
  SQL SECURITY INVOKER
BEGIN
INSERT INTO menu (MenuID, Title, Slug, ParentID, IsShowHome, Link, DisplayOrder, Type, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, Status, IsDeleted)
  VALUES (v_menuid, v_title, v_slug, v_parentid, v_isshowhome, v_link, v_displayorder, v_type, v_createddate, v_createdby, v_modifieddate, v_modifiedby, v_status, b'0');
END
$$

--
-- Create procedure `Proc_GetMenusFilterPaging`
--
CREATE PROCEDURE Proc_GetMenusFilterPaging(IN v_filter VARCHAR(255), IN v_page_number INT, IN v_page_size INT, OUT v_total_record INT)
  SQL SECURITY INVOKER
BEGIN
 
  SET @FilterValue = ( SELECT
    v_filter);
  SET v_page_number = (v_page_number - 1) * v_page_size;
  IF v_page_size > 0 THEN
IF @FilterValue IS NULL THEN
SELECT
  *
FROM menu p
WHERE p.IsDeleted = FALSE LIMIT v_page_size OFFSET v_page_number;
      SET v_total_record = ( SELECT
    COUNT(*)
  FROM menu p
  WHERE p.IsDeleted = FALSE);
ELSE

SELECT
  *
FROM menu p
WHERE p.IsDeleted = FALSE
AND (p.Title LIKE CONCAT('%', @FilterValue, '%')
OR p.Slug LIKE CONCAT('%', @FilterValue, '%')
OR p.Link LIKE CONCAT('%', @FilterValue, '%'))
LIMIT v_page_size OFFSET v_page_number;
    SET v_total_record = ( SELECT
    COUNT(*)
  FROM menu p
  WHERE p.IsDeleted = FALSE
  AND (p.Title LIKE CONCAT('%', @FilterValue, '%')
  OR p.Slug LIKE CONCAT('%', @FilterValue, '%')
  OR p.Link LIKE CONCAT('%', @FilterValue, '%')));
END IF;
END IF;
END
$$

--
-- Create procedure `Proc_GetMenus`
--
CREATE PROCEDURE Proc_GetMenus()
  SQL SECURITY INVOKER
BEGIN
SELECT
  *
FROM menu
WHERE IsDeleted = FALSE
AND Status = TRUE;
END
$$

--
-- Create procedure `Proc_GetMenuById`
--
CREATE PROCEDURE Proc_GetMenuById(IN v_menuid CHAR(36))
  SQL SECURITY INVOKER
BEGIN
SELECT
  *
FROM menu
WHERE MenuID = v_menuid
AND IsDeleted = FALSE;
END
$$

--
-- Create procedure `Proc_DeleteMenuById`
--
CREATE PROCEDURE Proc_DeleteMenuById(IN v_menuid CHAR(36))
  SQL SECURITY INVOKER
BEGIN
UPDATE menu
SET IsDeleted = TRUE
WHERE MenuID = v_menuid
AND IsDeleted = FALSE;
END
$$

DELIMITER ;

--
-- Create table `account`
--
CREATE TABLE IF NOT EXISTS account (
  AccountID CHAR(36) NOT NULL DEFAULT '',
  UserName VARCHAR(255) NOT NULL,
  Email VARCHAR(100) DEFAULT NULL,
  PhoneNumber VARCHAR(100) DEFAULT NULL,
  FullName VARCHAR(255) DEFAULT NULL,
  Password VARCHAR(255) DEFAULT '',
  Avatar TEXT DEFAULT NULL,
  CreatedDate TIMESTAMP NULL DEFAULT current_timestamp,
  CreatedBy VARCHAR(255) DEFAULT NULL,
  ModifiedDate TIMESTAMP NULL DEFAULT current_timestamp,
  ModifiedBy VARCHAR(255) DEFAULT NULL,
  Status INT(11) DEFAULT NULL,
  IsDeleted BIT(1) DEFAULT b'0',
  PRIMARY KEY (AccountID)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

DELIMITER $$

--
-- Create procedure `Proc_GetAccountsFilterPaging`
--
CREATE PROCEDURE Proc_GetAccountsFilterPaging(IN v_filter VARCHAR(255), IN v_page_number INT, IN v_page_size INT, OUT v_total_record INT)
  SQL SECURITY INVOKER
BEGIN
 
  SET @FilterValue = ( SELECT
    v_filter);
  SET v_page_number = (v_page_number - 1) * v_page_size;
  IF v_page_size > 0 THEN
IF @FilterValue IS NULL THEN
SELECT
  *
FROM account p
WHERE p.IsDeleted = FALSE LIMIT v_page_size OFFSET v_page_number;
      SET v_total_record = ( SELECT
    COUNT(*)
  FROM account p
  WHERE p.IsDeleted = FALSE);
ELSE

SELECT
  *
FROM account p
WHERE p.IsDeleted = FALSE
AND (p.UserName LIKE CONCAT('%', @FilterValue, '%')
OR p.Email LIKE CONCAT('%', @FilterValue, '%')
OR p.FullName LIKE CONCAT('%', @FilterValue, '%')
OR p.PhoneNumber LIKE CONCAT('%', @FilterValue, '%'))
LIMIT v_page_size OFFSET v_page_number;
    SET v_total_record = ( SELECT
    COUNT(*)
  FROM account p
  WHERE p.IsDeleted = FALSE
  AND (p.UserName LIKE CONCAT('%', @FilterValue, '%')
  OR p.Email LIKE CONCAT('%', @FilterValue, '%')
  OR p.FullName LIKE CONCAT('%', @FilterValue, '%')
  OR p.PhoneNumber LIKE CONCAT('%', @FilterValue, '%')));
END IF;
END IF;
END
$$

--
-- Create procedure `Proc_GetAccounts`
--
CREATE PROCEDURE Proc_GetAccounts()
  SQL SECURITY INVOKER
BEGIN
SELECT
  *
FROM account
WHERE IsDeleted = FALSE;
END
$$

--
-- Create procedure `Proc_GetAccountById`
--
CREATE PROCEDURE Proc_GetAccountById(IN v_accountid CHAR(36))
  SQL SECURITY INVOKER
BEGIN
SELECT
  *
FROM account
WHERE AccountID = v_accountid
AND IsDeleted = FALSE;
END
$$

--
-- Create procedure `Proc_DeleteAccountById`
--
CREATE PROCEDURE Proc_DeleteAccountById(IN v_accountid CHAR(36))
  SQL SECURITY INVOKER
BEGIN
UPDATE account
SET IsDeleted = TRUE
WHERE AccountID = v_accountid
AND IsDeleted = FALSE;
END
$$

DELIMITER ;

--
-- Create table `user`
--
CREATE TABLE IF NOT EXISTS user (
  id CHAR(36) NOT NULL DEFAULT '',
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  phone VARCHAR(100) DEFAULT NULL,
  created_date TIMESTAMP NULL DEFAULT current_timestamp,
  created_by VARCHAR(255) DEFAULT NULL,
  modified_date TIMESTAMP NULL DEFAULT current_timestamp,
  modified_by VARCHAR(255) DEFAULT NULL,
  is_deleted BIT(1) DEFAULT b'0',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `notification`
--
CREATE TABLE IF NOT EXISTS notification (
  id CHAR(36) NOT NULL DEFAULT '',
  content VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `from` CHAR(36) DEFAULT NULL,
  `to` CHAR(36) DEFAULT NULL,
  to_email VARCHAR(255) DEFAULT NULL,
  is_readed BIT(1) DEFAULT b'1',
  created_date TIMESTAMP NULL DEFAULT current_timestamp,
  created_by VARCHAR(255) DEFAULT NULL,
  modified_date TIMESTAMP NULL DEFAULT current_timestamp,
  modified_by VARCHAR(255) DEFAULT NULL,
  is_deleted BIT(1) DEFAULT b'0',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `library_card`
--
CREATE TABLE IF NOT EXISTS library_card (
  id CHAR(36) NOT NULL DEFAULT '',
  card_number VARCHAR(50) NOT NULL,
  bar_code VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  active BIT(1) DEFAULT NULL,
  created_date TIMESTAMP NULL DEFAULT current_timestamp,
  created_by VARCHAR(255) DEFAULT NULL,
  modified_date TIMESTAMP NULL DEFAULT current_timestamp,
  modified_by VARCHAR(255) DEFAULT NULL,
  is_deleted BIT(1) DEFAULT b'0',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `category`
--
CREATE TABLE IF NOT EXISTS category (
  id CHAR(36) NOT NULL DEFAULT '',
  name VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  meta_title VARCHAR(255) DEFAULT NULL,
  parent_id CHAR(36) DEFAULT NULL,
  show_on_home BIT(1) DEFAULT b'1',
  created_date TIMESTAMP NULL DEFAULT current_timestamp,
  created_by VARCHAR(255) DEFAULT NULL,
  modified_date TIMESTAMP NULL DEFAULT current_timestamp,
  modified_by VARCHAR(255) DEFAULT NULL,
  is_deleted BIT(1) DEFAULT b'0',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `book`
--
CREATE TABLE IF NOT EXISTS book (
  id CHAR(36) NOT NULL DEFAULT '',
  book_code CHAR(20) DEFAULT NULL,
  book_name VARCHAR(255) DEFAULT NULL,
  publisher VARCHAR(100) DEFAULT NULL,
  author VARCHAR(100) DEFAULT NULL,
  language_code CHAR(10) DEFAULT NULL,
  price DECIMAL(15, 2) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  book_format INT(11) DEFAULT NULL,
  due_date TIMESTAMP NULL DEFAULT NULL,
  borrowed_date TIMESTAMP NULL DEFAULT NULL,
  date_of_purchase VARCHAR(255) DEFAULT NULL,
  isReferenceOnly BIT(1) DEFAULT b'0',
  image TEXT DEFAULT NULL,
  catalog_id CHAR(36) DEFAULT NULL,
  created_date TIMESTAMP NULL DEFAULT current_timestamp,
  created_by VARCHAR(255) DEFAULT NULL,
  modified_date TIMESTAMP NULL DEFAULT current_timestamp,
  modified_by VARCHAR(255) DEFAULT NULL,
  status BIT(1) DEFAULT b'0',
  is_deleted BIT(1) DEFAULT b'0'
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

DELIMITER $$

--
-- Create procedure `Proc_InsertAccount`
--
CREATE PROCEDURE Proc_InsertAccount(IN v_accountiid CHAR(36), IN v_email VARCHAR(100), IN v_fullname VARCHAR(255), IN v_username VARCHAR(255), IN v_phonenumber VARCHAR(100), IN v_password VARCHAR(255), IN v_avatar TEXT, IN v_createddate TIMESTAMP, IN v_createdby VARCHAR(255), IN v_modifieddate TIMESTAMP, IN v_modifiedby VARCHAR(255), IN v_status BIT, IN v_isdeleted BIT)
  SQL SECURITY INVOKER
BEGIN
INSERT INTO acocunt (AccountID, Email, FullName, UserName, PhoneNumber, Password, Avatar, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, Status, IsDeleted)
  VALUES (v_accountiid, v_email, v_fullname, v_username, v_phonenumber, v_password, v_avatar, v_createddate, v_createdby, v_modifieddate, v_modifiedby, v_status, b'0');
END
$$

DELIMITER ;

-- 
-- Dumping data for table user
--
-- Table library.user does not contain any data (it is empty)

-- 
-- Dumping data for table post
--
INSERT INTO post VALUES
('073408d7-2361-44c7-9da3-d3dd50c09990', '8d0fb05d-5ca6-4cf6-adfb-75e50d2a88c5', 'OpenDOAR - Danh mục các nguồn tin truy cập mở', 'opendoar-danh-muc-cac-nguon-tin-truy-cap-mo', 'Tính đến nay, OpenDOAR cung cấp gần 6000 tài liệu, phủ trên 09 lĩnh vực với 12 loại tài liệu, trong đó loại bài báo và luận văn, luận án chiến tỷ trọng cao nhất.', '"<p><strong>T&iacute;nh đến nay, OpenDOAR cung cấp gần 6000 t&agrave;i liệu, phủ tr&ecirc;n 09 lĩnh vực với 12 loại t&agrave;i liệu, trong đ&oacute; loại b&agrave;i b&aacute;o v&agrave; luận văn, luận &aacute;n chiến tỷ trọng cao nhất.</strong></p>\\n<p><a href=\\"https://lic.haui.edu.vn/vn/\\">Thư viện ĐH C&ocirc;ng nghiệp H&agrave; Nội</a>&nbsp;xin giới thiệu đến bạn đọc nguồn truy cập mở&nbsp;<a href=\\"https://v2.sherpa.ac.uk/opendoar/\\" target=\\"_blank\\" rel=\\"noopener\\">OpenDOAR</a>&nbsp;(Open Directory of Open Access Repositories): Danh mục nguồn tin truy cập mở l&agrave; một trang web c&oacute; trụ sở tại Vương quốc Anh, cung cấp danh s&aacute;ch to&agrave;n diện v&agrave; tin cậy c&aacute;c kho t&agrave;i liệu nội sinh truy cập mở học thuật của c&aacute;c trường đại học, viện nghi&ecirc;n cứu tr&ecirc;n to&agrave;n thế giới. C&aacute;c li&ecirc;n kết tới c&aacute;c kho số nội sinh được đ&aacute;nh gi&aacute; chất lượng trước khi đưa v&agrave;o danh mục n&ecirc;n c&oacute; gi&aacute; trị học thuật cao. OpenDOAR c&ograve;n liệt k&ecirc; v&agrave; cho ph&eacute;p người sử dụng t&igrave;m kiếm c&aacute;c kho số nội sinh theo chủ đề, ng&ocirc;n ngữ, dạng t&agrave;i liệu (như b&agrave;i nghi&ecirc;n cứu, kết quả nghi&ecirc;n cứu, s&aacute;ch, s&aacute;ng chế, luận &aacute;n) hoặc khu vực như Ch&acirc;u Phi, Ch&acirc;u &Aacute;, Australasia, Caribbean, Trung Mỹ, Ch&acirc;u &Acirc;u, Bắc Mỹ v&agrave; Nam Mỹ.</p>\\n<p>OpenDOAR được duy tr&igrave; bởi Đại học Nottingham dưới sự bảo trợ của SHERPA về c&aacute;c dịch vụ v&agrave; được triển khai v&agrave;o năm 2005 với sự hợp t&aacute;c của Đại học Lund. Dự &aacute;n được t&agrave;i trợ bởi Viện Khoa học Mở, Jisc, Hiệp hội c&aacute;c Thư viện Nghi&ecirc;n cứu (CURL) v&agrave; SPARC Ch&acirc;u &Acirc;u.</p>\\n<p>T&iacute;nh đến nay,&nbsp;<a href=\\"https://v2.sherpa.ac.uk/opendoar/\\" target=\\"_blank\\" rel=\\"noopener\\">OpenDOAR</a>&nbsp;cung cấp gần 6000 t&agrave;i liệu, phủ tr&ecirc;n 09 lĩnh vực với 12 loại t&agrave;i liệu, trong đ&oacute; loại b&agrave;i b&aacute;o v&agrave; luận văn, luận &aacute;n chiến tỷ trọng cao nhất.</p>\\n<p>Để truy cập v&agrave;o OpenDOAR, bạn đọc thực hiện như sau:</p>\\n<p>Bước 1: Truy cập v&agrave;o đường dẫn sau:&nbsp;<a href=\\"https://v2.sherpa.ac.uk/opendoar/\\" target=\\"_blank\\" rel=\\"noopener\\">https://v2.sherpa.ac.uk/opendoar/</a></p>\\n<p>Bước 2: Bấm v&agrave;o mục Directory</p>\\n<p>Bước 3: Nhập th&ocirc;ng tin cần t&igrave;m kiếm</p>\\n<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"https://images.unsplash.com/photo-1647873134223-e4c648d1456b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=764&amp;q=80\\" alt=\\"\\" width=\\"auto\\" height=\\"auto\\" /></p>\\n<p>Tại đ&acirc;y c&oacute; hai chế độ t&igrave;m kiếm:&nbsp;<strong>T&igrave;m kiếm cơ bản</strong>&nbsp;v&agrave;&nbsp;<strong>T&igrave;m kiếm n&acirc;ng cao</strong>. Với chế độ t&igrave;m kiếm n&acirc;ng cao bạn đọc c&oacute; thể giới hạn, chỉ định c&aacute;c v&ugrave;ng t&igrave;m kiếm theo từng ti&ecirc;u ch&iacute;.</p>\\n<p>&nbsp;</p>"', '1649230750781_image', 200, 1, '2022-04-06 14:39:10', 'DOVANHAI', '2022-04-06 14:39:10', 'DOVANHAI', True, False),
('0fec1f8f-6195-460c-9dc2-974c42961892', '00000000-0000-0000-0000-000000000000', 'tieu de mac dinh 2232334', 'tieu-de-mac-dinh-2232334', 'mo ta mac dinh', '"Type some text..."', '1649144309455_image', 200, 1, '2022-04-05 12:32:09', 'DOVANHAI', '2022-04-05 14:59:46', 'DOVANHAI', True, False),
('26c9b8a8-87c5-4294-8afc-96477778f004', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định 44', 'tieu-de-bai-dang-mac-dinh-44', 'Mô tả mặc định', '"Type some text..."', '1649168607013_image', 200, 1, '2022-04-05 21:23:27', 'DOVANHAI', '2022-04-05 21:23:27', 'DOVANHAI', True, False),
('43ec1ee5-3c4b-4a4d-a910-86a6c1e37f1b', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định2222', 'tieu-de-bai-dang-mac-dinh2222', 'Mô tả mặc định', '"Type some text..."', '1649144245727_image', 200, 1, '2022-04-05 14:37:25', 'DOVANHAI', '2022-04-05 14:37:25', 'DOVANHAI', False, False),
('491e159f-838e-4503-b5db-b55aefe84d48', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định Tiêu đề bài đăng mặc địnhTiêu đề bài đăng mặc địnhTiêu đề bài đăng mặc địnhTiêu đề bài đăng mặc địnhTiêu đề bài đăng mặc địnhTiêu đề bài đăng mặc địnhTiêu đề bài đăng mặc địnhTiêu đề bài đăng mặc địnhTiêu đề bài đăng mặc định', 'tieu-de-bai-dang-mac-dinh-tieu-de-bai-dang-mac-dinhtieu-de-bai-dang-mac-dinhtieu-de-bai-dang-mac-dinhtieu-de-bai-dang-mac-dinhtieu-de-bai-dang-mac-dinhtieu-de-bai-dang-mac-dinhtieu-de-bai-dang-mac-dinhtieu-de-bai-dang-mac-dinhtieu-de-bai-dang-mac-dinh', 'Mô tả mặc định', '"Type some text..."', '1649150482734_image', 200, 1, '2022-04-05 16:21:22', 'DOVANHAI', '2022-04-05 16:21:22', 'DOVANHAI', True, False),
('57848cb0-994c-4a77-ae6c-4a847cf8e13c', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định 122', 'tieu-de-bai-dang-mac-dinh-122', 'Mô tả mặc định', '"Type some text..."', '1649144291792_image', 200, 1, '2022-04-05 12:24:08', 'DOVANHAI', '2022-04-05 14:59:41', 'DOVANHAI', True, False),
('5ae0af3b-37b8-45ee-9aaf-e99161fd0617', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định1111', 'tieu-de-bai-dang-mac-dinh1111', 'Mô tả mặc định', '"Type some text..."', '1649144230376_image', 200, 1, '2022-04-05 14:37:10', 'DOVANHAI', '2022-04-05 14:49:44', 'DOVANHAI', True, False),
('62007a71-fc50-4626-9c6b-82a5e2e9aece', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định 88', 'tieu-de-bai-dang-mac-dinh-88', 'Mô tả mặc định', '"Type some text..."', '1649168751013_image', 200, 1, '2022-04-05 21:25:51', 'DOVANHAI', '2022-04-05 21:25:51', 'DOVANHAI', True, False),
('6a914602-74de-4610-b0ed-11716ab25593', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định 55', 'tieu-de-bai-dang-mac-dinh-55', 'Mô tả mặc định', '"Type some text..."', '1649168613941_image', 200, 1, '2022-04-05 21:23:33', 'DOVANHAI', '2022-04-05 21:23:33', 'DOVANHAI', True, False),
('820b4e31-eb8a-49e1-b805-4811913c87a8', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định 2211', 'tieu-de-bai-dang-mac-dinh-2211', 'Mô tả mặc định', '"Type some text..."', '1649168458496_image', 200, 1, '2022-04-05 21:20:58', 'DOVANHAI', '2022-04-05 21:20:58', 'DOVANHAI', True, False),
('a0661cf1-b821-418d-8dfc-d1a251ece7ac', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định 667', 'tieu-de-bai-dang-mac-dinh-667', 'Mô tả mặc định', '"Type some text..."', '1649168716438_image', 200, 1, '2022-04-05 21:23:38', 'DOVANHAI', '2022-04-05 21:25:16', 'DOVANHAI', True, False),
('e5169eca-eab1-40df-b601-bfb0df5eb013', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định22', 'tieu-de-bai-dang-mac-dinh22', 'Mô tả mặc định', '"Type some text..."', '1649143885600_image', 200, 1, '2022-04-05 14:31:25', 'DOVANHAI', '2022-04-05 14:31:25', 'DOVANHAI', True, True),
('f55e4e17-c1e6-46c3-b61c-1048383ddfc3', '00000000-0000-0000-0000-000000000000', 'Tiêu đề bài đăng mặc định 33', 'tieu-de-bai-dang-mac-dinh-33', 'Mô tả mặc định', '"Type some text..."', '1649168478854_image', 200, 1, '2022-04-05 21:21:18', 'DOVANHAI', '2022-04-05 21:21:18', 'DOVANHAI', True, False);

-- 
-- Dumping data for table notification
--
-- Table library.notification does not contain any data (it is empty)

-- 
-- Dumping data for table menu
--
INSERT INTO menu VALUES
('0c45f4f6-c85f-419f-a7b7-32c84d34cfc2', 'Dịch vụ - tiện ích', '', '00000000-0000-0000-0000-000000000000', True, NULL, 2, 3, '2022-04-05 23:51:24', 'DOVANHAI', '2022-04-06 10:33:51', 'DOVANHAI', True, False),
('1c46ec68-7794-4a22-8bfb-97dd08b0d5b0', 'Menu không có tiêu đề', '', '0c45f4f6-c85f-419f-a7b7-32c84d34cfc2', True, 'https://www.google.com/', 10, 1, '2022-04-06 11:00:01', 'DOVANHAI', '2022-04-06 14:08:14', 'DOVANHAI', False, False),
('1e329a21-6c8d-42a8-8470-a28a3404bd38', 'Tài liệu in', 'tai-lieu-in', '6e541382-8dd7-4027-8e23-31f1c91b348b', True, NULL, 0, 0, '2022-04-05 23:50:45', 'DOVANHAI', '2022-04-06 10:36:51', 'DOVANHAI', True, False),
('28969464-eacf-4db1-b46c-9126237ccb00', 'Tra cứu', '', '00000000-0000-0000-0000-000000000000', True, 'http://opac.utc.edu.vn/', 3, 1, '2022-04-06 00:03:50', 'DOVANHAI', '2022-04-06 10:19:01', 'DOVANHAI', True, False),
('2aa7838c-8ee6-474b-9ec4-36cd99527d2b', 'Hướng dẫn sử dụng', 'huong-dan-su-dung', 'd9346658-6b37-471f-8772-31a4ec523f17', True, NULL, 2, 0, '2022-04-05 23:46:37', 'DOVANHAI', '2022-04-06 10:37:49', 'DOVANHAI', True, False),
('34426e66-99cc-409f-ab2f-da49e23002b7', 'Học liệu mở', 'hoc-lieu-mo', '6e541382-8dd7-4027-8e23-31f1c91b348b', True, NULL, 2, 0, '2022-04-05 23:51:06', 'DOVANHAI', '2022-04-06 10:36:34', 'DOVANHAI', True, False),
('34aed81d-0aa0-48df-b6b8-8829c7430a7d', 'Tổng quan về thư viện', 'tong-quan-ve-thu-vien', 'd9346658-6b37-471f-8772-31a4ec523f17', True, NULL, 0, 0, '2022-04-05 23:43:52', 'DOVANHAI', '2022-04-06 10:37:29', 'DOVANHAI', True, False),
('56feeccd-db4e-449e-94a4-75359904ccca', 'Các dịch vụ khác', 'cac-dich-vu-khac', '0c45f4f6-c85f-419f-a7b7-32c84d34cfc2', True, NULL, 3, 0, '2022-04-06 00:01:27', 'DOVANHAI', '2022-04-06 10:37:14', 'DOVANHAI', True, False),
('6e541382-8dd7-4027-8e23-31f1c91b348b', 'Tài nguyên - bộ sưu tập', '', '00000000-0000-0000-0000-000000000000', True, NULL, 1, 3, '2022-04-05 23:47:45', 'DOVANHAI', '2022-04-06 10:33:24', 'DOVANHAI', True, False),
('88961a2d-7d75-49fe-8713-ababd8097f2e', 'Tài liệu số', 'tai-lieu-so', '6e541382-8dd7-4027-8e23-31f1c91b348b', True, NULL, 1, 0, '2022-04-05 23:50:56', 'DOVANHAI', '2022-04-06 10:36:46', 'DOVANHAI', True, False),
('8d0fb05d-5ca6-4cf6-adfb-75e50d2a88c5', 'Tin tức', 'tin-tuc', '6e541382-8dd7-4027-8e23-31f1c91b348b', True, '', 4, 2, '2022-04-06 14:23:07', 'DOVANHAI', '2022-04-06 14:23:07', 'DOVANHAI', True, False),
('913cadf0-020f-4f7e-a5f1-0b4d526c048c', 'Hỗ trợ học tập, giảng dạy và nghiên cứu', 'ho-tro-hoc-tap-giang-day-va-nghien-cuu', '0c45f4f6-c85f-419f-a7b7-32c84d34cfc2', True, NULL, 2, 0, '2022-04-05 23:57:12', 'DOVANHAI', '2022-04-06 10:36:20', 'DOVANHAI', True, False),
('9d33e2a0-139f-484b-9407-3a0ad6d58eab', 'Nội quy thư viện', 'noi-quy-thu-vien', 'd9346658-6b37-471f-8772-31a4ec523f17', True, NULL, 1, 0, '2022-04-05 23:45:19', 'DOVANHAI', '2022-04-06 10:37:39', 'DOVANHAI', True, False),
('9f313d22-a85f-4307-bb05-b70d25669b02', 'Trang chủ', 'trang-chu', '00000000-0000-0000-0000-000000000000', True, NULL, 0, 2, '2022-04-05 23:37:09', 'DOVANHAI', '2022-04-06 10:39:12', 'DOVANHAI', True, False),
('be71f925-721b-4892-9a39-c450ea8ea88d', 'Thông báo', 'thong-bao', '6e541382-8dd7-4027-8e23-31f1c91b348b', True, '', 5, 2, '2022-04-06 14:23:31', 'DOVANHAI', '2022-04-06 14:23:31', 'DOVANHAI', True, False),
('d18fd493-c8f4-478a-8531-11e674a148f2', 'Cung cấp không gian tiện ích', 'cung-cap-khong-gian-tien-ich', '0c45f4f6-c85f-419f-a7b7-32c84d34cfc2', True, NULL, 1, 0, '2022-04-05 23:53:09', 'DOVANHAI', '2022-04-06 10:36:29', 'DOVANHAI', True, False),
('d33d2853-03ee-4dd0-a8e8-fd4d63f79362', 'Thông báo mới', 'thong-bao-moi', 'be71f925-721b-4892-9a39-c450ea8ea88d', True, '', 0, 2, '2022-04-06 14:24:54', 'DOVANHAI', '2022-04-06 14:25:38', 'DOVANHAI', False, False),
('d9346658-6b37-471f-8772-31a4ec523f17', 'Giới thiệu', '', '00000000-0000-0000-0000-000000000000', True, NULL, 4, 3, '2022-04-05 23:37:32', 'DOVANHAI', '2022-04-06 10:34:05', 'DOVANHAI', True, False),
('df867bd4-8f77-4418-afa3-5b49bd4270a5', 'Giới thiệu sách mới', 'gioi-thieu-sach-moi', 'd9346658-6b37-471f-8772-31a4ec523f17', True, NULL, 3, 0, '2022-04-05 23:46:54', 'DOVANHAI', '2022-04-06 10:38:03', 'DOVANHAI', True, False),
('ecda97dd-6da9-4eb4-bf32-937d85a351b4', 'Mượn trả tài liệu', 'muon-tra-tai-lieu', '0c45f4f6-c85f-419f-a7b7-32c84d34cfc2', True, NULL, 0, 0, '2022-04-05 23:52:56', 'DOVANHAI', '2022-04-06 10:39:55', 'DOVANHAI', True, False);

-- 
-- Dumping data for table library_card
--
-- Table library.library_card does not contain any data (it is empty)

-- 
-- Dumping data for table category
--
-- Table library.category does not contain any data (it is empty)

-- 
-- Dumping data for table book
--
-- Table library.book does not contain any data (it is empty)

-- 
-- Dumping data for table account
--
-- Table library.account does not contain any data (it is empty)

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;