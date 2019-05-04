/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3307
 Source Server Type    : MySQL
 Source Server Version : 100313
 Source Host           : localhost:3307
 Source Schema         : hh

 Target Server Type    : MySQL
 Target Server Version : 100313
 File Encoding         : 65001

 Date: 04/05/2019 17:31:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for patient
-- ----------------------------
DROP TABLE IF EXISTS `patient`;
CREATE TABLE `patient` (
  `hn` varchar(20) DEFAULT NULL,
  `cid` varchar(15) NOT NULL,
  `first_name` varchar(150) DEFAULT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `idx_hn` (`hn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of patient
-- ----------------------------
BEGIN;
INSERT INTO `patient` VALUES ('0041223', '1234567891234', 'สถิตย์', 'เรียนพิศ', '2090-11-01', '1');
COMMIT;

-- ----------------------------
-- Table structure for register
-- ----------------------------
DROP TABLE IF EXISTS `register`;
CREATE TABLE `register` (
  `register_id` int(6) NOT NULL AUTO_INCREMENT,
  `cid` varchar(13) DEFAULT NULL,
  `telephone` varchar(10) DEFAULT NULL,
  `emi` varchar(150) DEFAULT NULL,
  `pincode` varchar(15) DEFAULT NULL COMMENT 'HN',
  `device_token` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`register_id`),
  UNIQUE KEY `idx_cid` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of register
-- ----------------------------
BEGIN;
INSERT INTO `register` VALUES (1, '1234567891234', '098890098', NULL, '0041223', 'cRotaWTpir4:APA91bGa17q7FNt4zpNkN7jmRwV6T1h_CQsDFtzRetHvYuPxRnBDpMw7Qar3ccvLnGqbEdVPD8N7DUqi0gleKTlf4GzhwPkhBP-6ANoiBxhXN6YyagbWroqZgJOAnCDcbp2wHHNaYRvj');
INSERT INTO `register` VALUES (2, '3700500428946', '0653529561', NULL, '1234', NULL);
INSERT INTO `register` VALUES (3, '3959900141811', '0653529561', NULL, '1234', NULL);
COMMIT;

-- ----------------------------
-- Table structure for request
-- ----------------------------
DROP TABLE IF EXISTS `request`;
CREATE TABLE `request` (
  `request_id` int(6) NOT NULL AUTO_INCREMENT,
  `register_id` int(6) DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  `request_time` time DEFAULT NULL,
  `lat` double(32,20) DEFAULT NULL,
  `lng` double(32,20) DEFAULT NULL,
  `symptom` varchar(200) DEFAULT NULL,
  `status` char(1) DEFAULT NULL COMMENT '1=WAITING, 2=ACCEPTED, 3=REJECT, 4=CANCEL, 5=SUCCESS',
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of request
-- ----------------------------
BEGIN;
INSERT INTO `request` VALUES (1, 1, '2019-04-03', '14:27:45', 12.09090893495900000000, 100.09884373730000000000, NULL, NULL);
INSERT INTO `request` VALUES (2, 1, '2019-04-03', '14:28:40', 12.09090893495900000000, 100.09884373730000000000, 'sdkfjdlsfklsjkdlsjdksljksljdsf', NULL);
INSERT INTO `request` VALUES (3, 1, '2019-04-03', '14:30:56', 12.09090893495900000000, 100.09884373730000000000, 'sdkfjdlsfklsjkdlsjdksljksljdsf', NULL);
INSERT INTO `request` VALUES (4, 1, '2019-04-03', '15:34:29', 12.09090893495900000000, 100.09884373730000000000, 'ปวดท้องรุนแรง', '1');
INSERT INTO `request` VALUES (5, 1, '2019-04-03', '15:50:58', 12.09090893495900000000, 100.09884373730000000000, 'ปวดท้องรุนแรง', '2');
INSERT INTO `request` VALUES (6, 1, '2019-04-03', '16:04:32', 13.85133810000000000000, 100.58007440000000000000, 'สวัสดี', '1');
INSERT INTO `request` VALUES (7, 1, '2019-04-03', '16:07:24', 13.85133810000000000000, 100.58007440000000000000, 'สวัสดีนดนดสดสสดสด', '2');
INSERT INTO `request` VALUES (8, 1, '2019-04-03', '16:08:04', 13.84700425348961200000, 100.58101885020733000000, 'hello world...', '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
