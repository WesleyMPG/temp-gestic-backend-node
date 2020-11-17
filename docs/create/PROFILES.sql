CREATE DATABASE APP;

USE APP;

--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE PROFILES (
  PROF_CD_ID UUID DEFAULT uuid_generate_v4 (),
  PROF_TAG_PROFILE VARCHAR(200) NOT NULL UNIQUE,
  PROF_NM_PROFILE VARCHAR(200) NOT NULL,
  CONSTRAINT PK_PROF PRIMARY KEY (PROF_CD_ID)
)

CREATE TABLE USERS (
  USER_CD_ID UUID DEFAULT uuid_generate_v4 (),
  USER_CD_PROFILE UUID NOT NULL,
  USER_NM_CPF VARCHAR(15) NOT NULL UNIQUE,
  USER_NM_EMAIL VARCHAR(200) NOT NULL UNIQUE,
  USER_NM_PASSWORD VARCHAR(200) NOT NULL,
  CONSTRAINT PK_USER PRIMARY KEY (USER_CD_ID),
  CONSTRAINT FK_USER_PROF FOREIGN KEY (USER_CD_PROFILE) REFERENCES PROFILES (PROF_CD_ID)

)

----- COMPILADOR ONLINE
--CREATE DATABASE APP;
--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE PROFILES (
  PROF_CD_ID UUID NOT NULL UNIQUE,
  PROF_TAG_PROFILE VARCHAR(200) NOT NULL UNIQUE,
  PROF_NM_PROFILE VARCHAR(200) NOT NULL,
  CONSTRAINT PK_PROF PRIMARY KEY (PROF_CD_ID)
);

CREATE TABLE USERS (
  USER_CD_ID UUID NOT NULL UNIQUE,
  USER_CD_PROFILE UUID NOT NULL,
  USER_NM_CPF VARCHAR(15) NOT NULL UNIQUE,
  USER_NM_EMAIL VARCHAR(200) NOT NULL UNIQUE,
  USER_NM_PASSWORD VARCHAR(200) NOT NULL,
  CONSTRAINT PK_USER PRIMARY KEY (USER_CD_ID),
  CONSTRAINT FK_USER_PROF FOREIGN KEY (USER_CD_PROFILE) REFERENCES PROFILES (PROF_CD_ID)
);
  