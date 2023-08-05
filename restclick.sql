--
-- PostgreSQL database dump
--

-- Dumped from database version 13.11 (Ubuntu 13.11-1.pgdg22.04+1)
-- Dumped by pg_dump version 15.2

-- Started on 2023-07-31 17:37:35 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3849 (class 1262 OID 16384)
-- Name: restclick; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE restclick WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';


\connect restclick

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 25486)
-- Name: default; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "default";


--
-- TOC entry 772 (class 1247 OID 26636)
-- Name: vne_orders_paymethod_enum; Type: TYPE; Schema: default; Owner: -
--

CREATE TYPE "default".vne_orders_paymethod_enum AS ENUM (
    'cash',
    'card',
    'POS'
);


--
-- TOC entry 727 (class 1247 OID 25494)
-- Name: vne_orders_status_enum; Type: TYPE; Schema: default; Owner: -
--

CREATE TYPE "default".vne_orders_status_enum AS ENUM (
    'active',
    'paid',
    'completed',
    'cancelled'
);


--
-- TOC entry 730 (class 1247 OID 25504)
-- Name: vne_payment_intent_status_enum; Type: TYPE; Schema: default; Owner: -
--

CREATE TYPE "default".vne_payment_intent_status_enum AS ENUM (
    'Pending',
    'Success',
    'Rejected'
);


--
-- TOC entry 733 (class 1247 OID 25512)
-- Name: vne_payment_intent_type_enum; Type: TYPE; Schema: default; Owner: -
--

CREATE TYPE "default".vne_payment_intent_type_enum AS ENUM (
    'balance',
    'Order'
);


--
-- TOC entry 736 (class 1247 OID 25518)
-- Name: vne_products_unit_enum; Type: TYPE; Schema: default; Owner: -
--

CREATE TYPE "default".vne_products_unit_enum AS ENUM (
    'g',
    'ml'
);


--
-- TOC entry 739 (class 1247 OID 25524)
-- Name: vne_transactions_balance_type_enum; Type: TYPE; Schema: default; Owner: -
--

CREATE TYPE "default".vne_transactions_balance_type_enum AS ENUM (
    'auto',
    'employee',
    'admin'
);


--
-- TOC entry 742 (class 1247 OID 25532)
-- Name: vne_transactions_payment_status_enum; Type: TYPE; Schema: default; Owner: -
--

CREATE TYPE "default".vne_transactions_payment_status_enum AS ENUM (
    'pending',
    'success',
    'rejected'
);


--
-- TOC entry 745 (class 1247 OID 25540)
-- Name: vne_transactions_payment_type_enum; Type: TYPE; Schema: default; Owner: -
--

CREATE TYPE "default".vne_transactions_payment_type_enum AS ENUM (
    'balance',
    'order'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 25545)
-- Name: order_group; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".order_group (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 25549)
-- Name: order_group_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".order_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3850 (class 0 OID 0)
-- Dependencies: 202
-- Name: order_group_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".order_group_id_seq OWNED BY "default".order_group.id;


--
-- TOC entry 203 (class 1259 OID 25551)
-- Name: qr_config; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".qr_config (
    id integer NOT NULL,
    restaurant_id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 25555)
-- Name: qr_config_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".qr_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3851 (class 0 OID 0)
-- Dependencies: 204
-- Name: qr_config_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".qr_config_id_seq OWNED BY "default".qr_config.id;


--
-- TOC entry 205 (class 1259 OID 25557)
-- Name: vne_admingroups; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_admingroups (
    id integer NOT NULL,
    name character varying,
    title character varying,
    defended boolean DEFAULT false NOT NULL
);


--
-- TOC entry 206 (class 1259 OID 25564)
-- Name: vne_admingroups_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_admingroups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3852 (class 0 OID 0)
-- Dependencies: 206
-- Name: vne_admingroups_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_admingroups_id_seq OWNED BY "default".vne_admingroups.id;


--
-- TOC entry 207 (class 1259 OID 25566)
-- Name: vne_admins; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_admins (
    id integer NOT NULL,
    admingroup_id integer,
    name character varying,
    email character varying NOT NULL,
    password character varying,
    img character varying,
    active boolean DEFAULT true NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 25574)
-- Name: vne_admins_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3853 (class 0 OID 0)
-- Dependencies: 208
-- Name: vne_admins_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_admins_id_seq OWNED BY "default".vne_admins.id;


--
-- TOC entry 301 (class 1259 OID 26719)
-- Name: vne_allergen; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_allergen (
    id integer NOT NULL,
    pos integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 300 (class 1259 OID 26717)
-- Name: vne_allergen_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_allergen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3854 (class 0 OID 0)
-- Dependencies: 300
-- Name: vne_allergen_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_allergen_id_seq OWNED BY "default".vne_allergen.id;


--
-- TOC entry 299 (class 1259 OID 26708)
-- Name: vne_allergen_translation; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_allergen_translation (
    id integer NOT NULL,
    allergen_id integer,
    lang_id integer NOT NULL,
    restaurant_id integer,
    name character varying
);


--
-- TOC entry 298 (class 1259 OID 26706)
-- Name: vne_allergen_translation_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_allergen_translation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3855 (class 0 OID 0)
-- Dependencies: 298
-- Name: vne_allergen_translation_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_allergen_translation_id_seq OWNED BY "default".vne_allergen_translation.id;


--
-- TOC entry 209 (class 1259 OID 25576)
-- Name: vne_auth_logs; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_auth_logs (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    ip character varying NOT NULL,
    device character varying NOT NULL,
    browser character varying NOT NULL,
    admin_id integer,
    employee_id integer
);


--
-- TOC entry 210 (class 1259 OID 25583)
-- Name: vne_auth_logs_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_auth_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3856 (class 0 OID 0)
-- Dependencies: 210
-- Name: vne_auth_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_auth_logs_id_seq OWNED BY "default".vne_auth_logs.id;


--
-- TOC entry 211 (class 1259 OID 25585)
-- Name: vne_balance_settings; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_balance_settings (
    id integer NOT NULL,
    vat real,
    tax real,
    payment_gateway_fee real,
    vat_enabled boolean DEFAULT true NOT NULL,
    tax_enabled boolean DEFAULT true NOT NULL,
    payment_gateway_fee_enabled boolean DEFAULT true NOT NULL
);


--
-- TOC entry 212 (class 1259 OID 25591)
-- Name: vne_balance_settings_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_balance_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3857 (class 0 OID 0)
-- Dependencies: 212
-- Name: vne_balance_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_balance_settings_id_seq OWNED BY "default".vne_balance_settings.id;


--
-- TOC entry 213 (class 1259 OID 25593)
-- Name: vne_cats; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_cats (
    id integer NOT NULL,
    restaurant_id integer,
    icon_id integer,
    name character varying,
    pos integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 25601)
-- Name: vne_cats_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_cats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3858 (class 0 OID 0)
-- Dependencies: 214
-- Name: vne_cats_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_cats_id_seq OWNED BY "default".vne_cats.id;


--
-- TOC entry 215 (class 1259 OID 25603)
-- Name: vne_currencies; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_currencies (
    id integer NOT NULL,
    name character varying,
    symbol character varying,
    pos integer DEFAULT 0 NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 25611)
-- Name: vne_currencies_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_currencies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3859 (class 0 OID 0)
-- Dependencies: 216
-- Name: vne_currencies_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_currencies_id_seq OWNED BY "default".vne_currencies.id;


--
-- TOC entry 217 (class 1259 OID 25613)
-- Name: vne_employee_status_translations; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_employee_status_translations (
    id integer NOT NULL,
    employee_status_id integer,
    lang_id integer,
    name character varying
);


--
-- TOC entry 218 (class 1259 OID 25619)
-- Name: vne_employee_status_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_employee_status_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3860 (class 0 OID 0)
-- Dependencies: 218
-- Name: vne_employee_status_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_employee_status_translations_id_seq OWNED BY "default".vne_employee_status_translations.id;


--
-- TOC entry 219 (class 1259 OID 25621)
-- Name: vne_employee_statuses; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_employee_statuses (
    id integer NOT NULL,
    color character varying DEFAULT '#000000'::character varying NOT NULL,
    pos integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 25629)
-- Name: vne_employee_statuses_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_employee_statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3861 (class 0 OID 0)
-- Dependencies: 220
-- Name: vne_employee_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_employee_statuses_id_seq OWNED BY "default".vne_employee_statuses.id;


--
-- TOC entry 221 (class 1259 OID 25631)
-- Name: vne_employees; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_employees (
    id integer NOT NULL,
    restaurant_id integer,
    employee_status_id integer,
    email character varying NOT NULL,
    password character varying,
    name character varying,
    phone character varying,
    is_admin boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 25640)
-- Name: vne_employees_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3862 (class 0 OID 0)
-- Dependencies: 222
-- Name: vne_employees_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_employees_id_seq OWNED BY "default".vne_employees.id;


--
-- TOC entry 223 (class 1259 OID 25642)
-- Name: vne_facility_type; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_facility_type (
    id integer NOT NULL,
    is_hotel boolean DEFAULT false NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 25646)
-- Name: vne_facility_type_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_facility_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3863 (class 0 OID 0)
-- Dependencies: 224
-- Name: vne_facility_type_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_facility_type_id_seq OWNED BY "default".vne_facility_type.id;


--
-- TOC entry 225 (class 1259 OID 25648)
-- Name: vne_facility_type_translation; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_facility_type_translation (
    id integer NOT NULL,
    type_id integer,
    lang_id integer,
    name character varying
);


--
-- TOC entry 226 (class 1259 OID 25654)
-- Name: vne_facility_type_translation_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_facility_type_translation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3864 (class 0 OID 0)
-- Dependencies: 226
-- Name: vne_facility_type_translation_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_facility_type_translation_id_seq OWNED BY "default".vne_facility_type_translation.id;


--
-- TOC entry 227 (class 1259 OID 25656)
-- Name: vne_floor; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_floor (
    id integer NOT NULL,
    restaurant_id integer,
    nx integer DEFAULT 5 NOT NULL,
    ny integer DEFAULT 5 NOT NULL,
    number integer NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 25661)
-- Name: vne_floor_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_floor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3865 (class 0 OID 0)
-- Dependencies: 228
-- Name: vne_floor_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_floor_id_seq OWNED BY "default".vne_floor.id;


--
-- TOC entry 229 (class 1259 OID 25663)
-- Name: vne_halls; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_halls (
    id integer NOT NULL,
    restaurant_id integer,
    name character varying,
    nx integer DEFAULT 5 NOT NULL,
    ny integer DEFAULT 5 NOT NULL,
    pos integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 230 (class 1259 OID 25672)
-- Name: vne_halls_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_halls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3866 (class 0 OID 0)
-- Dependencies: 230
-- Name: vne_halls_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_halls_id_seq OWNED BY "default".vne_halls.id;


--
-- TOC entry 231 (class 1259 OID 25674)
-- Name: vne_icon_translations; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_icon_translations (
    id integer NOT NULL,
    icon_id integer,
    lang_id integer,
    name character varying
);


--
-- TOC entry 232 (class 1259 OID 25680)
-- Name: vne_icon_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_icon_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3867 (class 0 OID 0)
-- Dependencies: 232
-- Name: vne_icon_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_icon_translations_id_seq OWNED BY "default".vne_icon_translations.id;


--
-- TOC entry 233 (class 1259 OID 25682)
-- Name: vne_icons; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_icons (
    id integer NOT NULL,
    img character varying,
    pos integer DEFAULT 0 NOT NULL,
    type character varying DEFAULT 'category'::character varying NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 25690)
-- Name: vne_icons_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_icons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3868 (class 0 OID 0)
-- Dependencies: 234
-- Name: vne_icons_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_icons_id_seq OWNED BY "default".vne_icons.id;


--
-- TOC entry 235 (class 1259 OID 25692)
-- Name: vne_ingredient_types; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_ingredient_types (
    id integer NOT NULL,
    name character varying,
    price integer DEFAULT 0 NOT NULL,
    unit_id integer NOT NULL,
    restaurant_id integer NOT NULL
);


--
-- TOC entry 236 (class 1259 OID 25699)
-- Name: vne_ingredient_types_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_ingredient_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3869 (class 0 OID 0)
-- Dependencies: 236
-- Name: vne_ingredient_types_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_ingredient_types_id_seq OWNED BY "default".vne_ingredient_types.id;


--
-- TOC entry 237 (class 1259 OID 25701)
-- Name: vne_ingredients; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_ingredients (
    id integer NOT NULL,
    product_id integer,
    name character varying,
    pos integer DEFAULT 0 NOT NULL,
    excludable boolean DEFAULT false NOT NULL,
    amount integer DEFAULT 0 NOT NULL,
    type_id integer,
    unit_id integer
);


--
-- TOC entry 238 (class 1259 OID 25709)
-- Name: vne_ingredients_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3870 (class 0 OID 0)
-- Dependencies: 238
-- Name: vne_ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_ingredients_id_seq OWNED BY "default".vne_ingredients.id;


--
-- TOC entry 239 (class 1259 OID 25711)
-- Name: vne_langs; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_langs (
    id integer NOT NULL,
    slug character varying,
    title character varying,
    shorttitle character varying,
    img character varying,
    pos integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    slugable boolean DEFAULT false NOT NULL,
    dir character varying DEFAULT 'ltr'::character varying NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


--
-- TOC entry 240 (class 1259 OID 25722)
-- Name: vne_langs_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_langs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3871 (class 0 OID 0)
-- Dependencies: 240
-- Name: vne_langs_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_langs_id_seq OWNED BY "default".vne_langs.id;


--
-- TOC entry 241 (class 1259 OID 25724)
-- Name: vne_mailtemplate_translations; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_mailtemplate_translations (
    id integer NOT NULL,
    mailtemplate_id integer,
    lang_id integer,
    subject character varying,
    content text
);


--
-- TOC entry 242 (class 1259 OID 25730)
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_mailtemplate_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3872 (class 0 OID 0)
-- Dependencies: 242
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_mailtemplate_translations_id_seq OWNED BY "default".vne_mailtemplate_translations.id;


--
-- TOC entry 243 (class 1259 OID 25732)
-- Name: vne_mailtemplates; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_mailtemplates (
    id integer NOT NULL,
    name character varying,
    defended boolean DEFAULT false NOT NULL
);


--
-- TOC entry 244 (class 1259 OID 25739)
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_mailtemplates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3873 (class 0 OID 0)
-- Dependencies: 244
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_mailtemplates_id_seq OWNED BY "default".vne_mailtemplates.id;


--
-- TOC entry 245 (class 1259 OID 25741)
-- Name: vne_order_group; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_order_group (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 246 (class 1259 OID 25745)
-- Name: vne_order_group_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_order_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3874 (class 0 OID 0)
-- Dependencies: 246
-- Name: vne_order_group_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_order_group_id_seq OWNED BY "default".vne_order_group.id;


--
-- TOC entry 247 (class 1259 OID 25747)
-- Name: vne_order_product_ingredients; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_order_product_ingredients (
    id integer NOT NULL,
    order_product_id integer,
    name character varying,
    included boolean DEFAULT true NOT NULL
);


--
-- TOC entry 248 (class 1259 OID 25754)
-- Name: vne_order_product_ingredients_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_order_product_ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3875 (class 0 OID 0)
-- Dependencies: 248
-- Name: vne_order_product_ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_order_product_ingredients_id_seq OWNED BY "default".vne_order_product_ingredients.id;


--
-- TOC entry 249 (class 1259 OID 25756)
-- Name: vne_order_products; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_order_products (
    id integer NOT NULL,
    order_id integer,
    serving_id integer,
    code character varying,
    name character varying,
    price double precision DEFAULT '0'::double precision NOT NULL,
    q integer DEFAULT 0 NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    img character varying
);


--
-- TOC entry 250 (class 1259 OID 25765)
-- Name: vne_order_products_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_order_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3876 (class 0 OID 0)
-- Dependencies: 250
-- Name: vne_order_products_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_order_products_id_seq OWNED BY "default".vne_order_products.id;


--
-- TOC entry 251 (class 1259 OID 25767)
-- Name: vne_orders; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_orders (
    id integer NOT NULL,
    table_id integer,
    hall_id integer,
    restaurant_id integer,
    employee_id integer,
    need_waiter boolean DEFAULT false NOT NULL,
    need_invoice boolean DEFAULT false NOT NULL,
    status "default".vne_orders_status_enum DEFAULT 'active'::"default".vne_orders_status_enum NOT NULL,
    discount_percent integer DEFAULT 0 NOT NULL,
    sum double precision,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    need_products boolean DEFAULT false NOT NULL,
    customer_comment text DEFAULT ''::text NOT NULL,
    employee_comment text DEFAULT ''::text NOT NULL,
    paymethod "default".vne_orders_paymethod_enum DEFAULT 'cash'::"default".vne_orders_paymethod_enum NOT NULL,
    accepted_at timestamp without time zone,
    completed_at timestamp without time zone,
    room_id integer,
    floor_id integer,
    group_id integer,
    paid boolean DEFAULT false NOT NULL,
    allergy_comment text DEFAULT ''::text NOT NULL
);


--
-- TOC entry 252 (class 1259 OID 25782)
-- Name: vne_orders_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3877 (class 0 OID 0)
-- Dependencies: 252
-- Name: vne_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_orders_id_seq OWNED BY "default".vne_orders.id;


--
-- TOC entry 253 (class 1259 OID 25784)
-- Name: vne_payment_config; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_payment_config (
    id integer NOT NULL,
    type character varying NOT NULL,
    vat real,
    tax real,
    gateway_fee real,
    vat_enabled boolean DEFAULT true NOT NULL,
    tax_enabled boolean DEFAULT true NOT NULL,
    gateway_fee_enabled boolean DEFAULT true NOT NULL
);


--
-- TOC entry 254 (class 1259 OID 25793)
-- Name: vne_payment_config_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_payment_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3878 (class 0 OID 0)
-- Dependencies: 254
-- Name: vne_payment_config_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_payment_config_id_seq OWNED BY "default".vne_payment_config.id;


--
-- TOC entry 255 (class 1259 OID 25795)
-- Name: vne_payment_intent; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_payment_intent (
    id integer NOT NULL,
    intent_id character varying NOT NULL,
    restaurant_id integer,
    order_id integer,
    type "default".vne_payment_intent_type_enum NOT NULL,
    status "default".vne_payment_intent_status_enum DEFAULT 'Pending'::"default".vne_payment_intent_status_enum NOT NULL,
    amount integer NOT NULL,
    total integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 256 (class 1259 OID 25803)
-- Name: vne_payment_intent_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_payment_intent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3879 (class 0 OID 0)
-- Dependencies: 256
-- Name: vne_payment_intent_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_payment_intent_id_seq OWNED BY "default".vne_payment_intent.id;


--
-- TOC entry 257 (class 1259 OID 25805)
-- Name: vne_payment_settings; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_payment_settings (
    id integer NOT NULL,
    type character varying NOT NULL,
    vat real,
    tax real,
    tip real,
    stripe_fixed real,
    stripe_relative real,
    vat_enabled boolean DEFAULT true NOT NULL,
    tax_enabled boolean DEFAULT true NOT NULL,
    tip_enabled boolean DEFAULT true NOT NULL,
    stripe_enabled boolean DEFAULT true NOT NULL
);


--
-- TOC entry 258 (class 1259 OID 25815)
-- Name: vne_payment_settings_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_payment_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3880 (class 0 OID 0)
-- Dependencies: 258
-- Name: vne_payment_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_payment_settings_id_seq OWNED BY "default".vne_payment_settings.id;


--
-- TOC entry 259 (class 1259 OID 25817)
-- Name: vne_product_images; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_product_images (
    id integer NOT NULL,
    product_id integer,
    img character varying,
    pos integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 260 (class 1259 OID 25824)
-- Name: vne_product_images_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_product_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3881 (class 0 OID 0)
-- Dependencies: 260
-- Name: vne_product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_product_images_id_seq OWNED BY "default".vne_product_images.id;


--
-- TOC entry 261 (class 1259 OID 25826)
-- Name: vne_products; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_products (
    id integer NOT NULL,
    cat_id integer,
    name character varying,
    weight integer DEFAULT 0 NOT NULL,
    cal integer DEFAULT 0 NOT NULL,
    "time" character varying,
    about text,
    pos integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    code character varying,
    recommended boolean DEFAULT false NOT NULL,
    price double precision DEFAULT '0'::double precision NOT NULL,
    restaurant_id integer,
    unit "default".vne_products_unit_enum DEFAULT 'g'::"default".vne_products_unit_enum NOT NULL,
    alc boolean DEFAULT false NOT NULL,
    alc_percent integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 302 (class 1259 OID 26726)
-- Name: vne_products_allergens_vne_allergen; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_products_allergens_vne_allergen (
    "vneProductsId" integer NOT NULL,
    "vneAllergenId" integer NOT NULL
);


--
-- TOC entry 262 (class 1259 OID 25842)
-- Name: vne_products_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3882 (class 0 OID 0)
-- Dependencies: 262
-- Name: vne_products_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_products_id_seq OWNED BY "default".vne_products.id;


--
-- TOC entry 263 (class 1259 OID 25844)
-- Name: vne_qr_config; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_qr_config (
    id integer NOT NULL,
    size integer DEFAULT 200 NOT NULL,
    margin integer DEFAULT 10 NOT NULL,
    "dotColor" character varying NOT NULL,
    "dotType" character varying NOT NULL,
    "cornerDotColor" character varying NOT NULL,
    "cornerDotType" character varying NOT NULL,
    "cornerSquareColor" character varying NOT NULL,
    "cornerSquareType" character varying NOT NULL,
    "imageMargin" integer DEFAULT 2 NOT NULL,
    "imageSize" numeric DEFAULT 0.3 NOT NULL,
    background character varying NOT NULL,
    restaurant_id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    img character varying,
    icon_id integer
);


--
-- TOC entry 264 (class 1259 OID 25855)
-- Name: vne_qr_config_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_qr_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3883 (class 0 OID 0)
-- Dependencies: 264
-- Name: vne_qr_config_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_qr_config_id_seq OWNED BY "default".vne_qr_config.id;


--
-- TOC entry 265 (class 1259 OID 25857)
-- Name: vne_restaurant_fee_configs; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_restaurant_fee_configs (
    restaurant_id integer NOT NULL,
    payment_type character varying NOT NULL,
    vat_balance real,
    tax_balance real,
    gateway_fee_balance real,
    vat_balance_disabled boolean DEFAULT false NOT NULL,
    tax_balance_disabled boolean DEFAULT false NOT NULL,
    gateway_fee_balance_disabled boolean DEFAULT false NOT NULL,
    vat_order real DEFAULT '0'::real,
    tax_order real DEFAULT '0'::real,
    gateway_fee_order real DEFAULT '0'::real,
    vat_order_disabled boolean DEFAULT false NOT NULL,
    tax_order_disabled boolean DEFAULT false NOT NULL,
    gateway_fee_order_disabled boolean DEFAULT false NOT NULL,
    service_fee_order real DEFAULT '0'::real,
    service_fee_order_disabled boolean DEFAULT false NOT NULL,
    webhook_id character varying,
    stripe_secret_key character varying,
    stripe_webhook_key character varying,
    checkout_private_key character varying,
    checkout_public_key character varying,
    checkout_processing_id character varying,
    checkout_webhook_sig_key character varying,
    checkout_webhook_auth_key character varying
);


--
-- TOC entry 266 (class 1259 OID 25874)
-- Name: vne_restaurants; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_restaurants (
    id integer NOT NULL,
    currency_id integer,
    name character varying,
    domain character varying,
    ownername character varying,
    phone character varying,
    address character varying,
    inn character varying,
    ogrn character varying,
    comment text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    lang_id integer,
    money double precision DEFAULT '0'::double precision NOT NULL,
    active boolean DEFAULT true NOT NULL,
    type_id integer,
    payment_method character varying,
    "qrId" integer
);


--
-- TOC entry 267 (class 1259 OID 25883)
-- Name: vne_restaurants_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3884 (class 0 OID 0)
-- Dependencies: 267
-- Name: vne_restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_restaurants_id_seq OWNED BY "default".vne_restaurants.id;


--
-- TOC entry 304 (class 1259 OID 26869)
-- Name: vne_review; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_review (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    taste integer NOT NULL,
    ambience integer NOT NULL,
    service integer NOT NULL,
    comment text DEFAULT ''::text NOT NULL,
    order_id integer NOT NULL
);


--
-- TOC entry 303 (class 1259 OID 26867)
-- Name: vne_review_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3885 (class 0 OID 0)
-- Dependencies: 303
-- Name: vne_review_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_review_id_seq OWNED BY "default".vne_review.id;


--
-- TOC entry 268 (class 1259 OID 25885)
-- Name: vne_room; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_room (
    id integer NOT NULL,
    floor_id integer,
    no character varying NOT NULL,
    capacity integer DEFAULT 0 NOT NULL,
    x integer DEFAULT 0 NOT NULL,
    y integer DEFAULT 0 NOT NULL,
    code character varying,
    type_id integer
);


--
-- TOC entry 269 (class 1259 OID 25894)
-- Name: vne_room_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3886 (class 0 OID 0)
-- Dependencies: 269
-- Name: vne_room_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_room_id_seq OWNED BY "default".vne_room.id;


--
-- TOC entry 270 (class 1259 OID 25896)
-- Name: vne_room_type; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_room_type (
    id integer NOT NULL,
    name character varying DEFAULT ''::character varying NOT NULL,
    priority integer DEFAULT 1 NOT NULL
);


--
-- TOC entry 271 (class 1259 OID 25904)
-- Name: vne_room_type_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_room_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3887 (class 0 OID 0)
-- Dependencies: 271
-- Name: vne_room_type_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_room_type_id_seq OWNED BY "default".vne_room_type.id;


--
-- TOC entry 272 (class 1259 OID 25906)
-- Name: vne_room_type_translation; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_room_type_translation (
    id integer NOT NULL,
    type_id integer,
    lang_id integer,
    name character varying
);


--
-- TOC entry 273 (class 1259 OID 25912)
-- Name: vne_room_type_translation_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_room_type_translation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3888 (class 0 OID 0)
-- Dependencies: 273
-- Name: vne_room_type_translation_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_room_type_translation_id_seq OWNED BY "default".vne_room_type_translation.id;


--
-- TOC entry 274 (class 1259 OID 25914)
-- Name: vne_serving_translations; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_serving_translations (
    id integer NOT NULL,
    serving_id integer,
    lang_id integer,
    name character varying
);


--
-- TOC entry 275 (class 1259 OID 25920)
-- Name: vne_serving_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_serving_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3889 (class 0 OID 0)
-- Dependencies: 275
-- Name: vne_serving_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_serving_translations_id_seq OWNED BY "default".vne_serving_translations.id;


--
-- TOC entry 276 (class 1259 OID 25922)
-- Name: vne_servings; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_servings (
    id integer NOT NULL,
    pos integer DEFAULT 0 NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


--
-- TOC entry 277 (class 1259 OID 25927)
-- Name: vne_servings_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_servings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3890 (class 0 OID 0)
-- Dependencies: 277
-- Name: vne_servings_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_servings_id_seq OWNED BY "default".vne_servings.id;


--
-- TOC entry 278 (class 1259 OID 25929)
-- Name: vne_settings; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_settings (
    id integer NOT NULL,
    p character varying,
    v character varying,
    c character varying,
    pos integer DEFAULT 0 NOT NULL,
    in_app boolean DEFAULT false NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


--
-- TOC entry 279 (class 1259 OID 25938)
-- Name: vne_settings_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3891 (class 0 OID 0)
-- Dependencies: 279
-- Name: vne_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_settings_id_seq OWNED BY "default".vne_settings.id;


--
-- TOC entry 280 (class 1259 OID 25940)
-- Name: vne_subscription; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_subscription (
    id integer NOT NULL,
    is_active boolean NOT NULL,
    restaurant_id integer,
    amount integer,
    total integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 281 (class 1259 OID 25944)
-- Name: vne_subscription_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_subscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3892 (class 0 OID 0)
-- Dependencies: 281
-- Name: vne_subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_subscription_id_seq OWNED BY "default".vne_subscription.id;


--
-- TOC entry 282 (class 1259 OID 25946)
-- Name: vne_tables; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_tables (
    id integer NOT NULL,
    hall_id integer,
    no integer DEFAULT 0 NOT NULL,
    seats integer DEFAULT 0 NOT NULL,
    x integer DEFAULT 0 NOT NULL,
    y integer DEFAULT 0 NOT NULL,
    code character varying
);


--
-- TOC entry 283 (class 1259 OID 25956)
-- Name: vne_tables_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_tables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3893 (class 0 OID 0)
-- Dependencies: 283
-- Name: vne_tables_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_tables_id_seq OWNED BY "default".vne_tables.id;


--
-- TOC entry 284 (class 1259 OID 25958)
-- Name: vne_transactions; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_transactions (
    id integer NOT NULL,
    restaurant_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    total real DEFAULT '0'::real NOT NULL,
    order_id integer,
    account_id integer,
    balance_type "default".vne_transactions_balance_type_enum DEFAULT 'auto'::"default".vne_transactions_balance_type_enum NOT NULL,
    payment_id character varying,
    payment_link_id character varying,
    payment_type "default".vne_transactions_payment_type_enum,
    payment_status "default".vne_transactions_payment_status_enum,
    amount real DEFAULT '0'::real NOT NULL
);


--
-- TOC entry 285 (class 1259 OID 25968)
-- Name: vne_transactions_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3894 (class 0 OID 0)
-- Dependencies: 285
-- Name: vne_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_transactions_id_seq OWNED BY "default".vne_transactions.id;


--
-- TOC entry 286 (class 1259 OID 25970)
-- Name: vne_units; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_units (
    id integer NOT NULL,
    related_id integer,
    conversion_ratio numeric
);


--
-- TOC entry 287 (class 1259 OID 25976)
-- Name: vne_units_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_units_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3895 (class 0 OID 0)
-- Dependencies: 287
-- Name: vne_units_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_units_id_seq OWNED BY "default".vne_units.id;


--
-- TOC entry 288 (class 1259 OID 25978)
-- Name: vne_units_translations; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_units_translations (
    id integer NOT NULL,
    unit_id integer NOT NULL,
    lang_id integer NOT NULL,
    name character varying NOT NULL,
    short character varying NOT NULL
);


--
-- TOC entry 289 (class 1259 OID 25984)
-- Name: vne_units_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_units_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3896 (class 0 OID 0)
-- Dependencies: 289
-- Name: vne_units_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_units_translations_id_seq OWNED BY "default".vne_units_translations.id;


--
-- TOC entry 290 (class 1259 OID 25986)
-- Name: vne_word_translations; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_word_translations (
    id integer NOT NULL,
    word_id integer,
    lang_id integer,
    text text
);


--
-- TOC entry 291 (class 1259 OID 25992)
-- Name: vne_word_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_word_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3897 (class 0 OID 0)
-- Dependencies: 291
-- Name: vne_word_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_word_translations_id_seq OWNED BY "default".vne_word_translations.id;


--
-- TOC entry 292 (class 1259 OID 25994)
-- Name: vne_wordbooks; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_wordbooks (
    id integer NOT NULL,
    name character varying,
    pos integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 293 (class 1259 OID 26001)
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_wordbooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3898 (class 0 OID 0)
-- Dependencies: 293
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_wordbooks_id_seq OWNED BY "default".vne_wordbooks.id;


--
-- TOC entry 294 (class 1259 OID 26003)
-- Name: vne_words; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_words (
    id integer NOT NULL,
    wordbook_id integer,
    pos integer DEFAULT 0 NOT NULL,
    mark character varying,
    note character varying
);


--
-- TOC entry 295 (class 1259 OID 26010)
-- Name: vne_words_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_words_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3899 (class 0 OID 0)
-- Dependencies: 295
-- Name: vne_words_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_words_id_seq OWNED BY "default".vne_words.id;


--
-- TOC entry 296 (class 1259 OID 26012)
-- Name: vne_wsservers; Type: TABLE; Schema: default; Owner: -
--

CREATE TABLE "default".vne_wsservers (
    id integer NOT NULL,
    url character varying,
    pos integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 297 (class 1259 OID 26019)
-- Name: vne_wsservers_id_seq; Type: SEQUENCE; Schema: default; Owner: -
--

CREATE SEQUENCE "default".vne_wsservers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3900 (class 0 OID 0)
-- Dependencies: 297
-- Name: vne_wsservers_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: -
--

ALTER SEQUENCE "default".vne_wsservers_id_seq OWNED BY "default".vne_wsservers.id;


--
-- TOC entry 3233 (class 2604 OID 26021)
-- Name: order_group id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".order_group ALTER COLUMN id SET DEFAULT nextval('"default".order_group_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 26022)
-- Name: qr_config id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".qr_config ALTER COLUMN id SET DEFAULT nextval('"default".qr_config_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 26023)
-- Name: vne_admingroups id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_admingroups ALTER COLUMN id SET DEFAULT nextval('"default".vne_admingroups_id_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 26024)
-- Name: vne_admins id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_admins ALTER COLUMN id SET DEFAULT nextval('"default".vne_admins_id_seq'::regclass);


--
-- TOC entry 3395 (class 2604 OID 26722)
-- Name: vne_allergen id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_allergen ALTER COLUMN id SET DEFAULT nextval('"default".vne_allergen_id_seq'::regclass);


--
-- TOC entry 3394 (class 2604 OID 26711)
-- Name: vne_allergen_translation id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_allergen_translation ALTER COLUMN id SET DEFAULT nextval('"default".vne_allergen_translation_id_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 26025)
-- Name: vne_auth_logs id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_auth_logs ALTER COLUMN id SET DEFAULT nextval('"default".vne_auth_logs_id_seq'::regclass);


--
-- TOC entry 3244 (class 2604 OID 26026)
-- Name: vne_balance_settings id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_balance_settings ALTER COLUMN id SET DEFAULT nextval('"default".vne_balance_settings_id_seq'::regclass);


--
-- TOC entry 3248 (class 2604 OID 26027)
-- Name: vne_cats id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_cats ALTER COLUMN id SET DEFAULT nextval('"default".vne_cats_id_seq'::regclass);


--
-- TOC entry 3251 (class 2604 OID 26028)
-- Name: vne_currencies id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_currencies ALTER COLUMN id SET DEFAULT nextval('"default".vne_currencies_id_seq'::regclass);


--
-- TOC entry 3254 (class 2604 OID 26029)
-- Name: vne_employee_status_translations id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employee_status_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_employee_status_translations_id_seq'::regclass);


--
-- TOC entry 3255 (class 2604 OID 26030)
-- Name: vne_employee_statuses id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employee_statuses ALTER COLUMN id SET DEFAULT nextval('"default".vne_employee_statuses_id_seq'::regclass);


--
-- TOC entry 3258 (class 2604 OID 26031)
-- Name: vne_employees id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employees ALTER COLUMN id SET DEFAULT nextval('"default".vne_employees_id_seq'::regclass);


--
-- TOC entry 3262 (class 2604 OID 26032)
-- Name: vne_facility_type id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_facility_type ALTER COLUMN id SET DEFAULT nextval('"default".vne_facility_type_id_seq'::regclass);


--
-- TOC entry 3264 (class 2604 OID 26033)
-- Name: vne_facility_type_translation id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_facility_type_translation ALTER COLUMN id SET DEFAULT nextval('"default".vne_facility_type_translation_id_seq'::regclass);


--
-- TOC entry 3265 (class 2604 OID 26034)
-- Name: vne_floor id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_floor ALTER COLUMN id SET DEFAULT nextval('"default".vne_floor_id_seq'::regclass);


--
-- TOC entry 3268 (class 2604 OID 26035)
-- Name: vne_halls id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_halls ALTER COLUMN id SET DEFAULT nextval('"default".vne_halls_id_seq'::regclass);


--
-- TOC entry 3272 (class 2604 OID 26036)
-- Name: vne_icon_translations id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_icon_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_icon_translations_id_seq'::regclass);


--
-- TOC entry 3273 (class 2604 OID 26037)
-- Name: vne_icons id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_icons ALTER COLUMN id SET DEFAULT nextval('"default".vne_icons_id_seq'::regclass);


--
-- TOC entry 3276 (class 2604 OID 26038)
-- Name: vne_ingredient_types id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_ingredient_types ALTER COLUMN id SET DEFAULT nextval('"default".vne_ingredient_types_id_seq'::regclass);


--
-- TOC entry 3278 (class 2604 OID 26039)
-- Name: vne_ingredients id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_ingredients ALTER COLUMN id SET DEFAULT nextval('"default".vne_ingredients_id_seq'::regclass);


--
-- TOC entry 3282 (class 2604 OID 26040)
-- Name: vne_langs id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_langs ALTER COLUMN id SET DEFAULT nextval('"default".vne_langs_id_seq'::regclass);


--
-- TOC entry 3288 (class 2604 OID 26041)
-- Name: vne_mailtemplate_translations id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_mailtemplate_translations_id_seq'::regclass);


--
-- TOC entry 3289 (class 2604 OID 26042)
-- Name: vne_mailtemplates id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_mailtemplates ALTER COLUMN id SET DEFAULT nextval('"default".vne_mailtemplates_id_seq'::regclass);


--
-- TOC entry 3291 (class 2604 OID 26043)
-- Name: vne_order_group id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_order_group ALTER COLUMN id SET DEFAULT nextval('"default".vne_order_group_id_seq'::regclass);


--
-- TOC entry 3293 (class 2604 OID 26044)
-- Name: vne_order_product_ingredients id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_order_product_ingredients ALTER COLUMN id SET DEFAULT nextval('"default".vne_order_product_ingredients_id_seq'::regclass);


--
-- TOC entry 3295 (class 2604 OID 26045)
-- Name: vne_order_products id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_order_products ALTER COLUMN id SET DEFAULT nextval('"default".vne_order_products_id_seq'::regclass);


--
-- TOC entry 3299 (class 2604 OID 26046)
-- Name: vne_orders id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_orders ALTER COLUMN id SET DEFAULT nextval('"default".vne_orders_id_seq'::regclass);


--
-- TOC entry 3311 (class 2604 OID 26047)
-- Name: vne_payment_config id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_payment_config ALTER COLUMN id SET DEFAULT nextval('"default".vne_payment_config_id_seq'::regclass);


--
-- TOC entry 3315 (class 2604 OID 26048)
-- Name: vne_payment_intent id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_payment_intent ALTER COLUMN id SET DEFAULT nextval('"default".vne_payment_intent_id_seq'::regclass);


--
-- TOC entry 3318 (class 2604 OID 26049)
-- Name: vne_payment_settings id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_payment_settings ALTER COLUMN id SET DEFAULT nextval('"default".vne_payment_settings_id_seq'::regclass);


--
-- TOC entry 3323 (class 2604 OID 26050)
-- Name: vne_product_images id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_product_images ALTER COLUMN id SET DEFAULT nextval('"default".vne_product_images_id_seq'::regclass);


--
-- TOC entry 3325 (class 2604 OID 26051)
-- Name: vne_products id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_products ALTER COLUMN id SET DEFAULT nextval('"default".vne_products_id_seq'::regclass);


--
-- TOC entry 3336 (class 2604 OID 26052)
-- Name: vne_qr_config id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_qr_config ALTER COLUMN id SET DEFAULT nextval('"default".vne_qr_config_id_seq'::regclass);


--
-- TOC entry 3353 (class 2604 OID 26053)
-- Name: vne_restaurants id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_restaurants ALTER COLUMN id SET DEFAULT nextval('"default".vne_restaurants_id_seq'::regclass);


--
-- TOC entry 3397 (class 2604 OID 26872)
-- Name: vne_review id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_review ALTER COLUMN id SET DEFAULT nextval('"default".vne_review_id_seq'::regclass);


--
-- TOC entry 3357 (class 2604 OID 26054)
-- Name: vne_room id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room ALTER COLUMN id SET DEFAULT nextval('"default".vne_room_id_seq'::regclass);


--
-- TOC entry 3361 (class 2604 OID 26055)
-- Name: vne_room_type id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room_type ALTER COLUMN id SET DEFAULT nextval('"default".vne_room_type_id_seq'::regclass);


--
-- TOC entry 3364 (class 2604 OID 26056)
-- Name: vne_room_type_translation id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room_type_translation ALTER COLUMN id SET DEFAULT nextval('"default".vne_room_type_translation_id_seq'::regclass);


--
-- TOC entry 3365 (class 2604 OID 26057)
-- Name: vne_serving_translations id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_serving_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_serving_translations_id_seq'::regclass);


--
-- TOC entry 3366 (class 2604 OID 26058)
-- Name: vne_servings id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_servings ALTER COLUMN id SET DEFAULT nextval('"default".vne_servings_id_seq'::regclass);


--
-- TOC entry 3369 (class 2604 OID 26059)
-- Name: vne_settings id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_settings ALTER COLUMN id SET DEFAULT nextval('"default".vne_settings_id_seq'::regclass);


--
-- TOC entry 3373 (class 2604 OID 26060)
-- Name: vne_subscription id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_subscription ALTER COLUMN id SET DEFAULT nextval('"default".vne_subscription_id_seq'::regclass);


--
-- TOC entry 3375 (class 2604 OID 26061)
-- Name: vne_tables id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_tables ALTER COLUMN id SET DEFAULT nextval('"default".vne_tables_id_seq'::regclass);


--
-- TOC entry 3380 (class 2604 OID 26062)
-- Name: vne_transactions id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_transactions ALTER COLUMN id SET DEFAULT nextval('"default".vne_transactions_id_seq'::regclass);


--
-- TOC entry 3385 (class 2604 OID 26063)
-- Name: vne_units id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_units ALTER COLUMN id SET DEFAULT nextval('"default".vne_units_id_seq'::regclass);


--
-- TOC entry 3386 (class 2604 OID 26064)
-- Name: vne_units_translations id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_units_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_units_translations_id_seq'::regclass);


--
-- TOC entry 3387 (class 2604 OID 26065)
-- Name: vne_word_translations id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_word_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_word_translations_id_seq'::regclass);


--
-- TOC entry 3388 (class 2604 OID 26066)
-- Name: vne_wordbooks id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_wordbooks ALTER COLUMN id SET DEFAULT nextval('"default".vne_wordbooks_id_seq'::regclass);


--
-- TOC entry 3390 (class 2604 OID 26067)
-- Name: vne_words id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_words ALTER COLUMN id SET DEFAULT nextval('"default".vne_words_id_seq'::regclass);


--
-- TOC entry 3392 (class 2604 OID 26068)
-- Name: vne_wsservers id; Type: DEFAULT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_wsservers ALTER COLUMN id SET DEFAULT nextval('"default".vne_wsservers_id_seq'::regclass);


--
-- TOC entry 3740 (class 0 OID 25545)
-- Dependencies: 201
-- Data for Name: order_group; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".order_group (id, created_at) FROM stdin;
1	2023-05-03 15:18:28.879132
122	2023-05-18 14:33:31.504649
129	2023-05-19 09:46:17.269822
131	2023-05-19 10:26:39.111641
132	2023-05-19 10:31:58.62786
100	2023-05-08 17:10:49.821367
119	2023-05-09 16:30:10.922835
135	2023-07-02 13:37:49.219257
\.


--
-- TOC entry 3742 (class 0 OID 25551)
-- Dependencies: 203
-- Data for Name: qr_config; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".qr_config (id, restaurant_id, "createdAt") FROM stdin;
\.


--
-- TOC entry 3744 (class 0 OID 25557)
-- Dependencies: 205
-- Data for Name: vne_admingroups; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_admingroups (id, name, title, defended) FROM stdin;
1	owners	Owners	t
\.


--
-- TOC entry 3746 (class 0 OID 25566)
-- Dependencies: 207
-- Data for Name: vne_admins; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_admins (id, admingroup_id, name, email, password, img, active, defended) FROM stdin;
1	1	Alex	7573497@gmail.com	$2b$10$BBFjulN8d2kWvPC6lbaOduhDRd0l59lOHEF6fKTd3yrSm6SW0q9t.	2021-8/1629929025223_150.jpg	t	t
6	1	Иван Петров	viovalya@gmail.com	$2b$10$d/AHzrLN7/2iu9DjVOuIEuo4.AIg3mMNU0TWGkdNZZ5kSjn5oe7SW	2021-9/1632435404692_150.jpg	t	f
7	1	Pavlo	pavlo@pavlo.pavlo	$2b$10$ebW1b6Jco1S9zsUCpTfjx.9orYj/trP/FJXRfulkrdys6x3cPp4Iu	\N	t	f
\.


--
-- TOC entry 3840 (class 0 OID 26719)
-- Dependencies: 301
-- Data for Name: vne_allergen; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_allergen (id, pos) FROM stdin;
1	0
2	0
3	0
4	0
5	0
6	0
7	0
8	0
9	0
10	0
11	0
12	0
13	0
14	0
15	0
16	0
18	0
20	0
\.


--
-- TOC entry 3838 (class 0 OID 26708)
-- Dependencies: 299
-- Data for Name: vne_allergen_translation; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_allergen_translation (id, allergen_id, lang_id, restaurant_id, name) FROM stdin;
1	1	8	\N	اللاكتوز
2	1	1	\N	Лактоза
3	1	2	\N	Lactose
4	2	8	\N	خردل
5	2	1	\N	Горчица 
6	2	2	\N	 Mustard
7	3	8	\N	كرفس
8	3	1	\N	Сельдерей
9	3	2	\N	Celery
10	4	8	\N	الغولتين
11	4	1	\N	Глютен
12	4	2	\N	Gluten
13	5	8	\N	القشريات
14	5	1	\N	Ракообразные
15	5	2	\N	Crustaceans
16	6	8	\N	بيض
17	6	1	\N	Яйца
18	6	2	\N	Eggs
19	7	8	\N	سمكة
20	7	1	\N	Рыба
21	7	2	\N	Fish
22	8	8	\N	المحار
23	8	1	\N	Моллюски
24	8	2	\N	Shellfish
25	9	8	\N	المكسرات
26	9	1	\N	Орехи
27	9	2	\N	Nuts 
28	10	8	\N	الفول السوداني
29	10	1	\N	Арахис
30	10	2	\N	Peanut
31	11	8	\N	الترمس
32	11	1	\N	Люпин
33	11	2	\N	Lupine
34	12	8	\N	سمسم
35	12	1	\N	Кунжут
36	12	2	\N	Sesame
37	13	8	\N	فول الصويا
38	13	1	\N	Соя
39	13	2	\N	Soya
40	14	8	\N	كبريتيت
41	14	1	\N	Сульфиты
42	14	2	\N	Sulfites
43	15	8	\N	قمح
44	15	1	\N	Пшеница
45	15	2	\N	Wheat
46	16	8	\N	الحبوب
47	16	1	\N	Злаки
48	16	2	\N	Cereals
52	18	8	\N	جمبري
53	18	1	\N	Креветки 
54	18	2	\N	Shrimps
58	20	8	\N	الحبار
59	20	1	\N	Кальмары
60	20	2	\N	squids
\.


--
-- TOC entry 3748 (class 0 OID 25576)
-- Dependencies: 209
-- Data for Name: vne_auth_logs; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_auth_logs (id, created_at, ip, device, browser, admin_id, employee_id) FROM stdin;
1	2023-04-28 15:25:51.164922	::1	Apple Macintosh Mac OS 10.15.7	Chrome 112.0.0.0	\N	53
2	2023-04-30 08:33:37.096115	::1	Apple Macintosh Mac OS 10.15.7	Chrome 112.0.0.0	\N	53
3	2023-05-17 09:01:37.871095	::1	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	7	\N
4	2023-05-17 09:04:48.026416	::1	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	7	\N
5	2023-05-18 14:17:47.968225	::1	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	7	\N
6	2023-05-18 16:22:51.472382	::1	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	7	\N
7	2023-05-18 21:18:52.166106	::1	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	\N	53
8	2023-05-19 11:01:48.478733	::1	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	\N	53
9	2023-05-20 10:20:25.68632	::1	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	\N	53
10	2023-05-24 12:07:45.500882	::1	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	7	\N
11	2023-06-07 13:03:56.979239	2.58.194.138	Windows 10	Chrome 114.0.0.0	\N	53
12	2023-06-07 13:46:12.447831	213.111.87.17	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	\N	53
13	2023-06-14 07:01:53.994046	178.133.121.42	mobile Samsung SM-G986N Android 13	Chrome WebView 113.0.5672.76	\N	53
14	2023-06-14 08:21:46.716341	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	\N	53
15	2023-06-14 10:59:48.172183	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 113.0.0.0	\N	53
16	2023-06-14 12:30:37.642491	31.43.37.196	Windows 10	Chrome 114.0.0.0	7	\N
17	2023-06-15 06:54:42.713673	31.43.37.196	Windows 10	Chrome 114.0.0.0	\N	56
18	2023-06-15 09:09:30.665153	109.251.97.243	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	7	\N
19	2023-06-15 10:02:51.121077	37.57.120.80	mobile Xiaomi Mi 9 Lite Android 11	Chrome WebView 89.0.4389.105	\N	53
20	2023-06-15 13:57:09.808286	17.222.115.114	Apple Macintosh Mac OS 10.15.7	WebKit 605.1.15	\N	56
21	2023-06-16 06:29:58.091507	31.43.37.196	Windows 10	Chrome 114.0.0.0	7	\N
22	2023-06-16 06:32:02.804761	31.43.37.196	Windows 10	Chrome 114.0.0.0	\N	56
23	2023-06-16 07:08:13.305181	31.43.37.196	Windows 10	Chrome 114.0.0.0	\N	56
24	2023-06-16 11:32:56.696875	213.111.86.99	mobile Apple iPhone iOS 16.5	WebKit 605.1.15	\N	53
25	2023-06-19 09:15:46.655566	31.43.60.161	Windows 10	Chrome 114.0.0.0	\N	56
26	2023-06-20 08:22:28.875994	213.111.86.99	mobile Apple iPhone iOS 16.5	WebKit 605.1.15	\N	53
27	2023-06-20 08:25:33.411905	213.111.86.99	mobile Xiaomi Mi 9 Lite Android 11	Chrome WebView 89.0.4389.105	\N	53
28	2023-06-20 08:57:46.802712	213.111.86.99	mobile Apple iPhone iOS 14.4	WebKit 605.1.15	\N	56
29	2023-06-20 11:42:45.391087	213.111.86.99	mobile Apple iPhone iOS 14.4	WebKit 605.1.15	\N	56
30	2023-06-20 12:03:46.916188	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	56
31	2023-06-21 11:38:26.933022	109.251.97.243	mobile Apple iPhone iOS 16.5	WebKit 605.1.15	\N	53
32	2023-06-21 11:46:27.973714	37.57.120.80	mobile Xiaomi Mi 9 Lite Android 11	Chrome WebView 89.0.4389.105	\N	53
33	2023-06-21 12:01:03.193706	37.57.120.80	mobile Xiaomi Mi 9 Lite Android 11	Chrome WebView 89.0.4389.105	\N	53
34	2023-06-21 12:04:26.956001	109.251.97.243	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	56
35	2023-06-21 12:05:23.236653	109.251.97.243	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	53
36	2023-06-21 12:22:41.649338	109.251.97.243	mobile Apple iPhone iOS 14.4	WebKit 605.1.15	\N	53
37	2023-06-21 12:43:42.960088	31.43.37.196	Windows 10	Chrome 114.0.0.0	\N	53
38	2023-06-21 12:44:59.568594	31.43.37.196	Windows 10	Chrome 114.0.0.0	\N	56
39	2023-06-21 12:45:12.826106	31.43.37.196	Windows 10	Chrome 114.0.0.0	\N	53
40	2023-06-21 12:48:11.739159	31.43.37.196	Windows 10	Chrome 114.0.0.0	\N	55
41	2023-06-23 10:50:07.884654	109.251.97.243	mobile Apple iPhone iOS 14.4	WebKit 605.1.15	\N	56
42	2023-06-23 11:42:10.084113	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	56
43	2023-06-23 11:58:32.531097	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	53
44	2023-06-23 12:06:23.775902	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	56
45	2023-06-23 12:12:47.779331	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	53
46	2023-06-23 12:14:28.989383	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	56
47	2023-06-23 12:19:36.206703	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	56
48	2023-06-23 12:23:34.699664	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	56
49	2023-06-23 12:26:39.327946	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	56
50	2023-06-23 12:29:40.044257	213.111.86.99	Apple Macintosh Mac OS 10.15.7	WebKit 605.1.15	\N	56
51	2023-06-23 12:34:12.415513	213.111.86.99	Apple Macintosh Mac OS 10.15.7	WebKit 605.1.15	\N	56
52	2023-06-26 06:10:18.032609	119.8.240.33	mobile Huawei CLT-L29 Android 8.1.0	Chrome WebView 101.0.4951.41	\N	56
53	2023-06-26 06:11:53.581816	119.8.240.33	mobile Huawei LIO-L29 Android 10	Chrome WebView 88.0.4324.93	\N	56
54	2023-06-26 10:35:50.839732	31.43.60.161	mobile Google Pixel 7 Android 13	Chrome WebView 114.0.5735.131	\N	56
55	2023-06-26 10:37:04.772729	31.43.60.161	Windows 10	Chrome 114.0.0.0	\N	56
56	2023-06-27 08:38:39.953107	119.8.240.30	mobile Huawei MAR-L23A Android 9	Chrome WebView 114.0.5735.131	\N	56
57	2023-06-27 08:41:17.527271	119.8.240.32	mobile Huawei ANA-N29 Android 10	Chrome WebView 88.0.4324.93	\N	56
58	2023-06-27 14:17:19.857829	213.111.86.99	Apple Macintosh Mac OS 10.15.7	WebKit 605.1.15	\N	56
59	2023-06-27 14:19:07.897746	213.111.86.99	Apple Macintosh Mac OS 10.15.7	WebKit 605.1.15	\N	53
60	2023-06-27 14:22:21.389868	213.111.86.99	Apple Macintosh Mac OS 10.15.7	WebKit 605.1.15	\N	53
61	2023-06-27 14:25:35.740472	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	53
62	2023-06-27 14:27:09.23289	213.111.86.99	mobile Apple iPhone iOS 16.4	WebKit 605.1.15	\N	53
63	2023-06-27 14:28:51.494253	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
64	2023-06-27 14:30:22.380785	213.111.86.99	Apple Macintosh Mac OS 10.15.7	WebKit 605.1.15	\N	53
65	2023-06-27 18:13:50.735654	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	53
66	2023-06-27 18:14:01.241974	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
67	2023-06-27 18:52:11.676831	91.232.30.149	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
68	2023-06-27 23:42:46.113749	213.111.86.99	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
69	2023-06-28 23:54:03.447505	17.222.114.47	Apple Macintosh Mac OS 10.15.7	WebKit 605.1.15	\N	56
70	2023-06-28 23:56:34.486388	17.222.114.47	Apple Macintosh Mac OS 10.15.7	WebKit 605.1.15	\N	56
71	2023-06-30 14:00:14.972779	109.251.97.243	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	53
72	2023-06-30 14:04:40.872948	139.178.128.8	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
73	2023-07-01 06:17:37.903948	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
74	2023-07-01 06:20:22.795983	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	53
75	2023-07-01 06:21:52.24414	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	7	\N
76	2023-07-01 07:25:26.932519	94.204.98.124	mobile Samsung SM-S908E Android 13	Chrome WebView 114.0.5735.130	\N	56
77	2023-07-01 21:26:45.051581	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	53
78	2023-07-01 23:30:24.289084	139.178.128.12	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
79	2023-07-02 12:17:58.585827	139.178.128.11	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
80	2023-07-02 12:31:03.365093	17.232.94.73	Apple Macintosh Mac OS 10.15.7	WebKit 605.1.15	\N	56
81	2023-07-02 13:32:20.071169	94.204.98.124	Windows 10	Chrome 114.0.0.0	\N	56
82	2023-07-02 13:32:53.038063	94.204.98.124	Windows 10	Chrome 114.0.0.0	7	\N
83	2023-07-02 20:17:20.388562	139.178.130.74	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
84	2023-07-05 12:57:53.515633	31.43.60.161	Windows 10	Chrome 114.0.0.0	\N	56
85	2023-07-05 12:59:19.546186	31.43.60.161	Windows 10	Chrome 114.0.0.0	7	\N
86	2023-07-05 13:03:40.700848	195.78.92.159	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
87	2023-07-05 13:05:48.639188	195.78.92.159	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	7	\N
88	2023-07-05 13:58:10.688186	195.78.92.159	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
89	2023-07-05 13:59:11.464342	195.78.92.159	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
90	2023-07-05 15:27:27.233279	213.139.213.19	mobile LG Nexus 5 Android 6.0	Chrome 114.0.0.0	\N	53
91	2023-07-05 16:49:08.257642	213.139.213.19	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
92	2023-07-05 17:58:25.048289	109.108.83.233	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
93	2023-07-05 21:42:46.510479	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
94	2023-07-05 21:52:06.184203	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
95	2023-07-08 19:23:49.550904	139.178.131.20	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
96	2023-07-08 19:25:31.372113	139.178.131.20	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
97	2023-07-09 15:39:03.891454	139.178.128.10	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
98	2023-07-10 10:20:23.647599	139.178.128.209	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
99	2023-07-10 22:26:22.78104	139.178.131.29	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
100	2023-07-11 07:25:49.32058	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
101	2023-07-14 07:58:10.783329	213.111.86.99	mobile Samsung SM-G965U1 Android 10	Chrome WebView 114.0.5735.196	\N	53
102	2023-07-14 09:34:08.604091	213.111.86.99	mobile Samsung SM-G965U1 Android 10	Chrome WebView 114.0.5735.196	\N	53
103	2023-07-14 10:12:17.456813	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
104	2023-07-14 13:12:29.202365	139.178.128.14	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
105	2023-07-14 16:58:14.4302	139.178.129.12	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
106	2023-07-14 17:01:26.062292	139.178.129.12	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
107	2023-07-16 06:19:16.004233	139.178.131.83	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
108	2023-07-16 19:20:32.118725	213.111.86.99	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	53
109	2023-07-16 19:22:01.632618	213.111.86.99	mobile Apple iPhone iOS 16.5	Chrome 114.0.5735.124	\N	53
110	2023-07-17 04:52:46.756372	109.251.97.243	mobile sdk_gphone_x86_64 Android 13	Chrome WebView 103.0.5060.71	\N	53
111	2023-07-17 05:10:04.935064	31.43.60.161	mobile Google Pixel 7 Android 13	Chrome WebView 114.0.5735.196	\N	53
112	2023-07-17 20:18:41.934907	139.178.131.74	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
113	2023-07-18 02:37:48.588339	139.178.131.28	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
114	2023-07-18 08:32:36.881457	139.178.128.209	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
115	2023-07-18 13:23:29.050822	62.4.34.190	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
116	2023-07-18 13:49:26.666513	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	53
117	2023-07-18 19:07:06.573457	2a00:f29:2e0:59c0:2825:25a7:596b:ea08	Windows 10	Chrome 114.0.0.0	\N	56
118	2023-07-19 14:24:22.650852	2a00:f29:2e0:5b77:353c:894d:6215:df26	mobile K Android 10	Chrome 114.0.0.0	\N	56
119	2023-07-20 10:38:43.61035	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	58
120	2023-07-21 15:47:16.729147	109.251.97.243	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	53
121	2023-07-22 23:24:11.934974	139.178.131.77	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
122	2023-07-24 00:26:37.889212	139.178.131.27	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
123	2023-07-24 08:04:46.340357	91.188.116.162	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	56
124	2023-07-24 08:20:54.484126	31.43.60.161	Windows 10	Edge 115.0.1901.183	\N	53
125	2023-07-24 08:28:13.705443	213.111.86.99	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	\N	53
126	2023-07-24 09:00:50.031534	217.165.22.232	Windows 10	Chrome 114.0.0.0	\N	53
127	2023-07-24 09:23:12.004588	213.111.86.99	mobile LG Nexus 5 Android 6.0	Chrome 114.0.0.0	7	\N
128	2023-07-24 09:26:28.448054	109.251.97.243	Apple Macintosh Mac OS 10.15.7	Chrome 114.0.0.0	7	\N
129	2023-07-24 10:26:49.599372	139.178.130.74	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
130	2023-07-24 10:27:57.663118	139.178.130.74	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
131	2023-07-25 09:50:32.778216	213.111.86.99	mobile LG Nexus 5 Android 6.0	Chrome 114.0.0.0	\N	53
132	2023-07-25 11:10:00.183955	213.111.86.99	mobile LG Nexus 5 Android 6.0	Chrome 114.0.0.0	\N	53
133	2023-07-25 11:10:54.556811	213.111.86.99	mobile LG Nexus 5 Android 6.0	Chrome 114.0.0.0	\N	53
134	2023-07-28 12:52:55.03056	31.144.168.228	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	53
135	2023-07-28 13:12:21.651852	31.144.168.228	mobile Apple iPhone iOS 16.5	Chrome 115.0.5790.130	\N	53
136	2023-07-28 17:57:42.421135	213.5.131.53	mobile Samsung SM-S901N Android 9	Chrome WebView 91.0.4472.114	\N	56
137	2023-07-29 18:38:57.136064	139.178.131.16	mobile Apple iPhone iOS 16.5.1	WebKit 605.1.15	\N	56
138	2023-07-30 19:07:43.737953	88.155.20.7	mobile Samsung SM-M336B Android 13	Chrome WebView 111.0.5563.116	\N	56
139	2023-07-31 14:10:12.525812	87.200.171.178	Windows 10	Firefox 115.0	\N	9
140	2023-07-31 14:14:48.428864	87.200.171.178	Windows 10	Firefox 115.0	\N	59
\.


--
-- TOC entry 3750 (class 0 OID 25585)
-- Dependencies: 211
-- Data for Name: vne_balance_settings; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_balance_settings (id, vat, tax, payment_gateway_fee, vat_enabled, tax_enabled, payment_gateway_fee_enabled) FROM stdin;
1	3	2.3	4.2	t	t	t
\.


--
-- TOC entry 3752 (class 0 OID 25593)
-- Dependencies: 213
-- Data for Name: vne_cats; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_cats (id, restaurant_id, icon_id, name, pos, active) FROM stdin;
4	21	14	Фрукты	7	t
7	21	11	Мороженое	8	t
2	21	4	Хлеб	9	t
17	21	17	Вино	10	t
8	21	13	Пицца	2	t
6	9	8	Тестовая	1	t
18	51	2	тест	1	t
19	54	9	Burger	1	t
12	21	5	Десерты	6	t
1	21	9	Бургеры	1	t
9	21	8	Рыба	3	t
3	21	6	Среднеазиатская Кухня	4	t
10	21	12	Острые Блюда	5	t
20	54	8	Fish	1	t
22	54	\N	Appetizers	0	t
21	54	17	Alcohol	3	t
\.


--
-- TOC entry 3754 (class 0 OID 25603)
-- Dependencies: 215
-- Data for Name: vne_currencies; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_currencies (id, name, symbol, pos, defended) FROM stdin;
3	USD	$	3	f
2	EUR	€	2	f
4	CHF	₣	4	f
5	AED	د.إ	5	f
1	RUB	₽	1	t
\.


--
-- TOC entry 3756 (class 0 OID 25613)
-- Dependencies: 217
-- Data for Name: vne_employee_status_translations; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_employee_status_translations (id, employee_status_id, lang_id, name) FROM stdin;
1	1	1	выходной
2	1	2	day off
6	3	1	обед
15	2	8	عمل
16	1	8	يوم عطلة
14	3	8	عشاء
4	2	1	работа
5	2	2	on shift
7	3	2	lunch
\.


--
-- TOC entry 3758 (class 0 OID 25621)
-- Dependencies: 219
-- Data for Name: vne_employee_statuses; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_employee_statuses (id, color, pos) FROM stdin;
3	#f88413	3
2	#24b83f	1
1	#ff0000	2
\.


--
-- TOC entry 3760 (class 0 OID 25631)
-- Dependencies: 221
-- Data for Name: vne_employees; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_employees (id, restaurant_id, employee_status_id, email, password, name, phone, is_admin, created_at, defended) FROM stdin;
6	18	\N	7573498@gmail.com	123	\N	\N	t	2021-08-27 22:30:50.941314	t
7	19	\N	7573499@gmail.com	123	\N	\N	t	2021-08-28 00:39:48.284041	t
51	21	\N	myshkin@gmail.com	$2b$10$yKVku5ppFK00kuueMPtMi.g22YpPQjXJBS9RZwhFXfJgeDSXI8EZS	Мышкин Анатолий		f	2021-10-17 22:45:14.438169	f
3	\N	1	viovalya@gmail.com	$2b$10$Kif/QFeeEAC4K00XRKmfueMbCo.OvqG0gu28VR6KqYtwsA5bxfOKi	Лисичкин Виктор	+38123444444443	f	2021-08-26 22:03:00.332342	f
2	10	1	admin@vio.net.ua		Мышкин Иван	+38 095 2010000	t	2021-08-26 21:32:06.303446	f
48	21	\N	koshkin@gmail.com	$2b$10$jNy/pKG5TkIxmr6Tt8ksH.PL8vAuOEpK75ZMC5tIj.95ysgT8E8QS	Уткин Олег	+380664021350	f	2021-10-11 15:36:57.822037	f
36	21	1	bednenko@gmail.com	$2b$10$YxvpyUA1UJXhZnBUrsbXCOzUtFRbhx7ibOGkTHBeeECV0ZiLqDpPi	Коровкин Федор	\N	f	2021-09-08 17:44:35.220428	f
28	45	\N	75734974444@gmail.com	$2b$10$o2Y63TUS9aBVLLpNAkS9IOMVb2TvEKCjUtg3tADQTnsJI/zrTqBJe	\N	\N	t	2021-09-02 21:07:52.119825	t
29	9	\N	7573497777@gmail.com	$2b$10$lrWJKgjzIhv6qDzSD6AcZOjh2KO9k5x3K5tVjQJ3q58ZgF/uSQKj6	Петров Андрей	+380664000050	t	2021-09-03 01:41:45.691878	f
31	46	\N	7573497rr@gmail.com	$2b$10$4KyYx5FqOrFutyLB7Ls2oe82rMzNIGvQ/24YWJ1QivWSTFs4gSEpm	\N	\N	t	2021-09-07 01:16:30.429325	t
32	15	\N	7573497999@gmail.com	$2b$10$IjNiwNYzTFdFc.r.fMYWo.sa5Mbm9ebMnABxBYaYfXDKdeJJnL9om	Пушкин А.	+380664028899	t	2021-09-07 02:03:30.360362	f
1	1	\N	somemeail@gmail.com		Кошкин Алексей	+38 066 4020000	t	2021-08-26 21:31:03.512723	t
52	21	\N	sobachkin@gmail.com	$2b$10$h0G22sKoxDBz78UA0N2FRuhheAl6udF.psF30QBNt7VUCmr/H7Gl6	Собачкин Дмитрий	02	f	2021-10-17 22:52:43.00176	f
9	21	2	7573497@gmail.com	$2b$10$6/0Jov3ci2G97p7Z6C5NcuMfoB5ic4m7upRDdwXowhN3d/UmLOVgm	Кошкин Алексей	\N	t	2021-08-28 11:12:59.882811	t
30	43	\N	7573497111@gmail.com	$2b$10$ZugM9ReCVctvQ9CdfPF7wucHDF8Tu7cTJyC9zXfbCgkZEMn12xgsm	Безымянный Андрей	+380664000000	f	2021-09-04 12:48:30.239362	f
27	\N	\N	75734975555@gmail.com	$2b$10$RXTYMD2BBvxYo/J2o2VXCuPSe2OY6cOTCSGx5i8Dl2/VzTlXLMfwu	Чепига Алексей	+380660000000	f	2021-09-02 12:59:04.543675	f
10	22	\N	757349788@gmail.com	123	Петров Алексей	\N	t	2021-08-28 11:27:23.119406	t
24	38	\N	viovalya3@gmail.com	$2b$10$55Yr5WOoTrh2TD3DnyXEh.thX6oFeE459/qpt1hxOI93hWHW6lY8u	Иванов Алексей	+380664021350	t	2021-08-30 12:54:22.738402	t
54	51	\N	test+2@test.com	$2b$10$JedLrR3paKtfsHjDkzZle.z.cfHHsnGQWnbpH48P.ZyeYF5c0RMhi	Тест Сотрудник	\N	t	2023-03-30 12:00:14.822123	f
55	21	\N	test@test.com	$2b$10$CCjbCKI/jaqUMXj5nFChv.r.gkQgXKQePMUHWkIkoRG4QZolPXzGK	test	\N	t	2023-04-05 15:40:05.274337	f
57	53	\N	1341111@mail.ru	$2b$10$n.2KfgB8y57hxDSFVsbcX.yDjHcvJxZK1AVHTNQHR8VbTLQjBd9.a	\N	\N	t	2023-07-02 13:50:06.381673	t
58	21	\N	test123@gmail.com	$2b$10$EGE6xO9TD1yCqD0cWyOQCeTGyfD7CUktXQJ/Q0y1uA8QnZCaKkzXG	Test Waiter		f	2023-07-20 10:38:36.273191	f
56	54	2	test@restorator.com	$2b$10$YHQigmHEU/K8x6Q0mN79w.kVGiOyZQ0MW6hrkYGj/Bp3qxzGuDWRq	Test Account	\N	t	2023-06-15 06:54:40.369398	f
59	55	\N	mr666amr@gmail.com	$2b$10$vqnXhvq0M0Kp/lj50OUz/u4H0RHQtn5KRjZC/CyNZ3yHqJa2HRsu2	\N	\N	t	2023-07-31 14:14:34.108227	t
53	54	2	pavel.nykytiuk@gmail.com	$2b$10$QmRbmEiHQ8uW3GqCApVuN.Brtdb/75b8VP95kIvHj3X9FM3h2a8I6	Test	\N	t	2023-03-15 12:42:44.113818	f
\.


--
-- TOC entry 3762 (class 0 OID 25642)
-- Dependencies: 223
-- Data for Name: vne_facility_type; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_facility_type (id, is_hotel) FROM stdin;
10	t
\.


--
-- TOC entry 3764 (class 0 OID 25648)
-- Dependencies: 225
-- Data for Name: vne_facility_type_translation; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_facility_type_translation (id, type_id, lang_id, name) FROM stdin;
22	10	8	Hotel
23	10	1	Hotel
24	10	2	Hotel
\.


--
-- TOC entry 3766 (class 0 OID 25656)
-- Dependencies: 227
-- Data for Name: vne_floor; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_floor (id, restaurant_id, nx, ny, number) FROM stdin;
1	\N	5	5	12
2	51	5	5	5
8	9	7	4	12
9	54	5	5	1
10	54	5	5	1
\.


--
-- TOC entry 3768 (class 0 OID 25663)
-- Dependencies: 229
-- Data for Name: vne_halls; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_halls (id, restaurant_id, name, nx, ny, pos) FROM stdin;
3	9	Зал 1	5	5	1
2	21	Blue	4	4	2
4	21	Green	5	5	3
24	54	Ребрышки	20	3	2
18	21	Red	4	3	1
23	54	1	4	4	1
\.


--
-- TOC entry 3770 (class 0 OID 25674)
-- Dependencies: 231
-- Data for Name: vne_icon_translations; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_icon_translations (id, icon_id, lang_id, name) FROM stdin;
4	2	1	Курица
5	2	2	Chicken
6	3	1	Бекон
7	3	2	Bacon
8	4	1	Хлеб
9	4	2	Bread
10	5	1	Сыр
11	5	2	Cheese
12	6	1	Печенье
13	6	2	Cookie
14	7	1	Яйцо
15	7	2	Egg
16	8	1	Рыба
17	8	2	Fish
18	9	1	Гамбургер
19	9	2	Hamburger
20	10	1	Хотдог
21	10	2	Hotdog
22	11	1	Мороженое
23	11	2	Ice cream
24	12	1	Перец
25	12	2	Pepper
26	13	1	Пицца
27	13	2	Pizza
28	14	1	Лимон
29	14	2	Lemon
47	17	1	Алкоголь
48	17	2	Alcohol
49	2	8	فرخة
50	3	8	لحم خنزير مقدد
51	4	8	خبز
52	5	8	جبنه
53	6	8	بسكويت
54	7	8	بيضة
55	8	8	سمكة
56	9	8	همبرغر
57	10	8	نقانق
58	11	8	بوظة
59	12	8	الفلفل
60	13	8	بيتزا
61	14	8	ليمون
62	17	8	الكحول
63	18	8	default-qr-icon-1
64	18	1	default-qr-icon-1
65	18	2	default-qr-icon-1
66	19	8	default-qr-icon-2
67	19	1	default-qr-icon-2
68	19	2	default-qr-icon-2
69	20	8	default-qr-icon-3
70	20	1	default-qr-icon-3
71	20	2	default-qr-icon-3
\.


--
-- TOC entry 3772 (class 0 OID 25682)
-- Dependencies: 233
-- Data for Name: vne_icons; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_icons (id, img, pos, type) FROM stdin;
2	2021-9/1632167887039.svg	1	category
3	2021-9/1632167965070.svg	2	category
4	2021-9/1632168036661.svg	3	category
5	2021-9/1632168063129.svg	4	category
6	2021-9/1632168098919.svg	5	category
7	2021-9/1632168122445.svg	6	category
8	2021-9/1632168156771.svg	7	category
9	2021-9/1632168188447.svg	8	category
10	2021-9/1632168226617.svg	9	category
11	2021-9/1632168252118.svg	10	category
12	2021-9/1632168279908.svg	11	category
13	2021-9/1632168338978.svg	12	category
14	2021-9/1632168372867.svg	13	category
17	2021-10/1634920564664.svg	14	category
18	2023-5/1684866707649.svg	0	category
19	2023-5/1684866723459.svg	1	category
20	2023-5/1684866800915.svg	2	category
\.


--
-- TOC entry 3774 (class 0 OID 25692)
-- Dependencies: 235
-- Data for Name: vne_ingredient_types; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_ingredient_types (id, name, price, unit_id, restaurant_id) FROM stdin;
1	Cheese 	10	2	21
2	Salmon	100	2	54
3	Salt	10	2	54
4	Cheese	20	2	54
5	Sour	100	3	54
7	Soy sause	50	3	54
8	Lettuce	20	2	54
6	Говядина 	1000	2	54
\.


--
-- TOC entry 3776 (class 0 OID 25701)
-- Dependencies: 237
-- Data for Name: vne_ingredients; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_ingredients (id, product_id, name, pos, excludable, amount, type_id, unit_id) FROM stdin;
7	1		0	t	5	1	1
3	207	Ham	0	t	100	6	1
12	207	Salt	1	t	1	3	1
10	207	Lettuce	2	t	20	8	1
11	207	Cheese	3	t	50	4	1
8	208	Salmon	0	t	200	2	1
9	208	Salt	1	t	1	3	1
13	208	Sour	2	t	100	5	5
14	208	Cheese	3	t	100	4	1
\.


--
-- TOC entry 3778 (class 0 OID 25711)
-- Dependencies: 239
-- Data for Name: vne_langs; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_langs (id, slug, title, shorttitle, img, pos, active, slugable, dir, defended) FROM stdin;
1	ru	Русский	Рус	\N	1	t	f	ltr	t
2	en	English	Eng	\N	2	t	f	ltr	f
8	ar	Arabic	عربي	\N	0	t	f	rtl	f
\.


--
-- TOC entry 3780 (class 0 OID 25724)
-- Dependencies: 241
-- Data for Name: vne_mailtemplate_translations; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_mailtemplate_translations (id, mailtemplate_id, lang_id, subject, content) FROM stdin;
4	2	2	Your Restclick account	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Your account has been created in the Restclick system.</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;"><b>Access data:</b></div>\n                            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 20px;">\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Name</td><td width="10">&nbsp;</td><td>{{name}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Domain</td><td width="10">&nbsp;</td><td><a href="https://{{domain}}.restclick.vio.net.ua">https://{{domain}}.restclick.vio.net.ua</a></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Contact&nbsp;person</td><td width="10">&nbsp;</td><td>{{ownername}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Phone</td><td width="10">&nbsp;</td><td>{{phone}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Address</td><td width="10">&nbsp;</td><td>{{address}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">ITN/TIN</td><td width="10">&nbsp;</td><td>{{inn}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">PSRN</td><td width="10">&nbsp;</td><td>{{ogrn}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Currency</td><td width="10">&nbsp;</td><td>{{currency}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Language</td><td width="10">&nbsp;</td><td>{{language}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Administrator&nbsp;e-mail</td><td width="10">&nbsp;</td><td>{{email}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Administrator&nbsp;password</td><td width="10">&nbsp;</td><td>{{password}}</td></tr>\n                                <tr><td height="10"></td></tr>                                \n                            </table>\n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>\n
3	2	1	Аккаунт в системе Restclick	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Создан аккаунт в системе Restclick.</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;"><b>Данные для доступа:</b></div>\n                            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 20px;">\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Название</td><td width="10">&nbsp;</td><td>{{name}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Домен</td><td width="10">&nbsp;</td><td><a href="https://{{domain}}.restclick.vio.net.ua">https://{{domain}}.restclick.vio.net.ua</a></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">ФИО</td><td width="10">&nbsp;</td><td>{{ownername}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Телефон</td><td width="10">&nbsp;</td><td>{{phone}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Адрес</td><td width="10">&nbsp;</td><td>{{address}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">ИНН</td><td width="10">&nbsp;</td><td>{{inn}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">ОГРН</td><td width="10">&nbsp;</td><td>{{ogrn}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Валюта</td><td width="10">&nbsp;</td><td>{{currency}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Язык</td><td width="10">&nbsp;</td><td>{{language}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">E-mail&nbsp;администратора</td><td width="10">&nbsp;</td><td>{{email}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Пароль&nbsp;администратора</td><td width="10">&nbsp;</td><td>{{password}}</td></tr>\n                                <tr><td height="10"></td></tr>                             \n                            </table>\n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>\n\n\n
9	5	1	Заканчиваются средства в системе Restclick	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Внимание!</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;">\n                                <div>Средства на счету ресторана "{{name}}" в системе Restclick позволяют оплатить {{days}} дн. пользования.</div>\n                                <div>Для дальнейшего пользования не забудьте пополнить счет!</div>\n                            </div>                            \n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>\n
13	7	1	Рестораны, у которых заканчиваются средства через {{days}} дн. ({{part}}/{{parts}})	<html>\n    <body>\n        <table>\n            <tr>\n                <td><strong>Название</strong></td><td><strong>E-mail администратора</strong></td><td><strong>Телефон</strong></td>\n            </tr>\n            {{foreach restaurants r}}\n            <tr><td>{{r.name}}</td><td>{{r.email}}</td><td>{{r.phone}}</td></tr>\n            {{endforeach}}\n        </table>\n    </body>\n</html>\n
14	7	2	\N	
12	6	2	Out of funds in the Restclick system	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Attention!</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;">\n                                <div>Funds on the "{{name}}" restaurant account in the Restclick system have been exhausted.</div>\n                                <div>For further use, do not forget to recharge your account!</div>\n                            </div>                            \n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>
10	5	2	The funds in the Restclick system are running out	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Attention!</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;">\n                                <div>Funds on the "{{name}}" restaurant account in Restclick system allow you to pay {{days}} days of use.</div>\n                                <div>For further use, do not forget to recharge your account!</div>\n                            </div>                            \n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>
11	6	1	Закончились средства в системе Restclick	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Внимание!</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;">\n                                <div>Средства на счету ресторана "{{name}}" в системе Restclick исчерпаны.</div>\n                                <div>Для дальнейшего пользования не забудьте пополнить счет!</div>\n                            </div>                            \n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>
25	2	8	\N	\N
26	5	8	\N	\N
27	6	8	\N	\N
28	7	8	\N	\N
\.


--
-- TOC entry 3782 (class 0 OID 25732)
-- Dependencies: 243
-- Data for Name: vne_mailtemplates; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_mailtemplates (id, name, defended) FROM stdin;
2	[employee]restaurant-created	f
5	[employee]restaurant-low-money	f
6	[employee]restaurant-no-money	f
7	[admin]restaurants-low-no-money	f
\.


--
-- TOC entry 3784 (class 0 OID 25741)
-- Dependencies: 245
-- Data for Name: vne_order_group; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_order_group (id, created_at) FROM stdin;
1	2023-07-20 10:57:25.154696
4	2023-07-28 15:09:25.988838
\.


--
-- TOC entry 3786 (class 0 OID 25747)
-- Dependencies: 247
-- Data for Name: vne_order_product_ingredients; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_order_product_ingredients (id, order_product_id, name, included) FROM stdin;
1224	533		t
1225	535		t
1226	536		t
1227	537		t
1228	538	Хрень	t
1229	538	Была	t
1230	538	Тут	t
1231	539	Хер	t
1232	540		t
1233	541	Хрень	t
1234	541	Была	t
1235	541	Тут	t
1236	545		t
1237	548		t
1238	549		t
1239	549		t
1240	550	Хер	t
1241	550		t
1242	550		t
1243	550		t
1244	551		t
1245	551		t
1246	552		t
1247	552		t
1248	555		t
1249	557	Хер	t
1250	557		t
1251	557		t
1252	557		t
1253	558	Salmon	t
1254	558	Salt	f
1255	558	Sour	f
1256	558	Cheese	t
1257	559	Salmon	t
1258	559	Salt	t
1259	559	Sour	t
1260	559	Cheese	t
1261	560	Salmon	t
1262	560	Salt	t
1263	560	Sour	t
1264	560	Cheese	t
1265	561	Salmon	t
1266	561	Salt	t
1267	561	Sour	t
1268	561	Cheese	t
1269	562	Ham	t
1270	562	Salt	t
1271	562	Lettuce	t
1272	562	Cheese	t
1273	563	Ham	t
1274	563	Salt	t
1275	563	Lettuce	t
1276	563	Cheese	t
1277	565	Ham	t
1278	565	Salt	t
1279	565	Lettuce	t
1280	565	Cheese	t
1281	566	Ham	t
1282	566	Salt	t
1283	566	Lettuce	t
1284	566	Cheese	t
1285	568		t
1286	569	Salmon	t
1287	569	Salt	t
1288	569	Sour	t
1289	569	Cheese	t
\.


--
-- TOC entry 3788 (class 0 OID 25756)
-- Dependencies: 249
-- Data for Name: vne_order_products; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_order_products (id, order_id, serving_id, code, name, price, q, completed, img) FROM stdin;
533	284	1	h0001	Beef burger	100	3	f	2021-9/1632942969923_500.jpg
534	284	1	h0002	Cheeseburger	305	1	f	2021-9/1632351029146_500.jpg
535	251	1	h0001	Beef burger	100	1	f	2021-9/1632942969923_500.jpg
536	286	1	h0001	Beef burger	100	1	f	2021-9/1632942969923_500.jpg
537	286	1	h0001	Beef burger	100	1	f	2021-9/1632942969923_500.jpg
538	287	1		Вино	100	3	f	2023-7/1688306482986_500.jpg
539	288	1	2	hamburger	30	1	f	2023-6/1687909545318_500.jpg
540	286	1	h0001	Beef burger	100	1	f	2021-9/1632942969923_500.jpg
541	288	1		Вино	100	1	f	2023-7/1688306482986_500.jpg
542	289	1	h0002	Cheeseburger	305	1	f	2021-9/1632351029146_500.jpg
543	286	1	h0002	Cheeseburger	305	1	f	2021-9/1632351029146_500.jpg
544	290	1	h0002	Cheeseburger	305	1	f	2021-9/1632351029146_500.jpg
545	291	1	h0001	Beef burger	100	1	f	2021-9/1632942969923_500.jpg
546	290	1	h0002	Cheeseburger	305	1	f	2021-9/1632351029146_500.jpg
547	292	1	\N	1	10	1	f	\N
548	292	1	h0001	Beef burger	100	1	f	2021-9/1632942969923_500.jpg
549	293	1		Salmon	100	1	f	2023-7/1690187425227_500.jpg
550	288	1	2	hamburger	30	2	f	2023-6/1687909545318_500.jpg
551	288	1		Salmon	100	1	f	2023-7/1690187425227_500.jpg
552	288	1		Salmon	100	1	f	2023-7/1690187425227_500.jpg
553	288	1	134234234	Cerro Nevado	150	1	f	2023-7/1690188849342_500.jpg
554	288	1	134234234	Cerro Nevado	150	1	f	2023-7/1690188849342_500.jpg
555	284	2	h0001	Beef burger	100	2	f	2021-9/1632942969923_500.jpg
556	284	2	h0002	Cheeseburger	305	1	f	2021-9/1632351029146_500.jpg
557	294	1	2	hamburger	30	1	f	2023-6/1687909545318_500.jpg
558	294	1		Salmon	100	1	f	2023-7/1690187425227_500.jpg
559	294	1		Salmon	100	1	f	2023-7/1690187425227_500.jpg
560	295	1		Salmon	100	1	f	2023-7/1690187425227_500.jpg
561	296	1		Salmon	100	1	f	2023-7/1690187425227_500.jpg
562	297	1	2	Hamburger	30	1	f	2023-6/1687909545318_500.jpg
563	298	1	2	Hamburger	30	1	f	2023-6/1687909545318_500.jpg
564	298	1	1	Burger	0	1	f	2023-6/1687876170639_500.jpg
565	299	1	2	Hamburger	30	1	f	2023-6/1687909545318_500.jpg
566	300	1	2	Hamburger	30	1	f	2023-6/1687909545318_500.jpg
567	301	1	h0002	Cheeseburger	305	1	f	2021-9/1632351029146_500.jpg
568	301	1	h0001	Beef burger	100	1	f	2021-9/1632942969923_500.jpg
569	302	4		Salmon	100	3	f	2023-7/1690187425227_500.jpg
570	302	4	134234234	Cerro Nevado	150	1	f	2023-7/1690188849342_500.jpg
\.


--
-- TOC entry 3790 (class 0 OID 25767)
-- Dependencies: 251
-- Data for Name: vne_orders; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_orders (id, table_id, hall_id, restaurant_id, employee_id, need_waiter, need_invoice, status, discount_percent, sum, created_at, need_products, customer_comment, employee_comment, paymethod, accepted_at, completed_at, room_id, floor_id, group_id, paid, allergy_comment) FROM stdin;
56	\N	\N	21	9	t	f	cancelled	0	11710	2021-10-10 13:01:24.230971	t			card	2021-10-10 13:03:34.934	\N	\N	\N	\N	f	
32	61	2	21	9	f	f	completed	10	\N	2021-10-04 22:34:46.437364	f		пробный заказ 2	cash	2021-10-04 22:34:57.587	2021-10-04 23:08:32.699	\N	\N	\N	f	
41	\N	\N	21	9	f	f	completed	0	\N	2021-10-05 15:02:00.171683	t			cash	2021-10-05 15:03:34.031	2021-09-05 15:03:46.086	\N	\N	\N	f	
174	83	18	21	9	f	f	completed	0	24000	2021-05-17 02:20:05.111451	f			cash	2021-05-17 02:20:09.478	2021-05-17 02:20:11.964	\N	\N	\N	f	
58	81	18	21	9	t	f	completed	0	400	2021-10-10 22:02:45.327232	t	<div>10.10.2021 22:03 Артём OOJ.ru , срочно! </div>		cash	2021-10-10 22:04:22.963	2021-10-10 22:04:47.529	\N	\N	\N	f	
150	64	4	21	9	f	f	cancelled	5	384.75	2021-10-14 12:32:57.676092	f			card	\N	\N	\N	\N	\N	f	
115	81	18	21	9	t	f	cancelled	0	5460	2021-10-12 23:18:17.073788	t			cash	2021-10-13 01:49:56.48	\N	\N	\N	\N	f	
142	81	18	21	\N	f	f	cancelled	5	0	2021-10-14 12:28:35.838881	f			cash	\N	\N	\N	\N	\N	f	
60	81	18	21	\N	f	t	cancelled	0	3500	2021-10-10 22:06:08.115151	t			cash	\N	\N	\N	\N	\N	f	
36	\N	\N	21	9	f	t	completed	0	\N	2021-10-05 13:18:53.653899	f			cash	2021-10-05 13:23:57.678	2021-10-05 13:32:46.877	\N	\N	\N	f	
116	81	18	21	\N	f	f	cancelled	0	100	2021-10-13 01:50:49.759374	f			cash	\N	\N	\N	\N	\N	f	
62	81	18	21	9	f	f	cancelled	0	400	2021-10-10 22:14:08.338499	f	<div>10.10.2021 22:14 Артём.  Срочно. </div>		cash	2021-10-10 22:14:20.755	\N	\N	\N	\N	f	
64	81	18	21	9	f	f	cancelled	0	1115	2021-10-10 22:24:59.099559	f	<div>10.10.2021 22:24 Артём. Срочно! Бургер медиум велодром. </div>		cash	2021-10-10 22:25:17.591	\N	\N	\N	\N	f	
119	81	18	21	\N	f	f	cancelled	0	305	2021-10-13 02:13:01.310983	f			cash	\N	\N	\N	\N	\N	f	
152	81	18	21	9	t	f	cancelled	0	100	2021-10-14 12:51:52.710124	f			cash	2021-10-14 12:51:56.166	\N	\N	\N	\N	f	
66	81	18	21	9	f	f	cancelled	0	200	2021-10-10 22:27:28.401087	f	<div>10.10.2021 22:27 Артём. </div>		cash	2021-10-10 22:27:35.056	\N	\N	\N	\N	f	
122	81	18	21	\N	f	f	cancelled	0	100	2021-10-13 02:26:01.346612	f			cash	\N	\N	\N	\N	\N	f	
68	81	18	21	9	f	f	cancelled	0	405	2021-10-10 22:33:17.693619	f			cash	2021-10-10 22:33:33.073	\N	\N	\N	\N	f	
154	61	2	21	9	f	f	cancelled	5	570	2021-10-14 18:50:25.087653	f			card	2021-10-14 18:50:29.554	\N	\N	\N	\N	f	
91	81	18	21	\N	f	f	cancelled	0	305	2021-10-12 19:18:55.559831	f			cash	\N	\N	\N	\N	\N	f	
94	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:31:03.086786	f			cash	\N	\N	\N	\N	\N	f	
70	81	18	21	9	f	f	completed	0	700	2021-10-10 23:15:33.477597	f	<div>10.10.2021 23:15 Артём. </div>		cash	2021-10-10 23:15:50.396	2021-10-10 23:18:01.57	\N	\N	\N	f	
96	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:40:21.125187	f			cash	\N	\N	\N	\N	\N	f	
99	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 20:11:46.481838	f			cash	\N	\N	\N	\N	\N	f	
101	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 20:56:58.785693	f			cash	\N	\N	\N	\N	\N	f	
103	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 20:59:10.945537	f			cash	\N	\N	\N	\N	\N	f	
127	81	18	21	\N	f	f	cancelled	0	100	2021-10-13 11:30:01.887654	f			cash	\N	\N	\N	\N	\N	f	
72	81	18	21	9	t	t	cancelled	5	674.5	2021-10-11 13:11:04.34053	t			card	2021-10-11 13:11:15.167	\N	\N	\N	\N	f	
106	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 21:14:36.807832	f			cash	\N	\N	\N	\N	\N	f	
57	\N	\N	21	9	f	f	completed	0	810	2021-10-10 13:04:39.795598	f			cash	2021-10-10 13:04:39.794	2021-10-10 13:05:01.238	\N	\N	\N	f	
74	81	18	21	\N	f	f	completed	0	800	2021-10-11 14:01:25.301117	f			cash	\N	2021-10-11 14:09:39.595	\N	\N	\N	f	
123	81	18	21	\N	f	f	cancelled	0	305	2021-10-13 02:26:17.10655	f			cash	2021-10-13 02:26:30.337	\N	\N	\N	\N	f	
108	81	18	21	\N	f	f	cancelled	0	405	2021-10-12 21:28:00.629733	f			cash	\N	\N	\N	\N	\N	f	
76	81	18	21	\N	f	f	completed	0	300	2021-10-11 14:12:26.278343	f			cash	\N	2021-10-11 14:12:41.294	\N	\N	\N	f	
109	81	18	21	\N	f	f	cancelled	0	2000	2021-10-12 21:29:38.424816	f			cash	\N	\N	\N	\N	\N	f	
153	81	18	21	9	t	f	cancelled	0	300	2021-10-14 12:53:02.946773	t			cash	2021-10-14 12:53:06.35	\N	\N	\N	\N	f	
131	61	2	21	9	t	f	cancelled	0	100	2021-10-13 12:05:03.635841	f			cash	2021-10-13 12:05:11.541	\N	\N	\N	\N	f	
125	81	18	21	9	f	f	cancelled	0	305	2021-10-13 02:27:04.323239	f			cash	2021-10-13 02:38:55.026	\N	\N	\N	\N	f	
33	\N	\N	21	9	f	f	cancelled	0	\N	2021-10-04 23:08:44.168034	f		пробный заказ 2	cash	2021-10-04 23:08:56.154	\N	\N	\N	\N	f	
87	62	2	21	9	t	f	cancelled	0	1100	2021-10-11 15:19:04.884165	f			cash	\N	\N	\N	\N	\N	f	
133	61	2	21	\N	f	f	cancelled	0	1000	2021-10-13 18:48:45.807257	f			cash	\N	\N	\N	\N	\N	f	
156	81	18	21	\N	f	f	cancelled	0	0	2021-10-15 00:47:26.749673	f			cash	\N	\N	\N	\N	\N	f	
139	81	18	21	\N	f	f	cancelled	0	0	2021-10-14 12:26:11.250911	f			cash	\N	\N	\N	\N	\N	f	
132	81	18	21	\N	f	f	cancelled	5	859.7500000000001	2021-10-13 12:36:14.351541	f			card	\N	\N	\N	\N	\N	f	
140	81	18	21	9	f	f	cancelled	5	95	2021-10-14 12:26:51.248589	f			card	\N	\N	\N	\N	\N	f	
111	81	18	21	\N	t	f	cancelled	0	2000	2021-10-12 22:20:23.998444	f			cash	\N	\N	\N	\N	\N	f	
158	81	18	21	9	t	f	cancelled	0	500	2021-10-15 00:54:39.635985	f			cash	2021-10-15 00:55:02.351	\N	\N	\N	\N	f	
159	81	18	21	9	t	f	cancelled	0	500	2021-10-15 00:58:33.278184	f			cash	2021-10-15 00:58:54.267	\N	\N	\N	\N	f	
141	61	2	21	\N	f	f	cancelled	0	100	2021-10-14 12:28:06.064681	f			cash	\N	\N	\N	\N	\N	f	
134	61	2	21	9	t	f	cancelled	0	2014.9999999999998	2021-10-13 19:07:11.793389	t			card	2021-10-13 19:31:47.167	\N	\N	\N	\N	f	
135	61	2	21	\N	f	f	cancelled	0	305	2021-10-13 19:41:04.450103	f			cash	\N	\N	\N	\N	\N	f	
161	81	18	21	9	f	f	cancelled	0	300	2021-10-15 01:11:22.597348	f			cash	2021-10-15 01:12:00.206	\N	\N	\N	\N	f	
143	81	18	21	9	f	f	cancelled	0	0	2021-10-14 12:28:53.880066	f			cash	\N	\N	\N	\N	\N	f	
144	82	18	21	9	f	f	cancelled	0	100	2021-10-14 12:30:08.277882	f			cash	\N	\N	\N	\N	\N	f	
162	81	18	21	9	f	f	cancelled	0	3604.9999999999995	2021-10-15 01:24:01.51979	t			cash	2021-10-15 01:24:30.757	\N	\N	\N	\N	f	
165	82	18	21	\N	f	f	cancelled	0	305	2021-10-15 01:43:24.840481	f			cash	\N	\N	\N	\N	\N	f	
147	83	18	21	9	f	f	cancelled	0	100	2021-10-14 12:31:14.769658	f			cash	\N	\N	\N	\N	\N	f	
146	81	18	21	9	f	f	cancelled	0	100	2021-10-14 12:30:50.513492	f			cash	\N	\N	\N	\N	\N	f	
145	82	18	21	9	f	f	cancelled	0	0	2021-10-14 12:30:28.486326	f			cash	\N	\N	\N	\N	\N	f	
151	63	4	21	9	t	t	cancelled	0	0	2021-10-14 12:33:16.549689	t			cash	\N	\N	\N	\N	\N	f	
149	82	18	21	9	f	f	cancelled	0	100	2021-10-14 12:32:35.40198	f			cash	\N	\N	\N	\N	\N	f	
148	82	18	21	9	f	f	cancelled	0	0	2021-10-14 12:32:17.350334	f			cash	\N	\N	\N	\N	\N	f	
167	61	2	21	9	f	f	cancelled	0	0	2021-10-15 02:31:19.051269	f			cash	\N	\N	\N	\N	\N	f	
166	81	18	21	9	t	f	cancelled	0	1100	2021-10-15 02:10:02.691236	t			cash	2021-10-15 02:18:16.116	\N	\N	\N	\N	f	
168	81	18	21	\N	f	f	cancelled	0	1100	2021-10-16 22:16:21.750611	t			cash	\N	\N	\N	\N	\N	f	
81	82	18	21	9	f	f	completed	0	800	2021-09-11 14:24:20.160382	f			cash	2021-10-11 14:24:39.056	2021-10-11 14:32:06.124	\N	\N	\N	f	
136	61	2	21	\N	f	f	completed	0	100	2021-09-13 19:48:26.776779	f			cash	\N	2021-10-13 19:50:48.34	\N	\N	\N	f	
129	82	18	21	9	f	f	completed	0	305	2021-09-13 11:46:37.11334	f			cash	\N	2021-10-13 12:10:25.35	\N	\N	\N	f	
130	82	18	21	9	f	f	completed	0	100	2021-10-13 12:04:14.747888	f			cash	2021-10-13 12:04:24.432	2021-09-13 12:16:50.798	\N	\N	\N	f	
169	61	2	21	9	f	f	completed	0	2100	2021-10-17 01:49:14.512239	f			cash	2021-10-17 01:49:22.122	2021-10-17 01:49:29.599	\N	\N	\N	f	
170	64	4	21	9	f	f	completed	0	12000	2021-10-17 01:50:06.91881	f			cash	2021-10-17 01:50:12.349	2021-10-17 01:50:14.892	\N	\N	\N	f	
171	86	2	21	9	f	f	completed	0	5200	2021-10-17 02:15:25.061267	f			cash	2021-10-17 02:15:35.026	2021-10-17 02:15:39.644	\N	\N	\N	f	
172	87	2	21	9	f	f	completed	0	23600	2021-10-17 02:17:08.061226	f			cash	2021-10-17 02:17:14.126	2021-10-17 02:17:16.382	\N	\N	\N	f	
173	83	18	21	9	f	f	completed	0	6800	2021-10-17 02:19:42.514253	f			cash	2021-10-17 02:19:47.54	2021-10-17 02:19:51.653	\N	\N	\N	f	
175	88	4	21	9	f	f	completed	0	9200	2021-10-17 02:22:07.840258	f			cash	2021-10-17 02:22:14.18	2021-10-17 02:22:16.39	\N	\N	\N	f	
176	81	18	21	36	f	f	completed	0	15305	2021-10-17 20:59:26.447956	f			cash	2021-10-17 20:59:31.385	2021-10-17 20:59:39.458	\N	\N	\N	f	
39	\N	\N	21	\N	f	f	cancelled	0	\N	2021-10-05 14:51:09.478667	f			cash	\N	\N	\N	\N	\N	f	
21	\N	\N	21	9	t	t	cancelled	0	\N	2021-10-01 01:27:00.455782	f			cash	\N	\N	\N	\N	\N	f	
43	\N	\N	21	9	f	f	completed	0	\N	2021-10-05 15:07:42.737255	t			cash	2021-10-05 15:08:01.712	2021-10-05 15:08:42.702	\N	\N	\N	f	
45	\N	\N	21	9	f	t	cancelled	0	\N	2021-10-05 15:09:14.730267	t			card	2021-10-06 22:04:03.247	\N	\N	\N	\N	f	
49	\N	\N	21	9	f	f	cancelled	5	\N	2021-10-06 18:12:54.334244	f			cash	\N	\N	\N	\N	\N	f	
48	\N	\N	21	9	f	f	cancelled	5	\N	2021-10-06 18:08:05.546655	f		пробный заказ	card	\N	\N	\N	\N	\N	f	
80	81	18	21	9	f	f	completed	10	2340	2021-10-11 14:16:02.738158	t			cash	\N	2021-10-11 14:24:12.904	\N	\N	\N	f	
89	81	18	21	9	t	f	cancelled	5	95	2021-10-11 20:48:39.215891	f			cash	\N	\N	\N	\N	\N	f	
88	81	18	21	9	f	f	cancelled	0	100	2021-10-11 17:18:14.705183	f			cash	\N	\N	\N	\N	\N	f	
53	\N	\N	21	9	t	t	completed	1	792	2021-10-07 00:26:27.118492	t	test comment	пробный заказ 2	card	2021-10-07 00:26:37.404	2021-10-07 00:54:33.721	\N	\N	\N	f	
11	\N	\N	21	\N	f	f	completed	0	\N	2021-09-30 01:32:36.071462	f			cash	\N	\N	\N	\N	\N	f	
44	\N	\N	21	\N	f	f	cancelled	0	\N	2021-10-05 15:09:02.374082	f			cash	\N	\N	\N	\N	\N	f	
18	\N	\N	21	\N	f	t	completed	0	\N	2021-09-30 23:51:43.753031	f			card	\N	\N	\N	\N	\N	f	
37	\N	\N	21	9	f	f	completed	0	\N	2021-10-05 13:50:14.186157	f			cash	2021-10-05 15:07:03.445	2021-10-05 15:10:21.418	\N	\N	\N	f	
19	\N	\N	21	\N	t	t	completed	0	\N	2021-10-01 01:16:02.416953	f			cash	\N	\N	\N	\N	\N	f	
20	\N	\N	21	\N	f	f	completed	0	\N	2021-10-01 01:26:29.700644	f			cash	\N	\N	\N	\N	\N	f	
40	\N	\N	21	9	f	f	cancelled	0	\N	2021-10-05 15:01:07.716266	t			cash	2021-10-05 15:04:06.322	\N	\N	\N	\N	f	
22	\N	\N	21	9	f	f	cancelled	0	\N	2021-10-01 22:19:35.824168	f			cash	\N	\N	\N	\N	\N	f	
34	\N	\N	21	9	f	f	completed	0	\N	2021-10-04 23:09:41.853611	f		пробный заказ	cash	2021-10-04 23:09:46.9	2021-10-05 15:10:25.115	\N	\N	\N	f	
42	\N	\N	21	9	f	t	completed	0	\N	2021-10-05 15:05:50.955622	f			cash	2021-10-05 15:06:22.435	2021-10-05 15:07:31.862	\N	\N	\N	f	
17	\N	\N	21	9	f	t	cancelled	0	\N	2021-09-30 23:30:54.056362	f			cash	\N	\N	\N	\N	\N	f	
4	\N	\N	21	\N	f	f	cancelled	0	\N	2021-09-29 20:00:22.929265	f			cash	\N	\N	\N	\N	\N	f	
3	\N	\N	21	\N	f	f	cancelled	0	\N	2021-09-29 19:59:36.82795	f			cash	\N	\N	\N	\N	\N	f	
16	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-30 23:06:33.262757	f	дайте что-нибудь		cash	2021-10-04 01:13:42.507	\N	\N	\N	\N	f	
14	\N	\N	21	9	t	t	cancelled	0	\N	2021-09-30 22:02:14.884161	t			cash	2021-10-04 03:56:24.379	\N	\N	\N	\N	f	
27	\N	\N	21	9	f	f	cancelled	0	\N	2021-10-04 18:59:52.308565	t			cash	2021-10-05 13:30:43.25	\N	\N	\N	\N	f	
10	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-30 01:15:52.684241	f			cash	\N	\N	\N	\N	\N	f	
13	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-30 21:50:05.352669	f			cash	2021-10-03 02:18:08.926	\N	\N	\N	\N	f	
7	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-29 20:08:31.197834	f			cash	2021-10-03 23:35:54.838	\N	\N	\N	\N	f	
6	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-29 20:04:21.826392	f			cash	2021-10-03 02:18:37.203	\N	\N	\N	\N	f	
2	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-29 19:46:07.036984	f			cash	\N	\N	\N	\N	\N	f	
24	\N	\N	21	9	f	f	completed	0	\N	2021-10-04 02:16:40.599221	f	<div>04.10.2021 02:16 какое-то поежлание</div>	друг шефа	cash	2021-10-04 12:49:12.066	2021-10-05 15:10:32.676	\N	\N	\N	f	
12	\N	\N	21	\N	f	f	cancelled	0	\N	2021-09-30 01:52:41.812539	f			cash	\N	\N	\N	\N	\N	f	
181	63	4	21	48	f	f	completed	0	20300	2021-10-18 02:38:08.984643	f			cash	2021-10-18 02:38:22.324	2021-10-18 02:38:25	\N	\N	\N	f	
15	\N	\N	21	\N	f	f	cancelled	10	\N	2021-09-30 22:49:06.120396	f			cash	\N	\N	\N	\N	\N	f	
5	\N	\N	21	9	t	f	cancelled	0	\N	2021-09-29 20:01:07.059932	t		хороший клиент	cash	2021-10-04 12:48:38.243	\N	\N	\N	\N	f	
25	\N	\N	21	9	f	f	completed	0	\N	2021-10-04 12:50:16.497155	t			cash	2021-10-04 22:13:00.08	2021-10-04 22:17:43.006	\N	\N	\N	f	
26	\N	\N	21	9	t	f	cancelled	0	\N	2021-10-04 12:51:52.275692	f			cash	2021-10-05 13:30:56.093	\N	\N	\N	\N	f	
28	\N	\N	21	9	f	f	completed	0	\N	2021-10-04 22:18:35.232592	f		пробный заказ	cash	2021-10-04 22:18:53.226	2021-10-04 22:19:56.519	\N	\N	\N	f	
35	\N	\N	21	9	f	f	completed	0	\N	2021-10-05 13:17:56.734197	t	<div>05.10.2021 13:17 mctest1</div>		cash	2021-10-05 13:24:18.968	2021-10-06 18:14:41.672	\N	\N	\N	f	
38	\N	\N	21	9	f	f	completed	0	\N	2021-10-05 14:49:58.008609	t			cash	2021-10-05 15:10:11.218	2021-10-06 18:14:43.928	\N	\N	\N	f	
47	\N	\N	21	9	f	f	cancelled	5	1619.75	2021-10-06 11:59:54.848708	t			cash	2021-10-06 12:01:24.885	\N	\N	\N	\N	f	
29	\N	\N	21	9	f	t	completed	0	\N	2021-10-04 22:21:17.346845	f			card	2021-10-04 22:21:39.268	2021-10-04 22:27:53.396	\N	\N	\N	f	
30	\N	\N	21	9	f	t	completed	0	\N	2021-10-04 22:28:23.508184	f		пробный заказ	cash	2021-10-04 22:28:55.354	2021-10-04 22:33:52.525	\N	\N	\N	f	
31	\N	\N	21	9	f	f	completed	0	\N	2021-10-04 22:34:07.284906	f		пробный заказ	cash	2021-10-04 22:34:19.295	2021-10-04 22:34:32.488	\N	\N	\N	f	
73	82	18	21	\N	f	f	completed	0	305	2021-10-11 13:41:23.83068	f			cash	\N	2021-10-11 13:42:12.875	\N	\N	\N	f	
51	\N	\N	21	9	f	f	completed	5	285	2021-10-06 20:40:43.988248	f		хороший клиент	card	2021-10-06 20:40:43.986	2021-10-06 22:28:17.657	\N	\N	\N	f	
50	\N	\N	21	9	f	f	completed	5	665	2021-10-06 18:15:12.103568	f		пробный заказ	card	2021-10-06 18:15:12.102	2021-10-07 00:49:16.377	\N	\N	\N	f	
84	81	18	21	9	f	f	completed	0	0	2021-10-11 14:37:42.38196	f			cash	\N	2021-10-11 14:37:53.657	\N	\N	\N	f	
52	\N	\N	21	9	t	f	cancelled	5	1045	2021-10-07 00:20:26.761395	t	test1	test2	cash	2021-10-07 00:55:34.553	\N	\N	\N	\N	f	
55	\N	\N	21	\N	f	f	cancelled	0	100	2021-10-07 23:28:06.971823	f			cash	\N	\N	\N	\N	\N	f	
54	\N	\N	21	\N	f	f	cancelled	0	100	2021-10-07 17:33:24.301754	f			cash	\N	\N	\N	\N	\N	f	
187	83	18	21	9	f	f	cancelled	0	0	2021-10-20 03:17:40.841679	f			cash	\N	\N	\N	\N	\N	f	
59	81	18	21	9	f	f	cancelled	0	200	2021-10-10 22:05:20.12121	f			cash	2021-10-10 22:05:26.924	\N	\N	\N	\N	f	
184	81	18	21	9	f	f	cancelled	0	0	2021-10-20 03:05:59.250106	f			cash	\N	\N	\N	\N	\N	f	
118	81	18	21	\N	f	f	cancelled	0	305	2021-10-13 02:11:46.005398	f			cash	\N	\N	\N	\N	\N	f	
82	82	18	21	9	f	f	completed	0	800	2021-10-11 14:32:15.093806	f			cash	2021-10-11 14:32:20.013	2021-10-11 15:06:57.94	\N	\N	\N	f	
61	81	18	21	9	f	f	cancelled	0	700	2021-10-10 22:11:17.388393	t			cash	2021-10-10 22:11:41.517	\N	\N	\N	\N	f	
120	81	18	21	\N	f	f	cancelled	0	305	2021-10-13 02:16:45.722897	f			cash	\N	\N	\N	\N	\N	f	
63	81	18	21	9	f	f	cancelled	0	6915.000000000001	2021-10-10 22:20:00.038937	t			cash	2021-10-10 22:21:05.921	\N	\N	\N	\N	f	
121	81	18	21	\N	f	f	completed	0	100	2021-10-13 02:17:44.720566	f			cash	\N	2021-10-13 02:25:18.688	\N	\N	\N	f	
65	81	18	21	\N	f	f	cancelled	0	500	2021-10-10 22:26:23.376994	f			cash	\N	\N	\N	\N	\N	f	
67	81	18	21	\N	f	f	cancelled	0	1100	2021-10-10 22:28:05.822632	f			cash	\N	\N	\N	\N	\N	f	
90	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:05:37.009443	f			cash	\N	\N	\N	\N	\N	f	
92	81	18	21	\N	f	f	cancelled	0	305	2021-10-12 19:21:18.902823	f			cash	\N	\N	\N	\N	\N	f	
93	81	18	21	\N	f	f	cancelled	0	305	2021-10-12 19:22:35.863434	f			cash	\N	\N	\N	\N	\N	f	
71	81	18	21	9	f	t	completed	0	500	2021-10-10 23:18:22.53141	f			card	2021-10-10 23:18:27.551	2021-10-10 23:18:42.625	\N	\N	\N	f	
95	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:39:23.640865	f			cash	\N	\N	\N	\N	\N	f	
78	81	18	21	\N	f	f	cancelled	0	300	2021-10-11 14:13:38.106434	f			cash	\N	\N	\N	\N	\N	f	
97	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:42:55.574125	f			cash	\N	\N	\N	\N	\N	f	
98	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:43:14.471724	f			cash	\N	\N	\N	\N	\N	f	
128	61	2	21	\N	f	f	cancelled	0	100	2021-10-13 11:35:50.415915	f			cash	\N	\N	\N	\N	\N	f	
100	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 20:46:48.125829	f			cash	\N	\N	\N	\N	\N	f	
124	81	18	21	\N	f	f	cancelled	0	305	2021-10-13 02:26:48.40515	f			cash	\N	\N	\N	\N	\N	f	
102	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 20:57:52.009696	f			cash	\N	\N	\N	\N	\N	f	
104	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 21:05:47.034869	f			cash	\N	\N	\N	\N	\N	f	
105	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 21:07:53.847674	f			cash	\N	\N	\N	\N	\N	f	
86	83	18	21	9	t	t	completed	5	665	2021-10-11 15:07:06.186934	f		пробный заказ	cash	2021-10-11 15:07:44.913	2021-10-13 12:17:30.484	\N	\N	\N	f	
107	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 21:21:22.945604	f			cash	\N	\N	\N	\N	\N	f	
110	81	18	21	\N	t	f	cancelled	0	1000	2021-10-12 21:33:22.794021	f			cash	\N	\N	\N	\N	\N	f	
112	81	18	21	\N	t	f	cancelled	0	2000	2021-10-12 23:04:24.519403	f			cash	\N	\N	\N	\N	\N	f	
113	81	18	21	\N	t	f	cancelled	0	\N	2021-10-12 23:04:42.799402	f			cash	\N	\N	\N	\N	\N	f	
114	81	18	21	\N	t	f	cancelled	0	1000	2021-10-12 23:04:53.750018	f			cash	\N	\N	\N	\N	\N	f	
23	\N	\N	21	36	t	f	cancelled	0	\N	2021-10-02 00:43:00.9371	f	<div>03.10.2021 23:09 несите быстрее</div><div>03.10.2021 23:09 заверните с собой</div><div>04.10.2021 02:15 какое-то пожелание</div>	надо принести что-нибудь	cash	\N	\N	\N	\N	\N	f	
177	81	18	21	48	f	f	completed	0	12700	2021-10-17 21:01:23.292541	f			cash	2021-10-17 21:01:27.458	2021-10-17 21:01:29.717	\N	\N	\N	f	
188	83	18	21	9	f	f	cancelled	0	0	2021-10-20 03:23:25.02292	f			cash	\N	\N	\N	\N	\N	f	
185	81	18	21	9	f	f	cancelled	0	0	2021-10-20 03:06:13.120154	f			cash	\N	\N	\N	\N	\N	f	
190	62	2	21	9	f	f	cancelled	0	0	2021-10-20 03:24:02.970242	f			cash	\N	\N	\N	\N	\N	f	
182	61	2	21	52	f	f	completed	0	40200	2021-10-18 02:39:34.86932	f			cash	2021-10-18 02:39:50.889	2021-10-18 02:39:53.369	\N	\N	\N	f	
196	61	2	21	9	f	f	cancelled	0	0	2021-10-24 17:01:40.595333	f			cash	\N	\N	\N	\N	\N	f	
200	62	2	21	9	f	f	cancelled	0	0	2021-10-24 17:26:34.062498	f			cash	\N	\N	\N	\N	\N	f	
198	83	18	21	9	f	f	cancelled	0	0	2021-10-24 17:16:27.859255	f		пробный заказ	cash	\N	\N	\N	\N	\N	f	
192	62	2	21	9	t	f	cancelled	0	2215	2021-10-21 22:16:42.229634	f			cash	2021-10-21 22:16:58.494	\N	\N	\N	\N	f	
201	81	18	21	9	f	f	cancelled	0	405	2021-10-24 17:27:00.890267	t		asd	cash	2021-10-24 17:27:07.918	\N	\N	\N	\N	f	
203	81	18	21	\N	f	f	cancelled	0	305	2021-10-24 17:43:21.525107	f			cash	\N	\N	\N	\N	\N	f	
178	81	18	21	51	f	f	completed	0	8700	2021-09-17 22:45:49.696038	f			cash	2021-09-17 22:45:55.02	2021-09-17 22:45:57.529	\N	\N	\N	f	
179	81	18	21	52	f	f	completed	0	24800	2021-10-17 22:54:03.338912	f			cash	2021-10-17 22:54:07.314	2021-10-17 22:54:09.845	\N	\N	\N	f	
189	61	2	21	9	f	f	cancelled	0	0	2021-10-20 03:23:40.070836	f			cash	\N	\N	\N	\N	\N	f	
180	62	2	21	51	f	f	completed	0	12100	2021-10-18 02:35:29.217937	f			cash	2021-10-18 02:35:59.558	2021-10-18 02:36:02.639	\N	\N	\N	f	
186	82	18	21	9	f	f	cancelled	0	0	2021-10-20 03:17:25.598754	f			cash	\N	\N	\N	\N	\N	f	
183	81	18	21	9	f	f	cancelled	0	0	2021-10-20 03:00:56.053527	f			cash	\N	\N	\N	\N	\N	f	
191	81	18	21	\N	t	t	cancelled	0	405	2021-10-21 21:05:32.996823	f			cash	\N	\N	\N	\N	\N	f	
193	81	18	21	\N	f	f	cancelled	0	100	2021-10-21 22:18:09.091028	f			cash	\N	\N	\N	\N	\N	f	
197	81	18	21	9	f	f	cancelled	0	100	2021-10-24 17:15:55.281713	f			cash	\N	\N	\N	\N	\N	f	
195	63	4	21	9	f	f	cancelled	0	1100	2021-10-24 14:42:47.136862	f		пробный заказ	cash	\N	\N	\N	\N	\N	f	
199	81	18	21	\N	f	f	cancelled	0	100	2021-10-24 17:17:08.650959	f			cash	\N	\N	\N	\N	\N	f	
194	81	18	21	\N	t	f	cancelled	0	100	2021-10-21 22:18:43.598431	f			cash	\N	\N	\N	\N	\N	f	
202	61	2	21	9	f	f	cancelled	0	0	2021-10-24 17:39:34.866422	f			cash	\N	\N	\N	\N	\N	f	
204	81	18	21	9	t	f	active	0	3710	2021-10-24 18:46:53.77979	t		пробный заказ	cash	2021-10-24 18:47:03.678	\N	\N	\N	\N	f	
206	82	18	21	9	f	f	active	0	0	2021-10-24 18:58:37.215767	f			cash	\N	\N	\N	\N	\N	f	
207	63	4	21	9	f	f	active	0	0	2021-10-24 18:58:54.61042	f			cash	\N	\N	\N	\N	\N	f	
208	51	3	9	53	f	f	completed	0	0	2023-03-15 12:47:54.119414	f			card	\N	2023-03-15 12:48:07.128	\N	\N	\N	f	
209	51	3	9	\N	f	f	cancelled	0	3000	2023-03-20 09:54:58.271889	t			cash	\N	\N	\N	\N	\N	f	
228	96	3	9	53	f	f	cancelled	0	40	2023-05-09 09:43:24.010273	t			cash	2023-05-09 16:19:35.158	\N	\N	\N	\N	f	
224	96	3	9	53	f	f	completed	0	5000	2023-04-04 14:49:58.446674	f	<div>04.04.2023 14:49 123</div>		cash	2023-05-09 16:02:57.346	2023-05-09 16:03:28.31	\N	\N	\N	f	
229	96	3	9	53	t	f	cancelled	0	5100	2023-05-09 09:47:06.992846	f			cash	2023-05-09 09:47:34.659	\N	\N	\N	\N	f	
223	\N	\N	9	53	f	f	active	0	7000	2023-03-31 11:24:45.210636	f			cash	2023-05-09 16:07:15.369	\N	\N	\N	\N	f	
222	\N	\N	9	53	f	f	active	0	7000	2023-03-31 11:12:52.025853	f			cash	2023-05-09 16:07:29.783	\N	\N	\N	\N	f	
225	96	3	9	53	f	f	completed	0	0	2023-05-01 15:52:32.908088	f		11	cash	\N	2023-05-09 08:28:07.187	\N	\N	\N	f	
226	97	3	9	53	f	f	cancelled	0	30	2023-05-01 16:54:37.491617	f		23	cash	2023-05-04 08:37:16.499	\N	\N	\N	\N	f	
227	96	3	9	53	f	f	completed	0	60	2023-05-04 14:25:46.480689	f		33	cash	2023-05-04 14:26:12.871	2023-05-09 09:38:41.008	\N	\N	\N	f	
221	96	3	9	53	f	f	completed	0	6000	2023-03-31 10:57:02.14506	f			cash	\N	2023-05-09 16:15:03.393	\N	\N	\N	f	
236	96	3	9	53	f	f	completed	0	3010	2023-05-18 14:35:34.351945	t			cash	2023-05-18 14:41:43.378	\N	\N	\N	\N	f	
235	98	3	9	\N	f	f	active	0	1500	2023-05-18 14:34:24.69303	f			cash	\N	\N	\N	\N	\N	f	
237	97	3	9	\N	f	f	active	0	1010	2023-05-18 14:37:19.361345	f			cash	\N	\N	\N	\N	\N	f	
234	98	3	9	\N	t	t	active	0	1010	2023-05-18 14:34:12.854443	f			cash	\N	\N	\N	\N	\N	f	
232	98	3	9	53	t	t	active	0	1010	2023-05-18 14:27:44.922112	f			cash	2023-05-18 14:28:54.302	\N	\N	\N	\N	f	
233	98	3	9	53	f	t	active	0	2010	2023-05-18 14:28:02.089314	f	<div>18.05.2023 14:28 Test</div>		card	2023-05-18 14:28:46.409	\N	\N	\N	\N	f	
231	96	3	9	53	t	f	active	0	2020	2023-05-10 13:42:31.242211	f			cash	2023-05-10 14:40:58.305	\N	\N	\N	\N	f	
230	51	3	9	53	f	t	active	0	5040	2023-05-09 09:48:41.655508	f			cash	2023-05-09 09:48:50.981	\N	\N	\N	\N	f	
239	\N	\N	9	53	f	f	active	0	2000	2023-05-18 14:38:27.910947	f			cash	2023-05-18 14:41:37.816	\N	4	8	\N	f	
238	97	3	9	53	f	f	active	0	2000	2023-05-18 14:38:06.064077	f			cash	2023-06-15 10:02:57.586	\N	\N	\N	\N	f	
240	98	3	9	\N	f	f	active	0	110	2023-06-15 10:04:21.014509	f			cash	\N	\N	\N	\N	\N	f	
241	98	3	9	\N	f	f	active	0	1100	2023-06-15 10:04:31.704847	f			cash	\N	\N	\N	\N	\N	f	
210	62	2	21	\N	t	t	cancelled	0	5310	2023-03-22 07:59:00.43577	t			card	\N	\N	\N	\N	\N	f	
242	101	23	54	56	f	f	completed	0	600	2023-06-23 12:15:30.991219	f			cash	2023-06-27 08:39:04.807	2023-07-02 13:37:55.667	\N	\N	\N	f	
243	101	23	54	56	f	f	completed	0	60	2023-07-01 06:18:19.869483	f			cash	2023-07-01 07:26:19.808	2023-07-02 13:39:00.989	\N	\N	\N	f	
244	101	23	54	56	f	f	completed	0	0	2023-07-01 07:29:23.525025	f			cash	2023-07-01 08:41:33.702	2023-07-02 13:39:06.556	\N	\N	\N	f	
246	81	18	21	53	f	f	cancelled	0	3404.9999999999995	2023-07-01 21:27:02.803031	t			cash	2023-07-01 21:28:11.845	\N	\N	\N	\N	f	
245	81	18	21	53	t	f	cancelled	0	1030	2023-07-01 20:52:29.890281	t			cash	2023-07-01 20:53:05.646	\N	\N	\N	\N	f	
211	62	2	21	\N	f	t	cancelled	0	5000	2023-03-22 10:16:50.980591	f			card	\N	\N	\N	\N	\N	f	
248	101	23	54	56	f	f	completed	0	1000	2023-07-02 13:35:55.10248	f	<div>02.07.2023 13:35 Дим а</div>		cash	2023-07-02 13:37:10.212	2023-07-02 13:39:11.638	\N	\N	\N	f	
249	102	23	54	56	f	f	completed	0	60	2023-07-02 13:41:31.497111	f			cash	2023-07-02 13:41:50.617	2023-07-02 13:46:24.905	\N	\N	\N	f	
250	81	18	21	\N	f	f	cancelled	0	405	2023-07-02 13:52:12.65292	f			cash	\N	\N	\N	\N	\N	f	
247	81	18	21	53	t	f	active	0	915	2023-07-01 21:29:38.176445	t			cash	2023-07-01 21:29:44.818	\N	\N	\N	\N	f	
252	81	18	21	53	f	f	active	0	405	2023-07-02 13:52:56.07771	f			cash	2023-07-02 13:53:05.12	\N	\N	\N	\N	f	
253	82	18	21	\N	f	f	cancelled	0	110	2023-07-05 15:28:12.675025	f			cash	\N	\N	\N	\N	\N	f	
254	82	18	21	\N	f	f	active	0	805	2023-07-05 15:28:43.646252	f			cash	\N	\N	\N	\N	\N	f	
256	100	23	54	\N	f	f	cancelled	0	1200	2023-07-05 16:49:41.932791	t			cash	\N	\N	\N	\N	\N	f	
257	100	23	54	\N	f	f	cancelled	0	2000	2023-07-05 17:57:04.235073	f			cash	\N	\N	\N	\N	\N	f	
258	102	23	54	\N	f	f	cancelled	0	2200	2023-07-05 17:58:36.658694	t			cash	\N	\N	\N	\N	\N	f	
259	102	23	54	\N	f	f	cancelled	0	100	2023-07-05 18:26:32.953651	f			cash	\N	\N	\N	\N	\N	f	
260	102	23	54	\N	f	f	cancelled	0	1100	2023-07-05 21:44:23.853522	f			cash	\N	\N	\N	\N	\N	f	
261	102	23	54	\N	f	f	cancelled	0	4000	2023-07-05 21:46:39.067823	t			cash	\N	\N	\N	\N	\N	f	
264	102	23	54	\N	f	f	cancelled	0	315	2023-07-05 21:51:01.531056	f			cash	\N	\N	\N	\N	\N	f	
262	102	23	54	\N	f	f	cancelled	0	1500	2023-07-05 21:47:30.162154	f			cash	\N	\N	\N	\N	\N	f	
265	102	23	54	\N	f	f	cancelled	0	2000	2023-07-05 21:51:30.805517	f			cash	\N	\N	\N	\N	\N	f	
266	102	23	54	\N	t	f	cancelled	0	2000	2023-07-05 21:52:23.001339	t			cash	\N	\N	\N	\N	\N	f	
272	81	18	21	\N	f	f	active	0	10	2023-07-14 08:04:48.601703	f			cash	\N	\N	\N	\N	\N	f	
270	102	23	54	56	f	f	active	0	305	2023-07-06 08:50:55.522459	f			cash	2023-07-14 17:00:25.724	\N	\N	\N	\N	f	
268	100	23	54	\N	f	f	cancelled	0	100	2023-07-05 21:54:10.813567	f			cash	\N	\N	\N	\N	\N	f	
271	101	23	54	\N	t	f	cancelled	0	\N	2023-07-07 08:08:25.171241	f			cash	\N	\N	\N	\N	\N	f	
255	101	23	54	56	f	f	completed	0	1030	2023-07-05 15:44:47.129017	f		В очках	cash	2023-07-05 16:49:13.717	2023-07-19 09:26:19.67	\N	\N	\N	f	
278	105	18	21	53	f	t	completed	0	1200	2023-07-20 10:53:22.436916	f	<div>20.07.2023 10:53 test comment </div>		cash	2023-07-20 10:53:43.376	2023-07-20 10:58:07.15	\N	\N	\N	f	
279	105	18	21	53	f	f	completed	0	500	2023-07-20 10:55:07.972597	f			cash	2023-07-20 10:55:18.905	2023-07-20 10:58:09.65	\N	\N	\N	f	
280	105	18	21	53	f	f	active	0	100	2023-07-20 10:58:35.87068	f			cash	2023-07-20 10:58:51.232	\N	\N	\N	\N	f	
281	105	18	21	53	f	t	completed	0	500	2023-07-20 10:58:50.030166	f			cash	2023-07-20 10:58:55.016	2023-07-20 11:00:09.183	\N	\N	\N	f	
283	108	18	21	\N	f	f	active	0	500	2023-07-20 11:27:31.176949	f			cash	\N	\N	\N	\N	\N	f	
282	108	18	21	\N	t	f	active	0	100	2023-07-20 11:20:23.096589	t			cash	\N	\N	\N	\N	\N	f	
285	81	18	21	\N	f	t	active	0	505	2023-07-20 18:17:24.594881	f			cash	\N	\N	\N	\N	\N	f	
275	83	18	21	\N	f	f	active	0	300	2023-07-18 13:49:38.318624	t			cash	\N	\N	\N	\N	\N	f	
251	81	18	21	53	f	f	active	0	100	2023-07-02 13:52:45.261423	t			cash	2023-07-02 13:53:09.297	\N	\N	\N	\N	f	
289	108	18	21	\N	f	f	active	0	305	2023-07-21 15:54:30.054792	f			cash	\N	\N	\N	\N	\N	f	
286	81	18	21	\N	f	f	active	0	605	2023-07-21 14:29:59.005508	t			cash	\N	\N	\N	\N	\N	f	
290	81	18	21	\N	f	f	active	0	610	2023-07-24 08:13:47.200084	t			cash	\N	\N	\N	\N	\N	f	
291	101	23	54	53	f	f	completed	0	100	2023-07-24 08:15:29.515715	f			cash	2023-07-24 10:13:28.722	2023-07-24 12:25:30.508	\N	\N	\N	f	
263	\N	23	54	\N	t	f	cancelled	0	1100	2023-07-05 21:47:57.00004	t			cash	\N	\N	\N	\N	\N	f	
274	\N	23	54	56	f	f	active	0	100	2023-07-14 10:13:12.461764	f			cash	2023-07-17 14:16:48.435	\N	\N	\N	\N	f	
292	\N	23	54	\N	f	f	cancelled	0	110	2023-07-24 08:23:06.404185	f			cash	\N	\N	\N	\N	\N	f	
269	102	23	54	53	t	f	completed	0	700	2023-07-06 08:50:34.765137	t			cash	2023-07-24 10:24:44.353	2023-07-24 12:25:14.774	\N	\N	\N	f	
293	102	23	54	53	f	f	completed	0	100	2023-07-24 08:47:53.388901	f			cash	2023-07-24 10:11:55.869	2023-07-24 12:25:18.877	\N	\N	\N	f	
288	101	23	54	53	f	f	completed	0	690	2023-07-21 14:46:30.824891	t	<div>21.07.2023 14:46 1</div><div>24.07.2023 10:10 я не переношу лактозу</div><div>24.07.2023 10:12 тестовый комментарий</div><div>24.07.2023 10:14 ваіваів</div>	123888	cash	2023-07-24 10:16:22.357	2023-07-24 12:25:26.836	\N	\N	\N	f	
273	100	23	54	\N	f	f	cancelled	0	100	2023-07-14 08:05:20.499448	f			cash	\N	\N	\N	\N	\N	f	
267	101	23	54	56	f	f	active	0	915	2023-07-05 21:53:13.913436	f			cash	2023-07-18 08:33:09.649	\N	\N	\N	4	f	
277	101	23	54	56	f	f	active	0	100	2023-07-19 09:22:14.121932	f			cash	2023-07-19 09:22:23.794	\N	\N	\N	4	f	
287	101	23	54	56	f	f	active	0	300	2023-07-21 14:45:29.580334	f			cash	2023-07-24 12:37:43.507	\N	\N	\N	4	f	
301	100	23	54	56	f	f	active	0	405	2023-07-25 11:57:07.782695	f			cash	2023-07-28 18:25:33.108	\N	\N	\N	\N	f	
284	81	18	21	\N	f	t	active	0	1110	2023-07-20 12:11:02.908868	t			POS	\N	\N	\N	\N	\N	f	
294	109	23	54	\N	f	f	active	0	229.99999999999997	2023-07-24 14:10:43.767864	t	<div>25.07.2023 09:13 Test</div>		cash	\N	\N	\N	\N	\N	f	
295	101	23	54	53	f	f	completed	0	100	2023-07-25 09:14:01.65462	f			cash	2023-07-25 09:14:07.141	2023-07-25 09:14:16.348	\N	\N	\N	f	
296	101	23	54	53	f	t	completed	0	100	2023-07-25 09:43:51.057811	f			cash	2023-07-25 09:45:28.132	2023-07-25 09:47:15.571	\N	\N	\N	f	
297	100	23	54	53	f	f	completed	0	30	2023-07-25 09:47:51.92311	f			cash	2023-07-25 10:08:17.343	2023-07-25 10:08:30.036	\N	\N	\N	f	
298	100	23	54	53	f	f	completed	0	30	2023-07-25 10:40:08.28464	t			cash	2023-07-25 10:42:54.4	2023-07-25 10:43:00.516	\N	\N	\N	f	
299	100	23	54	53	f	f	completed	0	30	2023-07-25 10:45:25.025844	f			cash	2023-07-25 10:45:31.016	2023-07-25 10:45:39.066	\N	\N	\N	f	
300	100	23	54	\N	f	f	active	0	30	2023-07-25 11:32:55.964139	f			cash	\N	\N	\N	\N	\N	f	
276	101	23	54	56	t	f	completed	0	0	2023-07-19 09:21:51.201416	f	<div>19.07.2023 09:21 Срочно. </div>		cash	2023-07-20 12:11:28.92	2023-07-25 14:44:17.89	\N	\N	\N	f	
302	100	23	54	56	t	t	active	0	450	2023-07-28 14:51:59.173235	f			cash	2023-07-28 15:08:37.014	\N	\N	\N	\N	f	
\.


--
-- TOC entry 3792 (class 0 OID 25784)
-- Dependencies: 253
-- Data for Name: vne_payment_config; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_payment_config (id, type, vat, tax, gateway_fee, vat_enabled, tax_enabled, gateway_fee_enabled) FROM stdin;
2	stripe	2	4	6	t	t	t
3	checkout	\N	\N	\N	t	t	t
\.


--
-- TOC entry 3794 (class 0 OID 25795)
-- Dependencies: 255
-- Data for Name: vne_payment_intent; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_payment_intent (id, intent_id, restaurant_id, order_id, type, status, amount, total, created_at) FROM stdin;
6	pi_3MtnhaLD7cnfGH081aNNsl8V	13	\N	balance	Pending	200	23367	2023-04-06 10:57:53.516447
7	pi_3MtnxHLD7cnfGH080cTxnaEo	22	\N	balance	Pending	123	14410	2023-04-06 11:14:07.647104
9	pi_3MtoHKLD7cnfGH081uRfG6cf	22	\N	balance	Pending	200	23367	2023-04-06 11:34:46.167044
8	pi_3MtoEALD7cnfGH080qoNFEUT	22	\N	balance	Success	210	24531	2023-04-06 11:31:30.738377
10	pi_3MtohXLD7cnfGH080pyrHuDr	22	\N	balance	Success	200	23367	2023-04-06 12:01:51.248744
11	pi_3Mtpm0LD7cnfGH080WJOhbcs	22	\N	balance	Pending	110	12898	2023-04-06 13:10:32.273674
12	pi_3MtpplLD7cnfGH081TlD3yGe	22	\N	balance	Pending	200	23367	2023-04-06 13:14:26.031847
13	pi_3Mtpq0LD7cnfGH0815CJa2DV	22	\N	balance	Pending	200	23367	2023-04-06 13:14:40.883143
14	pi_3Mtpq4LD7cnfGH081SJ96nz3	22	\N	balance	Pending	200	23367	2023-04-06 13:14:44.396813
15	pi_3MtpqDLD7cnfGH081gtXNCKm	22	\N	balance	Success	200	23367	2023-04-06 13:14:53.275391
16	pi_3Mtq26LD7cnfGH081S6gYQ1h	22	\N	balance	Success	14114	1641935	2023-04-06 13:27:10.158717
17	pi_3Mtq3KLD7cnfGH080W9KrI7R	22	\N	balance	Success	125	14643	2023-04-06 13:28:26.152934
18	pi_3MtqB1LD7cnfGH0805B71Plr	22	\N	balance	Pending	110	12898	2023-04-06 13:36:23.478608
19	pi_3MtqCJLD7cnfGH080ZFPnvUT	22	\N	balance	Pending	1000	116429	2023-04-06 13:37:43.159806
20	pi_3MtqCtLD7cnfGH081cqgJ0Ny	22	\N	balance	Pending	100	11735	2023-04-06 13:38:19.900987
21	pi_3MtqDVLD7cnfGH080eedIXB6	13	\N	balance	Pending	200	23367	2023-04-06 13:38:57.907925
22	pi_3MtqDaLD7cnfGH080ccupMup	13	\N	balance	Pending	200	23367	2023-04-06 13:39:02.848142
23	pi_3MtqEZLD7cnfGH080pn29uxn	13	\N	balance	Success	200	23367	2023-04-06 13:40:03.537943
24	pi_3Mtt2VLD7cnfGH080NtRtKs6	22	\N	balance	Pending	500	58265	2023-04-06 16:39:47.267559
25	pi_3Mtt2oLD7cnfGH0813MaZrgg	22	\N	balance	Success	500	58265	2023-04-06 16:40:07.099412
26	pi_3Mtt6kLD7cnfGH080BSXuTa6	22	\N	balance	Success	600	69898	2023-04-06 16:44:10.980779
27	pi_3Mtt95LD7cnfGH081M9O61Pt	22	\N	balance	Success	800	93163	2023-04-06 16:46:36.013289
28	pi_3MuFd2LD7cnfGH0800IOq0SL	22	\N	balance	Pending	200	22142	2023-04-07 16:47:00.534053
29	pi_3MuFjFLD7cnfGH080HqscQxM	22	\N	balance	Success	200	21936	2023-04-07 16:53:25.642502
30	pi_3MvG5WLD7cnfGH080wtTEEJ3	7	\N	balance	Success	100	10500	2023-04-10 11:28:34.200134
31	pi_3MvL4zLD7cnfGH080i5NXQRw	22	\N	balance	Pending	123	13555	2023-04-10 16:48:21.518088
32	pi_3MvL5tLD7cnfGH081Qe7hAGW	22	\N	balance	Pending	200	22040	2023-04-10 16:49:17.413287
33	pi_3MvL85LD7cnfGH081qwhjBoR	22	\N	balance	Pending	123	13555	2023-04-10 16:51:33.725603
34	pi_3MvLGDLD7cnfGH0801PfPtvK	22	\N	balance	Pending	123	13555	2023-04-10 16:59:57.239082
35	pi_3MvLH9LD7cnfGH080IAOCgrM	22	\N	balance	Pending	400	44080	2023-04-10 17:00:55.203387
36	pi_3MvLHDLD7cnfGH080ZpcV2qS	22	\N	balance	Pending	400	44080	2023-04-10 17:00:59.783474
37	pi_3Mvh2XLD7cnfGH08062sdVXE	51	\N	balance	Pending	200	21900	2023-04-11 16:15:17.662048
38	pi_3Mvh5FLD7cnfGH081Pmau91F	51	\N	balance	Success	200	21900	2023-04-11 16:18:05.607613
39	pi_3MvhaCLD7cnfGH081fTxj2od	51	\N	balance	Success	200	21900	2023-04-11 16:50:04.239647
40	pi_3Mvhb5LD7cnfGH0819ZFOZvg	51	\N	balance	Success	200	21900	2023-04-11 16:51:00.03199
41	pi_3MvvmTLD7cnfGH081XjCpbVZ	51	\N	balance	Success	121	13249	2023-04-12 07:59:41.900076
42	pi_3MvvnwLD7cnfGH080cSJMjB1	51	\N	balance	Success	50	5475	2023-04-12 08:01:12.284902
43	pi_3Mvw4iLD7cnfGH0812LmeuGO	51	\N	balance	Success	500	54750	2023-04-12 08:18:32.730515
44	pi_3MvwJqLD7cnfGH081vcsJMOF	51	\N	balance	Success	100	10950	2023-04-12 08:34:10.657247
\.


--
-- TOC entry 3796 (class 0 OID 25805)
-- Dependencies: 257
-- Data for Name: vne_payment_settings; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_payment_settings (id, type, vat, tax, tip, stripe_fixed, stripe_relative, vat_enabled, tax_enabled, tip_enabled, stripe_enabled) FROM stdin;
2	order	\N	\N	\N	\N	\N	f	f	f	f
1	balance	5	1	\N	2	2.9	t	f	f	f
\.


--
-- TOC entry 3798 (class 0 OID 25817)
-- Dependencies: 259
-- Data for Name: vne_product_images; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_product_images (id, product_id, img, pos) FROM stdin;
5	3	2021-9/1632351029146_500.jpg	0
6	3	2021-9/1632351034607_500.jpg	1
7	3	2021-9/1632351041578_500.jpg	2
8	4	2021-9/1632351091004_500.jpg	0
9	4	2021-9/1632351105494_500.jpg	1
371	86	2021-9/1632762621921_500.jpg	1
372	1	2021-9/1632942969923_500.jpg	0
1	1	2021-9/1632350544594_500.jpg	2
2	1	2021-9/1632350619186_500.jpg	3
3	1	2021-9/1632350590230_500.jpg	4
373	200	2021-10/1634920285748_500.jpg	0
150	85	2021-9/1632350544594_500.jpg	5
151	85	2021-9/1632350619186_500.jpg	7
368	194	2021-9/1632669890885_500.jpg	0
369	194	2021-9/1632669894240_500.jpg	1
154	87	2021-9/1632350544594_500.jpg	1
374	202	2021-10/1634924455805_500.jpg	0
152	86	2021-9/1632350544594_500.jpg	0
153	86	2021-9/1632350619186_500.jpg	0
155	87	2021-9/1632350619186_500.jpg	0
156	88	2021-9/1632350544594_500.jpg	0
157	88	2021-9/1632350619186_500.jpg	0
158	89	2021-9/1632350544594_500.jpg	0
159	89	2021-9/1632350619186_500.jpg	0
160	90	2021-9/1632350544594_500.jpg	0
161	90	2021-9/1632350619186_500.jpg	0
162	91	2021-9/1632350544594_500.jpg	0
163	91	2021-9/1632350619186_500.jpg	0
164	92	2021-9/1632350544594_500.jpg	0
165	92	2021-9/1632350619186_500.jpg	0
166	93	2021-9/1632350544594_500.jpg	0
167	93	2021-9/1632350619186_500.jpg	0
170	95	2021-9/1632350544594_500.jpg	0
171	95	2021-9/1632350619186_500.jpg	0
174	97	2021-9/1632350544594_500.jpg	0
175	97	2021-9/1632350619186_500.jpg	0
176	98	2021-9/1632350544594_500.jpg	0
177	98	2021-9/1632350619186_500.jpg	0
178	99	2021-9/1632350544594_500.jpg	0
179	99	2021-9/1632350619186_500.jpg	0
180	100	2021-9/1632350544594_500.jpg	0
181	100	2021-9/1632350619186_500.jpg	0
182	101	2021-9/1632350544594_500.jpg	0
183	101	2021-9/1632350619186_500.jpg	0
184	102	2021-9/1632350544594_500.jpg	0
185	102	2021-9/1632350619186_500.jpg	0
186	103	2021-9/1632350544594_500.jpg	0
187	103	2021-9/1632350619186_500.jpg	0
188	104	2021-9/1632350544594_500.jpg	0
189	104	2021-9/1632350619186_500.jpg	0
190	105	2021-9/1632350544594_500.jpg	0
191	105	2021-9/1632350619186_500.jpg	0
192	106	2021-9/1632350544594_500.jpg	0
193	106	2021-9/1632350619186_500.jpg	0
194	107	2021-9/1632350544594_500.jpg	0
195	107	2021-9/1632350619186_500.jpg	0
196	108	2021-9/1632350544594_500.jpg	0
197	108	2021-9/1632350619186_500.jpg	0
198	109	2021-9/1632350544594_500.jpg	0
199	109	2021-9/1632350619186_500.jpg	0
200	110	2021-9/1632350544594_500.jpg	0
201	110	2021-9/1632350619186_500.jpg	0
202	111	2021-9/1632350544594_500.jpg	0
203	111	2021-9/1632350619186_500.jpg	0
204	112	2021-9/1632350544594_500.jpg	0
205	112	2021-9/1632350619186_500.jpg	0
206	113	2021-9/1632350544594_500.jpg	0
207	113	2021-9/1632350619186_500.jpg	0
208	114	2021-9/1632350544594_500.jpg	0
209	114	2021-9/1632350619186_500.jpg	0
210	115	2021-9/1632350544594_500.jpg	0
211	115	2021-9/1632350619186_500.jpg	0
212	116	2021-9/1632350544594_500.jpg	0
213	116	2021-9/1632350619186_500.jpg	0
214	117	2021-9/1632350544594_500.jpg	0
215	117	2021-9/1632350619186_500.jpg	0
216	118	2021-9/1632350544594_500.jpg	0
217	118	2021-9/1632350619186_500.jpg	0
218	119	2021-9/1632350544594_500.jpg	0
219	119	2021-9/1632350619186_500.jpg	0
220	120	2021-9/1632350544594_500.jpg	0
221	120	2021-9/1632350619186_500.jpg	0
222	121	2021-9/1632350544594_500.jpg	0
223	121	2021-9/1632350619186_500.jpg	0
224	122	2021-9/1632350544594_500.jpg	0
225	122	2021-9/1632350619186_500.jpg	0
226	123	2021-9/1632350544594_500.jpg	0
227	123	2021-9/1632350619186_500.jpg	0
228	124	2021-9/1632350544594_500.jpg	0
229	124	2021-9/1632350619186_500.jpg	0
230	125	2021-9/1632350544594_500.jpg	0
231	125	2021-9/1632350619186_500.jpg	0
232	126	2021-9/1632350544594_500.jpg	0
233	126	2021-9/1632350619186_500.jpg	0
234	127	2021-9/1632350544594_500.jpg	0
235	127	2021-9/1632350619186_500.jpg	0
236	128	2021-9/1632350544594_500.jpg	0
237	128	2021-9/1632350619186_500.jpg	0
238	129	2021-9/1632350544594_500.jpg	0
239	129	2021-9/1632350619186_500.jpg	0
240	130	2021-9/1632350544594_500.jpg	0
241	130	2021-9/1632350619186_500.jpg	0
242	131	2021-9/1632350544594_500.jpg	0
243	131	2021-9/1632350619186_500.jpg	0
244	132	2021-9/1632350544594_500.jpg	0
245	132	2021-9/1632350619186_500.jpg	0
246	133	2021-9/1632350544594_500.jpg	0
247	133	2021-9/1632350619186_500.jpg	0
248	134	2021-9/1632350544594_500.jpg	0
249	134	2021-9/1632350619186_500.jpg	0
250	135	2021-9/1632350544594_500.jpg	0
251	135	2021-9/1632350619186_500.jpg	0
252	136	2021-9/1632350544594_500.jpg	0
253	136	2021-9/1632350619186_500.jpg	0
254	137	2021-9/1632350544594_500.jpg	0
255	137	2021-9/1632350619186_500.jpg	0
256	138	2021-9/1632350544594_500.jpg	0
257	138	2021-9/1632350619186_500.jpg	0
258	139	2021-9/1632350544594_500.jpg	0
259	139	2021-9/1632350619186_500.jpg	0
260	140	2021-9/1632350544594_500.jpg	0
261	140	2021-9/1632350619186_500.jpg	0
262	141	2021-9/1632350544594_500.jpg	0
263	141	2021-9/1632350619186_500.jpg	0
264	142	2021-9/1632350544594_500.jpg	0
265	142	2021-9/1632350619186_500.jpg	0
266	143	2021-9/1632350544594_500.jpg	0
267	143	2021-9/1632350619186_500.jpg	0
268	144	2021-9/1632350544594_500.jpg	0
269	144	2021-9/1632350619186_500.jpg	0
270	145	2021-9/1632350544594_500.jpg	0
271	145	2021-9/1632350619186_500.jpg	0
274	147	2021-9/1632350544594_500.jpg	0
275	147	2021-9/1632350619186_500.jpg	0
276	148	2021-9/1632350544594_500.jpg	0
277	148	2021-9/1632350619186_500.jpg	0
278	149	2021-9/1632350544594_500.jpg	0
279	149	2021-9/1632350619186_500.jpg	0
280	150	2021-9/1632350544594_500.jpg	0
281	150	2021-9/1632350619186_500.jpg	0
282	151	2021-9/1632350544594_500.jpg	0
283	151	2021-9/1632350619186_500.jpg	0
284	152	2021-9/1632350544594_500.jpg	0
285	152	2021-9/1632350619186_500.jpg	0
286	153	2021-9/1632350544594_500.jpg	0
287	153	2021-9/1632350619186_500.jpg	0
288	154	2021-9/1632350544594_500.jpg	0
289	154	2021-9/1632350619186_500.jpg	0
290	155	2021-9/1632350544594_500.jpg	0
291	155	2021-9/1632350619186_500.jpg	0
292	156	2021-9/1632350544594_500.jpg	0
293	156	2021-9/1632350619186_500.jpg	0
294	157	2021-9/1632350544594_500.jpg	0
295	157	2021-9/1632350619186_500.jpg	0
296	158	2021-9/1632350544594_500.jpg	0
297	158	2021-9/1632350619186_500.jpg	0
298	159	2021-9/1632350544594_500.jpg	0
299	159	2021-9/1632350619186_500.jpg	0
300	160	2021-9/1632350544594_500.jpg	0
301	160	2021-9/1632350619186_500.jpg	0
302	161	2021-9/1632350544594_500.jpg	0
303	161	2021-9/1632350619186_500.jpg	0
304	162	2021-9/1632350544594_500.jpg	0
305	162	2021-9/1632350619186_500.jpg	0
306	163	2021-9/1632350544594_500.jpg	0
307	163	2021-9/1632350619186_500.jpg	0
308	164	2021-9/1632350544594_500.jpg	0
309	164	2021-9/1632350619186_500.jpg	0
310	165	2021-9/1632350544594_500.jpg	0
311	165	2021-9/1632350619186_500.jpg	0
312	166	2021-9/1632350544594_500.jpg	0
313	166	2021-9/1632350619186_500.jpg	0
314	167	2021-9/1632350544594_500.jpg	0
315	167	2021-9/1632350619186_500.jpg	0
316	168	2021-9/1632350544594_500.jpg	0
317	168	2021-9/1632350619186_500.jpg	0
318	169	2021-9/1632350544594_500.jpg	0
319	169	2021-9/1632350619186_500.jpg	0
320	170	2021-9/1632350544594_500.jpg	0
321	170	2021-9/1632350619186_500.jpg	0
322	171	2021-9/1632350544594_500.jpg	0
323	171	2021-9/1632350619186_500.jpg	0
324	172	2021-9/1632350544594_500.jpg	0
325	172	2021-9/1632350619186_500.jpg	0
326	173	2021-9/1632350544594_500.jpg	0
327	173	2021-9/1632350619186_500.jpg	0
328	174	2021-9/1632350544594_500.jpg	0
329	174	2021-9/1632350619186_500.jpg	0
330	175	2021-9/1632350544594_500.jpg	0
331	175	2021-9/1632350619186_500.jpg	0
332	176	2021-9/1632350544594_500.jpg	0
333	176	2021-9/1632350619186_500.jpg	0
334	177	2021-9/1632350544594_500.jpg	0
335	177	2021-9/1632350619186_500.jpg	0
336	178	2021-9/1632350544594_500.jpg	0
337	178	2021-9/1632350619186_500.jpg	0
338	179	2021-9/1632350544594_500.jpg	0
339	179	2021-9/1632350619186_500.jpg	0
340	180	2021-9/1632350544594_500.jpg	0
341	180	2021-9/1632350619186_500.jpg	0
342	181	2021-9/1632350544594_500.jpg	0
343	181	2021-9/1632350619186_500.jpg	0
344	182	2021-9/1632350544594_500.jpg	0
345	182	2021-9/1632350619186_500.jpg	0
346	183	2021-9/1632350544594_500.jpg	0
347	183	2021-9/1632350619186_500.jpg	0
348	184	2021-9/1632350544594_500.jpg	0
349	184	2021-9/1632350619186_500.jpg	0
370	195	2021-9/1632669997544_500.jpg	0
366	1	2021-9/1632527210468_500.jpg	7
363	1	2021-9/1632527184307_500.jpg	1
364	1	2021-9/1632527188680_500.jpg	5
365	1	2021-9/1632527193075_500.jpg	6
381	199	2023-6/1687522186917_500.jpg	0
382	206	2023-6/1687876170639_500.jpg	0
383	207	2023-6/1687909545318_500.jpg	0
386	208	2023-7/1690187425227_500.jpg	0
387	209	2023-7/1690188789657_500.jpg	0
388	210	2023-7/1690188849342_500.jpg	0
\.


--
-- TOC entry 3800 (class 0 OID 25826)
-- Dependencies: 261
-- Data for Name: vne_products; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_products (id, cat_id, name, weight, cal, "time", about, pos, active, likes, code, recommended, price, restaurant_id, unit, alc, alc_percent) FROM stdin;
87	1	Какое-то блюдо 3	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	4	t	0	hf0003	f	1000	21	g	f	0
2	6	Тестовое блюдо	0	0			1	t	0		f	0	9	g	f	0
97	1	Какое-то блюдо 13	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	14	t	0	hf00013	f	1000	21	g	f	0
101	1	Какое-то блюдо 17	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	18	t	0	hf00017	f	1000	21	g	f	0
102	1	Какое-то блюдо 18	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	19	t	0	hf00018	f	1000	21	g	f	0
103	1	Какое-то блюдо 19	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	20	t	0	hf00019	f	1000	21	g	f	0
105	1	Какое-то блюдо 21	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	22	t	0	hf00021	f	1000	21	g	f	0
106	1	Какое-то блюдо 22	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	23	t	0	hf00022	f	1000	21	g	f	0
107	1	Какое-то блюдо 23	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	24	t	0	hf00023	f	1000	21	g	f	0
3	1	Cheeseburger	410	755	10-12 мин	Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. 	1	t	6	h0002	t	305	21	g	f	0
104	1	Какое-то блюдо 20	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	21	t	1	hf00020	t	1000	21	g	f	0
108	1	Какое-то блюдо 24	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	25	t	0	hf00024	f	1000	21	g	f	0
109	1	Какое-то блюдо 25	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	26	t	0	hf00025	f	1000	21	g	f	0
110	1	Какое-то блюдо 26	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	27	t	0	hf00026	f	1000	21	g	f	0
111	1	Какое-то блюдо 27	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	28	t	0	hf00027	f	1000	21	g	f	0
112	1	Какое-то блюдо 28	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	29	t	0	hf00028	f	1000	21	g	f	0
113	1	Какое-то блюдо 29	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	30	t	0	hf00029	f	1000	21	g	f	0
114	1	Какое-то блюдо 30	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	31	t	0	hf00030	f	1000	21	g	f	0
115	1	Какое-то блюдо 31	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	32	t	0	hf00031	f	1000	21	g	f	0
116	1	Какое-то блюдо 32	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	33	t	0	hf00032	f	1000	21	g	f	0
126	1	Какое-то блюдо 42	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	43	t	0	hf00042	t	1000	21	g	f	0
118	1	Какое-то блюдо 34	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	35	t	0	hf00034	f	1000	21	g	f	0
120	1	Какое-то блюдо 36	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	37	t	0	hf00036	f	1000	21	g	f	0
121	1	Какое-то блюдо 37	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	38	t	0	hf00037	f	1000	21	g	f	0
122	1	Какое-то блюдо 38	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	39	t	0	hf00038	f	1000	21	g	f	0
123	1	Какое-то блюдо 39	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	40	t	0	hf00039	f	1000	21	g	f	0
124	1	Какое-то блюдо 40	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	41	t	0	hf00040	f	1000	21	g	f	0
125	1	Какое-то блюдо 41	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	42	t	0	hf00041	f	1000	21	g	f	0
127	1	Какое-то блюдо 43	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	44	t	0	hf00043	f	1000	21	g	f	0
90	1	Какое-то блюдо 6	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	7	t	0	hf0006	f	1000	21	g	f	0
94	1	Какое-то блюдо 10	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	11	t	0	hf00010	f	1000	21	g	f	0
96	1	Какое-то блюдо 12	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	13	t	0	hf00012	f	1000	21	g	f	0
88	1	Какое-то блюдо 4	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	5	t	0		f	1000	21	g	f	0
89	1	Какое-то блюдо 5	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	6	t	0	hf0005	f	1000	21	g	f	0
95	1	Какое-то блюдо 11	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	12	t	0	hf00011	f	1000	21	g	f	0
91	1	Какое-то блюдо 7	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	8	t	0	hf0007	f	1000	21	g	f	0
117	1	Какое-то блюдо 33	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	34	t	0	hf00033	t	1000	21	g	f	0
119	1	Какое-то блюдо 35	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	36	t	0	hf00035	t	1000	21	g	f	0
145	1	Какое-то блюдо 61	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	62	t	0	hf00061	t	1000	21	g	f	0
93	1	Какое-то блюдо 9	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	10	t	0	hf0009	f	1000	21	g	f	0
92	1	Какое-то блюдо 8	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	9	t	0	hf0008	t	1000	21	g	f	0
98	1	Какое-то блюдо 14	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	15	t	0	hf00014	f	1000	21	g	f	0
100	1	Какое-то блюдо 16	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	17	t	0	hf00016	f	1000	21	g	f	0
195	7	Мороженое "Фруктовый сад"	200	700	10 мин	описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого 	1	t	0	m0002	f	300	21	g	f	0
128	1	Какое-то блюдо 44	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	45	t	0	hf00044	f	1000	21	g	f	0
161	1	Какое-то блюдо 77	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	78	t	1	hf00077	t	1000	21	g	f	0
129	1	Какое-то блюдо 45	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	46	t	0	hf00045	f	1000	21	g	f	0
130	1	Какое-то блюдо 46	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	47	t	0	hf00046	f	1000	21	g	f	0
199	6	Beef burger	111	0	\N	\N	0	t	0	111	f	0	9	ml	t	23
202	17	Vine	700	0			1	t	1	al0002	f	1500	21	ml	t	12
200	17	Procseco	700	0			0	t	0	al0001	t	1000	21	ml	t	11
86	1	Hamburger	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	3	t	0	hf0002	f	1000	21	g	f	0
131	1	Какое-то блюдо 47	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	48	t	0	hf00047	f	1000	21	g	f	0
132	1	Какое-то блюдо 48	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	49	t	0	hf00048	f	1000	21	g	f	0
133	1	Какое-то блюдо 49	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	50	t	0	hf00049	f	1000	21	g	f	0
134	1	Какое-то блюдо 50	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	51	t	0	hf00050	f	1000	21	g	f	0
135	1	Какое-то блюдо 51	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	52	t	0	hf00051	f	1000	21	g	f	0
136	1	Какое-то блюдо 52	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	53	t	0	hf00052	f	1000	21	g	f	0
137	1	Какое-то блюдо 53	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	54	t	0	hf00053	f	1000	21	g	f	0
138	1	Какое-то блюдо 54	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	55	t	0	hf00054	f	1000	21	g	f	0
139	1	Какое-то блюдо 55	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	56	t	0	hf00055	f	1000	21	g	f	0
140	1	Какое-то блюдо 56	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	57	t	0	hf00056	f	1000	21	g	f	0
141	1	Какое-то блюдо 57	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	58	t	0	hf00057	f	1000	21	g	f	0
142	1	Какое-то блюдо 58	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	59	t	0	hf00058	f	1000	21	g	f	0
143	1	Какое-то блюдо 59	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	60	t	0	hf00059	f	1000	21	g	f	0
144	1	Какое-то блюдо 60	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	61	t	0	hf00060	f	1000	21	g	f	0
146	1	Какое-то блюдо 62	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	63	t	0	hf00062	f	1000	21	g	f	0
147	1	Какое-то блюдо 63	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	64	t	0	hf00063	f	1000	21	g	f	0
148	1	Какое-то блюдо 64	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	65	t	0	hf00064	f	1000	21	g	f	0
149	1	Какое-то блюдо 65	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	66	t	0	hf00065	f	1000	21	g	f	0
150	1	Какое-то блюдо 66	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	67	t	0	hf00066	f	1000	21	g	f	0
151	1	Какое-то блюдо 67	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	68	t	0	hf00067	f	1000	21	g	f	0
152	1	Какое-то блюдо 68	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	69	t	0	hf00068	f	1000	21	g	f	0
153	1	Какое-то блюдо 69	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	70	t	0	hf00069	f	1000	21	g	f	0
154	1	Какое-то блюдо 70	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	71	t	0	hf00070	f	1000	21	g	f	0
155	1	Какое-то блюдо 71	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	72	t	0	hf00071	f	1000	21	g	f	0
156	1	Какое-то блюдо 72	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	73	t	0	hf00072	f	1000	21	g	f	0
157	1	Какое-то блюдо 73	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	74	t	0	hf00073	f	1000	21	g	f	0
158	1	Какое-то блюдо 74	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	75	t	0	hf00074	f	1000	21	g	f	0
159	1	Какое-то блюдо 75	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	76	t	0	hf00075	f	1000	21	g	f	0
160	1	Какое-то блюдо 76	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	77	t	0	hf00076	f	1000	21	g	f	0
162	1	Какое-то блюдо 78	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	79	t	0	hf00078	f	1000	21	g	f	0
163	1	Какое-то блюдо 79	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	80	t	0	hf00079	f	1000	21	g	f	0
164	1	Какое-то блюдо 80	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	81	t	0	hf00080	f	1000	21	g	f	0
165	1	Какое-то блюдо 81	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	82	t	0	hf00081	f	1000	21	g	f	0
166	1	Какое-то блюдо 82	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	83	t	0	hf00082	f	1000	21	g	f	0
167	1	Какое-то блюдо 83	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	84	t	0	hf00083	f	1000	21	g	f	0
168	1	Какое-то блюдо 84	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	85	t	0	hf00084	f	1000	21	g	f	0
169	1	Какое-то блюдо 85	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	86	t	0	hf00085	f	1000	21	g	f	0
170	1	Какое-то блюдо 86	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	87	t	0	hf00086	f	1000	21	g	f	0
171	1	Какое-то блюдо 87	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	88	t	0	hf00087	f	1000	21	g	f	0
172	1	Какое-то блюдо 88	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	89	t	0	hf00088	f	1000	21	g	f	0
173	1	Какое-то блюдо 89	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	90	t	0	hf00089	f	1000	21	g	f	0
174	1	Какое-то блюдо 90	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	91	t	0	hf00090	f	1000	21	g	f	0
175	1	Какое-то блюдо 91	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	92	t	0	hf00091	f	1000	21	g	f	0
176	1	Какое-то блюдо 92	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	93	t	0	hf00092	f	1000	21	g	f	0
177	1	Какое-то блюдо 93	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	94	t	0	hf00093	f	1000	21	g	f	0
178	1	Какое-то блюдо 94	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	95	t	0	hf00094	f	1000	21	g	f	0
179	1	Какое-то блюдо 95	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	96	t	0	hf00095	f	1000	21	g	f	0
180	1	Какое-то блюдо 96	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	97	t	0	hf00096	f	1000	21	g	f	0
181	1	Какое-то блюдо 97	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	98	t	0	hf00097	f	1000	21	g	f	0
184	1	Какое-то блюдо 100	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	101	t	0	hf000100	f	1000	21	g	f	0
182	1	Какое-то блюдо 98	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	99	t	0	hf00098	f	1000	21	g	f	0
183	1	Какое-то блюдо 99	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	100	t	0	hf00099	f	1000	21	g	f	0
99	1	Какое-то блюдо 15	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	16	t	2	hf00015	t	1000	21	g	f	0
4	4	Цитрусовая нарезка	250	100	5 мин.	Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. 	1	t	5	f0001	f	200	21	g	f	0
204	18	1	500	3000	10	тестовое блюдо для отеля 	1	t	0	\N	t	10	51	g	f	0
206	19	Burger	250	1000	30		0	t	0	1	f	0	54	g	f	0
85	1	Hamburger "Boston"	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	2	t	2	hf0001	f	1000	21	g	f	0
194	7	Ice cream	100	640	10 мин	описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого 	0	t	2	m0001	t	500	21	g	f	0
210	21	Cerro Nevado	100	20			0	t	0	134234234	f	150	54	ml	t	18
208	20	Salmon	100	5000	90	Experience a tantalizing blend of flavors with our Salmon in Sour Dish. Succulent salmon fillets are skillfully pan-seared to perfection, delivering a buttery texture that melts in your mouth. What sets this dish apart is the tangy and zesty twist of a delightful sour sauce. The infusion of citrusy zest, tamarind, or a splash of vinegar complements the richness of the salmon, creating a harmonious and unforgettable culinary experience. Served with a medley of vibrant vegetables, this dish is a true delight for your taste buds. A perfect fusion of elegance and creativity, our Salmon in Sour Dish promises a delectable journey of flavors in every bite.	1	t	0		t	100	54	ml	f	57
1	1	Beef burger	3001	1200	10-20 mins	Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. 	0	t	7	h0001	t	100	21	g	f	0
207	19	Hamburger	300	600	15		0	t	0	2	t	30	54	g	f	0
209	21	Cabernet Sauvignon	100	10			0	t	0	1232138762	t	110	54	ml	t	15
\.


--
-- TOC entry 3841 (class 0 OID 26726)
-- Dependencies: 302
-- Data for Name: vne_products_allergens_vne_allergen; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_products_allergens_vne_allergen ("vneProductsId", "vneAllergenId") FROM stdin;
208	1
208	7
208	12
\.


--
-- TOC entry 3802 (class 0 OID 25844)
-- Dependencies: 263
-- Data for Name: vne_qr_config; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_qr_config (id, size, margin, "dotColor", "dotType", "cornerDotColor", "cornerDotType", "cornerSquareColor", "cornerSquareType", "imageMargin", "imageSize", background, restaurant_id, "createdAt", img, icon_id) FROM stdin;
2	200	10	#000000	square	#000000	square	#000000	square	5	0.5	#ffffff	9	2023-05-24 11:18:55.631213	\N	19
3	250	32	#000000	square	#000000	square	#00006e	square	0	0.3	#ffffff	21	2023-07-17 04:54:17.169087	\N	\N
4	200	10	#000000	extra-rounded	#000000	square	#000000	square	2	0.3	#ffffff	54	2023-07-26 14:20:03.541398	2023-7/1690381704562.png	\N
\.


--
-- TOC entry 3804 (class 0 OID 25857)
-- Dependencies: 265
-- Data for Name: vne_restaurant_fee_configs; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_restaurant_fee_configs (restaurant_id, payment_type, vat_balance, tax_balance, gateway_fee_balance, vat_balance_disabled, tax_balance_disabled, gateway_fee_balance_disabled, vat_order, tax_order, gateway_fee_order, vat_order_disabled, tax_order_disabled, gateway_fee_order_disabled, service_fee_order, service_fee_order_disabled, webhook_id, stripe_secret_key, stripe_webhook_key, checkout_private_key, checkout_public_key, checkout_processing_id, checkout_webhook_sig_key, checkout_webhook_auth_key) FROM stdin;
1	stripe	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
22	stripe	\N	\N	\N	f	f	f	22	11	44	t	f	t	0	f	\N	\N	\N	\N	\N	\N	\N	\N
55	stripe	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
52	stripe	\N	\N	\N	f	f	f	5	11	44	f	t	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
52	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
51	stripe	\N	\N	\N	f	f	f	5	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
51	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
21	stripe	\N	\N	\N	f	f	f	5	3	0	f	f	f	1	f	\N	\N	\N	\N	\N	\N	\N	\N
21	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
13	stripe	\N	\N	\N	f	f	f	5	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
13	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
12	stripe	\N	\N	\N	f	f	f	5	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
12	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
9	stripe	2	3	10	t	f	t	5	2	8	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
9	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
8	stripe	\N	\N	\N	f	f	f	5	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
8	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
7	stripe	3	5	8	f	f	f	5	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
7	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
6	stripe	\N	\N	\N	f	f	f	5	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
6	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
5	stripe	\N	\N	\N	f	f	f	5	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
5	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
4	stripe	\N	\N	\N	f	f	f	5	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
4	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
3	stripe	\N	\N	\N	f	f	f	5	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
3	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
2	stripe	\N	\N	\N	f	f	f	5	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
2	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
54	checkout	\N	\N	\N	f	f	f	0	0	0	f	f	f	0	f	\N	\N	\N	\N	\N	\N	\N	\N
54	stripe	2	4	6	t	f	t	5	2	8	f	t	t	6	t	we_1NXKGjLD7cnfGH08Nl5YnGy7	NmNhMGNlMTJlYzU4ZjQ3YWVlYzNmY2Y2YjY2YTk1MTYyMzIxZjk1MTI1NTFmMjI4OGQ2YzM2ZDMxMzcwMjUwYzYwZjFjYzU5ZDFlODczMmQ1MTFmOGQyOTBhZDdlYjgzNDY0MjdiNDE5NGNiNjU3ZTI5MmMzOGRjYmUyNjA2MjA1MTY2MDFkMThlM2I1OGRjOWZmMTEzMDQ5MDkyOTA1MTMwMTE3YjE2MWFmNWI0M2U1Yzk3NjA0M2IxMjIxYjc4Y2Q5ZGQ3NmIzMzc4MTE2MTA2MzY1ODU2OWEyMWIxY2M=	YWU1N2I4NzlmMTM1YjFhNWNhN2E4YjgzMWYzZmMwMjVhYTAxZDMxMzdiMDA5NDE0OWY3YWFkZDQ0YjY3ZjY5ZjhlMWE2NDk2ZGY0NTA1ODU5YjhkMjk4Mzg2MDBjMDU1	\N	\N	\N	\N	\N
\.


--
-- TOC entry 3805 (class 0 OID 25874)
-- Dependencies: 266
-- Data for Name: vne_restaurants; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_restaurants (id, currency_id, name, domain, ownername, phone, address, inn, ogrn, comment, created_at, lang_id, money, active, type_id, payment_method, "qrId") FROM stdin;
18	1	Пирожковая	pirog	\N	+380664021350	Танкопия, 13/99	\N	\N	\N	2021-08-27 22:30:50.941314	1	-10	t	\N	\N	\N
19	1	Рыбный день	test222	\N	+380664021350	Танкопия, 13/9	\N	\N	\N	2021-08-28 00:39:48.284041	1	-10	t	\N	\N	\N
1	1	Плакучая ива	iva	Иван Петров	+38 066 4020000	Харьков, ул. Кошкина, 1	123456	654987	тестовый ресторан	2021-08-26 20:52:31.021727	1	-10	t	\N	\N	\N
10	1	Сто пудов	test8	Алексей Сидоров	+380664021350	Танкопия, 1	\N	\N	\N	2021-08-27 00:25:50.223075	1	-10	t	\N	\N	\N
45	1	Кошки-мышки	http://ukr.net	Максим Савенков	+380667889999	Танкопия, 13/9	999666333	555444	\N	2021-09-02 21:07:52.119825	1	-10	t	\N	\N	\N
38	1	Владимирский	http://vlad.net	Овечкин Игорь Иванович	+380664021350	Танкопия, 13/91	999666333	11222333	тест	2021-08-30 12:54:22.738402	1	-10	t	\N	\N	\N
15	1	Длинное название ресторана	test12	\N	\N	\N	\N	\N	\N	2021-08-27 01:55:15.844543	1	-10	t	\N	\N	\N
43	1	Надежда	nadezhda.ru	Овечкин Игорь Иванович	+38066666666	Танкопия, 5	123654	654987	\N	2021-09-02 12:36:33.846619	1	-10	t	\N	\N	\N
46	1	RRR		Овечкин Игорь Иванович	+380664021350	Танкопия, 103	999666333	555444	\N	2021-09-07 01:16:30.429325	1	-10	t	\N	\N	\N
22	5	Курский	kursk	name	+380664021350	Танкопия, 13/9	1	2	\N	2021-08-28 11:27:23.119	1	-10	t	\N	\N	\N
53	5	Dima		Dima	+97199999999	Dubai	9929349192	2818438532882	Welcome	2023-07-02 13:50:06.381673	2	-10	t	\N	\N	\N
51	2	Отель 1	\N	Фамилия Имя	911111111111	test	test	test	\N	2023-03-30 11:43:51.852	1	201	t	10	\N	\N
54	5	The best Restaurant	4	2	3	5	6	7	8	2023-04-20 22:17:12.821	2	-10	t	10	\N	\N
52	3	123	123	test	123	123	123	123	\N	2023-04-13 15:54:33.406	2	110	t	10	\N	\N
55	3	HOTEL		HOTEL	+971585462666	HOTEL STREET	29193499454	342542463	jdsja	2023-07-31 14:14:34.108227	2	0	t	10	\N	\N
13	2	Ромашка	test11	Свинкин Олег Иванович	+3806778945612	ул. Ленина, 2	999666333	888999999	тестовый камент	2021-08-27 00:26:35.018	2	200	f	\N	\N	\N
12	5	Вкусно-быстро	tets10.ry	Птичкин Федор Моисеевич	+38 095 12345687	Харьков, ул. Маршала Жукова, 5	666555444	11222333	\N	2021-08-27 00:26:24.033	1	0	t	\N	\N	\N
8	1	Слепая свинья	test6	test	17171717171717	test	test	test	\N	2021-08-27 00:25:12.606	1	0	t	\N	\N	\N
7	1	National	test5	test	18181818181818	test	test	test	\N	2021-08-27 00:25:04.843	1	100	t	\N	\N	\N
6	1	Привет из 90-х	test4	test	171716718181	test	test	test	\N	2021-08-27 00:24:57.598	1	0	t	\N	\N	\N
5	1	У Ашота	test3	Алексей Козлов	+380664021350	Танкопия, 1	test	test	\N	2021-08-27 00:24:34.213	2	0	t	\N	\N	\N
4	1	Шашлычная №1	test2	test	287364783	test	test	test	\N	2021-08-27 00:24:10.543	1	0	t	\N	\N	\N
3	1	Одарка	test1	test	18923798123	test	test	tesr	\N	2021-08-27 00:23:50.454	1	0	t	\N	\N	\N
2	2	Рога и копыта	roga	Андрей Рыбкин	+38 067 0000000	Москва, ул. Собачкина, 2	111222	333555	еще один тестовый ресторан	2021-08-26 20:52:31.021	1	0	t	\N	\N	\N
21	5	Пушкинский	https://push1.ru	Курочкин Иван Кузьмич	+38 097 456789987	Москва	456	654	\N	2021-08-28 11:12:59.882	1	3660	t	\N	\N	\N
9	2	McDonalds	test7	1	2	3	4	5	\N	2021-08-27 00:25:34.269	2	183	t	10	\N	\N
\.


--
-- TOC entry 3843 (class 0 OID 26869)
-- Dependencies: 304
-- Data for Name: vne_review; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_review (id, created_at, taste, ambience, service, comment, order_id) FROM stdin;
1	2023-07-25 10:08:46.482377	4	5	5	everything is good	297
2	2023-07-25 10:43:23.067876	4	5	4	good\n	298
3	2023-07-25 10:45:51.396877	3	2	4	тест	299
\.


--
-- TOC entry 3807 (class 0 OID 25885)
-- Dependencies: 268
-- Data for Name: vne_room; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_room (id, floor_id, no, capacity, x, y, code, type_id) FROM stdin;
4	8	1	4	2	1	60ge1ehhwu	1
5	2	1	2	0	0	7vbmshvot9	1
6	2	1	3	1	0	et50wpa1ub	1
7	2	1	3	2	0	hlcnzezqnb	\N
9	9	1	5	0	0	titeo8okbk	1
\.


--
-- TOC entry 3809 (class 0 OID 25896)
-- Dependencies: 270
-- Data for Name: vne_room_type; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_room_type (id, name, priority) FROM stdin;
1		1
2		2
\.


--
-- TOC entry 3811 (class 0 OID 25906)
-- Dependencies: 272
-- Data for Name: vne_room_type_translation; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_room_type_translation (id, type_id, lang_id, name) FROM stdin;
1	1	8	Priority
2	1	1	Priority
3	1	2	Priority
4	2	8	Priority 2
5	2	1	Priority 2
6	2	2	Priority 2
\.


--
-- TOC entry 3813 (class 0 OID 25914)
-- Dependencies: 274
-- Data for Name: vne_serving_translations; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_serving_translations (id, serving_id, lang_id, name) FROM stdin;
1	\N	\N	\N
11	2	8	توجو
6	2	2	Takeout
5	2	1	С собой
3	1	2	Serve all dishes together
10	4	2	Serve every dish as soon as it is ready
9	4	1	Подавать каждое блюдо, как только оно будет готово
12	1	8	قدمي جميع الوجبات معًا
13	4	8	قدم كل طبق بمجرد أن يصبح جاهزًا.
2	1	1	Подать все блюда вместе
\.


--
-- TOC entry 3815 (class 0 OID 25922)
-- Dependencies: 276
-- Data for Name: vne_servings; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_servings (id, pos, defended) FROM stdin;
2	2	f
1	1	t
4	3	f
\.


--
-- TOC entry 3817 (class 0 OID 25929)
-- Dependencies: 278
-- Data for Name: vne_settings; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_settings (id, p, v, c, pos, in_app, defended) FROM stdin;
5	smtp-host	smtp.gmail.com	\N	100	f	f
6	smtp-port	587	\N	101	f	f
7	smtp-login	viodev.robot@gmail.com	\N	102	f	f
8	smtp-pw	6vl1TfeXq	\N	103	f	f
9	price	10	цена человеко-дня	4	t	f
10	pay-time	1:00	время снятия денег со счетов	5	t	f
12	restorator-msg		сообщение для рестораторов	6	t	f
2	google-clientid	63103186909-5ut3m449vpr9uqp0v7jv02phea85mub0.apps.googleusercontent.com	Google Oauth API client ID	200	t	f
17	fee_stripe_fixed	1	AED	10	t	f
15	fee_tax	9	%	8	t	f
14	fee_vat	5	%	7	t	f
18	fee_tip	10	%	0	t	f
19	currency	AED	\N	11	t	f
16	fee_stripe_percent	2.9	%	9	t	f
4	owner-app-url	https://a.resto-club.com	URL админки владельца	1	t	f
13	customer-app-url	https://order.resto-club.com	URL приложения посетителей	3	t	f
11	restorator-app-url	https://r.resto-club.com	URL админки рестораторов	2	t	f
\.


--
-- TOC entry 3819 (class 0 OID 25940)
-- Dependencies: 280
-- Data for Name: vne_subscription; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_subscription (id, is_active, restaurant_id, amount, total, created_at) FROM stdin;
\.


--
-- TOC entry 3821 (class 0 OID 25946)
-- Dependencies: 282
-- Data for Name: vne_tables; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_tables (id, hall_id, no, seats, x, y, code) FROM stdin;
82	18	2	4	1	1	bxak9bstmf
83	18	3	6	2	0	g3jm2pjh79
81	18	1	2	0	0	z2nb4kfbva
86	2	12	4	2	2	cbwank6cez
61	2	10	1	0	0	qbrzsv75pf
62	2	11	2	1	1	wb2njnbbkj
87	2	13	1	3	3	sl4934ncdf
88	4	22	1	2	2	ksro142jar
63	4	20	4	0	0	g3isd9p6td
64	4	21	6	1	1	ph0mob8pug
96	3	2	10	3	1	15tjk3uegr
97	3	1003	4	0	2	l3ufdpsoqr
98	3	12	1	0	0	fa9wdynow6
51	3	1	1	1	1	vvgshsy57v
103	24	105	19	0	0	ezgx8ckbfu
104	24	106	4	1	0	1frmsjyt0k
105	18	5	3	3	2	t31v59b29a
108	18	1	2	2	2	qf3aakmkqh
100	23	2	4	3	1	m5wh1fj6zw
102	23	4	2	0	0	a9hdx0f4kr
109	23	100	3	3	0	wftmrmeid8
110	23	10	4	6	1	0zy5pkn984
111	23	13	4	0	2	e7tp5jjxcu
101	23	3	5	1	0	l6ixisk60b
\.


--
-- TOC entry 3823 (class 0 OID 25958)
-- Dependencies: 284
-- Data for Name: vne_transactions; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_transactions (id, restaurant_id, created_at, total, order_id, account_id, balance_type, payment_id, payment_link_id, payment_type, payment_status, amount) FROM stdin;
1	1	2021-09-02 13:03:47.052906	0	\N	\N	auto	\N	\N	\N	\N	0
3	2	2021-09-02 13:04:23.827832	0	\N	\N	auto	\N	\N	\N	\N	0
4	18	2021-09-02 15:44:46.945943	0	\N	\N	auto	\N	\N	\N	\N	0
5	15	2021-09-02 15:45:26.75125	0	\N	\N	auto	\N	\N	\N	\N	0
6	19	2021-09-02 16:10:59.442815	0	\N	\N	auto	\N	\N	\N	\N	0
7	12	2021-09-02 16:11:06.945146	0	\N	\N	auto	\N	\N	\N	\N	0
9	45	2021-09-02 21:09:19.325418	0	\N	\N	auto	\N	\N	\N	\N	0
10	1	2021-09-02 21:50:21.612191	0	\N	\N	auto	\N	\N	\N	\N	0
12	1	2021-09-02 21:50:31.732758	0	\N	\N	auto	\N	\N	\N	\N	0
2	1	2021-09-01 13:04:10.573991	0	\N	\N	auto	\N	\N	\N	\N	0
13	1	2021-09-01 21:50:39.086692	0	\N	\N	auto	\N	\N	\N	\N	0
11	1	2021-09-03 21:50:26.375833	0	\N	\N	auto	\N	\N	\N	\N	0
14	38	2021-09-02 23:56:56.688894	0	\N	\N	auto	\N	\N	\N	\N	0
15	43	2021-09-02 23:58:40.44392	0	\N	\N	auto	\N	\N	\N	\N	0
16	8	2021-09-03 01:42:34.353377	0	\N	\N	auto	\N	\N	\N	\N	0
17	19	2021-09-04 13:04:00.022706	0	\N	\N	auto	\N	\N	\N	\N	0
18	43	2021-09-04 13:04:00.033026	0	\N	\N	auto	\N	\N	\N	\N	0
19	18	2021-09-04 13:04:00.037046	0	\N	\N	auto	\N	\N	\N	\N	0
20	21	2021-09-04 13:04:00.041014	0	\N	\N	auto	\N	\N	\N	\N	0
21	1	2021-09-04 13:04:00.044523	0	\N	\N	auto	\N	\N	\N	\N	0
22	15	2021-09-04 13:04:00.047105	0	\N	\N	auto	\N	\N	\N	\N	0
24	12	2021-09-04 13:04:00.051933	0	\N	\N	auto	\N	\N	\N	\N	0
25	15	2021-09-04 13:05:00.015339	0	\N	\N	auto	\N	\N	\N	\N	0
26	19	2021-09-04 13:05:00.021543	0	\N	\N	auto	\N	\N	\N	\N	0
27	43	2021-09-04 13:05:00.026542	0	\N	\N	auto	\N	\N	\N	\N	0
28	18	2021-09-04 13:05:00.030034	0	\N	\N	auto	\N	\N	\N	\N	0
29	21	2021-09-04 13:05:00.034265	0	\N	\N	auto	\N	\N	\N	\N	0
30	1	2021-09-04 13:05:00.037458	0	\N	\N	auto	\N	\N	\N	\N	0
32	12	2021-09-04 13:05:00.042122	0	\N	\N	auto	\N	\N	\N	\N	0
33	21	2021-09-04 13:06:00.01753	0	\N	\N	auto	\N	\N	\N	\N	0
34	1	2021-09-04 13:06:00.02342	0	\N	\N	auto	\N	\N	\N	\N	0
35	15	2021-09-04 13:06:00.02588	0	\N	\N	auto	\N	\N	\N	\N	0
36	19	2021-09-04 13:06:00.029048	0	\N	\N	auto	\N	\N	\N	\N	0
37	43	2021-09-04 13:06:00.032726	0	\N	\N	auto	\N	\N	\N	\N	0
39	18	2021-09-04 13:06:00.037953	0	\N	\N	auto	\N	\N	\N	\N	0
40	12	2021-09-04 13:06:00.039699	0	\N	\N	auto	\N	\N	\N	\N	0
42	2	2021-09-04 13:26:00.01843	0	\N	\N	auto	\N	\N	\N	\N	0
43	21	2021-09-04 13:26:00.029709	0	\N	\N	auto	\N	\N	\N	\N	0
44	1	2021-09-04 13:26:00.034822	0	\N	\N	auto	\N	\N	\N	\N	0
45	19	2021-09-04 13:26:00.039625	0	\N	\N	auto	\N	\N	\N	\N	0
46	6	2021-09-04 13:26:00.041881	0	\N	\N	auto	\N	\N	\N	\N	0
47	43	2021-09-04 13:26:00.045869	0	\N	\N	auto	\N	\N	\N	\N	0
48	4	2021-09-04 13:26:00.047967	0	\N	\N	auto	\N	\N	\N	\N	0
49	3	2021-09-04 13:26:00.051024	0	\N	\N	auto	\N	\N	\N	\N	0
50	18	2021-09-04 13:26:00.054318	0	\N	\N	auto	\N	\N	\N	\N	0
51	7	2021-09-04 13:26:00.056832	0	\N	\N	auto	\N	\N	\N	\N	0
52	13	2021-09-04 13:26:00.058699	0	\N	\N	auto	\N	\N	\N	\N	0
53	15	2021-09-04 13:26:00.060929	0	\N	\N	auto	\N	\N	\N	\N	0
54	5	2021-09-04 13:26:00.062832	0	\N	\N	auto	\N	\N	\N	\N	0
56	12	2021-09-04 13:26:00.067299	0	\N	\N	auto	\N	\N	\N	\N	0
57	2	2021-09-06 22:00:00.019514	0	\N	\N	auto	\N	\N	\N	\N	0
58	6	2021-09-06 22:00:00.027212	0	\N	\N	auto	\N	\N	\N	\N	0
59	4	2021-09-06 22:00:00.029621	0	\N	\N	auto	\N	\N	\N	\N	0
60	3	2021-09-06 22:00:00.032211	0	\N	\N	auto	\N	\N	\N	\N	0
61	7	2021-09-06 22:00:00.034425	0	\N	\N	auto	\N	\N	\N	\N	0
62	21	2021-09-06 22:00:00.040711	0	\N	\N	auto	\N	\N	\N	\N	0
63	1	2021-09-06 22:00:00.044047	0	\N	\N	auto	\N	\N	\N	\N	0
64	19	2021-09-06 22:00:00.047616	0	\N	\N	auto	\N	\N	\N	\N	0
65	43	2021-09-06 22:00:00.053069	0	\N	\N	auto	\N	\N	\N	\N	0
66	18	2021-09-06 22:00:00.060408	0	\N	\N	auto	\N	\N	\N	\N	0
67	13	2021-09-06 22:00:00.06434	0	\N	\N	auto	\N	\N	\N	\N	0
68	15	2021-09-06 22:00:00.066668	0	\N	\N	auto	\N	\N	\N	\N	0
69	5	2021-09-06 22:00:00.068827	0	\N	\N	auto	\N	\N	\N	\N	0
71	12	2021-09-06 22:00:00.072766	0	\N	\N	auto	\N	\N	\N	\N	0
72	1	2021-09-06 22:38:10.37606	0	\N	\N	auto	\N	\N	\N	\N	0
73	13	2021-09-06 22:38:20.373376	0	\N	\N	auto	\N	\N	\N	\N	0
74	2	2021-09-06 23:00:00.014002	0	\N	\N	auto	\N	\N	\N	\N	0
75	6	2021-09-06 23:00:00.017811	0	\N	\N	auto	\N	\N	\N	\N	0
76	4	2021-09-06 23:00:00.021111	0	\N	\N	auto	\N	\N	\N	\N	0
77	3	2021-09-06 23:00:00.023257	0	\N	\N	auto	\N	\N	\N	\N	0
78	7	2021-09-06 23:00:00.025197	0	\N	\N	auto	\N	\N	\N	\N	0
79	21	2021-09-06 23:00:00.028396	0	\N	\N	auto	\N	\N	\N	\N	0
80	19	2021-09-06 23:00:00.031333	0	\N	\N	auto	\N	\N	\N	\N	0
81	43	2021-09-06 23:00:00.033955	0	\N	\N	auto	\N	\N	\N	\N	0
82	15	2021-09-06 23:00:00.035544	0	\N	\N	auto	\N	\N	\N	\N	0
83	18	2021-09-06 23:00:00.038747	0	\N	\N	auto	\N	\N	\N	\N	0
84	5	2021-09-06 23:00:00.040347	0	\N	\N	auto	\N	\N	\N	\N	0
85	1	2021-09-06 23:00:00.043222	0	\N	\N	auto	\N	\N	\N	\N	0
86	13	2021-09-06 23:00:00.045562	0	\N	\N	auto	\N	\N	\N	\N	0
88	12	2021-09-06 23:00:00.049146	0	\N	\N	auto	\N	\N	\N	\N	0
89	2	2021-09-07 00:00:00.028703	0	\N	\N	auto	\N	\N	\N	\N	0
90	6	2021-09-07 00:00:00.035382	0	\N	\N	auto	\N	\N	\N	\N	0
91	4	2021-09-07 00:00:00.038967	0	\N	\N	auto	\N	\N	\N	\N	0
92	3	2021-09-07 00:00:00.041646	0	\N	\N	auto	\N	\N	\N	\N	0
93	7	2021-09-07 00:00:00.044087	0	\N	\N	auto	\N	\N	\N	\N	0
94	15	2021-09-07 00:00:00.046873	0	\N	\N	auto	\N	\N	\N	\N	0
95	5	2021-09-07 00:00:00.049036	0	\N	\N	auto	\N	\N	\N	\N	0
96	13	2021-09-07 00:00:00.051138	0	\N	\N	auto	\N	\N	\N	\N	0
98	21	2021-09-07 00:00:00.059995	0	\N	\N	auto	\N	\N	\N	\N	0
99	19	2021-09-07 00:00:00.063678	0	\N	\N	auto	\N	\N	\N	\N	0
100	43	2021-09-07 00:00:00.067297	0	\N	\N	auto	\N	\N	\N	\N	0
101	18	2021-09-07 00:00:00.070364	0	\N	\N	auto	\N	\N	\N	\N	0
102	1	2021-09-07 00:00:00.073924	0	\N	\N	auto	\N	\N	\N	\N	0
103	12	2021-09-07 00:00:00.075807	0	\N	\N	auto	\N	\N	\N	\N	0
104	21	2021-09-07 01:00:00.026775	0	\N	\N	auto	\N	\N	\N	\N	0
105	19	2021-09-07 01:00:00.034456	0	\N	\N	auto	\N	\N	\N	\N	0
106	2	2021-09-07 01:00:00.03753	0	\N	\N	auto	\N	\N	\N	\N	0
107	43	2021-09-07 01:00:00.041674	0	\N	\N	auto	\N	\N	\N	\N	0
108	18	2021-09-07 01:00:00.04486	0	\N	\N	auto	\N	\N	\N	\N	0
109	1	2021-09-07 01:00:00.048041	0	\N	\N	auto	\N	\N	\N	\N	0
110	6	2021-09-07 01:00:00.050004	0	\N	\N	auto	\N	\N	\N	\N	0
111	4	2021-09-07 01:00:00.051833	0	\N	\N	auto	\N	\N	\N	\N	0
112	3	2021-09-07 01:00:00.054704	0	\N	\N	auto	\N	\N	\N	\N	0
113	7	2021-09-07 01:00:00.056673	0	\N	\N	auto	\N	\N	\N	\N	0
114	15	2021-09-07 01:00:00.061801	0	\N	\N	auto	\N	\N	\N	\N	0
115	5	2021-09-07 01:00:00.064183	0	\N	\N	auto	\N	\N	\N	\N	0
116	13	2021-09-07 01:00:00.066073	0	\N	\N	auto	\N	\N	\N	\N	0
118	12	2021-09-07 01:00:00.069909	0	\N	\N	auto	\N	\N	\N	\N	0
119	46	2021-09-07 01:20:47.019533	0	\N	\N	auto	\N	\N	\N	\N	0
120	2	2021-09-07 02:00:00.017818	0	\N	\N	auto	\N	\N	\N	\N	0
121	6	2021-09-07 02:00:00.025269	0	\N	\N	auto	\N	\N	\N	\N	0
122	21	2021-09-07 02:00:00.032632	0	\N	\N	auto	\N	\N	\N	\N	0
123	4	2021-09-07 02:00:00.036056	0	\N	\N	auto	\N	\N	\N	\N	0
124	3	2021-09-07 02:00:00.038632	0	\N	\N	auto	\N	\N	\N	\N	0
125	19	2021-09-07 02:00:00.043307	0	\N	\N	auto	\N	\N	\N	\N	0
126	7	2021-09-07 02:00:00.045533	0	\N	\N	auto	\N	\N	\N	\N	0
127	43	2021-09-07 02:00:00.050413	0	\N	\N	auto	\N	\N	\N	\N	0
128	18	2021-09-07 02:00:00.054104	0	\N	\N	auto	\N	\N	\N	\N	0
129	1	2021-09-07 02:00:00.058118	0	\N	\N	auto	\N	\N	\N	\N	0
130	46	2021-09-07 02:00:00.061641	0	\N	\N	auto	\N	\N	\N	\N	0
131	15	2021-09-07 02:00:00.063554	0	\N	\N	auto	\N	\N	\N	\N	0
132	5	2021-09-07 02:00:00.06549	0	\N	\N	auto	\N	\N	\N	\N	0
133	13	2021-09-07 02:00:00.06789	0	\N	\N	auto	\N	\N	\N	\N	0
135	12	2021-09-07 02:00:00.071931	0	\N	\N	auto	\N	\N	\N	\N	0
136	46	2021-09-07 02:02:38.330188	0	\N	\N	auto	\N	\N	\N	\N	0
137	2	2021-09-07 13:00:00.02493	0	\N	\N	auto	\N	\N	\N	\N	0
138	6	2021-09-07 13:00:00.035272	0	\N	\N	auto	\N	\N	\N	\N	0
139	4	2021-09-07 13:00:00.038529	0	\N	\N	auto	\N	\N	\N	\N	0
140	3	2021-09-07 13:00:00.041856	0	\N	\N	auto	\N	\N	\N	\N	0
141	7	2021-09-07 13:00:00.045124	0	\N	\N	auto	\N	\N	\N	\N	0
142	21	2021-09-07 13:00:00.052592	0	\N	\N	auto	\N	\N	\N	\N	0
143	19	2021-09-07 13:00:00.056713	0	\N	\N	auto	\N	\N	\N	\N	0
144	43	2021-09-07 13:00:00.061163	0	\N	\N	auto	\N	\N	\N	\N	0
145	15	2021-09-07 13:00:00.065458	0	\N	\N	auto	\N	\N	\N	\N	0
146	18	2021-09-07 13:00:00.068697	0	\N	\N	auto	\N	\N	\N	\N	0
147	5	2021-09-07 13:00:00.071067	0	\N	\N	auto	\N	\N	\N	\N	0
148	1	2021-09-07 13:00:00.07406	0	\N	\N	auto	\N	\N	\N	\N	0
149	13	2021-09-07 13:00:00.076143	0	\N	\N	auto	\N	\N	\N	\N	0
150	46	2021-09-07 13:00:00.079058	0	\N	\N	auto	\N	\N	\N	\N	0
152	12	2021-09-07 13:00:00.082937	0	\N	\N	auto	\N	\N	\N	\N	0
153	1	2021-09-07 14:00:00.015885	0	\N	\N	auto	\N	\N	\N	\N	0
154	46	2021-09-07 14:00:00.021411	0	\N	\N	auto	\N	\N	\N	\N	0
155	2	2021-09-07 14:00:00.025419	0	\N	\N	auto	\N	\N	\N	\N	0
156	6	2021-09-07 14:00:00.028364	0	\N	\N	auto	\N	\N	\N	\N	0
157	4	2021-09-07 14:00:00.032344	0	\N	\N	auto	\N	\N	\N	\N	0
158	3	2021-09-07 14:00:00.035692	0	\N	\N	auto	\N	\N	\N	\N	0
159	7	2021-09-07 14:00:00.04082	0	\N	\N	auto	\N	\N	\N	\N	0
160	5	2021-09-07 14:00:00.043286	0	\N	\N	auto	\N	\N	\N	\N	0
161	13	2021-09-07 14:00:00.045464	0	\N	\N	auto	\N	\N	\N	\N	0
162	21	2021-09-07 14:00:00.050352	0	\N	\N	auto	\N	\N	\N	\N	0
163	19	2021-09-07 14:00:00.059344	0	\N	\N	auto	\N	\N	\N	\N	0
165	43	2021-09-07 14:00:00.066222	0	\N	\N	auto	\N	\N	\N	\N	0
166	15	2021-09-07 14:00:00.070157	0	\N	\N	auto	\N	\N	\N	\N	0
167	18	2021-09-07 14:00:00.073206	0	\N	\N	auto	\N	\N	\N	\N	0
168	12	2021-09-07 14:00:00.075463	0	\N	\N	auto	\N	\N	\N	\N	0
169	2	2021-09-07 15:00:00.012396	0	\N	\N	auto	\N	\N	\N	\N	0
170	1	2021-09-07 15:00:00.018052	0	\N	\N	auto	\N	\N	\N	\N	0
171	21	2021-09-07 15:00:00.021026	0	\N	\N	auto	\N	\N	\N	\N	0
172	6	2021-09-07 15:00:00.022897	0	\N	\N	auto	\N	\N	\N	\N	0
173	19	2021-09-07 15:00:00.025953	0	\N	\N	auto	\N	\N	\N	\N	0
174	4	2021-09-07 15:00:00.027444	0	\N	\N	auto	\N	\N	\N	\N	0
175	3	2021-09-07 15:00:00.029089	0	\N	\N	auto	\N	\N	\N	\N	0
176	43	2021-09-07 15:00:00.031935	0	\N	\N	auto	\N	\N	\N	\N	0
177	7	2021-09-07 15:00:00.033407	0	\N	\N	auto	\N	\N	\N	\N	0
178	15	2021-09-07 15:00:00.035977	0	\N	\N	auto	\N	\N	\N	\N	0
179	18	2021-09-07 15:00:00.038866	0	\N	\N	auto	\N	\N	\N	\N	0
180	5	2021-09-07 15:00:00.040363	0	\N	\N	auto	\N	\N	\N	\N	0
181	13	2021-09-07 15:00:00.041791	0	\N	\N	auto	\N	\N	\N	\N	0
183	12	2021-09-07 15:00:00.04501	0	\N	\N	auto	\N	\N	\N	\N	0
184	2	2021-09-07 16:00:00.020562	0	\N	\N	auto	\N	\N	\N	\N	0
185	6	2021-09-07 16:00:00.023366	0	\N	\N	auto	\N	\N	\N	\N	0
186	4	2021-09-07 16:00:00.02522	0	\N	\N	auto	\N	\N	\N	\N	0
187	3	2021-09-07 16:00:00.026919	0	\N	\N	auto	\N	\N	\N	\N	0
188	7	2021-09-07 16:00:00.028692	0	\N	\N	auto	\N	\N	\N	\N	0
189	1	2021-09-07 16:00:00.031519	0	\N	\N	auto	\N	\N	\N	\N	0
190	21	2021-09-07 16:00:00.034233	0	\N	\N	auto	\N	\N	\N	\N	0
191	19	2021-09-07 16:00:00.036646	0	\N	\N	auto	\N	\N	\N	\N	0
192	43	2021-09-07 16:00:00.039559	0	\N	\N	auto	\N	\N	\N	\N	0
193	15	2021-09-07 16:00:00.042769	0	\N	\N	auto	\N	\N	\N	\N	0
194	18	2021-09-07 16:00:00.045362	0	\N	\N	auto	\N	\N	\N	\N	0
195	5	2021-09-07 16:00:00.04691	0	\N	\N	auto	\N	\N	\N	\N	0
196	13	2021-09-07 16:00:00.048326	0	\N	\N	auto	\N	\N	\N	\N	0
198	12	2021-09-07 16:00:00.052135	0	\N	\N	auto	\N	\N	\N	\N	0
199	2	2021-09-07 18:00:00.011046	0	\N	\N	auto	\N	\N	\N	\N	0
200	6	2021-09-07 18:00:00.015074	0	\N	\N	auto	\N	\N	\N	\N	0
201	4	2021-09-07 18:00:00.017793	0	\N	\N	auto	\N	\N	\N	\N	0
202	3	2021-09-07 18:00:00.020677	0	\N	\N	auto	\N	\N	\N	\N	0
203	7	2021-09-07 18:00:00.023242	0	\N	\N	auto	\N	\N	\N	\N	0
204	1	2021-09-07 18:00:00.028543	0	\N	\N	auto	\N	\N	\N	\N	0
205	5	2021-09-07 18:00:00.03048	0	\N	\N	auto	\N	\N	\N	\N	0
206	13	2021-09-07 18:00:00.032393	0	\N	\N	auto	\N	\N	\N	\N	0
207	21	2021-09-07 18:00:00.035865	0	\N	\N	auto	\N	\N	\N	\N	0
209	19	2021-09-07 18:00:00.041672	0	\N	\N	auto	\N	\N	\N	\N	0
210	43	2021-09-07 18:00:00.044771	0	\N	\N	auto	\N	\N	\N	\N	0
211	15	2021-09-07 18:00:00.048166	0	\N	\N	auto	\N	\N	\N	\N	0
212	18	2021-09-07 18:00:00.051412	0	\N	\N	auto	\N	\N	\N	\N	0
213	12	2021-09-07 18:00:00.053204	0	\N	\N	auto	\N	\N	\N	\N	0
214	43	2021-09-07 19:00:00.027418	0	\N	\N	auto	\N	\N	\N	\N	0
215	15	2021-09-07 19:00:00.035713	0	\N	\N	auto	\N	\N	\N	\N	0
216	2	2021-09-07 19:00:00.039155	0	\N	\N	auto	\N	\N	\N	\N	0
217	18	2021-09-07 19:00:00.043573	0	\N	\N	auto	\N	\N	\N	\N	0
218	6	2021-09-07 19:00:00.04613	0	\N	\N	auto	\N	\N	\N	\N	0
219	4	2021-09-07 19:00:00.048144	0	\N	\N	auto	\N	\N	\N	\N	0
220	3	2021-09-07 19:00:00.050042	0	\N	\N	auto	\N	\N	\N	\N	0
221	7	2021-09-07 19:00:00.052382	0	\N	\N	auto	\N	\N	\N	\N	0
222	5	2021-09-07 19:00:00.054246	0	\N	\N	auto	\N	\N	\N	\N	0
223	13	2021-09-07 19:00:00.057068	0	\N	\N	auto	\N	\N	\N	\N	0
225	1	2021-09-07 19:00:00.062727	0	\N	\N	auto	\N	\N	\N	\N	0
226	21	2021-09-07 19:00:00.065734	0	\N	\N	auto	\N	\N	\N	\N	0
227	19	2021-09-07 19:00:00.069091	0	\N	\N	auto	\N	\N	\N	\N	0
228	12	2021-09-07 19:00:00.07084	0	\N	\N	auto	\N	\N	\N	\N	0
229	2	2021-09-07 20:00:00.014496	0	\N	\N	auto	\N	\N	\N	\N	0
230	43	2021-09-07 20:00:00.028598	0	\N	\N	auto	\N	\N	\N	\N	0
231	6	2021-09-07 20:00:00.031775	0	\N	\N	auto	\N	\N	\N	\N	0
232	15	2021-09-07 20:00:00.036556	0	\N	\N	auto	\N	\N	\N	\N	0
233	4	2021-09-07 20:00:00.038942	0	\N	\N	auto	\N	\N	\N	\N	0
234	3	2021-09-07 20:00:00.040878	0	\N	\N	auto	\N	\N	\N	\N	0
235	18	2021-09-07 20:00:00.044115	0	\N	\N	auto	\N	\N	\N	\N	0
236	7	2021-09-07 20:00:00.045768	0	\N	\N	auto	\N	\N	\N	\N	0
237	1	2021-09-07 20:00:00.049506	0	\N	\N	auto	\N	\N	\N	\N	0
238	21	2021-09-07 20:00:00.052367	0	\N	\N	auto	\N	\N	\N	\N	0
239	19	2021-09-07 20:00:00.055717	0	\N	\N	auto	\N	\N	\N	\N	0
240	5	2021-09-07 20:00:00.057343	0	\N	\N	auto	\N	\N	\N	\N	0
241	13	2021-09-07 20:00:00.059163	0	\N	\N	auto	\N	\N	\N	\N	0
243	12	2021-09-07 20:00:00.062481	0	\N	\N	auto	\N	\N	\N	\N	0
244	2	2021-09-07 21:00:00.013625	0	\N	\N	auto	\N	\N	\N	\N	0
245	6	2021-09-07 21:00:00.021713	0	\N	\N	auto	\N	\N	\N	\N	0
246	4	2021-09-07 21:00:00.02492	0	\N	\N	auto	\N	\N	\N	\N	0
247	3	2021-09-07 21:00:00.028167	0	\N	\N	auto	\N	\N	\N	\N	0
248	7	2021-09-07 21:00:00.031499	0	\N	\N	auto	\N	\N	\N	\N	0
249	43	2021-09-07 21:00:00.038657	0	\N	\N	auto	\N	\N	\N	\N	0
250	15	2021-09-07 21:00:00.042465	0	\N	\N	auto	\N	\N	\N	\N	0
251	18	2021-09-07 21:00:00.047105	0	\N	\N	auto	\N	\N	\N	\N	0
252	1	2021-09-07 21:00:00.050623	0	\N	\N	auto	\N	\N	\N	\N	0
253	21	2021-09-07 21:00:00.054141	0	\N	\N	auto	\N	\N	\N	\N	0
254	19	2021-09-07 21:00:00.057596	0	\N	\N	auto	\N	\N	\N	\N	0
255	5	2021-09-07 21:00:00.059461	0	\N	\N	auto	\N	\N	\N	\N	0
256	13	2021-09-07 21:00:00.061386	0	\N	\N	auto	\N	\N	\N	\N	0
258	12	2021-09-07 21:00:00.065456	0	\N	\N	auto	\N	\N	\N	\N	0
259	2	2021-09-07 22:00:00.008074	0	\N	\N	auto	\N	\N	\N	\N	0
260	6	2021-09-07 22:00:00.011443	0	\N	\N	auto	\N	\N	\N	\N	0
261	4	2021-09-07 22:00:00.01323	0	\N	\N	auto	\N	\N	\N	\N	0
262	3	2021-09-07 22:00:00.014871	0	\N	\N	auto	\N	\N	\N	\N	0
263	7	2021-09-07 22:00:00.016862	0	\N	\N	auto	\N	\N	\N	\N	0
264	5	2021-09-07 22:00:00.018721	0	\N	\N	auto	\N	\N	\N	\N	0
265	43	2021-09-07 22:00:00.021995	0	\N	\N	auto	\N	\N	\N	\N	0
266	13	2021-09-07 22:00:00.02368	0	\N	\N	auto	\N	\N	\N	\N	0
267	15	2021-09-07 22:00:00.026435	0	\N	\N	auto	\N	\N	\N	\N	0
268	18	2021-09-07 22:00:00.029172	0	\N	\N	auto	\N	\N	\N	\N	0
269	1	2021-09-07 22:00:00.031613	0	\N	\N	auto	\N	\N	\N	\N	0
271	19	2021-09-07 22:00:00.036644	0	\N	\N	auto	\N	\N	\N	\N	0
272	21	2021-09-07 22:00:00.039698	0	\N	\N	auto	\N	\N	\N	\N	0
273	12	2021-09-07 22:00:00.041332	0	\N	\N	auto	\N	\N	\N	\N	0
274	15	2021-09-07 23:00:00.017032	0	\N	\N	auto	\N	\N	\N	\N	0
275	18	2021-09-07 23:00:00.024546	0	\N	\N	auto	\N	\N	\N	\N	0
276	2	2021-09-07 23:00:00.027379	0	\N	\N	auto	\N	\N	\N	\N	0
277	1	2021-09-07 23:00:00.030976	0	\N	\N	auto	\N	\N	\N	\N	0
278	19	2021-09-07 23:00:00.035254	0	\N	\N	auto	\N	\N	\N	\N	0
279	6	2021-09-07 23:00:00.037486	0	\N	\N	auto	\N	\N	\N	\N	0
280	21	2021-09-07 23:00:00.041448	0	\N	\N	auto	\N	\N	\N	\N	0
281	4	2021-09-07 23:00:00.04335	0	\N	\N	auto	\N	\N	\N	\N	0
282	3	2021-09-07 23:00:00.047869	0	\N	\N	auto	\N	\N	\N	\N	0
283	7	2021-09-07 23:00:00.050257	0	\N	\N	auto	\N	\N	\N	\N	0
284	5	2021-09-07 23:00:00.052521	0	\N	\N	auto	\N	\N	\N	\N	0
285	13	2021-09-07 23:00:00.055052	0	\N	\N	auto	\N	\N	\N	\N	0
287	43	2021-09-07 23:00:00.060395	0	\N	\N	auto	\N	\N	\N	\N	0
288	12	2021-09-07 23:00:00.062209	0	\N	\N	auto	\N	\N	\N	\N	0
289	2	2021-09-08 00:00:00.016514	0	\N	\N	auto	\N	\N	\N	\N	0
290	6	2021-09-08 00:00:00.023391	0	\N	\N	auto	\N	\N	\N	\N	0
291	4	2021-09-08 00:00:00.025981	0	\N	\N	auto	\N	\N	\N	\N	0
292	3	2021-09-08 00:00:00.028899	0	\N	\N	auto	\N	\N	\N	\N	0
293	7	2021-09-08 00:00:00.031269	0	\N	\N	auto	\N	\N	\N	\N	0
294	18	2021-09-08 00:00:00.037718	0	\N	\N	auto	\N	\N	\N	\N	0
295	1	2021-09-08 00:00:00.041265	0	\N	\N	auto	\N	\N	\N	\N	0
296	19	2021-09-08 00:00:00.045053	0	\N	\N	auto	\N	\N	\N	\N	0
297	21	2021-09-08 00:00:00.049191	0	\N	\N	auto	\N	\N	\N	\N	0
298	43	2021-09-08 00:00:00.052978	0	\N	\N	auto	\N	\N	\N	\N	0
299	5	2021-09-08 00:00:00.055276	0	\N	\N	auto	\N	\N	\N	\N	0
300	13	2021-09-08 00:00:00.057794	0	\N	\N	auto	\N	\N	\N	\N	0
302	12	2021-09-08 00:00:00.062022	0	\N	\N	auto	\N	\N	\N	\N	0
303	2	2021-09-08 01:00:00.008978	0	\N	\N	auto	\N	\N	\N	\N	0
304	6	2021-09-08 01:00:00.011343	0	\N	\N	auto	\N	\N	\N	\N	0
305	4	2021-09-08 01:00:00.012799	0	\N	\N	auto	\N	\N	\N	\N	0
306	3	2021-09-08 01:00:00.014837	0	\N	\N	auto	\N	\N	\N	\N	0
307	7	2021-09-08 01:00:00.016297	0	\N	\N	auto	\N	\N	\N	\N	0
308	1	2021-09-08 01:00:00.019426	0	\N	\N	auto	\N	\N	\N	\N	0
309	19	2021-09-08 01:00:00.021686	0	\N	\N	auto	\N	\N	\N	\N	0
310	21	2021-09-08 01:00:00.024026	0	\N	\N	auto	\N	\N	\N	\N	0
311	5	2021-09-08 01:00:00.025669	0	\N	\N	auto	\N	\N	\N	\N	0
312	43	2021-09-08 01:00:00.027828	0	\N	\N	auto	\N	\N	\N	\N	0
313	13	2021-09-08 01:00:00.0294	0	\N	\N	auto	\N	\N	\N	\N	0
315	12	2021-09-08 01:00:00.032206	0	\N	\N	auto	\N	\N	\N	\N	0
316	2	2021-09-08 01:01:00.007422	0	\N	\N	auto	\N	\N	\N	\N	0
317	6	2021-09-08 01:01:00.010715	0	\N	\N	auto	\N	\N	\N	\N	0
318	4	2021-09-08 01:01:00.012554	0	\N	\N	auto	\N	\N	\N	\N	0
319	3	2021-09-08 01:01:00.014102	0	\N	\N	auto	\N	\N	\N	\N	0
320	7	2021-09-08 01:01:00.015821	0	\N	\N	auto	\N	\N	\N	\N	0
321	5	2021-09-08 01:01:00.017348	0	\N	\N	auto	\N	\N	\N	\N	0
322	13	2021-09-08 01:01:00.018743	0	\N	\N	auto	\N	\N	\N	\N	0
323	1	2021-09-08 01:01:00.021236	0	\N	\N	auto	\N	\N	\N	\N	0
325	19	2021-09-08 01:01:00.025035	0	\N	\N	auto	\N	\N	\N	\N	0
326	21	2021-09-08 01:01:00.027905	0	\N	\N	auto	\N	\N	\N	\N	0
327	43	2021-09-08 01:01:00.030923	0	\N	\N	auto	\N	\N	\N	\N	0
328	12	2021-09-08 01:01:00.032434	0	\N	\N	auto	\N	\N	\N	\N	0
329	2	2021-09-08 01:02:00.006936	0	\N	\N	auto	\N	\N	\N	\N	0
330	6	2021-09-08 01:02:00.010784	0	\N	\N	auto	\N	\N	\N	\N	0
331	4	2021-09-08 01:02:00.012988	0	\N	\N	auto	\N	\N	\N	\N	0
332	3	2021-09-08 01:02:00.01497	0	\N	\N	auto	\N	\N	\N	\N	0
333	7	2021-09-08 01:02:00.017369	0	\N	\N	auto	\N	\N	\N	\N	0
334	5	2021-09-08 01:02:00.020311	0	\N	\N	auto	\N	\N	\N	\N	0
335	13	2021-09-08 01:02:00.02188	0	\N	\N	auto	\N	\N	\N	\N	0
337	1	2021-09-08 01:02:00.0264	0	\N	\N	auto	\N	\N	\N	\N	0
338	19	2021-09-08 01:02:00.02888	0	\N	\N	auto	\N	\N	\N	\N	0
339	21	2021-09-08 01:02:00.031417	0	\N	\N	auto	\N	\N	\N	\N	0
340	43	2021-09-08 01:02:00.033638	0	\N	\N	auto	\N	\N	\N	\N	0
341	12	2021-09-08 01:02:00.035256	0	\N	\N	auto	\N	\N	\N	\N	0
342	1	2021-09-08 01:03:00.009127	0	\N	\N	auto	\N	\N	\N	\N	0
343	19	2021-09-08 01:03:00.013572	0	\N	\N	auto	\N	\N	\N	\N	0
344	2	2021-09-08 01:03:00.015272	0	\N	\N	auto	\N	\N	\N	\N	0
345	21	2021-09-08 01:03:00.017834	0	\N	\N	auto	\N	\N	\N	\N	0
346	43	2021-09-08 01:03:00.020047	0	\N	\N	auto	\N	\N	\N	\N	0
347	6	2021-09-08 01:03:00.021451	0	\N	\N	auto	\N	\N	\N	\N	0
348	4	2021-09-08 01:03:00.023005	0	\N	\N	auto	\N	\N	\N	\N	0
349	3	2021-09-08 01:03:00.024398	0	\N	\N	auto	\N	\N	\N	\N	0
350	7	2021-09-08 01:03:00.025735	0	\N	\N	auto	\N	\N	\N	\N	0
351	5	2021-09-08 01:03:00.027092	0	\N	\N	auto	\N	\N	\N	\N	0
352	13	2021-09-08 01:03:00.028611	0	\N	\N	auto	\N	\N	\N	\N	0
354	12	2021-09-08 01:03:00.031232	0	\N	\N	auto	\N	\N	\N	\N	0
355	2	2021-09-08 01:04:00.005769	0	\N	\N	auto	\N	\N	\N	\N	0
356	6	2021-09-08 01:04:00.008709	0	\N	\N	auto	\N	\N	\N	\N	0
357	1	2021-09-08 01:04:00.011728	0	\N	\N	auto	\N	\N	\N	\N	0
358	4	2021-09-08 01:04:00.01553	0	\N	\N	auto	\N	\N	\N	\N	0
359	3	2021-09-08 01:04:00.017118	0	\N	\N	auto	\N	\N	\N	\N	0
360	7	2021-09-08 01:04:00.018726	0	\N	\N	auto	\N	\N	\N	\N	0
361	19	2021-09-08 01:04:00.021198	0	\N	\N	auto	\N	\N	\N	\N	0
362	21	2021-09-08 01:04:00.023805	0	\N	\N	auto	\N	\N	\N	\N	0
363	43	2021-09-08 01:04:00.0262	0	\N	\N	auto	\N	\N	\N	\N	0
364	5	2021-09-08 01:04:00.02806	0	\N	\N	auto	\N	\N	\N	\N	0
365	13	2021-09-08 01:04:00.029412	0	\N	\N	auto	\N	\N	\N	\N	0
367	12	2021-09-08 01:04:00.033481	0	\N	\N	auto	\N	\N	\N	\N	0
368	2	2021-09-08 01:05:00.011411	0	\N	\N	auto	\N	\N	\N	\N	0
369	6	2021-09-08 01:05:00.01339	0	\N	\N	auto	\N	\N	\N	\N	0
370	4	2021-09-08 01:05:00.014806	0	\N	\N	auto	\N	\N	\N	\N	0
371	3	2021-09-08 01:05:00.01644	0	\N	\N	auto	\N	\N	\N	\N	0
372	7	2021-09-08 01:05:00.017804	0	\N	\N	auto	\N	\N	\N	\N	0
373	1	2021-09-08 01:05:00.020165	0	\N	\N	auto	\N	\N	\N	\N	0
374	19	2021-09-08 01:05:00.022157	0	\N	\N	auto	\N	\N	\N	\N	0
375	43	2021-09-08 01:05:00.025031	0	\N	\N	auto	\N	\N	\N	\N	0
376	5	2021-09-08 01:05:00.026433	0	\N	\N	auto	\N	\N	\N	\N	0
377	13	2021-09-08 01:05:00.027848	0	\N	\N	auto	\N	\N	\N	\N	0
379	12	2021-09-08 01:05:00.030733	0	\N	\N	auto	\N	\N	\N	\N	0
380	2	2021-09-08 01:06:00.005648	0	\N	\N	auto	\N	\N	\N	\N	0
381	6	2021-09-08 01:06:00.007905	0	\N	\N	auto	\N	\N	\N	\N	0
382	4	2021-09-08 01:06:00.009281	0	\N	\N	auto	\N	\N	\N	\N	0
383	3	2021-09-08 01:06:00.010774	0	\N	\N	auto	\N	\N	\N	\N	0
384	7	2021-09-08 01:06:00.012416	0	\N	\N	auto	\N	\N	\N	\N	0
385	1	2021-09-08 01:06:00.015909	0	\N	\N	auto	\N	\N	\N	\N	0
386	5	2021-09-08 01:06:00.017405	0	\N	\N	auto	\N	\N	\N	\N	0
387	19	2021-09-08 01:06:00.019746	0	\N	\N	auto	\N	\N	\N	\N	0
388	13	2021-09-08 01:06:00.021066	0	\N	\N	auto	\N	\N	\N	\N	0
389	43	2021-09-08 01:06:00.024204	0	\N	\N	auto	\N	\N	\N	\N	0
391	12	2021-09-08 01:06:00.02686	0	\N	\N	auto	\N	\N	\N	\N	0
392	2	2021-09-08 01:07:00.012851	0	\N	\N	auto	\N	\N	\N	\N	0
393	6	2021-09-08 01:07:00.015439	0	\N	\N	auto	\N	\N	\N	\N	0
394	4	2021-09-08 01:07:00.017104	0	\N	\N	auto	\N	\N	\N	\N	0
395	3	2021-09-08 01:07:00.019376	0	\N	\N	auto	\N	\N	\N	\N	0
396	7	2021-09-08 01:07:00.02123	0	\N	\N	auto	\N	\N	\N	\N	0
397	5	2021-09-08 01:07:00.023094	0	\N	\N	auto	\N	\N	\N	\N	0
398	13	2021-09-08 01:07:00.024505	0	\N	\N	auto	\N	\N	\N	\N	0
399	1	2021-09-08 01:07:00.02689	0	\N	\N	auto	\N	\N	\N	\N	0
400	19	2021-09-08 01:07:00.028907	0	\N	\N	auto	\N	\N	\N	\N	0
401	43	2021-09-08 01:07:00.031316	0	\N	\N	auto	\N	\N	\N	\N	0
403	12	2021-09-08 01:07:00.034349	0	\N	\N	auto	\N	\N	\N	\N	0
404	2	2021-09-08 01:08:00.143162	0	\N	\N	auto	\N	\N	\N	\N	0
405	6	2021-09-08 01:08:00.146335	0	\N	\N	auto	\N	\N	\N	\N	0
406	4	2021-09-08 01:08:00.148189	0	\N	\N	auto	\N	\N	\N	\N	0
407	3	2021-09-08 01:08:00.150211	0	\N	\N	auto	\N	\N	\N	\N	0
408	7	2021-09-08 01:08:00.151521	0	\N	\N	auto	\N	\N	\N	\N	0
409	5	2021-09-08 01:08:00.152996	0	\N	\N	auto	\N	\N	\N	\N	0
410	13	2021-09-08 01:08:00.154786	0	\N	\N	auto	\N	\N	\N	\N	0
412	1	2021-09-08 01:08:00.159145	0	\N	\N	auto	\N	\N	\N	\N	0
413	19	2021-09-08 01:08:00.161711	0	\N	\N	auto	\N	\N	\N	\N	0
414	43	2021-09-08 01:08:00.163752	0	\N	\N	auto	\N	\N	\N	\N	0
415	12	2021-09-08 01:08:00.165156	0	\N	\N	auto	\N	\N	\N	\N	0
416	19	2021-09-08 01:09:00.015105	0	\N	\N	auto	\N	\N	\N	\N	0
417	43	2021-09-08 01:09:00.018371	0	\N	\N	auto	\N	\N	\N	\N	0
418	2	2021-09-08 01:09:00.020081	0	\N	\N	auto	\N	\N	\N	\N	0
419	6	2021-09-08 01:09:00.021348	0	\N	\N	auto	\N	\N	\N	\N	0
420	4	2021-09-08 01:09:00.022635	0	\N	\N	auto	\N	\N	\N	\N	0
421	3	2021-09-08 01:09:00.023976	0	\N	\N	auto	\N	\N	\N	\N	0
422	7	2021-09-08 01:09:00.025283	0	\N	\N	auto	\N	\N	\N	\N	0
423	5	2021-09-08 01:09:00.026517	0	\N	\N	auto	\N	\N	\N	\N	0
424	13	2021-09-08 01:09:00.027928	0	\N	\N	auto	\N	\N	\N	\N	0
426	1	2021-09-08 01:09:00.031278	0	\N	\N	auto	\N	\N	\N	\N	0
427	12	2021-09-08 01:09:00.032809	0	\N	\N	auto	\N	\N	\N	\N	0
428	2	2021-09-08 01:10:00.012203	0	\N	\N	auto	\N	\N	\N	\N	0
429	19	2021-09-08 01:10:00.015799	0	\N	\N	auto	\N	\N	\N	\N	0
430	43	2021-09-08 01:10:00.018263	0	\N	\N	auto	\N	\N	\N	\N	0
431	6	2021-09-08 01:10:00.019559	0	\N	\N	auto	\N	\N	\N	\N	0
432	1	2021-09-08 01:10:00.022014	0	\N	\N	auto	\N	\N	\N	\N	0
433	4	2021-09-08 01:10:00.02343	0	\N	\N	auto	\N	\N	\N	\N	0
434	3	2021-09-08 01:10:00.024708	0	\N	\N	auto	\N	\N	\N	\N	0
435	7	2021-09-08 01:10:00.02614	0	\N	\N	auto	\N	\N	\N	\N	0
436	5	2021-09-08 01:10:00.027383	0	\N	\N	auto	\N	\N	\N	\N	0
437	13	2021-09-08 01:10:00.028873	0	\N	\N	auto	\N	\N	\N	\N	0
439	12	2021-09-08 01:10:00.031647	0	\N	\N	auto	\N	\N	\N	\N	0
440	2	2021-09-08 01:11:00.011619	0	\N	\N	auto	\N	\N	\N	\N	0
441	6	2021-09-08 01:11:00.015606	0	\N	\N	auto	\N	\N	\N	\N	0
442	4	2021-09-08 01:11:00.017537	0	\N	\N	auto	\N	\N	\N	\N	0
443	3	2021-09-08 01:11:00.019259	0	\N	\N	auto	\N	\N	\N	\N	0
444	7	2021-09-08 01:11:00.021123	0	\N	\N	auto	\N	\N	\N	\N	0
445	19	2021-09-08 01:11:00.023437	0	\N	\N	auto	\N	\N	\N	\N	0
446	43	2021-09-08 01:11:00.026819	0	\N	\N	auto	\N	\N	\N	\N	0
447	1	2021-09-08 01:11:00.029691	0	\N	\N	auto	\N	\N	\N	\N	0
448	5	2021-09-08 01:11:00.031552	0	\N	\N	auto	\N	\N	\N	\N	0
449	13	2021-09-08 01:11:00.033085	0	\N	\N	auto	\N	\N	\N	\N	0
451	12	2021-09-08 01:11:00.035654	0	\N	\N	auto	\N	\N	\N	\N	0
452	2	2021-09-08 01:12:00.006712	0	\N	\N	auto	\N	\N	\N	\N	0
453	6	2021-09-08 01:12:00.009439	0	\N	\N	auto	\N	\N	\N	\N	0
454	4	2021-09-08 01:12:00.011135	0	\N	\N	auto	\N	\N	\N	\N	0
455	3	2021-09-08 01:12:00.012534	0	\N	\N	auto	\N	\N	\N	\N	0
456	7	2021-09-08 01:12:00.014078	0	\N	\N	auto	\N	\N	\N	\N	0
457	19	2021-09-08 01:12:00.01637	0	\N	\N	auto	\N	\N	\N	\N	0
458	43	2021-09-08 01:12:00.019081	0	\N	\N	auto	\N	\N	\N	\N	0
459	1	2021-09-08 01:12:00.021508	0	\N	\N	auto	\N	\N	\N	\N	0
460	5	2021-09-08 01:12:00.02305	0	\N	\N	auto	\N	\N	\N	\N	0
461	13	2021-09-08 01:12:00.024389	0	\N	\N	auto	\N	\N	\N	\N	0
463	12	2021-09-08 01:12:00.026944	0	\N	\N	auto	\N	\N	\N	\N	0
464	21	2021-09-08 01:12:23.93482	0	\N	\N	auto	\N	\N	\N	\N	0
465	2	2021-09-08 01:13:00.00909	0	\N	\N	auto	\N	\N	\N	\N	0
466	6	2021-09-08 01:13:00.011915	0	\N	\N	auto	\N	\N	\N	\N	0
467	4	2021-09-08 01:13:00.013711	0	\N	\N	auto	\N	\N	\N	\N	0
468	3	2021-09-08 01:13:00.015103	0	\N	\N	auto	\N	\N	\N	\N	0
469	7	2021-09-08 01:13:00.016599	0	\N	\N	auto	\N	\N	\N	\N	0
470	19	2021-09-08 01:13:00.019429	0	\N	\N	auto	\N	\N	\N	\N	0
471	5	2021-09-08 01:13:00.020675	0	\N	\N	auto	\N	\N	\N	\N	0
472	43	2021-09-08 01:13:00.023351	0	\N	\N	auto	\N	\N	\N	\N	0
473	13	2021-09-08 01:13:00.024873	0	\N	\N	auto	\N	\N	\N	\N	0
474	1	2021-09-08 01:13:00.028051	0	\N	\N	auto	\N	\N	\N	\N	0
475	21	2021-09-08 01:13:00.030672	0	\N	\N	auto	\N	\N	\N	\N	0
477	12	2021-09-08 01:13:00.03347	0	\N	\N	auto	\N	\N	\N	\N	0
478	2	2021-09-08 01:14:00.004717	0	\N	\N	auto	\N	\N	\N	\N	0
479	6	2021-09-08 01:14:00.007285	0	\N	\N	auto	\N	\N	\N	\N	0
480	4	2021-09-08 01:14:00.00869	0	\N	\N	auto	\N	\N	\N	\N	0
481	3	2021-09-08 01:14:00.010137	0	\N	\N	auto	\N	\N	\N	\N	0
482	7	2021-09-08 01:14:00.011625	0	\N	\N	auto	\N	\N	\N	\N	0
483	5	2021-09-08 01:14:00.012822	0	\N	\N	auto	\N	\N	\N	\N	0
484	13	2021-09-08 01:14:00.014084	0	\N	\N	auto	\N	\N	\N	\N	0
485	19	2021-09-08 01:14:00.016768	0	\N	\N	auto	\N	\N	\N	\N	0
486	43	2021-09-08 01:14:00.018825	0	\N	\N	auto	\N	\N	\N	\N	0
488	1	2021-09-08 01:14:00.022189	0	\N	\N	auto	\N	\N	\N	\N	0
489	21	2021-09-08 01:14:00.024366	0	\N	\N	auto	\N	\N	\N	\N	0
490	12	2021-09-08 01:14:00.025835	0	\N	\N	auto	\N	\N	\N	\N	0
491	21	2021-09-08 01:15:00.009608	0	\N	\N	auto	\N	\N	\N	\N	0
492	2	2021-09-08 01:15:00.01148	0	\N	\N	auto	\N	\N	\N	\N	0
493	6	2021-09-08 01:15:00.012901	0	\N	\N	auto	\N	\N	\N	\N	0
494	4	2021-09-08 01:15:00.014324	0	\N	\N	auto	\N	\N	\N	\N	0
495	3	2021-09-08 01:15:00.015566	0	\N	\N	auto	\N	\N	\N	\N	0
496	7	2021-09-08 01:15:00.016821	0	\N	\N	auto	\N	\N	\N	\N	0
497	5	2021-09-08 01:15:00.017989	0	\N	\N	auto	\N	\N	\N	\N	0
498	13	2021-09-08 01:15:00.019649	0	\N	\N	auto	\N	\N	\N	\N	0
500	19	2021-09-08 01:15:00.023235	0	\N	\N	auto	\N	\N	\N	\N	0
501	43	2021-09-08 01:15:00.025481	0	\N	\N	auto	\N	\N	\N	\N	0
502	1	2021-09-08 01:15:00.027575	0	\N	\N	auto	\N	\N	\N	\N	0
503	12	2021-09-08 01:15:00.029026	0	\N	\N	auto	\N	\N	\N	\N	0
504	21	2021-09-08 01:16:00.007248	0	\N	\N	auto	\N	\N	\N	\N	0
505	2	2021-09-08 01:16:00.009215	0	\N	\N	auto	\N	\N	\N	\N	0
506	19	2021-09-08 01:16:00.011538	0	\N	\N	auto	\N	\N	\N	\N	0
507	43	2021-09-08 01:16:00.01378	0	\N	\N	auto	\N	\N	\N	\N	0
508	6	2021-09-08 01:16:00.015141	0	\N	\N	auto	\N	\N	\N	\N	0
509	1	2021-09-08 01:16:00.017465	0	\N	\N	auto	\N	\N	\N	\N	0
510	4	2021-09-08 01:16:00.018719	0	\N	\N	auto	\N	\N	\N	\N	0
511	3	2021-09-08 01:16:00.019928	0	\N	\N	auto	\N	\N	\N	\N	0
512	7	2021-09-08 01:16:00.021331	0	\N	\N	auto	\N	\N	\N	\N	0
513	5	2021-09-08 01:16:00.022536	0	\N	\N	auto	\N	\N	\N	\N	0
514	13	2021-09-08 01:16:00.02377	0	\N	\N	auto	\N	\N	\N	\N	0
516	12	2021-09-08 01:16:00.027503	0	\N	\N	auto	\N	\N	\N	\N	0
517	2	2021-09-08 01:17:00.006758	0	\N	\N	auto	\N	\N	\N	\N	0
518	6	2021-09-08 01:17:00.009908	0	\N	\N	auto	\N	\N	\N	\N	0
519	4	2021-09-08 01:17:00.011919	0	\N	\N	auto	\N	\N	\N	\N	0
520	3	2021-09-08 01:17:00.013969	0	\N	\N	auto	\N	\N	\N	\N	0
521	7	2021-09-08 01:17:00.015468	0	\N	\N	auto	\N	\N	\N	\N	0
522	21	2021-09-08 01:17:00.017743	0	\N	\N	auto	\N	\N	\N	\N	0
523	19	2021-09-08 01:17:00.019856	0	\N	\N	auto	\N	\N	\N	\N	0
524	43	2021-09-08 01:17:00.021791	0	\N	\N	auto	\N	\N	\N	\N	0
525	1	2021-09-08 01:17:00.023855	0	\N	\N	auto	\N	\N	\N	\N	0
526	5	2021-09-08 01:17:00.025131	0	\N	\N	auto	\N	\N	\N	\N	0
527	13	2021-09-08 01:17:00.026343	0	\N	\N	auto	\N	\N	\N	\N	0
529	12	2021-09-08 01:17:00.028938	0	\N	\N	auto	\N	\N	\N	\N	0
530	2	2021-09-08 01:18:00.007158	0	\N	\N	auto	\N	\N	\N	\N	0
531	6	2021-09-08 01:18:00.009855	0	\N	\N	auto	\N	\N	\N	\N	0
532	4	2021-09-08 01:18:00.011838	0	\N	\N	auto	\N	\N	\N	\N	0
533	3	2021-09-08 01:18:00.013341	0	\N	\N	auto	\N	\N	\N	\N	0
534	7	2021-09-08 01:18:00.014977	0	\N	\N	auto	\N	\N	\N	\N	0
535	21	2021-09-08 01:18:00.017493	0	\N	\N	auto	\N	\N	\N	\N	0
536	19	2021-09-08 01:18:00.019975	0	\N	\N	auto	\N	\N	\N	\N	0
537	43	2021-09-08 01:18:00.022196	0	\N	\N	auto	\N	\N	\N	\N	0
538	1	2021-09-08 01:18:00.024239	0	\N	\N	auto	\N	\N	\N	\N	0
539	5	2021-09-08 01:18:00.025553	0	\N	\N	auto	\N	\N	\N	\N	0
540	13	2021-09-08 01:18:00.026946	0	\N	\N	auto	\N	\N	\N	\N	0
542	12	2021-09-08 01:18:00.029825	0	\N	\N	auto	\N	\N	\N	\N	0
543	2	2021-09-08 01:19:00.005135	0	\N	\N	auto	\N	\N	\N	\N	0
544	6	2021-09-08 01:19:00.007233	0	\N	\N	auto	\N	\N	\N	\N	0
545	4	2021-09-08 01:19:00.008931	0	\N	\N	auto	\N	\N	\N	\N	0
546	3	2021-09-08 01:19:00.010437	0	\N	\N	auto	\N	\N	\N	\N	0
547	7	2021-09-08 01:19:00.011742	0	\N	\N	auto	\N	\N	\N	\N	0
548	5	2021-09-08 01:19:00.014219	0	\N	\N	auto	\N	\N	\N	\N	0
549	21	2021-09-08 01:19:00.016859	0	\N	\N	auto	\N	\N	\N	\N	0
550	13	2021-09-08 01:19:00.018198	0	\N	\N	auto	\N	\N	\N	\N	0
551	19	2021-09-08 01:19:00.02111	0	\N	\N	auto	\N	\N	\N	\N	0
552	43	2021-09-08 01:19:00.023284	0	\N	\N	auto	\N	\N	\N	\N	0
553	1	2021-09-08 01:19:00.025593	0	\N	\N	auto	\N	\N	\N	\N	0
555	12	2021-09-08 01:19:00.02839	0	\N	\N	auto	\N	\N	\N	\N	0
556	2	2021-09-08 01:20:00.015438	0	\N	\N	auto	\N	\N	\N	\N	0
557	6	2021-09-08 01:20:00.022728	0	\N	\N	auto	\N	\N	\N	\N	0
558	4	2021-09-08 01:20:00.02586	0	\N	\N	auto	\N	\N	\N	\N	0
559	3	2021-09-08 01:20:00.028612	0	\N	\N	auto	\N	\N	\N	\N	0
560	7	2021-09-08 01:20:00.031512	0	\N	\N	auto	\N	\N	\N	\N	0
561	5	2021-09-08 01:20:00.033972	0	\N	\N	auto	\N	\N	\N	\N	0
562	13	2021-09-08 01:20:00.036321	0	\N	\N	auto	\N	\N	\N	\N	0
563	21	2021-09-08 01:20:00.04301	0	\N	\N	auto	\N	\N	\N	\N	0
565	19	2021-09-08 01:20:00.049606	0	\N	\N	auto	\N	\N	\N	\N	0
566	43	2021-09-08 01:20:00.053351	0	\N	\N	auto	\N	\N	\N	\N	0
567	1	2021-09-08 01:20:00.056602	0	\N	\N	auto	\N	\N	\N	\N	0
568	12	2021-09-08 01:20:00.058809	0	\N	\N	auto	\N	\N	\N	\N	0
569	19	2021-09-08 01:21:00.017087	0	\N	\N	auto	\N	\N	\N	\N	0
570	43	2021-09-08 01:21:00.024051	0	\N	\N	auto	\N	\N	\N	\N	0
571	2	2021-09-08 01:21:00.026561	0	\N	\N	auto	\N	\N	\N	\N	0
572	1	2021-09-08 01:21:00.03001	0	\N	\N	auto	\N	\N	\N	\N	0
573	6	2021-09-08 01:21:00.032215	0	\N	\N	auto	\N	\N	\N	\N	0
574	4	2021-09-08 01:21:00.037578	0	\N	\N	auto	\N	\N	\N	\N	0
575	3	2021-09-08 01:21:00.039505	0	\N	\N	auto	\N	\N	\N	\N	0
576	7	2021-09-08 01:21:00.041414	0	\N	\N	auto	\N	\N	\N	\N	0
577	5	2021-09-08 01:21:00.043275	0	\N	\N	auto	\N	\N	\N	\N	0
578	13	2021-09-08 01:21:00.045801	0	\N	\N	auto	\N	\N	\N	\N	0
580	21	2021-09-08 01:21:00.051363	0	\N	\N	auto	\N	\N	\N	\N	0
581	12	2021-09-08 01:21:00.053356	0	\N	\N	auto	\N	\N	\N	\N	0
582	2	2021-09-08 01:22:00.009305	0	\N	\N	auto	\N	\N	\N	\N	0
583	19	2021-09-08 01:22:00.015967	0	\N	\N	auto	\N	\N	\N	\N	0
584	6	2021-09-08 01:22:00.018306	0	\N	\N	auto	\N	\N	\N	\N	0
585	43	2021-09-08 01:22:00.022156	0	\N	\N	auto	\N	\N	\N	\N	0
586	4	2021-09-08 01:22:00.024186	0	\N	\N	auto	\N	\N	\N	\N	0
587	3	2021-09-08 01:22:00.037436	0	\N	\N	auto	\N	\N	\N	\N	0
588	7	2021-09-08 01:22:00.042316	0	\N	\N	auto	\N	\N	\N	\N	0
589	1	2021-09-08 01:22:00.047423	0	\N	\N	auto	\N	\N	\N	\N	0
590	21	2021-09-08 01:22:00.051289	0	\N	\N	auto	\N	\N	\N	\N	0
591	5	2021-09-08 01:22:00.053974	0	\N	\N	auto	\N	\N	\N	\N	0
592	13	2021-09-08 01:22:00.056387	0	\N	\N	auto	\N	\N	\N	\N	0
594	12	2021-09-08 01:22:00.061359	0	\N	\N	auto	\N	\N	\N	\N	0
595	2	2021-09-08 01:23:00.00884	0	\N	\N	auto	\N	\N	\N	\N	0
596	6	2021-09-08 01:23:00.012162	0	\N	\N	auto	\N	\N	\N	\N	0
597	4	2021-09-08 01:23:00.014644	0	\N	\N	auto	\N	\N	\N	\N	0
598	3	2021-09-08 01:23:00.016972	0	\N	\N	auto	\N	\N	\N	\N	0
599	7	2021-09-08 01:23:00.018777	0	\N	\N	auto	\N	\N	\N	\N	0
600	19	2021-09-08 01:23:00.022278	0	\N	\N	auto	\N	\N	\N	\N	0
601	43	2021-09-08 01:23:00.02586	0	\N	\N	auto	\N	\N	\N	\N	0
602	1	2021-09-08 01:23:00.030104	0	\N	\N	auto	\N	\N	\N	\N	0
603	21	2021-09-08 01:23:00.033502	0	\N	\N	auto	\N	\N	\N	\N	0
604	5	2021-09-08 01:23:00.035262	0	\N	\N	auto	\N	\N	\N	\N	0
605	13	2021-09-08 01:23:00.03697	0	\N	\N	auto	\N	\N	\N	\N	0
607	12	2021-09-08 01:23:00.040957	0	\N	\N	auto	\N	\N	\N	\N	0
608	2	2021-09-08 01:24:00.011479	0	\N	\N	auto	\N	\N	\N	\N	0
609	6	2021-09-08 01:24:00.014443	0	\N	\N	auto	\N	\N	\N	\N	0
610	4	2021-09-08 01:24:00.016636	0	\N	\N	auto	\N	\N	\N	\N	0
611	3	2021-09-08 01:24:00.019077	0	\N	\N	auto	\N	\N	\N	\N	0
612	7	2021-09-08 01:24:00.021316	0	\N	\N	auto	\N	\N	\N	\N	0
613	19	2021-09-08 01:24:00.024656	0	\N	\N	auto	\N	\N	\N	\N	0
614	43	2021-09-08 01:24:00.027613	0	\N	\N	auto	\N	\N	\N	\N	0
615	5	2021-09-08 01:24:00.029733	0	\N	\N	auto	\N	\N	\N	\N	0
616	1	2021-09-08 01:24:00.032775	0	\N	\N	auto	\N	\N	\N	\N	0
617	13	2021-09-08 01:24:00.034927	0	\N	\N	auto	\N	\N	\N	\N	0
618	21	2021-09-08 01:24:00.03868	0	\N	\N	auto	\N	\N	\N	\N	0
620	12	2021-09-08 01:24:00.042741	0	\N	\N	auto	\N	\N	\N	\N	0
621	2	2021-09-08 01:25:00.007918	0	\N	\N	auto	\N	\N	\N	\N	0
622	6	2021-09-08 01:25:00.011759	0	\N	\N	auto	\N	\N	\N	\N	0
623	4	2021-09-08 01:25:00.013923	0	\N	\N	auto	\N	\N	\N	\N	0
624	3	2021-09-08 01:25:00.015915	0	\N	\N	auto	\N	\N	\N	\N	0
625	7	2021-09-08 01:25:00.018204	0	\N	\N	auto	\N	\N	\N	\N	0
626	5	2021-09-08 01:25:00.019951	0	\N	\N	auto	\N	\N	\N	\N	0
627	13	2021-09-08 01:25:00.02158	0	\N	\N	auto	\N	\N	\N	\N	0
628	19	2021-09-08 01:25:00.024551	0	\N	\N	auto	\N	\N	\N	\N	0
629	43	2021-09-08 01:25:00.027507	0	\N	\N	auto	\N	\N	\N	\N	0
630	1	2021-09-08 01:25:00.030124	0	\N	\N	auto	\N	\N	\N	\N	0
632	21	2021-09-08 01:25:00.03599	0	\N	\N	auto	\N	\N	\N	\N	0
633	12	2021-09-08 01:25:00.037786	0	\N	\N	auto	\N	\N	\N	\N	0
634	21	2021-09-08 01:26:00.012588	0	\N	\N	auto	\N	\N	\N	\N	0
635	2	2021-09-08 01:26:00.01575	0	\N	\N	auto	\N	\N	\N	\N	0
636	6	2021-09-08 01:26:00.018669	0	\N	\N	auto	\N	\N	\N	\N	0
637	4	2021-09-08 01:26:00.020771	0	\N	\N	auto	\N	\N	\N	\N	0
638	3	2021-09-08 01:26:00.022495	0	\N	\N	auto	\N	\N	\N	\N	0
639	7	2021-09-08 01:26:00.024651	0	\N	\N	auto	\N	\N	\N	\N	0
640	5	2021-09-08 01:26:00.027176	0	\N	\N	auto	\N	\N	\N	\N	0
641	13	2021-09-08 01:26:00.02944	0	\N	\N	auto	\N	\N	\N	\N	0
643	19	2021-09-08 01:26:00.03442	0	\N	\N	auto	\N	\N	\N	\N	0
644	43	2021-09-08 01:26:00.037668	0	\N	\N	auto	\N	\N	\N	\N	0
645	1	2021-09-08 01:26:00.04052	0	\N	\N	auto	\N	\N	\N	\N	0
646	12	2021-09-08 01:26:00.042187	0	\N	\N	auto	\N	\N	\N	\N	0
647	21	2021-09-08 01:27:00.00965	0	\N	\N	auto	\N	\N	\N	\N	0
648	2	2021-09-08 01:27:00.012191	0	\N	\N	auto	\N	\N	\N	\N	0
649	19	2021-09-08 01:27:00.015331	0	\N	\N	auto	\N	\N	\N	\N	0
650	43	2021-09-08 01:27:00.017878	0	\N	\N	auto	\N	\N	\N	\N	0
651	6	2021-09-08 01:27:00.019812	0	\N	\N	auto	\N	\N	\N	\N	0
652	1	2021-09-08 01:27:00.022396	0	\N	\N	auto	\N	\N	\N	\N	0
653	4	2021-09-08 01:27:00.024178	0	\N	\N	auto	\N	\N	\N	\N	0
654	3	2021-09-08 01:27:00.025901	0	\N	\N	auto	\N	\N	\N	\N	0
655	7	2021-09-08 01:27:00.027408	0	\N	\N	auto	\N	\N	\N	\N	0
656	5	2021-09-08 01:27:00.029071	0	\N	\N	auto	\N	\N	\N	\N	0
657	13	2021-09-08 01:27:00.030565	0	\N	\N	auto	\N	\N	\N	\N	0
659	12	2021-09-08 01:27:00.034599	0	\N	\N	auto	\N	\N	\N	\N	0
660	2	2021-09-08 01:28:00.00819	0	\N	\N	auto	\N	\N	\N	\N	0
661	6	2021-09-08 01:28:00.010995	0	\N	\N	auto	\N	\N	\N	\N	0
662	4	2021-09-08 01:28:00.012948	0	\N	\N	auto	\N	\N	\N	\N	0
663	3	2021-09-08 01:28:00.015243	0	\N	\N	auto	\N	\N	\N	\N	0
664	7	2021-09-08 01:28:00.016888	0	\N	\N	auto	\N	\N	\N	\N	0
665	21	2021-09-08 01:28:00.020106	0	\N	\N	auto	\N	\N	\N	\N	0
666	19	2021-09-08 01:28:00.022727	0	\N	\N	auto	\N	\N	\N	\N	0
667	43	2021-09-08 01:28:00.025383	0	\N	\N	auto	\N	\N	\N	\N	0
668	1	2021-09-08 01:28:00.027809	0	\N	\N	auto	\N	\N	\N	\N	0
669	5	2021-09-08 01:28:00.029459	0	\N	\N	auto	\N	\N	\N	\N	0
670	13	2021-09-08 01:28:00.030952	0	\N	\N	auto	\N	\N	\N	\N	0
672	12	2021-09-08 01:28:00.034508	0	\N	\N	auto	\N	\N	\N	\N	0
673	2	2021-09-08 01:29:00.006459	0	\N	\N	auto	\N	\N	\N	\N	0
674	6	2021-09-08 01:29:00.010033	0	\N	\N	auto	\N	\N	\N	\N	0
675	4	2021-09-08 01:29:00.012171	0	\N	\N	auto	\N	\N	\N	\N	0
676	3	2021-09-08 01:29:00.014426	0	\N	\N	auto	\N	\N	\N	\N	0
677	7	2021-09-08 01:29:00.015944	0	\N	\N	auto	\N	\N	\N	\N	0
678	21	2021-09-08 01:29:00.019097	0	\N	\N	auto	\N	\N	\N	\N	0
679	19	2021-09-08 01:29:00.022439	0	\N	\N	auto	\N	\N	\N	\N	0
680	43	2021-09-08 01:29:00.02549	0	\N	\N	auto	\N	\N	\N	\N	0
681	1	2021-09-08 01:29:00.027833	0	\N	\N	auto	\N	\N	\N	\N	0
682	5	2021-09-08 01:29:00.029433	0	\N	\N	auto	\N	\N	\N	\N	0
683	13	2021-09-08 01:29:00.030866	0	\N	\N	auto	\N	\N	\N	\N	0
685	12	2021-09-08 01:29:00.033955	0	\N	\N	auto	\N	\N	\N	\N	0
686	2	2021-09-08 01:30:00.009644	0	\N	\N	auto	\N	\N	\N	\N	0
687	6	2021-09-08 01:30:00.013376	0	\N	\N	auto	\N	\N	\N	\N	0
688	4	2021-09-08 01:30:00.016952	0	\N	\N	auto	\N	\N	\N	\N	0
689	3	2021-09-08 01:30:00.020015	0	\N	\N	auto	\N	\N	\N	\N	0
690	7	2021-09-08 01:30:00.02355	0	\N	\N	auto	\N	\N	\N	\N	0
691	5	2021-09-08 01:30:00.026658	0	\N	\N	auto	\N	\N	\N	\N	0
692	21	2021-09-08 01:30:00.030715	0	\N	\N	auto	\N	\N	\N	\N	0
693	13	2021-09-08 01:30:00.032845	0	\N	\N	auto	\N	\N	\N	\N	0
694	19	2021-09-08 01:30:00.035973	0	\N	\N	auto	\N	\N	\N	\N	0
695	43	2021-09-08 01:30:00.038987	0	\N	\N	auto	\N	\N	\N	\N	0
696	1	2021-09-08 01:30:00.041457	0	\N	\N	auto	\N	\N	\N	\N	0
698	12	2021-09-08 01:30:00.045691	0	\N	\N	auto	\N	\N	\N	\N	0
699	2	2021-09-08 01:31:00.007751	0	\N	\N	auto	\N	\N	\N	\N	0
700	6	2021-09-08 01:31:00.010306	0	\N	\N	auto	\N	\N	\N	\N	0
701	4	2021-09-08 01:31:00.012136	0	\N	\N	auto	\N	\N	\N	\N	0
702	3	2021-09-08 01:31:00.013815	0	\N	\N	auto	\N	\N	\N	\N	0
703	7	2021-09-08 01:31:00.015509	0	\N	\N	auto	\N	\N	\N	\N	0
704	5	2021-09-08 01:31:00.017054	0	\N	\N	auto	\N	\N	\N	\N	0
705	13	2021-09-08 01:31:00.018945	0	\N	\N	auto	\N	\N	\N	\N	0
706	21	2021-09-08 01:31:00.021728	0	\N	\N	auto	\N	\N	\N	\N	0
708	19	2021-09-08 01:31:00.027244	0	\N	\N	auto	\N	\N	\N	\N	0
709	43	2021-09-08 01:31:00.030765	0	\N	\N	auto	\N	\N	\N	\N	0
710	1	2021-09-08 01:31:00.034055	0	\N	\N	auto	\N	\N	\N	\N	0
711	12	2021-09-08 01:31:00.035627	0	\N	\N	auto	\N	\N	\N	\N	0
712	19	2021-09-08 01:32:00.008813	0	\N	\N	auto	\N	\N	\N	\N	0
713	43	2021-09-08 01:32:00.01351	0	\N	\N	auto	\N	\N	\N	\N	0
714	2	2021-09-08 01:32:00.015568	0	\N	\N	auto	\N	\N	\N	\N	0
715	1	2021-09-08 01:32:00.018666	0	\N	\N	auto	\N	\N	\N	\N	0
716	6	2021-09-08 01:32:00.020355	0	\N	\N	auto	\N	\N	\N	\N	0
717	4	2021-09-08 01:32:00.022308	0	\N	\N	auto	\N	\N	\N	\N	0
718	3	2021-09-08 01:32:00.023863	0	\N	\N	auto	\N	\N	\N	\N	0
719	7	2021-09-08 01:32:00.025373	0	\N	\N	auto	\N	\N	\N	\N	0
720	5	2021-09-08 01:32:00.027891	0	\N	\N	auto	\N	\N	\N	\N	0
721	13	2021-09-08 01:32:00.029443	0	\N	\N	auto	\N	\N	\N	\N	0
723	21	2021-09-08 01:32:00.0337	0	\N	\N	auto	\N	\N	\N	\N	0
724	12	2021-09-08 01:32:00.03516	0	\N	\N	auto	\N	\N	\N	\N	0
725	2	2021-09-08 01:33:00.006957	0	\N	\N	auto	\N	\N	\N	\N	0
726	19	2021-09-08 01:33:00.011797	0	\N	\N	auto	\N	\N	\N	\N	0
727	6	2021-09-08 01:33:00.013757	0	\N	\N	auto	\N	\N	\N	\N	0
728	43	2021-09-08 01:33:00.016719	0	\N	\N	auto	\N	\N	\N	\N	0
729	4	2021-09-08 01:33:00.01825	0	\N	\N	auto	\N	\N	\N	\N	0
730	3	2021-09-08 01:33:00.019891	0	\N	\N	auto	\N	\N	\N	\N	0
731	7	2021-09-08 01:33:00.021549	0	\N	\N	auto	\N	\N	\N	\N	0
732	1	2021-09-08 01:33:00.02422	0	\N	\N	auto	\N	\N	\N	\N	0
733	21	2021-09-08 01:33:00.027018	0	\N	\N	auto	\N	\N	\N	\N	0
734	5	2021-09-08 01:33:00.028757	0	\N	\N	auto	\N	\N	\N	\N	0
735	13	2021-09-08 01:33:00.030189	0	\N	\N	auto	\N	\N	\N	\N	0
737	12	2021-09-08 01:33:00.033434	0	\N	\N	auto	\N	\N	\N	\N	0
738	2	2021-09-08 01:34:00.009928	0	\N	\N	auto	\N	\N	\N	\N	0
739	6	2021-09-08 01:34:00.012773	0	\N	\N	auto	\N	\N	\N	\N	0
740	4	2021-09-08 01:34:00.014291	0	\N	\N	auto	\N	\N	\N	\N	0
741	3	2021-09-08 01:34:00.016003	0	\N	\N	auto	\N	\N	\N	\N	0
742	7	2021-09-08 01:34:00.017654	0	\N	\N	auto	\N	\N	\N	\N	0
743	19	2021-09-08 01:34:00.020484	0	\N	\N	auto	\N	\N	\N	\N	0
744	43	2021-09-08 01:34:00.02315	0	\N	\N	auto	\N	\N	\N	\N	0
745	1	2021-09-08 01:34:00.02667	0	\N	\N	auto	\N	\N	\N	\N	0
746	21	2021-09-08 01:34:00.030462	0	\N	\N	auto	\N	\N	\N	\N	0
747	5	2021-09-08 01:34:00.031939	0	\N	\N	auto	\N	\N	\N	\N	0
748	13	2021-09-08 01:34:00.033313	0	\N	\N	auto	\N	\N	\N	\N	0
750	12	2021-09-08 01:34:00.036444	0	\N	\N	auto	\N	\N	\N	\N	0
751	2	2021-09-08 01:35:00.008599	0	\N	\N	auto	\N	\N	\N	\N	0
752	6	2021-09-08 01:35:00.011727	0	\N	\N	auto	\N	\N	\N	\N	0
753	4	2021-09-08 01:35:00.013767	0	\N	\N	auto	\N	\N	\N	\N	0
754	3	2021-09-08 01:35:00.015956	0	\N	\N	auto	\N	\N	\N	\N	0
755	7	2021-09-08 01:35:00.018012	0	\N	\N	auto	\N	\N	\N	\N	0
756	19	2021-09-08 01:35:00.020817	0	\N	\N	auto	\N	\N	\N	\N	0
757	43	2021-09-08 01:35:00.02376	0	\N	\N	auto	\N	\N	\N	\N	0
758	5	2021-09-08 01:35:00.025399	0	\N	\N	auto	\N	\N	\N	\N	0
759	1	2021-09-08 01:35:00.029796	0	\N	\N	auto	\N	\N	\N	\N	0
760	13	2021-09-08 01:35:00.031351	0	\N	\N	auto	\N	\N	\N	\N	0
761	21	2021-09-08 01:35:00.033738	0	\N	\N	auto	\N	\N	\N	\N	0
763	12	2021-09-08 01:35:00.036725	0	\N	\N	auto	\N	\N	\N	\N	0
764	2	2021-09-08 01:36:00.007791	0	\N	\N	auto	\N	\N	\N	\N	0
765	6	2021-09-08 01:36:00.013474	0	\N	\N	auto	\N	\N	\N	\N	0
766	4	2021-09-08 01:36:00.015953	0	\N	\N	auto	\N	\N	\N	\N	0
767	3	2021-09-08 01:36:00.018286	0	\N	\N	auto	\N	\N	\N	\N	0
768	7	2021-09-08 01:36:00.02077	0	\N	\N	auto	\N	\N	\N	\N	0
769	5	2021-09-08 01:36:00.02227	0	\N	\N	auto	\N	\N	\N	\N	0
770	13	2021-09-08 01:36:00.023656	0	\N	\N	auto	\N	\N	\N	\N	0
771	19	2021-09-08 01:36:00.026159	0	\N	\N	auto	\N	\N	\N	\N	0
772	43	2021-09-08 01:36:00.028338	0	\N	\N	auto	\N	\N	\N	\N	0
773	1	2021-09-08 01:36:00.030746	0	\N	\N	auto	\N	\N	\N	\N	0
775	21	2021-09-08 01:36:00.034924	0	\N	\N	auto	\N	\N	\N	\N	0
776	12	2021-09-08 01:36:00.036359	0	\N	\N	auto	\N	\N	\N	\N	0
777	21	2021-09-08 01:37:00.143264	0	\N	\N	auto	\N	\N	\N	\N	0
778	2	2021-09-08 01:37:00.145562	0	\N	\N	auto	\N	\N	\N	\N	0
779	6	2021-09-08 01:37:00.147322	0	\N	\N	auto	\N	\N	\N	\N	0
780	4	2021-09-08 01:37:00.149348	0	\N	\N	auto	\N	\N	\N	\N	0
781	3	2021-09-08 01:37:00.150811	0	\N	\N	auto	\N	\N	\N	\N	0
782	7	2021-09-08 01:37:00.152338	0	\N	\N	auto	\N	\N	\N	\N	0
783	5	2021-09-08 01:37:00.153922	0	\N	\N	auto	\N	\N	\N	\N	0
784	13	2021-09-08 01:37:00.155966	0	\N	\N	auto	\N	\N	\N	\N	0
786	19	2021-09-08 01:37:00.160658	0	\N	\N	auto	\N	\N	\N	\N	0
787	43	2021-09-08 01:37:00.162972	0	\N	\N	auto	\N	\N	\N	\N	0
788	1	2021-09-08 01:37:00.165462	0	\N	\N	auto	\N	\N	\N	\N	0
789	12	2021-09-08 01:37:00.166806	0	\N	\N	auto	\N	\N	\N	\N	0
790	21	2021-09-08 01:38:00.009081	0	\N	\N	auto	\N	\N	\N	\N	0
791	2	2021-09-08 01:38:00.011688	0	\N	\N	auto	\N	\N	\N	\N	0
792	19	2021-09-08 01:38:00.014165	0	\N	\N	auto	\N	\N	\N	\N	0
793	43	2021-09-08 01:38:00.018148	0	\N	\N	auto	\N	\N	\N	\N	0
794	6	2021-09-08 01:38:00.019924	0	\N	\N	auto	\N	\N	\N	\N	0
795	1	2021-09-08 01:38:00.022356	0	\N	\N	auto	\N	\N	\N	\N	0
796	4	2021-09-08 01:38:00.024038	0	\N	\N	auto	\N	\N	\N	\N	0
797	3	2021-09-08 01:38:00.025445	0	\N	\N	auto	\N	\N	\N	\N	0
798	7	2021-09-08 01:38:00.026875	0	\N	\N	auto	\N	\N	\N	\N	0
799	5	2021-09-08 01:38:00.028259	0	\N	\N	auto	\N	\N	\N	\N	0
800	13	2021-09-08 01:38:00.030014	0	\N	\N	auto	\N	\N	\N	\N	0
802	12	2021-09-08 01:38:00.032866	0	\N	\N	auto	\N	\N	\N	\N	0
803	2	2021-09-08 01:39:00.004858	0	\N	\N	auto	\N	\N	\N	\N	0
804	6	2021-09-08 01:39:00.007261	0	\N	\N	auto	\N	\N	\N	\N	0
805	4	2021-09-08 01:39:00.009227	0	\N	\N	auto	\N	\N	\N	\N	0
806	3	2021-09-08 01:39:00.011765	0	\N	\N	auto	\N	\N	\N	\N	0
807	7	2021-09-08 01:39:00.013883	0	\N	\N	auto	\N	\N	\N	\N	0
808	21	2021-09-08 01:39:00.017529	0	\N	\N	auto	\N	\N	\N	\N	0
809	19	2021-09-08 01:39:00.032896	0	\N	\N	auto	\N	\N	\N	\N	0
810	43	2021-09-08 01:39:00.03727	0	\N	\N	auto	\N	\N	\N	\N	0
811	1	2021-09-08 01:39:00.040948	0	\N	\N	auto	\N	\N	\N	\N	0
812	5	2021-09-08 01:39:00.045241	0	\N	\N	auto	\N	\N	\N	\N	0
813	13	2021-09-08 01:39:00.047902	0	\N	\N	auto	\N	\N	\N	\N	0
815	12	2021-09-08 01:39:00.051441	0	\N	\N	auto	\N	\N	\N	\N	0
816	2	2021-09-08 01:40:00.007397	0	\N	\N	auto	\N	\N	\N	\N	0
817	6	2021-09-08 01:40:00.010195	0	\N	\N	auto	\N	\N	\N	\N	0
818	4	2021-09-08 01:40:00.013062	0	\N	\N	auto	\N	\N	\N	\N	0
819	3	2021-09-08 01:40:00.014699	0	\N	\N	auto	\N	\N	\N	\N	0
820	7	2021-09-08 01:40:00.016218	0	\N	\N	auto	\N	\N	\N	\N	0
821	21	2021-09-08 01:40:00.019363	0	\N	\N	auto	\N	\N	\N	\N	0
822	19	2021-09-08 01:40:00.021567	0	\N	\N	auto	\N	\N	\N	\N	0
823	43	2021-09-08 01:40:00.023896	0	\N	\N	auto	\N	\N	\N	\N	0
824	1	2021-09-08 01:40:00.026067	0	\N	\N	auto	\N	\N	\N	\N	0
825	5	2021-09-08 01:40:00.027618	0	\N	\N	auto	\N	\N	\N	\N	0
826	13	2021-09-08 01:40:00.028919	0	\N	\N	auto	\N	\N	\N	\N	0
828	12	2021-09-08 01:40:00.032781	0	\N	\N	auto	\N	\N	\N	\N	0
829	2	2021-09-08 01:41:00.006139	0	\N	\N	auto	\N	\N	\N	\N	0
830	6	2021-09-08 01:41:00.009098	0	\N	\N	auto	\N	\N	\N	\N	0
831	4	2021-09-08 01:41:00.010932	0	\N	\N	auto	\N	\N	\N	\N	0
832	3	2021-09-08 01:41:00.012445	0	\N	\N	auto	\N	\N	\N	\N	0
833	7	2021-09-08 01:41:00.014326	0	\N	\N	auto	\N	\N	\N	\N	0
834	5	2021-09-08 01:41:00.015806	0	\N	\N	auto	\N	\N	\N	\N	0
835	21	2021-09-08 01:41:00.019442	0	\N	\N	auto	\N	\N	\N	\N	0
836	13	2021-09-08 01:41:00.020777	0	\N	\N	auto	\N	\N	\N	\N	0
837	19	2021-09-08 01:41:00.02289	0	\N	\N	auto	\N	\N	\N	\N	0
838	43	2021-09-08 01:41:00.025251	0	\N	\N	auto	\N	\N	\N	\N	0
839	1	2021-09-08 01:41:00.027375	0	\N	\N	auto	\N	\N	\N	\N	0
841	12	2021-09-08 01:41:00.030776	0	\N	\N	auto	\N	\N	\N	\N	0
842	2	2021-09-08 01:42:00.006819	0	\N	\N	auto	\N	\N	\N	\N	0
843	6	2021-09-08 01:42:00.010232	0	\N	\N	auto	\N	\N	\N	\N	0
844	4	2021-09-08 01:42:00.012962	0	\N	\N	auto	\N	\N	\N	\N	0
845	3	2021-09-08 01:42:00.014984	0	\N	\N	auto	\N	\N	\N	\N	0
846	7	2021-09-08 01:42:00.016471	0	\N	\N	auto	\N	\N	\N	\N	0
847	5	2021-09-08 01:42:00.01786	0	\N	\N	auto	\N	\N	\N	\N	0
848	13	2021-09-08 01:42:00.019528	0	\N	\N	auto	\N	\N	\N	\N	0
849	21	2021-09-08 01:42:00.021733	0	\N	\N	auto	\N	\N	\N	\N	0
851	19	2021-09-08 01:42:00.025522	0	\N	\N	auto	\N	\N	\N	\N	0
852	43	2021-09-08 01:42:00.027612	0	\N	\N	auto	\N	\N	\N	\N	0
853	1	2021-09-08 01:42:00.030153	0	\N	\N	auto	\N	\N	\N	\N	0
854	12	2021-09-08 01:42:00.031695	0	\N	\N	auto	\N	\N	\N	\N	0
855	19	2021-09-08 01:43:00.009383	0	\N	\N	auto	\N	\N	\N	\N	0
856	43	2021-09-08 01:43:00.012727	0	\N	\N	auto	\N	\N	\N	\N	0
857	2	2021-09-08 01:43:00.014377	0	\N	\N	auto	\N	\N	\N	\N	0
858	1	2021-09-08 01:43:00.01678	0	\N	\N	auto	\N	\N	\N	\N	0
859	6	2021-09-08 01:43:00.018072	0	\N	\N	auto	\N	\N	\N	\N	0
860	4	2021-09-08 01:43:00.019605	0	\N	\N	auto	\N	\N	\N	\N	0
861	3	2021-09-08 01:43:00.020998	0	\N	\N	auto	\N	\N	\N	\N	0
862	7	2021-09-08 01:43:00.022434	0	\N	\N	auto	\N	\N	\N	\N	0
863	5	2021-09-08 01:43:00.023898	0	\N	\N	auto	\N	\N	\N	\N	0
864	13	2021-09-08 01:43:00.02549	0	\N	\N	auto	\N	\N	\N	\N	0
866	21	2021-09-08 01:43:00.02999	0	\N	\N	auto	\N	\N	\N	\N	0
867	12	2021-09-08 01:43:00.031327	0	\N	\N	auto	\N	\N	\N	\N	0
868	2	2021-09-08 01:44:00.006727	0	\N	\N	auto	\N	\N	\N	\N	0
869	19	2021-09-08 01:44:00.01098	0	\N	\N	auto	\N	\N	\N	\N	0
870	6	2021-09-08 01:44:00.012786	0	\N	\N	auto	\N	\N	\N	\N	0
871	43	2021-09-08 01:44:00.015287	0	\N	\N	auto	\N	\N	\N	\N	0
872	4	2021-09-08 01:44:00.016673	0	\N	\N	auto	\N	\N	\N	\N	0
873	3	2021-09-08 01:44:00.017976	0	\N	\N	auto	\N	\N	\N	\N	0
874	7	2021-09-08 01:44:00.019522	0	\N	\N	auto	\N	\N	\N	\N	0
875	1	2021-09-08 01:44:00.022031	0	\N	\N	auto	\N	\N	\N	\N	0
876	21	2021-09-08 01:44:00.024472	0	\N	\N	auto	\N	\N	\N	\N	0
877	5	2021-09-08 01:44:00.025757	0	\N	\N	auto	\N	\N	\N	\N	0
878	13	2021-09-08 01:44:00.02739	0	\N	\N	auto	\N	\N	\N	\N	0
880	12	2021-09-08 01:44:00.030296	0	\N	\N	auto	\N	\N	\N	\N	0
881	2	2021-09-08 01:45:00.007661	0	\N	\N	auto	\N	\N	\N	\N	0
882	6	2021-09-08 01:45:00.010656	0	\N	\N	auto	\N	\N	\N	\N	0
883	4	2021-09-08 01:45:00.012379	0	\N	\N	auto	\N	\N	\N	\N	0
884	3	2021-09-08 01:45:00.013779	0	\N	\N	auto	\N	\N	\N	\N	0
885	7	2021-09-08 01:45:00.015418	0	\N	\N	auto	\N	\N	\N	\N	0
886	19	2021-09-08 01:45:00.018042	0	\N	\N	auto	\N	\N	\N	\N	0
887	43	2021-09-08 01:45:00.021039	0	\N	\N	auto	\N	\N	\N	\N	0
888	1	2021-09-08 01:45:00.023283	0	\N	\N	auto	\N	\N	\N	\N	0
889	21	2021-09-08 01:45:00.025467	0	\N	\N	auto	\N	\N	\N	\N	0
890	5	2021-09-08 01:45:00.027261	0	\N	\N	auto	\N	\N	\N	\N	0
891	13	2021-09-08 01:45:00.028842	0	\N	\N	auto	\N	\N	\N	\N	0
893	12	2021-09-08 01:45:00.031414	0	\N	\N	auto	\N	\N	\N	\N	0
894	2	2021-09-08 01:46:00.00597	0	\N	\N	auto	\N	\N	\N	\N	0
895	6	2021-09-08 01:46:00.009549	0	\N	\N	auto	\N	\N	\N	\N	0
896	4	2021-09-08 01:46:00.012105	0	\N	\N	auto	\N	\N	\N	\N	0
897	3	2021-09-08 01:46:00.014433	0	\N	\N	auto	\N	\N	\N	\N	0
898	7	2021-09-08 01:46:00.017496	0	\N	\N	auto	\N	\N	\N	\N	0
899	19	2021-09-08 01:46:00.019641	0	\N	\N	auto	\N	\N	\N	\N	0
900	43	2021-09-08 01:46:00.021935	0	\N	\N	auto	\N	\N	\N	\N	0
901	5	2021-09-08 01:46:00.023234	0	\N	\N	auto	\N	\N	\N	\N	0
902	1	2021-09-08 01:46:00.0255	0	\N	\N	auto	\N	\N	\N	\N	0
903	13	2021-09-08 01:46:00.026779	0	\N	\N	auto	\N	\N	\N	\N	0
904	21	2021-09-08 01:46:00.029164	0	\N	\N	auto	\N	\N	\N	\N	0
906	12	2021-09-08 01:46:00.031936	0	\N	\N	auto	\N	\N	\N	\N	0
907	2	2021-09-08 01:47:00.005387	0	\N	\N	auto	\N	\N	\N	\N	0
908	6	2021-09-08 01:47:00.00758	0	\N	\N	auto	\N	\N	\N	\N	0
909	4	2021-09-08 01:47:00.00914	0	\N	\N	auto	\N	\N	\N	\N	0
910	3	2021-09-08 01:47:00.010892	0	\N	\N	auto	\N	\N	\N	\N	0
911	7	2021-09-08 01:47:00.012425	0	\N	\N	auto	\N	\N	\N	\N	0
912	5	2021-09-08 01:47:00.014144	0	\N	\N	auto	\N	\N	\N	\N	0
913	13	2021-09-08 01:47:00.015691	0	\N	\N	auto	\N	\N	\N	\N	0
914	19	2021-09-08 01:47:00.018574	0	\N	\N	auto	\N	\N	\N	\N	0
915	43	2021-09-08 01:47:00.021322	0	\N	\N	auto	\N	\N	\N	\N	0
916	1	2021-09-08 01:47:00.023595	0	\N	\N	auto	\N	\N	\N	\N	0
918	21	2021-09-08 01:47:00.027382	0	\N	\N	auto	\N	\N	\N	\N	0
919	12	2021-09-08 01:47:00.028638	0	\N	\N	auto	\N	\N	\N	\N	0
920	21	2021-09-08 01:48:00.009672	0	\N	\N	auto	\N	\N	\N	\N	0
921	2	2021-09-08 01:48:00.011823	0	\N	\N	auto	\N	\N	\N	\N	0
922	6	2021-09-08 01:48:00.013466	0	\N	\N	auto	\N	\N	\N	\N	0
923	4	2021-09-08 01:48:00.014998	0	\N	\N	auto	\N	\N	\N	\N	0
924	3	2021-09-08 01:48:00.016565	0	\N	\N	auto	\N	\N	\N	\N	0
925	7	2021-09-08 01:48:00.017891	0	\N	\N	auto	\N	\N	\N	\N	0
926	5	2021-09-08 01:48:00.0191	0	\N	\N	auto	\N	\N	\N	\N	0
927	13	2021-09-08 01:48:00.020683	0	\N	\N	auto	\N	\N	\N	\N	0
929	19	2021-09-08 01:48:00.024474	0	\N	\N	auto	\N	\N	\N	\N	0
930	43	2021-09-08 01:48:00.02678	0	\N	\N	auto	\N	\N	\N	\N	0
931	1	2021-09-08 01:48:00.028863	0	\N	\N	auto	\N	\N	\N	\N	0
932	12	2021-09-08 01:48:00.03035	0	\N	\N	auto	\N	\N	\N	\N	0
933	21	2021-09-08 01:49:00.009441	0	\N	\N	auto	\N	\N	\N	\N	0
934	2	2021-09-08 01:49:00.011558	0	\N	\N	auto	\N	\N	\N	\N	0
935	19	2021-09-08 01:49:00.015839	0	\N	\N	auto	\N	\N	\N	\N	0
936	43	2021-09-08 01:49:00.018155	0	\N	\N	auto	\N	\N	\N	\N	0
937	6	2021-09-08 01:49:00.019737	0	\N	\N	auto	\N	\N	\N	\N	0
938	1	2021-09-08 01:49:00.021922	0	\N	\N	auto	\N	\N	\N	\N	0
939	4	2021-09-08 01:49:00.023203	0	\N	\N	auto	\N	\N	\N	\N	0
940	3	2021-09-08 01:49:00.024804	0	\N	\N	auto	\N	\N	\N	\N	0
941	7	2021-09-08 01:49:00.026059	0	\N	\N	auto	\N	\N	\N	\N	0
942	5	2021-09-08 01:49:00.027357	0	\N	\N	auto	\N	\N	\N	\N	0
943	13	2021-09-08 01:49:00.029197	0	\N	\N	auto	\N	\N	\N	\N	0
945	12	2021-09-08 01:49:00.032162	0	\N	\N	auto	\N	\N	\N	\N	0
946	2	2021-09-08 01:50:00.008359	0	\N	\N	auto	\N	\N	\N	\N	0
947	6	2021-09-08 01:50:00.011331	0	\N	\N	auto	\N	\N	\N	\N	0
948	4	2021-09-08 01:50:00.012964	0	\N	\N	auto	\N	\N	\N	\N	0
949	3	2021-09-08 01:50:00.015191	0	\N	\N	auto	\N	\N	\N	\N	0
950	7	2021-09-08 01:50:00.01681	0	\N	\N	auto	\N	\N	\N	\N	0
951	21	2021-09-08 01:50:00.020116	0	\N	\N	auto	\N	\N	\N	\N	0
952	19	2021-09-08 01:50:00.025342	0	\N	\N	auto	\N	\N	\N	\N	0
953	43	2021-09-08 01:50:00.029105	0	\N	\N	auto	\N	\N	\N	\N	0
954	1	2021-09-08 01:50:00.032144	0	\N	\N	auto	\N	\N	\N	\N	0
955	5	2021-09-08 01:50:00.033831	0	\N	\N	auto	\N	\N	\N	\N	0
956	13	2021-09-08 01:50:00.035672	0	\N	\N	auto	\N	\N	\N	\N	0
958	12	2021-09-08 01:50:00.040955	0	\N	\N	auto	\N	\N	\N	\N	0
959	2	2021-09-08 01:51:00.006427	0	\N	\N	auto	\N	\N	\N	\N	0
960	6	2021-09-08 01:51:00.009375	0	\N	\N	auto	\N	\N	\N	\N	0
961	4	2021-09-08 01:51:00.011075	0	\N	\N	auto	\N	\N	\N	\N	0
962	3	2021-09-08 01:51:00.012578	0	\N	\N	auto	\N	\N	\N	\N	0
963	7	2021-09-08 01:51:00.01414	0	\N	\N	auto	\N	\N	\N	\N	0
964	21	2021-09-08 01:51:00.016283	0	\N	\N	auto	\N	\N	\N	\N	0
965	19	2021-09-08 01:51:00.018501	0	\N	\N	auto	\N	\N	\N	\N	0
966	43	2021-09-08 01:51:00.020482	0	\N	\N	auto	\N	\N	\N	\N	0
967	1	2021-09-08 01:51:00.022786	0	\N	\N	auto	\N	\N	\N	\N	0
968	5	2021-09-08 01:51:00.024081	0	\N	\N	auto	\N	\N	\N	\N	0
969	13	2021-09-08 01:51:00.025415	0	\N	\N	auto	\N	\N	\N	\N	0
971	12	2021-09-08 01:51:00.029671	0	\N	\N	auto	\N	\N	\N	\N	0
972	2	2021-09-08 01:52:00.007987	0	\N	\N	auto	\N	\N	\N	\N	0
973	6	2021-09-08 01:52:00.011746	0	\N	\N	auto	\N	\N	\N	\N	0
974	4	2021-09-08 01:52:00.014105	0	\N	\N	auto	\N	\N	\N	\N	0
975	3	2021-09-08 01:52:00.018766	0	\N	\N	auto	\N	\N	\N	\N	0
976	7	2021-09-08 01:52:00.02279	0	\N	\N	auto	\N	\N	\N	\N	0
977	5	2021-09-08 01:52:00.026746	0	\N	\N	auto	\N	\N	\N	\N	0
978	21	2021-09-08 01:52:00.031907	0	\N	\N	auto	\N	\N	\N	\N	0
979	13	2021-09-08 01:52:00.034509	0	\N	\N	auto	\N	\N	\N	\N	0
980	19	2021-09-08 01:52:00.04017	0	\N	\N	auto	\N	\N	\N	\N	0
981	43	2021-09-08 01:52:00.044248	0	\N	\N	auto	\N	\N	\N	\N	0
982	1	2021-09-08 01:52:00.047512	0	\N	\N	auto	\N	\N	\N	\N	0
984	12	2021-09-08 01:52:00.051972	0	\N	\N	auto	\N	\N	\N	\N	0
985	2	2021-09-08 01:53:00.00771	0	\N	\N	auto	\N	\N	\N	\N	0
986	6	2021-09-08 01:53:00.010855	0	\N	\N	auto	\N	\N	\N	\N	0
987	4	2021-09-08 01:53:00.012772	0	\N	\N	auto	\N	\N	\N	\N	0
988	3	2021-09-08 01:53:00.014282	0	\N	\N	auto	\N	\N	\N	\N	0
989	7	2021-09-08 01:53:00.015844	0	\N	\N	auto	\N	\N	\N	\N	0
990	5	2021-09-08 01:53:00.017327	0	\N	\N	auto	\N	\N	\N	\N	0
991	13	2021-09-08 01:53:00.018697	0	\N	\N	auto	\N	\N	\N	\N	0
992	21	2021-09-08 01:53:00.020882	0	\N	\N	auto	\N	\N	\N	\N	0
994	19	2021-09-08 01:53:00.024724	0	\N	\N	auto	\N	\N	\N	\N	0
995	43	2021-09-08 01:53:00.026855	0	\N	\N	auto	\N	\N	\N	\N	0
996	1	2021-09-08 01:53:00.03022	0	\N	\N	auto	\N	\N	\N	\N	0
997	12	2021-09-08 01:53:00.031524	0	\N	\N	auto	\N	\N	\N	\N	0
998	19	2021-09-08 01:54:00.008865	0	\N	\N	auto	\N	\N	\N	\N	0
999	43	2021-09-08 01:54:00.012552	0	\N	\N	auto	\N	\N	\N	\N	0
1000	2	2021-09-08 01:54:00.014617	0	\N	\N	auto	\N	\N	\N	\N	0
1001	1	2021-09-08 01:54:00.017134	0	\N	\N	auto	\N	\N	\N	\N	0
1002	6	2021-09-08 01:54:00.018445	0	\N	\N	auto	\N	\N	\N	\N	0
1003	4	2021-09-08 01:54:00.019703	0	\N	\N	auto	\N	\N	\N	\N	0
1004	3	2021-09-08 01:54:00.022275	0	\N	\N	auto	\N	\N	\N	\N	0
1005	7	2021-09-08 01:54:00.023555	0	\N	\N	auto	\N	\N	\N	\N	0
1006	5	2021-09-08 01:54:00.024959	0	\N	\N	auto	\N	\N	\N	\N	0
1007	13	2021-09-08 01:54:00.027228	0	\N	\N	auto	\N	\N	\N	\N	0
1009	21	2021-09-08 01:54:00.031069	0	\N	\N	auto	\N	\N	\N	\N	0
1010	12	2021-09-08 01:54:00.032624	0	\N	\N	auto	\N	\N	\N	\N	0
1011	2	2021-09-08 01:55:00.006173	0	\N	\N	auto	\N	\N	\N	\N	0
1012	19	2021-09-08 01:55:00.010347	0	\N	\N	auto	\N	\N	\N	\N	0
1013	6	2021-09-08 01:55:00.012228	0	\N	\N	auto	\N	\N	\N	\N	0
1014	43	2021-09-08 01:55:00.015278	0	\N	\N	auto	\N	\N	\N	\N	0
1015	4	2021-09-08 01:55:00.016656	0	\N	\N	auto	\N	\N	\N	\N	0
1016	3	2021-09-08 01:55:00.018294	0	\N	\N	auto	\N	\N	\N	\N	0
1017	7	2021-09-08 01:55:00.019655	0	\N	\N	auto	\N	\N	\N	\N	0
1018	1	2021-09-08 01:55:00.021779	0	\N	\N	auto	\N	\N	\N	\N	0
1019	21	2021-09-08 01:55:00.024666	0	\N	\N	auto	\N	\N	\N	\N	0
1020	5	2021-09-08 01:55:00.026002	0	\N	\N	auto	\N	\N	\N	\N	0
1021	13	2021-09-08 01:55:00.02739	0	\N	\N	auto	\N	\N	\N	\N	0
1023	12	2021-09-08 01:55:00.03042	0	\N	\N	auto	\N	\N	\N	\N	0
1024	2	2021-09-08 01:56:00.007803	0	\N	\N	auto	\N	\N	\N	\N	0
1025	6	2021-09-08 01:56:00.010889	0	\N	\N	auto	\N	\N	\N	\N	0
1026	4	2021-09-08 01:56:00.014415	0	\N	\N	auto	\N	\N	\N	\N	0
1027	3	2021-09-08 01:56:00.015852	0	\N	\N	auto	\N	\N	\N	\N	0
1028	7	2021-09-08 01:56:00.017111	0	\N	\N	auto	\N	\N	\N	\N	0
1029	19	2021-09-08 01:56:00.019485	0	\N	\N	auto	\N	\N	\N	\N	0
1030	43	2021-09-08 01:56:00.021481	0	\N	\N	auto	\N	\N	\N	\N	0
1031	1	2021-09-08 01:56:00.023648	0	\N	\N	auto	\N	\N	\N	\N	0
1032	21	2021-09-08 01:56:00.02575	0	\N	\N	auto	\N	\N	\N	\N	0
1033	5	2021-09-08 01:56:00.027117	0	\N	\N	auto	\N	\N	\N	\N	0
1034	13	2021-09-08 01:56:00.028552	0	\N	\N	auto	\N	\N	\N	\N	0
1036	12	2021-09-08 01:56:00.031018	0	\N	\N	auto	\N	\N	\N	\N	0
1037	2	2021-09-08 01:57:00.006681	0	\N	\N	auto	\N	\N	\N	\N	0
1038	6	2021-09-08 01:57:00.009603	0	\N	\N	auto	\N	\N	\N	\N	0
1039	4	2021-09-08 01:57:00.01201	0	\N	\N	auto	\N	\N	\N	\N	0
1040	3	2021-09-08 01:57:00.013944	0	\N	\N	auto	\N	\N	\N	\N	0
1041	7	2021-09-08 01:57:00.015357	0	\N	\N	auto	\N	\N	\N	\N	0
1042	19	2021-09-08 01:57:00.018029	0	\N	\N	auto	\N	\N	\N	\N	0
1043	43	2021-09-08 01:57:00.020732	0	\N	\N	auto	\N	\N	\N	\N	0
1044	5	2021-09-08 01:57:00.021982	0	\N	\N	auto	\N	\N	\N	\N	0
1045	1	2021-09-08 01:57:00.024409	0	\N	\N	auto	\N	\N	\N	\N	0
1046	13	2021-09-08 01:57:00.025908	0	\N	\N	auto	\N	\N	\N	\N	0
1047	21	2021-09-08 01:57:00.028193	0	\N	\N	auto	\N	\N	\N	\N	0
1049	12	2021-09-08 01:57:00.031089	0	\N	\N	auto	\N	\N	\N	\N	0
1050	2	2021-09-08 01:58:00.006883	0	\N	\N	auto	\N	\N	\N	\N	0
1051	6	2021-09-08 01:58:00.009749	0	\N	\N	auto	\N	\N	\N	\N	0
1052	4	2021-09-08 01:58:00.011574	0	\N	\N	auto	\N	\N	\N	\N	0
1053	3	2021-09-08 01:58:00.012873	0	\N	\N	auto	\N	\N	\N	\N	0
1054	7	2021-09-08 01:58:00.014481	0	\N	\N	auto	\N	\N	\N	\N	0
1055	5	2021-09-08 01:58:00.015742	0	\N	\N	auto	\N	\N	\N	\N	0
1056	13	2021-09-08 01:58:00.017061	0	\N	\N	auto	\N	\N	\N	\N	0
1057	19	2021-09-08 01:58:00.019309	0	\N	\N	auto	\N	\N	\N	\N	0
1058	43	2021-09-08 01:58:00.02165	0	\N	\N	auto	\N	\N	\N	\N	0
1059	1	2021-09-08 01:58:00.024014	0	\N	\N	auto	\N	\N	\N	\N	0
1061	21	2021-09-08 01:58:00.027594	0	\N	\N	auto	\N	\N	\N	\N	0
1062	12	2021-09-08 01:58:00.029059	0	\N	\N	auto	\N	\N	\N	\N	0
1063	21	2021-09-08 01:59:00.013112	0	\N	\N	auto	\N	\N	\N	\N	0
1064	2	2021-09-08 01:59:00.015859	0	\N	\N	auto	\N	\N	\N	\N	0
1065	6	2021-09-08 01:59:00.017814	0	\N	\N	auto	\N	\N	\N	\N	0
1066	4	2021-09-08 01:59:00.019492	0	\N	\N	auto	\N	\N	\N	\N	0
1067	3	2021-09-08 01:59:00.021203	0	\N	\N	auto	\N	\N	\N	\N	0
1068	7	2021-09-08 01:59:00.022665	0	\N	\N	auto	\N	\N	\N	\N	0
1069	5	2021-09-08 01:59:00.024104	0	\N	\N	auto	\N	\N	\N	\N	0
1070	13	2021-09-08 01:59:00.025625	0	\N	\N	auto	\N	\N	\N	\N	0
1072	19	2021-09-08 01:59:00.029323	0	\N	\N	auto	\N	\N	\N	\N	0
1073	43	2021-09-08 01:59:00.031789	0	\N	\N	auto	\N	\N	\N	\N	0
1074	1	2021-09-08 01:59:00.034281	0	\N	\N	auto	\N	\N	\N	\N	0
1075	12	2021-09-08 01:59:00.035715	0	\N	\N	auto	\N	\N	\N	\N	0
1076	21	2021-09-08 02:00:00.007757	0	\N	\N	auto	\N	\N	\N	\N	0
1077	2	2021-09-08 02:00:00.00955	0	\N	\N	auto	\N	\N	\N	\N	0
1078	19	2021-09-08 02:00:00.012116	0	\N	\N	auto	\N	\N	\N	\N	0
1079	43	2021-09-08 02:00:00.014189	0	\N	\N	auto	\N	\N	\N	\N	0
1080	6	2021-09-08 02:00:00.0157	0	\N	\N	auto	\N	\N	\N	\N	0
1081	1	2021-09-08 02:00:00.017814	0	\N	\N	auto	\N	\N	\N	\N	0
1082	4	2021-09-08 02:00:00.019074	0	\N	\N	auto	\N	\N	\N	\N	0
1083	3	2021-09-08 02:00:00.020564	0	\N	\N	auto	\N	\N	\N	\N	0
1084	7	2021-09-08 02:00:00.024325	0	\N	\N	auto	\N	\N	\N	\N	0
1085	5	2021-09-08 02:00:00.025625	0	\N	\N	auto	\N	\N	\N	\N	0
1086	13	2021-09-08 02:00:00.027307	0	\N	\N	auto	\N	\N	\N	\N	0
1088	12	2021-09-08 02:00:00.030117	0	\N	\N	auto	\N	\N	\N	\N	0
1089	21	2021-09-08 02:03:33.928538	0	\N	\N	auto	\N	\N	\N	\N	0
1090	2	2021-09-08 02:09:00.015213	0	\N	\N	auto	\N	\N	\N	\N	0
1091	6	2021-09-08 02:09:00.022707	0	\N	\N	auto	\N	\N	\N	\N	0
1092	4	2021-09-08 02:09:00.02639	0	\N	\N	auto	\N	\N	\N	\N	0
1093	3	2021-09-08 02:09:00.02955	0	\N	\N	auto	\N	\N	\N	\N	0
1094	7	2021-09-08 02:09:00.032808	0	\N	\N	auto	\N	\N	\N	\N	0
1095	19	2021-09-08 02:09:00.039146	0	\N	\N	auto	\N	\N	\N	\N	0
1096	43	2021-09-08 02:09:00.043539	0	\N	\N	auto	\N	\N	\N	\N	0
1097	1	2021-09-08 02:09:00.046967	0	\N	\N	auto	\N	\N	\N	\N	0
1098	21	2021-09-08 02:09:00.051898	0	\N	\N	auto	\N	\N	\N	\N	0
1099	5	2021-09-08 02:09:00.053877	0	\N	\N	auto	\N	\N	\N	\N	0
1100	13	2021-09-08 02:09:00.056548	0	\N	\N	auto	\N	\N	\N	\N	0
1102	12	2021-09-08 02:09:00.060527	0	\N	\N	auto	\N	\N	\N	\N	0
1103	2	2021-09-08 02:10:00.017853	0	\N	\N	auto	\N	\N	\N	\N	0
1104	6	2021-09-08 02:10:00.025535	0	\N	\N	auto	\N	\N	\N	\N	0
1105	4	2021-09-08 02:10:00.029386	0	\N	\N	auto	\N	\N	\N	\N	0
1106	3	2021-09-08 02:10:00.032296	0	\N	\N	auto	\N	\N	\N	\N	0
1107	7	2021-09-08 02:10:00.035599	0	\N	\N	auto	\N	\N	\N	\N	0
1108	19	2021-09-08 02:10:00.042281	0	\N	\N	auto	\N	\N	\N	\N	0
1109	43	2021-09-08 02:10:00.047111	0	\N	\N	auto	\N	\N	\N	\N	0
1110	1	2021-09-08 02:10:00.050775	0	\N	\N	auto	\N	\N	\N	\N	0
1111	5	2021-09-08 02:10:00.053951	0	\N	\N	auto	\N	\N	\N	\N	0
1112	21	2021-09-08 02:10:00.057478	0	\N	\N	auto	\N	\N	\N	\N	0
1113	13	2021-09-08 02:10:00.060354	0	\N	\N	auto	\N	\N	\N	\N	0
1115	12	2021-09-08 02:10:00.064125	0	\N	\N	auto	\N	\N	\N	\N	0
1118	19	2021-09-14 01:00:00.022898	0	\N	\N	auto	\N	\N	\N	\N	0
1119	1	2021-09-14 01:00:00.032463	0	\N	\N	auto	\N	\N	\N	\N	0
1120	21	2021-09-14 01:00:00.037544	0	\N	\N	auto	\N	\N	\N	\N	0
1121	43	2021-09-14 01:00:00.041848	0	\N	\N	auto	\N	\N	\N	\N	0
1122	19	2021-09-14 13:58:04.619364	0	\N	\N	auto	\N	\N	\N	\N	0
1123	19	2021-09-15 01:00:00.145898	0	\N	\N	auto	\N	\N	\N	\N	0
1124	1	2021-09-15 01:00:00.151486	0	\N	\N	auto	\N	\N	\N	\N	0
1125	21	2021-09-15 01:00:00.154263	0	\N	\N	auto	\N	\N	\N	\N	0
1126	43	2021-09-15 01:00:00.156584	0	\N	\N	auto	\N	\N	\N	\N	0
1127	19	2021-09-21 01:00:00.008723	0	\N	\N	auto	\N	\N	\N	\N	0
1128	1	2021-09-21 01:00:00.014011	0	\N	\N	auto	\N	\N	\N	\N	0
1129	21	2021-09-21 01:00:00.017932	0	\N	\N	auto	\N	\N	\N	\N	0
1130	43	2021-09-21 01:00:00.020359	0	\N	\N	auto	\N	\N	\N	\N	0
1132	19	2021-09-22 01:00:00.014211	0	\N	\N	auto	\N	\N	\N	\N	0
1133	1	2021-09-22 01:00:00.020768	0	\N	\N	auto	\N	\N	\N	\N	0
1134	21	2021-09-22 01:00:00.024501	0	\N	\N	auto	\N	\N	\N	\N	0
1135	43	2021-09-22 01:00:00.027332	0	\N	\N	auto	\N	\N	\N	\N	0
1136	21	2021-09-22 21:31:00.496154	0	\N	\N	auto	\N	\N	\N	\N	0
1137	18	2021-09-23 01:00:00.018965	0	\N	\N	auto	\N	\N	\N	\N	0
1138	19	2021-09-23 01:00:00.025527	0	\N	\N	auto	\N	\N	\N	\N	0
1139	1	2021-09-23 01:00:00.029523	0	\N	\N	auto	\N	\N	\N	\N	0
1140	10	2021-09-23 01:00:00.032891	0	\N	\N	auto	\N	\N	\N	\N	0
1141	45	2021-09-23 01:00:00.036353	0	\N	\N	auto	\N	\N	\N	\N	0
1142	9	2021-09-23 01:00:00.039413	0	\N	\N	auto	\N	\N	\N	\N	0
1143	46	2021-09-23 01:00:00.043371	0	\N	\N	auto	\N	\N	\N	\N	0
1144	15	2021-09-23 01:00:00.046771	0	\N	\N	auto	\N	\N	\N	\N	0
1145	21	2021-09-23 01:00:00.049953	0	\N	\N	auto	\N	\N	\N	\N	0
1146	43	2021-09-23 01:00:00.055712	0	\N	\N	auto	\N	\N	\N	\N	0
1147	22	2021-09-23 01:00:00.060855	0	\N	\N	auto	\N	\N	\N	\N	0
1148	38	2021-09-23 01:00:00.066082	0	\N	\N	auto	\N	\N	\N	\N	0
1149	21	2021-09-24 01:00:00.026534	0	\N	\N	auto	\N	\N	\N	\N	0
1150	21	2021-09-25 01:00:00.009742	0	\N	\N	auto	\N	\N	\N	\N	0
1151	21	2021-09-27 01:00:00.025793	0	\N	\N	auto	\N	\N	\N	\N	0
1152	21	2021-09-28 01:00:00.015689	0	\N	\N	auto	\N	\N	\N	\N	0
1153	21	2021-09-29 01:00:00.021474	0	\N	\N	auto	\N	\N	\N	\N	0
1154	21	2021-10-01 01:00:00.025234	0	\N	\N	auto	\N	\N	\N	\N	0
1155	21	2021-10-02 01:00:00.01045	0	\N	\N	auto	\N	\N	\N	\N	0
1156	21	2021-10-03 01:00:00.016467	0	\N	\N	auto	\N	\N	\N	\N	0
1157	21	2021-10-04 01:00:00.017331	0	\N	\N	auto	\N	\N	\N	\N	0
1158	21	2021-10-07 01:00:00.00871	0	\N	\N	auto	\N	\N	\N	\N	0
1159	21	2021-10-12 01:00:00.019902	0	\N	\N	auto	\N	\N	\N	\N	0
1160	21	2021-10-13 01:00:00.011639	0	\N	\N	auto	\N	\N	\N	\N	0
1161	21	2021-10-15 01:00:00.010641	0	\N	\N	auto	\N	\N	\N	\N	0
1162	21	2021-10-17 01:00:00.008592	0	\N	\N	auto	\N	\N	\N	\N	0
1163	21	2021-10-18 01:00:00.024941	0	\N	\N	auto	\N	\N	\N	\N	0
1164	21	2021-10-19 01:00:00.01731	0	\N	\N	auto	\N	\N	\N	\N	0
1165	21	2021-10-20 01:00:00.019234	0	\N	\N	auto	\N	\N	\N	\N	0
1166	21	2021-10-22 01:00:00.016261	0	\N	\N	auto	\N	\N	\N	\N	0
1167	22	2021-10-23 23:23:05.544992	0	\N	\N	auto	\N	\N	\N	\N	0
1168	21	2021-10-24 01:00:00.015798	0	\N	\N	auto	\N	\N	\N	\N	0
1169	22	2021-10-24 01:00:00.021449	0	\N	\N	auto	\N	\N	\N	\N	0
1170	21	2023-03-16 01:00:00.03084	0	\N	\N	auto	\N	\N	\N	\N	0
1171	22	2023-03-16 01:00:00.043118	0	\N	\N	auto	\N	\N	\N	\N	0
1172	21	2023-03-17 01:00:00.032779	0	\N	\N	auto	\N	\N	\N	\N	0
1173	22	2023-03-17 01:00:00.038853	0	\N	\N	auto	\N	\N	\N	\N	0
1174	21	2023-03-18 01:00:00.059639	0	\N	\N	auto	\N	\N	\N	\N	0
1175	22	2023-03-18 01:00:00.069881	0	\N	\N	auto	\N	\N	\N	\N	0
1176	21	2023-03-19 01:00:00.029665	0	\N	\N	auto	\N	\N	\N	\N	0
1177	22	2023-03-19 01:00:00.035994	0	\N	\N	auto	\N	\N	\N	\N	0
1178	21	2023-03-20 01:00:00.031225	0	\N	\N	auto	\N	\N	\N	\N	0
1179	22	2023-03-20 01:00:00.037602	0	\N	\N	auto	\N	\N	\N	\N	0
1180	21	2023-03-21 01:00:00.033113	0	\N	\N	auto	\N	\N	\N	\N	0
1181	22	2023-03-21 01:00:00.045635	0	\N	\N	auto	\N	\N	\N	\N	0
1182	21	2023-03-22 01:00:00.035903	0	\N	\N	auto	\N	\N	\N	\N	0
1183	22	2023-03-22 01:00:00.042807	0	\N	\N	auto	\N	\N	\N	\N	0
1184	21	2023-03-23 01:00:00.03133	0	\N	\N	auto	\N	\N	\N	\N	0
1185	22	2023-03-23 01:00:00.042929	0	\N	\N	auto	\N	\N	\N	\N	0
1186	21	2023-03-28 01:00:00.03197	0	\N	\N	auto	\N	\N	\N	\N	0
1187	22	2023-03-28 01:00:00.042635	0	\N	\N	auto	\N	\N	\N	\N	0
1188	21	2023-03-29 01:00:00.04833	0	\N	\N	auto	\N	\N	\N	\N	0
1189	22	2023-03-29 01:00:00.060192	0	\N	\N	auto	\N	\N	\N	\N	0
1190	21	2023-03-30 01:00:00.037923	0	\N	\N	auto	\N	\N	\N	\N	0
1191	22	2023-03-30 01:00:00.053982	0	\N	\N	auto	\N	\N	\N	\N	0
1192	21	2023-03-31 01:00:00.061879	0	\N	\N	auto	\N	\N	\N	\N	0
1193	22	2023-03-31 01:00:00.075646	0	\N	\N	auto	\N	\N	\N	\N	0
1194	51	2023-03-31 01:00:00.082142	0	\N	\N	auto	\N	\N	\N	\N	0
1195	21	2023-04-01 01:00:00.041822	0	\N	\N	auto	\N	\N	\N	\N	0
1196	22	2023-04-01 01:00:00.055928	0	\N	\N	auto	\N	\N	\N	\N	0
1197	21	2023-04-02 01:00:00.036302	0	\N	\N	auto	\N	\N	\N	\N	0
1198	22	2023-04-02 01:00:00.049698	0	\N	\N	auto	\N	\N	\N	\N	0
1199	21	2023-04-03 01:00:00.042479	0	\N	\N	auto	\N	\N	\N	\N	0
1200	22	2023-04-03 01:00:00.056334	0	\N	\N	auto	\N	\N	\N	\N	0
1201	21	2023-04-04 01:00:00.041702	0	\N	\N	auto	\N	\N	\N	\N	0
1202	22	2023-04-04 01:00:00.054403	0	\N	\N	auto	\N	\N	\N	\N	0
1203	21	2023-04-05 01:00:00.044561	0	\N	\N	auto	\N	\N	\N	\N	0
1204	22	2023-04-05 01:00:00.054484	0	\N	\N	auto	\N	\N	\N	\N	0
1205	22	2023-04-05 14:32:52.824103	0	\N	\N	auto	\N	\N	\N	\N	0
1206	22	2023-04-05 14:33:05.843784	0	\N	\N	auto	\N	\N	\N	\N	0
1207	22	2023-04-05 14:33:12.924342	0	\N	\N	auto	\N	\N	\N	\N	0
1208	21	2023-04-06 01:00:00.03707	0	\N	\N	auto	\N	\N	\N	\N	0
1209	22	2023-04-06 01:00:00.052163	0	\N	\N	auto	\N	\N	\N	\N	0
1210	21	2023-04-07 01:00:00.048294	0	\N	\N	auto	\N	\N	\N	\N	0
1211	22	2023-04-07 01:00:00.066999	0	\N	\N	auto	\N	\N	\N	\N	0
1212	21	2023-04-08 01:00:00.053412	0	\N	\N	auto	\N	\N	\N	\N	0
1213	22	2023-04-08 01:00:00.071927	0	\N	\N	auto	\N	\N	\N	\N	0
1214	21	2023-04-09 01:00:00.064306	0	\N	\N	auto	\N	\N	\N	\N	0
1215	22	2023-04-09 01:00:00.085652	0	\N	\N	auto	\N	\N	\N	\N	0
1216	21	2023-04-10 01:00:00.065982	0	\N	\N	auto	\N	\N	\N	\N	0
1217	22	2023-04-10 01:00:00.090305	0	\N	\N	auto	\N	\N	\N	\N	0
1218	21	2023-04-11 01:00:00.080418	0	\N	\N	auto	\N	\N	\N	\N	0
1219	22	2023-04-11 01:00:00.098681	0	\N	\N	auto	\N	\N	\N	\N	0
1220	51	2023-04-11 16:42:50.735604	0	\N	\N	auto	\N	\N	\N	\N	0
1221	51	2023-04-11 16:50:27.541058	0	\N	\N	auto	\N	\N	\N	\N	0
1222	51	2023-04-11 16:51:10.28068	0	\N	\N	auto	\N	\N	\N	\N	0
1223	21	2023-04-12 01:00:00.055577	0	\N	\N	auto	\N	\N	\N	\N	0
1224	22	2023-04-12 01:00:00.075854	0	\N	\N	auto	\N	\N	\N	\N	0
1225	51	2023-04-12 01:00:00.091722	0	\N	\N	auto	\N	\N	\N	\N	0
1226	51	2023-04-12 08:00:41.644461	0	\N	\N	auto	\N	\N	\N	\N	0
1227	51	2023-04-12 08:01:40.918098	0	\N	\N	auto	\N	\N	\N	\N	0
1228	51	2023-04-12 08:21:01.20227	0	\N	\N	auto	\N	\N	\N	\N	0
1229	51	2023-04-12 08:34:38.246817	0	\N	\N	auto	\N	\N	\N	\N	0
1230	21	2023-04-29 01:00:00.085427	0	\N	\N	auto	\N	\N	\N	\N	0
1231	9	2023-04-29 01:00:00.127254	0	\N	\N	auto	\N	\N	\N	\N	0
1232	22	2023-04-29 01:00:00.147737	0	\N	\N	auto	\N	\N	\N	\N	0
1233	51	2023-04-29 01:00:00.171107	0	\N	\N	auto	\N	\N	\N	\N	0
1234	21	2023-04-30 01:00:00.084483	0	\N	\N	auto	\N	\N	\N	\N	0
1235	9	2023-04-30 01:00:00.11521	0	\N	\N	auto	\N	\N	\N	\N	0
1236	22	2023-04-30 01:00:00.139186	0	\N	\N	auto	\N	\N	\N	\N	0
1237	51	2023-04-30 01:00:00.159031	0	\N	\N	auto	\N	\N	\N	\N	0
1238	21	2023-05-02 01:00:00.068553	0	\N	\N	auto	\N	\N	\N	\N	0
1239	9	2023-05-02 01:00:00.101904	0	\N	\N	auto	\N	\N	\N	\N	0
1240	22	2023-05-02 01:00:00.13069	0	\N	\N	auto	\N	\N	\N	\N	0
1241	51	2023-05-02 01:00:00.151808	0	\N	\N	auto	\N	\N	\N	\N	0
1242	21	2023-05-04 01:00:00.065604	0	\N	\N	auto	\N	\N	\N	\N	0
1243	9	2023-05-04 01:00:00.094319	0	\N	\N	auto	\N	\N	\N	\N	0
1244	22	2023-05-04 01:00:00.118638	0	\N	\N	auto	\N	\N	\N	\N	0
1245	51	2023-05-04 01:00:00.140363	0	\N	\N	auto	\N	\N	\N	\N	0
1246	21	2023-05-05 01:00:00.065846	0	\N	\N	auto	\N	\N	\N	\N	0
1247	9	2023-05-05 01:00:00.094914	0	\N	\N	auto	\N	\N	\N	\N	0
1248	22	2023-05-05 01:00:00.113748	0	\N	\N	auto	\N	\N	\N	\N	0
1249	51	2023-05-05 01:00:00.133377	0	\N	\N	auto	\N	\N	\N	\N	0
1250	21	2023-05-11 01:00:00.041307	0	\N	\N	auto	\N	\N	\N	\N	0
1251	9	2023-05-11 01:00:00.059361	0	\N	\N	auto	\N	\N	\N	\N	0
1252	22	2023-05-11 01:00:00.064851	0	\N	\N	auto	\N	\N	\N	\N	0
1253	51	2023-05-11 01:00:00.070767	0	\N	\N	auto	\N	\N	\N	\N	0
1254	21	2023-05-14 01:00:00.049449	0	\N	\N	auto	\N	\N	\N	\N	0
1255	9	2023-05-14 01:00:00.064828	0	\N	\N	auto	\N	\N	\N	\N	0
1256	22	2023-05-14 01:00:00.071761	0	\N	\N	auto	\N	\N	\N	\N	0
1257	51	2023-05-14 01:00:00.078774	0	\N	\N	auto	\N	\N	\N	\N	0
1258	21	2023-05-15 01:00:00.039205	0	\N	\N	auto	\N	\N	\N	\N	0
1259	9	2023-05-15 01:00:00.046809	0	\N	\N	auto	\N	\N	\N	\N	0
1260	22	2023-05-15 01:00:00.05209	0	\N	\N	auto	\N	\N	\N	\N	0
1261	51	2023-05-15 01:00:00.057154	0	\N	\N	auto	\N	\N	\N	\N	0
1262	21	2023-05-18 01:00:00.039982	0	\N	\N	auto	\N	\N	\N	\N	0
1263	9	2023-05-18 01:00:00.054363	0	\N	\N	auto	\N	\N	\N	\N	0
1264	22	2023-05-18 01:00:00.059977	0	\N	\N	auto	\N	\N	\N	\N	0
1265	51	2023-05-18 01:00:00.066716	0	\N	\N	auto	\N	\N	\N	\N	0
1266	21	2023-05-19 01:00:00.036928	0	\N	\N	auto	\N	\N	\N	\N	0
1267	9	2023-05-19 01:00:00.052943	0	\N	\N	auto	\N	\N	\N	\N	0
1268	22	2023-05-19 01:00:00.058247	0	\N	\N	auto	\N	\N	\N	\N	0
1269	51	2023-05-19 01:00:00.064418	0	\N	\N	auto	\N	\N	\N	\N	0
1270	21	2023-05-20 01:00:00.055178	0	\N	\N	auto	\N	\N	\N	\N	0
1271	9	2023-05-20 01:00:00.078528	0	\N	\N	auto	\N	\N	\N	\N	0
1272	22	2023-05-20 01:00:00.092677	0	\N	\N	auto	\N	\N	\N	\N	0
1273	51	2023-05-20 01:00:00.108069	0	\N	\N	auto	\N	\N	\N	\N	0
1274	21	2023-05-21 01:00:00.058837	0	\N	\N	auto	\N	\N	\N	\N	0
1275	9	2023-05-21 01:00:00.085078	0	\N	\N	auto	\N	\N	\N	\N	0
1276	22	2023-05-21 01:00:00.099305	0	\N	\N	auto	\N	\N	\N	\N	0
1277	51	2023-05-21 01:00:00.112806	0	\N	\N	auto	\N	\N	\N	\N	0
1278	21	2023-05-22 01:00:00.052834	0	\N	\N	auto	\N	\N	\N	\N	0
1279	9	2023-05-22 01:00:00.076617	0	\N	\N	auto	\N	\N	\N	\N	0
1280	22	2023-05-22 01:00:00.089525	0	\N	\N	auto	\N	\N	\N	\N	0
1281	51	2023-05-22 01:00:00.102515	0	\N	\N	auto	\N	\N	\N	\N	0
1282	21	2023-05-23 01:00:00.065968	0	\N	\N	auto	\N	\N	\N	\N	0
1283	9	2023-05-23 01:00:00.097709	0	\N	\N	auto	\N	\N	\N	\N	0
1284	22	2023-05-23 01:00:00.118136	0	\N	\N	auto	\N	\N	\N	\N	0
1285	51	2023-05-23 01:00:00.139965	0	\N	\N	auto	\N	\N	\N	\N	0
1286	21	2023-05-24 01:00:00.061296	0	\N	\N	auto	\N	\N	\N	\N	0
1287	9	2023-05-24 01:00:00.092713	0	\N	\N	auto	\N	\N	\N	\N	0
1288	22	2023-05-24 01:00:00.113054	0	\N	\N	auto	\N	\N	\N	\N	0
1289	51	2023-05-24 01:00:00.133038	0	\N	\N	auto	\N	\N	\N	\N	0
1290	21	2023-05-25 01:00:00.06666	0	\N	\N	auto	\N	\N	\N	\N	0
1291	9	2023-05-25 01:00:00.099376	0	\N	\N	auto	\N	\N	\N	\N	0
1292	22	2023-05-25 01:00:00.118159	0	\N	\N	auto	\N	\N	\N	\N	0
1293	51	2023-05-25 01:00:00.138374	0	\N	\N	auto	\N	\N	\N	\N	0
1294	21	2023-05-26 01:00:00.071612	0	\N	\N	auto	\N	\N	\N	\N	0
1295	9	2023-05-26 01:00:00.103036	0	\N	\N	auto	\N	\N	\N	\N	0
1296	22	2023-05-26 01:00:00.126751	0	\N	\N	auto	\N	\N	\N	\N	0
1297	51	2023-05-26 01:00:00.146243	0	\N	\N	auto	\N	\N	\N	\N	0
1298	21	2023-06-06 01:00:00.05669	0	\N	\N	auto	\N	\N	\N	\N	0
1299	21	2023-06-06 01:00:00.059823	0	\N	\N	auto	\N	\N	\N	\N	0
1300	9	2023-06-06 01:00:00.071924	0	\N	\N	auto	\N	\N	\N	\N	0
1301	21	2023-06-06 01:00:00.068492	0	\N	\N	auto	\N	\N	\N	\N	0
1302	21	2023-06-06 01:00:00.065997	0	\N	\N	auto	\N	\N	\N	\N	0
1303	9	2023-06-06 01:00:00.075915	0	\N	\N	auto	\N	\N	\N	\N	0
1304	22	2023-06-06 01:00:00.081957	0	\N	\N	auto	\N	\N	\N	\N	0
1305	9	2023-06-06 01:00:00.083604	0	\N	\N	auto	\N	\N	\N	\N	0
1306	9	2023-06-06 01:00:00.083945	0	\N	\N	auto	\N	\N	\N	\N	0
1307	51	2023-06-06 01:00:00.090187	0	\N	\N	auto	\N	\N	\N	\N	0
1308	22	2023-06-06 01:00:00.089779	0	\N	\N	auto	\N	\N	\N	\N	0
1309	22	2023-06-06 01:00:00.090971	0	\N	\N	auto	\N	\N	\N	\N	0
1310	22	2023-06-06 01:00:00.091431	0	\N	\N	auto	\N	\N	\N	\N	0
1311	51	2023-06-06 01:00:00.098951	0	\N	\N	auto	\N	\N	\N	\N	0
1312	51	2023-06-06 01:00:00.100131	0	\N	\N	auto	\N	\N	\N	\N	0
1313	51	2023-06-06 01:00:00.100326	0	\N	\N	auto	\N	\N	\N	\N	0
1314	21	2023-06-07 01:00:00.0559	0	\N	\N	auto	\N	\N	\N	\N	0
1315	21	2023-06-07 01:00:00.064485	0	\N	\N	auto	\N	\N	\N	\N	0
1316	9	2023-06-07 01:00:00.073301	0	\N	\N	auto	\N	\N	\N	\N	0
1317	21	2023-06-07 01:00:00.068745	0	\N	\N	auto	\N	\N	\N	\N	0
1318	9	2023-06-07 01:00:00.077879	0	\N	\N	auto	\N	\N	\N	\N	0
1319	21	2023-06-07 01:00:00.07312	0	\N	\N	auto	\N	\N	\N	\N	0
1320	22	2023-06-07 01:00:00.082193	0	\N	\N	auto	\N	\N	\N	\N	0
1321	22	2023-06-07 01:00:00.086075	0	\N	\N	auto	\N	\N	\N	\N	0
1322	9	2023-06-07 01:00:00.086514	0	\N	\N	auto	\N	\N	\N	\N	0
1323	9	2023-06-07 01:00:00.087288	0	\N	\N	auto	\N	\N	\N	\N	0
1324	51	2023-06-07 01:00:00.091966	0	\N	\N	auto	\N	\N	\N	\N	0
1325	51	2023-06-07 01:00:00.095048	0	\N	\N	auto	\N	\N	\N	\N	0
1326	22	2023-06-07 01:00:00.09476	0	\N	\N	auto	\N	\N	\N	\N	0
1327	22	2023-06-07 01:00:00.095867	0	\N	\N	auto	\N	\N	\N	\N	0
1328	51	2023-06-07 01:00:00.10366	0	\N	\N	auto	\N	\N	\N	\N	0
1329	51	2023-06-07 01:00:00.104577	0	\N	\N	auto	\N	\N	\N	\N	0
1330	21	2023-06-08 01:00:00.060198	0	\N	\N	auto	\N	\N	\N	\N	0
1331	21	2023-06-08 01:00:00.056437	0	\N	\N	auto	\N	\N	\N	\N	0
1332	21	2023-06-08 01:00:00.068279	0	\N	\N	auto	\N	\N	\N	\N	0
1333	9	2023-06-08 01:00:00.079827	0	\N	\N	auto	\N	\N	\N	\N	0
1334	9	2023-06-08 01:00:00.081013	0	\N	\N	auto	\N	\N	\N	\N	0
1335	9	2023-06-08 01:00:00.085139	0	\N	\N	auto	\N	\N	\N	\N	0
1336	21	2023-06-08 01:00:00.082702	0	\N	\N	auto	\N	\N	\N	\N	0
1337	22	2023-06-08 01:00:00.093826	0	\N	\N	auto	\N	\N	\N	\N	0
1338	22	2023-06-08 01:00:00.095045	0	\N	\N	auto	\N	\N	\N	\N	0
1339	22	2023-06-08 01:00:00.09843	0	\N	\N	auto	\N	\N	\N	\N	0
1340	9	2023-06-08 01:00:00.1004	0	\N	\N	auto	\N	\N	\N	\N	0
1341	51	2023-06-08 01:00:00.10472	0	\N	\N	auto	\N	\N	\N	\N	0
1342	22	2023-06-08 01:00:00.107417	0	\N	\N	auto	\N	\N	\N	\N	0
1343	51	2023-06-08 01:00:00.109546	0	\N	\N	auto	\N	\N	\N	\N	0
1344	51	2023-06-08 01:00:00.110872	0	\N	\N	auto	\N	\N	\N	\N	0
1345	51	2023-06-08 01:00:00.114928	0	\N	\N	auto	\N	\N	\N	\N	0
1346	21	2023-06-09 01:00:00.048641	0	\N	\N	auto	\N	\N	\N	\N	0
1347	21	2023-06-09 01:00:00.055722	0	\N	\N	auto	\N	\N	\N	\N	0
1348	21	2023-06-09 01:00:00.059959	0	\N	\N	auto	\N	\N	\N	\N	0
1349	9	2023-06-09 01:00:00.065425	0	\N	\N	auto	\N	\N	\N	\N	0
1350	21	2023-06-09 01:00:00.060304	0	\N	\N	auto	\N	\N	\N	\N	0
1351	9	2023-06-09 01:00:00.069112	0	\N	\N	auto	\N	\N	\N	\N	0
1352	22	2023-06-09 01:00:00.075882	0	\N	\N	auto	\N	\N	\N	\N	0
1353	9	2023-06-09 01:00:00.076107	0	\N	\N	auto	\N	\N	\N	\N	0
1354	22	2023-06-09 01:00:00.077327	0	\N	\N	auto	\N	\N	\N	\N	0
1355	9	2023-06-09 01:00:00.08004	0	\N	\N	auto	\N	\N	\N	\N	0
1356	22	2023-06-09 01:00:00.083844	0	\N	\N	auto	\N	\N	\N	\N	0
1357	51	2023-06-09 01:00:00.084704	0	\N	\N	auto	\N	\N	\N	\N	0
1358	51	2023-06-09 01:00:00.085193	0	\N	\N	auto	\N	\N	\N	\N	0
1359	22	2023-06-09 01:00:00.089525	0	\N	\N	auto	\N	\N	\N	\N	0
1360	51	2023-06-09 01:00:00.092998	0	\N	\N	auto	\N	\N	\N	\N	0
1361	51	2023-06-09 01:00:00.098035	0	\N	\N	auto	\N	\N	\N	\N	0
1362	21	2023-06-10 01:00:00.060495	0	\N	\N	auto	\N	\N	\N	\N	0
1363	21	2023-06-10 01:00:00.070768	0	\N	\N	auto	\N	\N	\N	\N	0
1364	21	2023-06-10 01:00:00.066564	0	\N	\N	auto	\N	\N	\N	\N	0
1365	9	2023-06-10 01:00:00.087778	0	\N	\N	auto	\N	\N	\N	\N	0
1366	21	2023-06-10 01:00:00.080331	0	\N	\N	auto	\N	\N	\N	\N	0
1367	9	2023-06-10 01:00:00.091924	0	\N	\N	auto	\N	\N	\N	\N	0
1368	22	2023-06-10 01:00:00.098221	0	\N	\N	auto	\N	\N	\N	\N	0
1369	9	2023-06-10 01:00:00.099314	0	\N	\N	auto	\N	\N	\N	\N	0
1370	9	2023-06-10 01:00:00.102226	0	\N	\N	auto	\N	\N	\N	\N	0
1371	22	2023-06-10 01:00:00.103402	0	\N	\N	auto	\N	\N	\N	\N	0
1372	22	2023-06-10 01:00:00.106846	0	\N	\N	auto	\N	\N	\N	\N	0
1373	51	2023-06-10 01:00:00.108508	0	\N	\N	auto	\N	\N	\N	\N	0
1374	22	2023-06-10 01:00:00.112485	0	\N	\N	auto	\N	\N	\N	\N	0
1375	51	2023-06-10 01:00:00.113962	0	\N	\N	auto	\N	\N	\N	\N	0
1376	51	2023-06-10 01:00:00.117803	0	\N	\N	auto	\N	\N	\N	\N	0
1377	51	2023-06-10 01:00:00.122339	0	\N	\N	auto	\N	\N	\N	\N	0
1378	21	2023-06-11 01:00:00.046242	0	\N	\N	auto	\N	\N	\N	\N	0
1379	21	2023-06-11 01:00:00.055595	0	\N	\N	auto	\N	\N	\N	\N	0
1380	21	2023-06-11 01:00:00.05863	0	\N	\N	auto	\N	\N	\N	\N	0
1381	21	2023-06-11 01:00:00.062604	0	\N	\N	auto	\N	\N	\N	\N	0
1382	9	2023-06-11 01:00:00.069022	0	\N	\N	auto	\N	\N	\N	\N	0
1383	9	2023-06-11 01:00:00.07357	0	\N	\N	auto	\N	\N	\N	\N	0
1384	9	2023-06-11 01:00:00.074324	0	\N	\N	auto	\N	\N	\N	\N	0
1385	9	2023-06-11 01:00:00.077006	0	\N	\N	auto	\N	\N	\N	\N	0
1386	22	2023-06-11 01:00:00.085155	0	\N	\N	auto	\N	\N	\N	\N	0
1387	22	2023-06-11 01:00:00.086318	0	\N	\N	auto	\N	\N	\N	\N	0
1388	22	2023-06-11 01:00:00.089931	0	\N	\N	auto	\N	\N	\N	\N	0
1389	51	2023-06-11 01:00:00.094396	0	\N	\N	auto	\N	\N	\N	\N	0
1390	51	2023-06-11 01:00:00.096204	0	\N	\N	auto	\N	\N	\N	\N	0
1391	22	2023-06-11 01:00:00.099879	0	\N	\N	auto	\N	\N	\N	\N	0
1392	51	2023-06-11 01:00:00.099724	0	\N	\N	auto	\N	\N	\N	\N	0
1393	51	2023-06-11 01:00:00.110768	0	\N	\N	auto	\N	\N	\N	\N	0
1394	21	2023-06-12 01:00:00.056345	0	\N	\N	auto	\N	\N	\N	\N	0
1395	21	2023-06-12 01:00:00.060847	0	\N	\N	auto	\N	\N	\N	\N	0
1396	9	2023-06-12 01:00:00.070597	0	\N	\N	auto	\N	\N	\N	\N	0
1397	21	2023-06-12 01:00:00.068711	0	\N	\N	auto	\N	\N	\N	\N	0
1398	9	2023-06-12 01:00:00.075898	0	\N	\N	auto	\N	\N	\N	\N	0
1399	21	2023-06-12 01:00:00.072825	0	\N	\N	auto	\N	\N	\N	\N	0
1400	22	2023-06-12 01:00:00.079828	0	\N	\N	auto	\N	\N	\N	\N	0
1401	9	2023-06-12 01:00:00.080996	0	\N	\N	auto	\N	\N	\N	\N	0
1402	22	2023-06-12 01:00:00.082774	0	\N	\N	auto	\N	\N	\N	\N	0
1403	9	2023-06-12 01:00:00.08451	0	\N	\N	auto	\N	\N	\N	\N	0
1404	22	2023-06-12 01:00:00.088045	0	\N	\N	auto	\N	\N	\N	\N	0
1405	51	2023-06-12 01:00:00.089787	0	\N	\N	auto	\N	\N	\N	\N	0
1406	51	2023-06-12 01:00:00.093602	0	\N	\N	auto	\N	\N	\N	\N	0
1407	22	2023-06-12 01:00:00.096189	0	\N	\N	auto	\N	\N	\N	\N	0
1408	51	2023-06-12 01:00:00.099745	0	\N	\N	auto	\N	\N	\N	\N	0
1409	51	2023-06-12 01:00:00.102936	0	\N	\N	auto	\N	\N	\N	\N	0
1410	21	2023-06-13 01:00:00.061215	0	\N	\N	auto	\N	\N	\N	\N	0
1411	21	2023-06-13 01:00:00.066438	0	\N	\N	auto	\N	\N	\N	\N	0
1412	21	2023-06-13 01:00:00.070791	0	\N	\N	auto	\N	\N	\N	\N	0
1413	9	2023-06-13 01:00:00.077827	0	\N	\N	auto	\N	\N	\N	\N	0
1414	9	2023-06-13 01:00:00.084287	0	\N	\N	auto	\N	\N	\N	\N	0
1415	22	2023-06-13 01:00:00.086526	0	\N	\N	auto	\N	\N	\N	\N	0
1416	9	2023-06-13 01:00:00.088103	0	\N	\N	auto	\N	\N	\N	\N	0
1417	22	2023-06-13 01:00:00.093764	0	\N	\N	auto	\N	\N	\N	\N	0
1418	51	2023-06-13 01:00:00.095583	0	\N	\N	auto	\N	\N	\N	\N	0
1419	22	2023-06-13 01:00:00.101756	0	\N	\N	auto	\N	\N	\N	\N	0
1420	51	2023-06-13 01:00:00.106014	0	\N	\N	auto	\N	\N	\N	\N	0
1421	51	2023-06-13 01:00:00.113676	0	\N	\N	auto	\N	\N	\N	\N	0
1422	21	2023-06-13 01:00:00.118444	0	\N	\N	auto	\N	\N	\N	\N	0
1423	9	2023-06-13 01:00:00.143584	0	\N	\N	auto	\N	\N	\N	\N	0
1424	22	2023-06-13 01:00:00.157003	0	\N	\N	auto	\N	\N	\N	\N	0
1425	51	2023-06-13 01:00:00.163934	0	\N	\N	auto	\N	\N	\N	\N	0
1426	21	2023-06-14 01:00:00.074077	0	\N	\N	auto	\N	\N	\N	\N	0
1427	21	2023-06-14 01:00:00.078801	0	\N	\N	auto	\N	\N	\N	\N	0
1428	21	2023-06-14 01:00:00.084711	0	\N	\N	auto	\N	\N	\N	\N	0
1429	21	2023-06-14 01:00:00.08825	0	\N	\N	auto	\N	\N	\N	\N	0
1430	9	2023-06-14 01:00:00.09331	0	\N	\N	auto	\N	\N	\N	\N	0
1431	9	2023-06-14 01:00:00.096795	0	\N	\N	auto	\N	\N	\N	\N	0
1432	9	2023-06-14 01:00:00.102678	0	\N	\N	auto	\N	\N	\N	\N	0
1433	22	2023-06-14 01:00:00.103302	0	\N	\N	auto	\N	\N	\N	\N	0
1434	9	2023-06-14 01:00:00.105003	0	\N	\N	auto	\N	\N	\N	\N	0
1435	22	2023-06-14 01:00:00.112025	0	\N	\N	auto	\N	\N	\N	\N	0
1436	51	2023-06-14 01:00:00.11415	0	\N	\N	auto	\N	\N	\N	\N	0
1437	22	2023-06-14 01:00:00.114319	0	\N	\N	auto	\N	\N	\N	\N	0
1438	22	2023-06-14 01:00:00.118121	0	\N	\N	auto	\N	\N	\N	\N	0
1439	51	2023-06-14 01:00:00.121323	0	\N	\N	auto	\N	\N	\N	\N	0
1440	51	2023-06-14 01:00:00.124284	0	\N	\N	auto	\N	\N	\N	\N	0
1441	51	2023-06-14 01:00:00.125807	0	\N	\N	auto	\N	\N	\N	\N	0
1442	21	2023-06-15 01:00:00.049362	0	\N	\N	auto	\N	\N	\N	\N	0
1443	21	2023-06-15 01:00:00.053995	0	\N	\N	auto	\N	\N	\N	\N	0
1444	21	2023-06-15 01:00:00.056812	0	\N	\N	auto	\N	\N	\N	\N	0
1445	21	2023-06-15 01:00:00.059622	0	\N	\N	auto	\N	\N	\N	\N	0
1446	9	2023-06-15 01:00:00.072477	0	\N	\N	auto	\N	\N	\N	\N	0
1447	9	2023-06-15 01:00:00.072173	0	\N	\N	auto	\N	\N	\N	\N	0
1448	9	2023-06-15 01:00:00.07266	0	\N	\N	auto	\N	\N	\N	\N	0
1449	9	2023-06-15 01:00:00.071519	0	\N	\N	auto	\N	\N	\N	\N	0
1450	22	2023-06-15 01:00:00.081695	0	\N	\N	auto	\N	\N	\N	\N	0
1451	22	2023-06-15 01:00:00.08415	0	\N	\N	auto	\N	\N	\N	\N	0
1452	22	2023-06-15 01:00:00.084098	0	\N	\N	auto	\N	\N	\N	\N	0
1453	22	2023-06-15 01:00:00.088776	0	\N	\N	auto	\N	\N	\N	\N	0
1454	51	2023-06-15 01:00:00.091957	0	\N	\N	auto	\N	\N	\N	\N	0
1455	51	2023-06-15 01:00:00.094274	0	\N	\N	auto	\N	\N	\N	\N	0
1456	51	2023-06-15 01:00:00.094918	0	\N	\N	auto	\N	\N	\N	\N	0
1457	51	2023-06-15 01:00:00.097878	0	\N	\N	auto	\N	\N	\N	\N	0
1458	21	2023-06-16 01:00:00.039815	0	\N	\N	auto	\N	\N	\N	\N	0
1459	9	2023-06-16 01:00:00.055257	0	\N	\N	auto	\N	\N	\N	\N	0
1460	21	2023-06-16 01:00:00.050028	0	\N	\N	auto	\N	\N	\N	\N	0
1461	21	2023-06-16 01:00:00.056639	0	\N	\N	auto	\N	\N	\N	\N	0
1462	9	2023-06-16 01:00:00.065994	0	\N	\N	auto	\N	\N	\N	\N	0
1463	51	2023-06-16 01:00:00.067662	0	\N	\N	auto	\N	\N	\N	\N	0
1464	21	2023-06-16 01:00:00.064766	0	\N	\N	auto	\N	\N	\N	\N	0
1465	9	2023-06-16 01:00:00.07109	0	\N	\N	auto	\N	\N	\N	\N	0
1466	51	2023-06-16 01:00:00.076212	0	\N	\N	auto	\N	\N	\N	\N	0
1467	9	2023-06-16 01:00:00.076974	0	\N	\N	auto	\N	\N	\N	\N	0
1468	51	2023-06-16 01:00:00.079517	0	\N	\N	auto	\N	\N	\N	\N	0
1469	51	2023-06-16 01:00:00.083847	0	\N	\N	auto	\N	\N	\N	\N	0
1470	54	2023-06-16 01:00:00.088868	0	\N	\N	auto	\N	\N	\N	\N	0
1471	54	2023-06-16 01:00:00.094173	0	\N	\N	auto	\N	\N	\N	\N	0
1472	54	2023-06-16 01:00:00.095702	0	\N	\N	auto	\N	\N	\N	\N	0
1473	54	2023-06-16 01:00:00.104097	0	\N	\N	auto	\N	\N	\N	\N	0
1474	21	2023-06-17 01:00:00.058811	0	\N	\N	auto	\N	\N	\N	\N	0
1475	21	2023-06-17 01:00:00.063364	0	\N	\N	auto	\N	\N	\N	\N	0
1476	21	2023-06-17 01:00:00.068567	0	\N	\N	auto	\N	\N	\N	\N	0
1477	21	2023-06-17 01:00:00.077973	0	\N	\N	auto	\N	\N	\N	\N	0
1478	9	2023-06-17 01:00:00.089026	0	\N	\N	auto	\N	\N	\N	\N	0
1479	9	2023-06-17 01:00:00.090344	0	\N	\N	auto	\N	\N	\N	\N	0
1480	9	2023-06-17 01:00:00.093487	0	\N	\N	auto	\N	\N	\N	\N	0
1481	9	2023-06-17 01:00:00.103286	0	\N	\N	auto	\N	\N	\N	\N	0
1482	51	2023-06-17 01:00:00.103065	0	\N	\N	auto	\N	\N	\N	\N	0
1483	51	2023-06-17 01:00:00.109271	0	\N	\N	auto	\N	\N	\N	\N	0
1484	51	2023-06-17 01:00:00.109379	0	\N	\N	auto	\N	\N	\N	\N	0
1485	51	2023-06-17 01:00:00.11646	0	\N	\N	auto	\N	\N	\N	\N	0
1486	54	2023-06-17 01:00:00.122487	0	\N	\N	auto	\N	\N	\N	\N	0
1487	54	2023-06-17 01:00:00.121307	0	\N	\N	auto	\N	\N	\N	\N	0
1488	54	2023-06-17 01:00:00.13031	0	\N	\N	auto	\N	\N	\N	\N	0
1489	54	2023-06-17 01:00:00.134137	0	\N	\N	auto	\N	\N	\N	\N	0
1490	21	2023-06-18 01:00:00.054399	0	\N	\N	auto	\N	\N	\N	\N	0
1491	21	2023-06-18 01:00:00.059711	0	\N	\N	auto	\N	\N	\N	\N	0
1492	21	2023-06-18 01:00:00.062407	0	\N	\N	auto	\N	\N	\N	\N	0
1493	21	2023-06-18 01:00:00.068522	0	\N	\N	auto	\N	\N	\N	\N	0
1494	9	2023-06-18 01:00:00.07432	0	\N	\N	auto	\N	\N	\N	\N	0
1495	9	2023-06-18 01:00:00.078766	0	\N	\N	auto	\N	\N	\N	\N	0
1496	9	2023-06-18 01:00:00.07919	0	\N	\N	auto	\N	\N	\N	\N	0
1497	9	2023-06-18 01:00:00.082142	0	\N	\N	auto	\N	\N	\N	\N	0
1498	51	2023-06-18 01:00:00.085862	0	\N	\N	auto	\N	\N	\N	\N	0
1499	51	2023-06-18 01:00:00.089775	0	\N	\N	auto	\N	\N	\N	\N	0
1500	51	2023-06-18 01:00:00.093232	0	\N	\N	auto	\N	\N	\N	\N	0
1501	54	2023-06-18 01:00:00.095666	0	\N	\N	auto	\N	\N	\N	\N	0
1502	51	2023-06-18 01:00:00.097083	0	\N	\N	auto	\N	\N	\N	\N	0
1505	54	2023-06-18 01:00:00.110862	0	\N	\N	auto	\N	\N	\N	\N	0
1503	54	2023-06-18 01:00:00.098943	0	\N	\N	auto	\N	\N	\N	\N	0
1504	54	2023-06-18 01:00:00.102347	0	\N	\N	auto	\N	\N	\N	\N	0
1506	21	2023-06-19 01:00:00.0466	0	\N	\N	auto	\N	\N	\N	\N	0
1507	21	2023-06-19 01:00:00.054968	0	\N	\N	auto	\N	\N	\N	\N	0
1508	21	2023-06-19 01:00:00.062144	0	\N	\N	auto	\N	\N	\N	\N	0
1509	9	2023-06-19 01:00:00.068476	0	\N	\N	auto	\N	\N	\N	\N	0
1510	51	2023-06-19 01:00:00.076189	0	\N	\N	auto	\N	\N	\N	\N	0
1511	9	2023-06-19 01:00:00.076648	0	\N	\N	auto	\N	\N	\N	\N	0
1512	9	2023-06-19 01:00:00.075783	0	\N	\N	auto	\N	\N	\N	\N	0
1513	21	2023-06-19 01:00:00.073945	0	\N	\N	auto	\N	\N	\N	\N	0
1514	51	2023-06-19 01:00:00.084802	0	\N	\N	auto	\N	\N	\N	\N	0
1515	54	2023-06-19 01:00:00.086272	0	\N	\N	auto	\N	\N	\N	\N	0
1516	54	2023-06-19 01:00:00.09034	0	\N	\N	auto	\N	\N	\N	\N	0
1517	9	2023-06-19 01:00:00.090627	0	\N	\N	auto	\N	\N	\N	\N	0
1518	51	2023-06-19 01:00:00.090874	0	\N	\N	auto	\N	\N	\N	\N	0
1519	51	2023-06-19 01:00:00.096824	0	\N	\N	auto	\N	\N	\N	\N	0
1520	54	2023-06-19 01:00:00.097503	0	\N	\N	auto	\N	\N	\N	\N	0
1521	54	2023-06-19 01:00:00.103199	0	\N	\N	auto	\N	\N	\N	\N	0
1522	21	2023-06-20 01:00:00.048984	0	\N	\N	auto	\N	\N	\N	\N	0
1523	21	2023-06-20 01:00:00.052496	0	\N	\N	auto	\N	\N	\N	\N	0
1524	21	2023-06-20 01:00:00.056547	0	\N	\N	auto	\N	\N	\N	\N	0
1525	21	2023-06-20 01:00:00.059994	0	\N	\N	auto	\N	\N	\N	\N	0
1526	9	2023-06-20 01:00:00.068607	0	\N	\N	auto	\N	\N	\N	\N	0
1527	9	2023-06-20 01:00:00.071556	0	\N	\N	auto	\N	\N	\N	\N	0
1528	9	2023-06-20 01:00:00.072886	0	\N	\N	auto	\N	\N	\N	\N	0
1529	51	2023-06-20 01:00:00.080502	0	\N	\N	auto	\N	\N	\N	\N	0
1530	51	2023-06-20 01:00:00.082599	0	\N	\N	auto	\N	\N	\N	\N	0
1531	9	2023-06-20 01:00:00.08371	0	\N	\N	auto	\N	\N	\N	\N	0
1532	51	2023-06-20 01:00:00.090557	0	\N	\N	auto	\N	\N	\N	\N	0
1533	54	2023-06-20 01:00:00.091266	0	\N	\N	auto	\N	\N	\N	\N	0
1534	54	2023-06-20 01:00:00.092486	0	\N	\N	auto	\N	\N	\N	\N	0
1535	51	2023-06-20 01:00:00.094531	0	\N	\N	auto	\N	\N	\N	\N	0
1536	54	2023-06-20 01:00:00.099419	0	\N	\N	auto	\N	\N	\N	\N	0
1537	54	2023-06-20 01:00:00.103155	0	\N	\N	auto	\N	\N	\N	\N	0
1538	21	2023-06-21 01:00:00.058528	0	\N	\N	auto	\N	\N	\N	\N	0
1539	21	2023-06-21 01:00:00.068773	0	\N	\N	auto	\N	\N	\N	\N	0
1540	21	2023-06-21 01:00:00.064583	0	\N	\N	auto	\N	\N	\N	\N	0
1541	9	2023-06-21 01:00:00.076687	0	\N	\N	auto	\N	\N	\N	\N	0
1542	9	2023-06-21 01:00:00.082088	0	\N	\N	auto	\N	\N	\N	\N	0
1543	9	2023-06-21 01:00:00.084917	0	\N	\N	auto	\N	\N	\N	\N	0
1544	51	2023-06-21 01:00:00.089182	0	\N	\N	auto	\N	\N	\N	\N	0
1545	51	2023-06-21 01:00:00.092974	0	\N	\N	auto	\N	\N	\N	\N	0
1546	51	2023-06-21 01:00:00.093226	0	\N	\N	auto	\N	\N	\N	\N	0
1547	21	2023-06-21 01:00:00.083273	0	\N	\N	auto	\N	\N	\N	\N	0
1548	54	2023-06-21 01:00:00.102228	0	\N	\N	auto	\N	\N	\N	\N	0
1549	54	2023-06-21 01:00:00.103148	0	\N	\N	auto	\N	\N	\N	\N	0
1550	54	2023-06-21 01:00:00.104067	0	\N	\N	auto	\N	\N	\N	\N	0
1551	9	2023-06-21 01:00:00.105764	0	\N	\N	auto	\N	\N	\N	\N	0
1552	51	2023-06-21 01:00:00.113971	0	\N	\N	auto	\N	\N	\N	\N	0
1553	54	2023-06-21 01:00:00.120051	0	\N	\N	auto	\N	\N	\N	\N	0
1554	21	2023-06-22 01:00:00.057615	0	\N	\N	auto	\N	\N	\N	\N	0
1555	21	2023-06-22 01:00:00.061934	0	\N	\N	auto	\N	\N	\N	\N	0
1556	21	2023-06-22 01:00:00.053681	0	\N	\N	auto	\N	\N	\N	\N	0
1557	21	2023-06-22 01:00:00.065228	0	\N	\N	auto	\N	\N	\N	\N	0
1558	9	2023-06-22 01:00:00.074269	0	\N	\N	auto	\N	\N	\N	\N	0
1559	9	2023-06-22 01:00:00.077731	0	\N	\N	auto	\N	\N	\N	\N	0
1560	9	2023-06-22 01:00:00.078496	0	\N	\N	auto	\N	\N	\N	\N	0
1561	51	2023-06-22 01:00:00.087866	0	\N	\N	auto	\N	\N	\N	\N	0
1562	51	2023-06-22 01:00:00.091102	0	\N	\N	auto	\N	\N	\N	\N	0
1563	51	2023-06-22 01:00:00.096316	0	\N	\N	auto	\N	\N	\N	\N	0
1564	54	2023-06-22 01:00:00.099197	0	\N	\N	auto	\N	\N	\N	\N	0
1565	54	2023-06-22 01:00:00.102047	0	\N	\N	auto	\N	\N	\N	\N	0
1566	54	2023-06-22 01:00:00.11853	0	\N	\N	auto	\N	\N	\N	\N	0
1567	9	2023-06-22 01:00:00.120712	0	\N	\N	auto	\N	\N	\N	\N	0
1568	51	2023-06-22 01:00:00.131217	0	\N	\N	auto	\N	\N	\N	\N	0
1569	54	2023-06-22 01:00:00.145573	0	\N	\N	auto	\N	\N	\N	\N	0
1570	21	2023-06-23 01:00:00.06362	0	\N	\N	auto	\N	\N	\N	\N	0
1571	21	2023-06-23 01:00:00.070366	0	\N	\N	auto	\N	\N	\N	\N	0
1572	21	2023-06-23 01:00:00.075499	0	\N	\N	auto	\N	\N	\N	\N	0
1573	21	2023-06-23 01:00:00.078499	0	\N	\N	auto	\N	\N	\N	\N	0
1574	9	2023-06-23 01:00:00.084779	0	\N	\N	auto	\N	\N	\N	\N	0
1575	9	2023-06-23 01:00:00.088074	0	\N	\N	auto	\N	\N	\N	\N	0
1576	9	2023-06-23 01:00:00.092905	0	\N	\N	auto	\N	\N	\N	\N	0
1577	9	2023-06-23 01:00:00.093738	0	\N	\N	auto	\N	\N	\N	\N	0
1578	51	2023-06-23 01:00:00.096365	0	\N	\N	auto	\N	\N	\N	\N	0
1579	51	2023-06-23 01:00:00.100622	0	\N	\N	auto	\N	\N	\N	\N	0
1580	51	2023-06-23 01:00:00.100517	0	\N	\N	auto	\N	\N	\N	\N	0
1581	51	2023-06-23 01:00:00.102585	0	\N	\N	auto	\N	\N	\N	\N	0
1582	54	2023-06-23 01:00:00.104188	0	\N	\N	auto	\N	\N	\N	\N	0
1583	54	2023-06-23 01:00:00.108051	0	\N	\N	auto	\N	\N	\N	\N	0
1584	54	2023-06-23 01:00:00.1101	0	\N	\N	auto	\N	\N	\N	\N	0
1585	54	2023-06-23 01:00:00.109945	0	\N	\N	auto	\N	\N	\N	\N	0
1586	21	2023-06-24 01:00:00.065029	0	\N	\N	auto	\N	\N	\N	\N	0
1587	21	2023-06-24 01:00:00.06985	0	\N	\N	auto	\N	\N	\N	\N	0
1588	21	2023-06-24 01:00:00.073688	0	\N	\N	auto	\N	\N	\N	\N	0
1589	21	2023-06-24 01:00:00.077112	0	\N	\N	auto	\N	\N	\N	\N	0
1590	9	2023-06-24 01:00:00.082308	0	\N	\N	auto	\N	\N	\N	\N	0
1591	9	2023-06-24 01:00:00.085534	0	\N	\N	auto	\N	\N	\N	\N	0
1592	9	2023-06-24 01:00:00.08683	0	\N	\N	auto	\N	\N	\N	\N	0
1593	9	2023-06-24 01:00:00.092751	0	\N	\N	auto	\N	\N	\N	\N	0
1594	51	2023-06-24 01:00:00.096815	0	\N	\N	auto	\N	\N	\N	\N	0
1595	51	2023-06-24 01:00:00.100171	0	\N	\N	auto	\N	\N	\N	\N	0
1596	51	2023-06-24 01:00:00.101071	0	\N	\N	auto	\N	\N	\N	\N	0
1597	51	2023-06-24 01:00:00.102483	0	\N	\N	auto	\N	\N	\N	\N	0
1598	54	2023-06-24 01:00:00.107129	0	\N	\N	auto	\N	\N	\N	\N	0
1599	54	2023-06-24 01:00:00.111369	0	\N	\N	auto	\N	\N	\N	\N	0
1600	54	2023-06-24 01:00:00.112222	0	\N	\N	auto	\N	\N	\N	\N	0
1601	54	2023-06-24 01:00:00.120396	0	\N	\N	auto	\N	\N	\N	\N	0
1602	21	2023-06-25 01:00:00.059312	0	\N	\N	auto	\N	\N	\N	\N	0
1603	21	2023-06-25 01:00:00.064324	0	\N	\N	auto	\N	\N	\N	\N	0
1604	9	2023-06-25 01:00:00.07931	0	\N	\N	auto	\N	\N	\N	\N	0
1605	9	2023-06-25 01:00:00.081979	0	\N	\N	auto	\N	\N	\N	\N	0
1606	21	2023-06-25 01:00:00.080134	0	\N	\N	auto	\N	\N	\N	\N	0
1607	21	2023-06-25 01:00:00.076714	0	\N	\N	auto	\N	\N	\N	\N	0
1608	9	2023-06-25 01:00:00.092614	0	\N	\N	auto	\N	\N	\N	\N	0
1609	51	2023-06-25 01:00:00.091475	0	\N	\N	auto	\N	\N	\N	\N	0
1610	51	2023-06-25 01:00:00.099556	0	\N	\N	auto	\N	\N	\N	\N	0
1611	51	2023-06-25 01:00:00.100329	0	\N	\N	auto	\N	\N	\N	\N	0
1612	54	2023-06-25 01:00:00.107121	0	\N	\N	auto	\N	\N	\N	\N	0
1613	54	2023-06-25 01:00:00.110747	0	\N	\N	auto	\N	\N	\N	\N	0
1614	9	2023-06-25 01:00:00.110582	0	\N	\N	auto	\N	\N	\N	\N	0
1615	54	2023-06-25 01:00:00.112927	0	\N	\N	auto	\N	\N	\N	\N	0
1616	51	2023-06-25 01:00:00.12542	0	\N	\N	auto	\N	\N	\N	\N	0
1617	54	2023-06-25 01:00:00.141366	0	\N	\N	auto	\N	\N	\N	\N	0
1618	21	2023-06-26 01:00:00.0805	0	\N	\N	auto	\N	\N	\N	\N	0
1619	21	2023-06-26 01:00:00.084355	0	\N	\N	auto	\N	\N	\N	\N	0
1620	21	2023-06-26 01:00:00.088119	0	\N	\N	auto	\N	\N	\N	\N	0
1621	9	2023-06-26 01:00:00.0952	0	\N	\N	auto	\N	\N	\N	\N	0
1622	9	2023-06-26 01:00:00.099528	0	\N	\N	auto	\N	\N	\N	\N	0
1623	9	2023-06-26 01:00:00.102609	0	\N	\N	auto	\N	\N	\N	\N	0
1624	51	2023-06-26 01:00:00.106357	0	\N	\N	auto	\N	\N	\N	\N	0
1625	21	2023-06-26 01:00:00.100209	0	\N	\N	auto	\N	\N	\N	\N	0
1626	51	2023-06-26 01:00:00.109512	0	\N	\N	auto	\N	\N	\N	\N	0
1627	51	2023-06-26 01:00:00.110922	0	\N	\N	auto	\N	\N	\N	\N	0
1628	9	2023-06-26 01:00:00.117635	0	\N	\N	auto	\N	\N	\N	\N	0
1629	54	2023-06-26 01:00:00.119489	0	\N	\N	auto	\N	\N	\N	\N	0
1630	54	2023-06-26 01:00:00.120258	0	\N	\N	auto	\N	\N	\N	\N	0
1631	54	2023-06-26 01:00:00.121066	0	\N	\N	auto	\N	\N	\N	\N	0
1632	51	2023-06-26 01:00:00.125739	0	\N	\N	auto	\N	\N	\N	\N	0
1633	54	2023-06-26 01:00:00.136839	0	\N	\N	auto	\N	\N	\N	\N	0
1634	21	2023-06-27 01:00:00.057479	0	\N	\N	auto	\N	\N	\N	\N	0
1635	21	2023-06-27 01:00:00.061563	0	\N	\N	auto	\N	\N	\N	\N	0
1636	21	2023-06-27 01:00:00.065465	0	\N	\N	auto	\N	\N	\N	\N	0
1637	21	2023-06-27 01:00:00.069917	0	\N	\N	auto	\N	\N	\N	\N	0
1638	9	2023-06-27 01:00:00.081813	0	\N	\N	auto	\N	\N	\N	\N	0
1639	9	2023-06-27 01:00:00.082985	0	\N	\N	auto	\N	\N	\N	\N	0
1640	9	2023-06-27 01:00:00.087234	0	\N	\N	auto	\N	\N	\N	\N	0
1641	9	2023-06-27 01:00:00.08688	0	\N	\N	auto	\N	\N	\N	\N	0
1642	51	2023-06-27 01:00:00.091566	0	\N	\N	auto	\N	\N	\N	\N	0
1643	51	2023-06-27 01:00:00.092606	0	\N	\N	auto	\N	\N	\N	\N	0
1644	51	2023-06-27 01:00:00.096238	0	\N	\N	auto	\N	\N	\N	\N	0
1645	54	2023-06-27 01:00:00.099347	0	\N	\N	auto	\N	\N	\N	\N	0
1646	54	2023-06-27 01:00:00.102029	0	\N	\N	auto	\N	\N	\N	\N	0
1647	54	2023-06-27 01:00:00.102996	0	\N	\N	auto	\N	\N	\N	\N	0
1648	51	2023-06-27 01:00:00.110594	0	\N	\N	auto	\N	\N	\N	\N	0
1649	54	2023-06-27 01:00:00.118275	0	\N	\N	auto	\N	\N	\N	\N	0
1650	54	2023-06-27 08:52:59.197944	0	\N	\N	auto	\N	\N	\N	\N	0
1651	21	2023-06-28 01:00:00.057939	0	\N	\N	auto	\N	\N	\N	\N	0
1652	21	2023-06-28 01:00:00.062513	0	\N	\N	auto	\N	\N	\N	\N	0
1653	21	2023-06-28 01:00:00.069886	0	\N	\N	auto	\N	\N	\N	\N	0
1654	21	2023-06-28 01:00:00.073094	0	\N	\N	auto	\N	\N	\N	\N	0
1655	9	2023-06-28 01:00:00.081393	0	\N	\N	auto	\N	\N	\N	\N	0
1656	9	2023-06-28 01:00:00.086183	0	\N	\N	auto	\N	\N	\N	\N	0
1657	9	2023-06-28 01:00:00.087381	0	\N	\N	auto	\N	\N	\N	\N	0
1658	9	2023-06-28 01:00:00.094578	0	\N	\N	auto	\N	\N	\N	\N	0
1659	51	2023-06-28 01:00:00.095049	0	\N	\N	auto	\N	\N	\N	\N	0
1660	51	2023-06-28 01:00:00.099131	0	\N	\N	auto	\N	\N	\N	\N	0
1661	51	2023-06-28 01:00:00.101679	0	\N	\N	auto	\N	\N	\N	\N	0
1662	51	2023-06-28 01:00:00.106058	0	\N	\N	auto	\N	\N	\N	\N	0
1666	54	2023-06-28 01:00:00.11819	0	\N	\N	auto	\N	\N	\N	\N	0
1663	54	2023-06-28 01:00:00.10797	0	\N	\N	auto	\N	\N	\N	\N	0
1664	54	2023-06-28 01:00:00.108902	0	\N	\N	auto	\N	\N	\N	\N	0
1665	54	2023-06-28 01:00:00.115342	0	\N	\N	auto	\N	\N	\N	\N	0
1667	21	2023-06-29 01:00:00.061418	0	\N	\N	auto	\N	\N	\N	\N	0
1668	21	2023-06-29 01:00:00.067775	0	\N	\N	auto	\N	\N	\N	\N	0
1669	21	2023-06-29 01:00:00.06496	0	\N	\N	auto	\N	\N	\N	\N	0
1670	21	2023-06-29 01:00:00.07175	0	\N	\N	auto	\N	\N	\N	\N	0
1671	9	2023-06-29 01:00:00.080544	0	\N	\N	auto	\N	\N	\N	\N	0
1672	9	2023-06-29 01:00:00.082708	0	\N	\N	auto	\N	\N	\N	\N	0
1673	9	2023-06-29 01:00:00.084279	0	\N	\N	auto	\N	\N	\N	\N	0
1674	9	2023-06-29 01:00:00.085451	0	\N	\N	auto	\N	\N	\N	\N	0
1675	51	2023-06-29 01:00:00.096032	0	\N	\N	auto	\N	\N	\N	\N	0
1676	51	2023-06-29 01:00:00.097071	0	\N	\N	auto	\N	\N	\N	\N	0
1677	51	2023-06-29 01:00:00.097353	0	\N	\N	auto	\N	\N	\N	\N	0
1678	51	2023-06-29 01:00:00.09236	0	\N	\N	auto	\N	\N	\N	\N	0
1679	54	2023-06-29 01:00:00.109407	0	\N	\N	auto	\N	\N	\N	\N	0
1680	54	2023-06-29 01:00:00.110298	0	\N	\N	auto	\N	\N	\N	\N	0
1681	54	2023-06-29 01:00:00.111986	0	\N	\N	auto	\N	\N	\N	\N	0
1682	54	2023-06-29 01:00:00.108358	0	\N	\N	auto	\N	\N	\N	\N	0
1683	21	2023-06-30 01:00:00.058952	0	\N	\N	auto	\N	\N	\N	\N	0
1684	21	2023-06-30 01:00:00.063068	0	\N	\N	auto	\N	\N	\N	\N	0
1685	21	2023-06-30 01:00:00.0731	0	\N	\N	auto	\N	\N	\N	\N	0
1686	21	2023-06-30 01:00:00.074605	0	\N	\N	auto	\N	\N	\N	\N	0
1687	9	2023-06-30 01:00:00.091607	0	\N	\N	auto	\N	\N	\N	\N	0
1688	9	2023-06-30 01:00:00.091802	0	\N	\N	auto	\N	\N	\N	\N	0
1689	9	2023-06-30 01:00:00.089706	0	\N	\N	auto	\N	\N	\N	\N	0
1690	9	2023-06-30 01:00:00.093746	0	\N	\N	auto	\N	\N	\N	\N	0
1691	51	2023-06-30 01:00:00.106858	0	\N	\N	auto	\N	\N	\N	\N	0
1692	51	2023-06-30 01:00:00.108305	0	\N	\N	auto	\N	\N	\N	\N	0
1693	51	2023-06-30 01:00:00.104953	0	\N	\N	auto	\N	\N	\N	\N	0
1694	51	2023-06-30 01:00:00.113866	0	\N	\N	auto	\N	\N	\N	\N	0
1695	54	2023-06-30 01:00:00.117317	0	\N	\N	auto	\N	\N	\N	\N	0
1696	54	2023-06-30 01:00:00.122132	0	\N	\N	auto	\N	\N	\N	\N	0
1697	54	2023-06-30 01:00:00.127309	0	\N	\N	auto	\N	\N	\N	\N	0
1698	54	2023-06-30 01:00:00.140786	0	\N	\N	auto	\N	\N	\N	\N	0
1699	21	2023-07-01 01:00:00.043362	0	\N	\N	auto	\N	\N	\N	\N	0
1700	9	2023-07-01 01:00:00.056335	0	\N	\N	auto	\N	\N	\N	\N	0
1701	51	2023-07-01 01:00:00.067527	0	\N	\N	auto	\N	\N	\N	\N	0
1702	21	2023-07-01 01:00:00.063547	0	\N	\N	auto	\N	\N	\N	\N	0
1703	21	2023-07-01 01:00:00.067325	0	\N	\N	auto	\N	\N	\N	\N	0
1704	21	2023-07-01 01:00:00.069362	0	\N	\N	auto	\N	\N	\N	\N	0
1705	9	2023-07-01 01:00:00.079931	0	\N	\N	auto	\N	\N	\N	\N	0
1706	54	2023-07-01 01:00:00.083077	0	\N	\N	auto	\N	\N	\N	\N	0
1707	51	2023-07-01 01:00:00.087898	0	\N	\N	auto	\N	\N	\N	\N	0
1708	9	2023-07-01 01:00:00.088839	0	\N	\N	auto	\N	\N	\N	\N	0
1709	9	2023-07-01 01:00:00.090473	0	\N	\N	auto	\N	\N	\N	\N	0
1710	54	2023-07-01 01:00:00.096406	0	\N	\N	auto	\N	\N	\N	\N	0
1711	51	2023-07-01 01:00:00.101004	0	\N	\N	auto	\N	\N	\N	\N	0
1712	51	2023-07-01 01:00:00.101624	0	\N	\N	auto	\N	\N	\N	\N	0
1713	54	2023-07-01 01:00:00.108611	0	\N	\N	auto	\N	\N	\N	\N	0
1714	54	2023-07-01 01:00:00.112346	0	\N	\N	auto	\N	\N	\N	\N	0
1715	21	2023-07-02 01:00:00.032811	0	\N	\N	auto	\N	\N	\N	\N	0
1716	21	2023-07-02 01:00:00.034441	0	\N	\N	auto	\N	\N	\N	\N	0
1717	21	2023-07-02 01:00:00.036733	0	\N	\N	auto	\N	\N	\N	\N	0
1718	21	2023-07-02 01:00:00.04222	0	\N	\N	auto	\N	\N	\N	\N	0
1719	9	2023-07-02 01:00:00.044113	0	\N	\N	auto	\N	\N	\N	\N	0
1720	9	2023-07-02 01:00:00.047734	0	\N	\N	auto	\N	\N	\N	\N	0
1721	9	2023-07-02 01:00:00.05563	0	\N	\N	auto	\N	\N	\N	\N	0
1722	51	2023-07-02 01:00:00.056931	0	\N	\N	auto	\N	\N	\N	\N	0
1723	51	2023-07-02 01:00:00.06214	0	\N	\N	auto	\N	\N	\N	\N	0
1724	9	2023-07-02 01:00:00.062348	0	\N	\N	auto	\N	\N	\N	\N	0
1725	54	2023-07-02 01:00:00.064743	0	\N	\N	auto	\N	\N	\N	\N	0
1726	51	2023-07-02 01:00:00.06885	0	\N	\N	auto	\N	\N	\N	\N	0
1727	54	2023-07-02 01:00:00.06924	0	\N	\N	auto	\N	\N	\N	\N	0
1728	51	2023-07-02 01:00:00.068028	0	\N	\N	auto	\N	\N	\N	\N	0
1729	54	2023-07-02 01:00:00.074384	0	\N	\N	auto	\N	\N	\N	\N	0
1730	54	2023-07-02 01:00:00.079247	0	\N	\N	auto	\N	\N	\N	\N	0
1731	21	2023-07-03 01:00:00.039993	0	\N	\N	auto	\N	\N	\N	\N	0
1732	21	2023-07-03 01:00:00.043815	0	\N	\N	auto	\N	\N	\N	\N	0
1733	21	2023-07-03 01:00:00.04944	0	\N	\N	auto	\N	\N	\N	\N	0
1734	21	2023-07-03 01:00:00.052514	0	\N	\N	auto	\N	\N	\N	\N	0
1735	9	2023-07-03 01:00:00.059157	0	\N	\N	auto	\N	\N	\N	\N	0
1736	9	2023-07-03 01:00:00.061782	0	\N	\N	auto	\N	\N	\N	\N	0
1737	9	2023-07-03 01:00:00.065338	0	\N	\N	auto	\N	\N	\N	\N	0
1738	51	2023-07-03 01:00:00.066274	0	\N	\N	auto	\N	\N	\N	\N	0
1739	51	2023-07-03 01:00:00.068777	0	\N	\N	auto	\N	\N	\N	\N	0
1740	9	2023-07-03 01:00:00.068891	0	\N	\N	auto	\N	\N	\N	\N	0
1741	51	2023-07-03 01:00:00.072255	0	\N	\N	auto	\N	\N	\N	\N	0
1742	53	2023-07-03 01:00:00.073704	0	\N	\N	auto	\N	\N	\N	\N	0
1743	53	2023-07-03 01:00:00.077288	0	\N	\N	auto	\N	\N	\N	\N	0
1744	51	2023-07-03 01:00:00.076569	0	\N	\N	auto	\N	\N	\N	\N	0
1745	54	2023-07-03 01:00:00.080678	0	\N	\N	auto	\N	\N	\N	\N	0
1746	54	2023-07-03 01:00:00.084197	0	\N	\N	auto	\N	\N	\N	\N	0
1747	53	2023-07-03 01:00:00.086033	0	\N	\N	auto	\N	\N	\N	\N	0
1748	54	2023-07-03 01:00:00.093566	0	\N	\N	auto	\N	\N	\N	\N	0
1749	53	2023-07-03 01:00:00.09734	0	\N	\N	auto	\N	\N	\N	\N	0
1750	54	2023-07-03 01:00:00.109335	0	\N	\N	auto	\N	\N	\N	\N	0
1751	21	2023-07-04 01:00:00.039947	0	\N	\N	auto	\N	\N	\N	\N	0
1752	21	2023-07-04 01:00:00.041825	0	\N	\N	auto	\N	\N	\N	\N	0
1753	9	2023-07-04 01:00:00.056108	0	\N	\N	auto	\N	\N	\N	\N	0
1754	21	2023-07-04 01:00:00.053241	0	\N	\N	auto	\N	\N	\N	\N	0
1755	9	2023-07-04 01:00:00.061697	0	\N	\N	auto	\N	\N	\N	\N	0
1756	9	2023-07-04 01:00:00.070655	0	\N	\N	auto	\N	\N	\N	\N	0
1757	51	2023-07-04 01:00:00.075258	0	\N	\N	auto	\N	\N	\N	\N	0
1758	51	2023-07-04 01:00:00.080332	0	\N	\N	auto	\N	\N	\N	\N	0
1759	21	2023-07-04 01:00:00.068194	0	\N	\N	auto	\N	\N	\N	\N	0
1760	54	2023-07-04 01:00:00.092886	0	\N	\N	auto	\N	\N	\N	\N	0
1761	51	2023-07-04 01:00:00.096435	0	\N	\N	auto	\N	\N	\N	\N	0
1762	9	2023-07-04 01:00:00.096978	0	\N	\N	auto	\N	\N	\N	\N	0
1763	54	2023-07-04 01:00:00.099431	0	\N	\N	auto	\N	\N	\N	\N	0
1764	54	2023-07-04 01:00:00.108365	0	\N	\N	auto	\N	\N	\N	\N	0
1765	51	2023-07-04 01:00:00.106864	0	\N	\N	auto	\N	\N	\N	\N	0
1766	54	2023-07-04 01:00:00.119649	0	\N	\N	auto	\N	\N	\N	\N	0
1767	21	2023-07-05 01:00:00.068035	0	\N	\N	auto	\N	\N	\N	\N	0
1768	21	2023-07-05 01:00:00.072131	0	\N	\N	auto	\N	\N	\N	\N	0
1769	21	2023-07-05 01:00:00.075122	0	\N	\N	auto	\N	\N	\N	\N	0
1770	21	2023-07-05 01:00:00.079849	0	\N	\N	auto	\N	\N	\N	\N	0
1771	9	2023-07-05 01:00:00.088861	0	\N	\N	auto	\N	\N	\N	\N	0
1772	9	2023-07-05 01:00:00.0911	0	\N	\N	auto	\N	\N	\N	\N	0
1773	9	2023-07-05 01:00:00.09522	0	\N	\N	auto	\N	\N	\N	\N	0
1774	9	2023-07-05 01:00:00.096199	0	\N	\N	auto	\N	\N	\N	\N	0
1775	51	2023-07-05 01:00:00.098981	0	\N	\N	auto	\N	\N	\N	\N	0
1776	51	2023-07-05 01:00:00.102904	0	\N	\N	auto	\N	\N	\N	\N	0
1777	51	2023-07-05 01:00:00.103917	0	\N	\N	auto	\N	\N	\N	\N	0
1778	51	2023-07-05 01:00:00.106534	0	\N	\N	auto	\N	\N	\N	\N	0
1779	54	2023-07-05 01:00:00.107527	0	\N	\N	auto	\N	\N	\N	\N	0
1780	54	2023-07-05 01:00:00.110174	0	\N	\N	auto	\N	\N	\N	\N	0
1781	54	2023-07-05 01:00:00.111839	0	\N	\N	auto	\N	\N	\N	\N	0
1782	54	2023-07-05 01:00:00.1151	0	\N	\N	auto	\N	\N	\N	\N	0
1783	21	2023-07-06 01:00:00.041312	0	\N	\N	auto	\N	\N	\N	\N	-70
1784	21	2023-07-06 01:00:00.045682	0	\N	\N	auto	\N	\N	\N	\N	-70
1785	21	2023-07-06 01:00:00.049518	0	\N	\N	auto	\N	\N	\N	\N	-70
1786	21	2023-07-06 01:00:00.055107	0	\N	\N	auto	\N	\N	\N	\N	-70
1787	9	2023-07-06 01:00:00.057293	0	\N	\N	auto	\N	\N	\N	\N	-10
1788	9	2023-07-06 01:00:00.066045	0	\N	\N	auto	\N	\N	\N	\N	-10
1789	51	2023-07-06 01:00:00.070211	0	\N	\N	auto	\N	\N	\N	\N	-10
1790	9	2023-07-06 01:00:00.070818	0	\N	\N	auto	\N	\N	\N	\N	-10
1791	9	2023-07-06 01:00:00.071709	0	\N	\N	auto	\N	\N	\N	\N	-10
1792	51	2023-07-06 01:00:00.075298	0	\N	\N	auto	\N	\N	\N	\N	-10
1793	51	2023-07-06 01:00:00.0797	0	\N	\N	auto	\N	\N	\N	\N	-10
1794	51	2023-07-06 01:00:00.080189	0	\N	\N	auto	\N	\N	\N	\N	-10
1795	54	2023-07-06 01:00:00.081941	0	\N	\N	auto	\N	\N	\N	\N	-10
1796	54	2023-07-06 01:00:00.09007	0	\N	\N	auto	\N	\N	\N	\N	-10
1797	54	2023-07-06 01:00:00.09007	0	\N	\N	auto	\N	\N	\N	\N	-10
1798	54	2023-07-06 01:00:00.096582	0	\N	\N	auto	\N	\N	\N	\N	-10
1799	21	2023-07-07 01:00:00.100104	0	\N	\N	auto	\N	\N	\N	\N	-70
1800	9	2023-07-07 01:00:00.130073	0	\N	\N	auto	\N	\N	\N	\N	-10
1801	51	2023-07-07 01:00:00.147778	0	\N	\N	auto	\N	\N	\N	\N	-10
1802	54	2023-07-07 01:00:00.161841	0	\N	\N	auto	\N	\N	\N	\N	-10
1803	21	2023-07-08 01:00:00.072866	0	\N	\N	auto	\N	\N	\N	\N	-70
1804	9	2023-07-08 01:00:00.095914	0	\N	\N	auto	\N	\N	\N	\N	-10
1805	51	2023-07-08 01:00:00.106427	0	\N	\N	auto	\N	\N	\N	\N	-10
1806	54	2023-07-08 01:00:00.118782	0	\N	\N	auto	\N	\N	\N	\N	-10
1807	21	2023-07-09 01:00:00.048267	0	\N	\N	auto	\N	\N	\N	\N	-70
1808	9	2023-07-09 01:00:00.061494	0	\N	\N	auto	\N	\N	\N	\N	-10
1809	51	2023-07-09 01:00:00.078853	0	\N	\N	auto	\N	\N	\N	\N	-10
1810	54	2023-07-09 01:00:00.094291	0	\N	\N	auto	\N	\N	\N	\N	-10
1811	21	2023-07-10 01:00:00.058511	0	\N	\N	auto	\N	\N	\N	\N	-70
1812	9	2023-07-10 01:00:00.070624	0	\N	\N	auto	\N	\N	\N	\N	-10
1813	51	2023-07-10 01:00:00.078531	0	\N	\N	auto	\N	\N	\N	\N	-10
1814	54	2023-07-10 01:00:00.088218	0	\N	\N	auto	\N	\N	\N	\N	-10
1815	21	2023-07-11 01:00:00.052235	0	\N	\N	auto	\N	\N	\N	\N	-70
1816	9	2023-07-11 01:00:00.069484	0	\N	\N	auto	\N	\N	\N	\N	-10
1817	51	2023-07-11 01:00:00.083351	0	\N	\N	auto	\N	\N	\N	\N	-10
1818	54	2023-07-11 01:00:00.096343	0	\N	\N	auto	\N	\N	\N	\N	-10
1819	21	2023-07-13 01:00:00.066422	0	\N	\N	auto	\N	\N	\N	\N	-70
1820	9	2023-07-13 01:00:00.087696	0	\N	\N	auto	\N	\N	\N	\N	-10
1821	51	2023-07-13 01:00:00.098746	0	\N	\N	auto	\N	\N	\N	\N	-10
1822	54	2023-07-13 01:00:00.110648	0	\N	\N	auto	\N	\N	\N	\N	-10
1823	21	2023-07-14 01:00:00.062835	0	\N	\N	auto	\N	\N	\N	\N	-70
1824	9	2023-07-14 01:00:00.082371	0	\N	\N	auto	\N	\N	\N	\N	-10
1825	51	2023-07-14 01:00:00.101515	0	\N	\N	auto	\N	\N	\N	\N	-10
1826	54	2023-07-14 01:00:00.113615	0	\N	\N	auto	\N	\N	\N	\N	-10
1827	54	2023-07-14 08:02:12.454162	10.4	\N	\N	employee	\N	plink_1NTgx6LD7cnfGH08TtVgbHzH	balance	pending	10
1828	21	2023-07-15 01:00:00.071399	0	\N	\N	auto	\N	\N	\N	\N	-70
1829	9	2023-07-15 01:00:00.096486	0	\N	\N	auto	\N	\N	\N	\N	-10
1830	51	2023-07-15 01:00:00.107107	0	\N	\N	auto	\N	\N	\N	\N	-10
1831	54	2023-07-15 01:00:00.11994	0	\N	\N	auto	\N	\N	\N	\N	-10
1832	21	2023-07-16 01:00:00.068386	0	\N	\N	auto	\N	\N	\N	\N	-70
1833	9	2023-07-16 01:00:00.09037	0	\N	\N	auto	\N	\N	\N	\N	-10
1834	51	2023-07-16 01:00:00.102319	0	\N	\N	auto	\N	\N	\N	\N	-10
1835	54	2023-07-16 01:00:00.114229	0	\N	\N	auto	\N	\N	\N	\N	-10
1836	21	2023-07-17 01:00:00.068851	0	\N	\N	auto	\N	\N	\N	\N	-70
1837	9	2023-07-17 01:00:00.079063	0	\N	\N	auto	\N	\N	\N	\N	-10
1838	51	2023-07-17 01:00:00.087241	0	\N	\N	auto	\N	\N	\N	\N	-10
1839	54	2023-07-17 01:00:00.096144	0	\N	\N	auto	\N	\N	\N	\N	-10
1840	21	2023-07-18 01:00:00.054741	0	\N	\N	auto	\N	\N	\N	\N	-70
1841	9	2023-07-18 01:00:00.096911	0	\N	\N	auto	\N	\N	\N	\N	-10
1842	51	2023-07-18 01:00:00.10791	0	\N	\N	auto	\N	\N	\N	\N	-10
1843	54	2023-07-18 01:00:00.121741	0	\N	\N	auto	\N	\N	\N	\N	-10
1844	21	2023-07-19 01:00:00.051529	0	\N	\N	auto	\N	\N	\N	\N	-70
1845	9	2023-07-19 01:00:00.065919	0	\N	\N	auto	\N	\N	\N	\N	-10
1846	51	2023-07-19 01:00:00.07981	0	\N	\N	auto	\N	\N	\N	\N	-10
1847	54	2023-07-19 01:00:00.094955	0	\N	\N	auto	\N	\N	\N	\N	-10
1848	21	2023-07-20 01:00:00.059201	0	\N	\N	auto	\N	\N	\N	\N	-70
1849	9	2023-07-20 01:00:00.080551	0	\N	\N	auto	\N	\N	\N	\N	-10
1850	51	2023-07-20 01:00:00.089802	0	\N	\N	auto	\N	\N	\N	\N	-10
1851	54	2023-07-20 01:00:00.102348	0	\N	\N	auto	\N	\N	\N	\N	-10
1852	21	2023-07-20 10:41:44.23492	11.2	\N	\N	employee	\N	plink_1NVuImLD7cnfGH08msWqKXuc	balance	pending	10
1853	\N	2023-07-20 10:59:12.727458	500	281	\N	auto	pi_3NVuZgLD7cnfGH081KhEPRZ5	\N	order	pending	500
1854	\N	2023-07-20 10:59:27.743651	500	281	\N	auto	pi_3NVuZvLD7cnfGH0812d4T5Xu	\N	order	pending	500
1855	\N	2023-07-20 10:59:45.099607	500	281	\N	auto	pi_3NVuaCLD7cnfGH081tZABPiW	\N	order	pending	500
1856	\N	2023-07-20 11:27:35.733241	500	283	\N	auto	pi_3NVv19LD7cnfGH081W3AUsUZ	\N	order	pending	500
1857	21	2023-07-21 01:00:00.076726	0	\N	\N	auto	\N	\N	\N	\N	-80
1858	9	2023-07-21 01:00:00.091748	0	\N	\N	auto	\N	\N	\N	\N	-10
1859	51	2023-07-21 01:00:00.10488	0	\N	\N	auto	\N	\N	\N	\N	-10
1860	54	2023-07-21 01:00:00.115438	0	\N	\N	auto	\N	\N	\N	\N	-10
1861	21	2023-07-22 01:00:00.050951	0	\N	\N	auto	\N	\N	\N	\N	-80
1862	9	2023-07-22 01:00:00.072152	0	\N	\N	auto	\N	\N	\N	\N	-10
1863	51	2023-07-22 01:00:00.082545	0	\N	\N	auto	\N	\N	\N	\N	-10
1864	54	2023-07-22 01:00:00.09367	0	\N	\N	auto	\N	\N	\N	\N	-10
1865	21	2023-07-23 01:00:00.059857	0	\N	\N	auto	\N	\N	\N	\N	-80
1866	9	2023-07-23 01:00:00.072614	0	\N	\N	auto	\N	\N	\N	\N	-10
1867	51	2023-07-23 01:00:00.082534	0	\N	\N	auto	\N	\N	\N	\N	-10
1868	54	2023-07-23 01:00:00.092055	0	\N	\N	auto	\N	\N	\N	\N	-10
1869	21	2023-07-24 01:00:00.057021	0	\N	\N	auto	\N	\N	\N	\N	-80
1870	9	2023-07-24 01:00:00.071841	0	\N	\N	auto	\N	\N	\N	\N	-10
1871	51	2023-07-24 01:00:00.083484	0	\N	\N	auto	\N	\N	\N	\N	-10
1872	54	2023-07-24 01:00:00.095766	0	\N	\N	auto	\N	\N	\N	\N	-10
1873	54	2023-07-24 09:49:01.849601	416	\N	\N	admin	\N	plink_1NXLNxLD7cnfGH08X3tRaMgr	balance	pending	400
1874	54	2023-07-24 09:52:46.371344	5200	\N	\N	admin	\N	plink_1NXLRaLD7cnfGH08AwiCNMxB	balance	pending	5000
1875	21	2023-07-25 01:00:00.067376	0	\N	\N	auto	\N	\N	\N	\N	-70
1876	9	2023-07-25 01:00:00.088629	0	\N	\N	auto	\N	\N	\N	\N	-10
1877	51	2023-07-25 01:00:00.102893	0	\N	\N	auto	\N	\N	\N	\N	-10
1878	54	2023-07-25 01:00:00.117166	0	\N	\N	auto	\N	\N	\N	\N	-20
1879	21	2023-07-26 01:00:00.086642	0	\N	\N	auto	\N	\N	\N	\N	-70
1880	9	2023-07-26 01:00:00.108761	0	\N	\N	auto	\N	\N	\N	\N	-10
1881	51	2023-07-26 01:00:00.122749	0	\N	\N	auto	\N	\N	\N	\N	-10
1882	54	2023-07-26 01:00:00.136211	0	\N	\N	auto	\N	\N	\N	\N	-20
1883	21	2023-07-27 01:00:00.067391	0	\N	\N	auto	\N	\N	\N	\N	-70
1884	9	2023-07-27 01:00:00.092081	0	\N	\N	auto	\N	\N	\N	\N	-10
1885	51	2023-07-27 01:00:00.102566	0	\N	\N	auto	\N	\N	\N	\N	-10
1886	54	2023-07-27 01:00:00.111852	0	\N	\N	auto	\N	\N	\N	\N	-20
1887	21	2023-07-28 01:00:00.057844	0	\N	\N	auto	\N	\N	\N	\N	-70
1888	9	2023-07-28 01:00:00.06996	0	\N	\N	auto	\N	\N	\N	\N	-10
1889	51	2023-07-28 01:00:00.082455	0	\N	\N	auto	\N	\N	\N	\N	-10
1890	54	2023-07-28 01:00:00.093726	0	\N	\N	auto	\N	\N	\N	\N	-20
1891	21	2023-07-29 01:00:00.058791	0	\N	\N	auto	\N	\N	\N	\N	-70
1892	9	2023-07-29 01:00:00.07902	0	\N	\N	auto	\N	\N	\N	\N	-10
1893	51	2023-07-29 01:00:00.089124	0	\N	\N	auto	\N	\N	\N	\N	-10
1894	54	2023-07-29 01:00:00.099226	0	\N	\N	auto	\N	\N	\N	\N	-20
1895	21	2023-07-30 01:00:00.059994	0	\N	\N	auto	\N	\N	\N	\N	-70
1896	9	2023-07-30 01:00:00.072175	0	\N	\N	auto	\N	\N	\N	\N	-10
1897	51	2023-07-30 01:00:00.082134	0	\N	\N	auto	\N	\N	\N	\N	-10
1898	54	2023-07-30 01:00:00.092933	0	\N	\N	auto	\N	\N	\N	\N	-20
1899	21	2023-07-31 01:00:00.0495	0	\N	\N	auto	\N	\N	\N	\N	-70
1900	9	2023-07-31 01:00:00.062362	0	\N	\N	auto	\N	\N	\N	\N	-10
1901	51	2023-07-31 01:00:00.072577	0	\N	\N	auto	\N	\N	\N	\N	-10
1902	54	2023-07-31 01:00:00.085452	0	\N	\N	auto	\N	\N	\N	\N	-20
\.


--
-- TOC entry 3825 (class 0 OID 25970)
-- Dependencies: 286
-- Data for Name: vne_units; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_units (id, related_id, conversion_ratio) FROM stdin;
2	1	1000
4	\N	\N
3	5	1000
5	3	0.001
1	2	0.001
\.


--
-- TOC entry 3827 (class 0 OID 25978)
-- Dependencies: 288
-- Data for Name: vne_units_translations; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_units_translations (id, unit_id, lang_id, name, short) FROM stdin;
2	1	1	Грам	г
8	3	1	Литр	л
9	3	2	Litre	l
7	3	8	Litre	l
10	4	8	pcs	pcs
11	4	1	Штук	шт
12	4	2	pcs	pcs
13	5	8	Mililitre	ml
14	5	1	Милилитр	мл
15	5	2	Mililitre	ml
1	1	8	Gram	G
4	2	8	Kilogram	Kg
3	1	2	Grams	g
6	2	2	Kilogram	kg
5	2	1	Килограмм	кг
\.


--
-- TOC entry 3829 (class 0 OID 25986)
-- Dependencies: 290
-- Data for Name: vne_word_translations; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_word_translations (id, word_id, lang_id, text) FROM stdin;
5	2	1	Активные
6	2	2	Active
7	3	1	Неактивные
8	3	2	Inactive
9	4	1	Сменить пароль
10	4	2	Change password
555	186	1	Залы и столы
556	186	2	Halls and tables
557	187	1	Кухня
558	187	2	Kitchen
17	8	1	Активные рестораны
18	8	2	Active restaurants
21	10	1	Неактивные рестораны
22	10	2	Inactive restaurants
559	188	1	Категории
560	188	2	Categories
25	12	1	История заказов
567	192	1	Иконка
568	192	2	Icon
569	193	1	Название
570	193	2	Name
571	194	1	Позиция в списке
572	194	2	Position
35	17	1	Название
36	17	2	Name
573	195	1	Активность
574	195	2	Active
33	16	1	Дата создания
34	16	2	Created at
45	22	1	E-mail
46	22	2	E-mail
47	23	1	Пароль
48	23	2	Password
49	24	1	Войти
50	24	2	Sign in
59	29	1	Смена пароля
60	29	2	Change password
577	197	1	показать список
578	197	2	show list
579	198	1	скрыть список
580	198	2	hide list
65	32	1	Войти через Google
66	32	2	Sign in with Google
67	33	1	Войти через Apple
68	33	2	Sign in with Apple
41	20	1	Авторизация
42	20	2	Authorization
583	200	1	Блюда
584	200	2	Dishes
71	35	1	Новый пароль
72	35	2	New password
73	36	1	Новый пароль еще раз
74	36	2	Repeat new password
75	37	1	Ваш логин
76	37	2	Your login
77	38	1	Пароли не совпадают
78	38	2	Passwords don't match
585	201	1	Блюда - Добавление
168	67	1	Не задано
169	67	2	Not set
586	201	2	Dishes - Add
587	202	1	Блюда - Редактирование
132	49	1	Пн
133	49	2	Mo
134	50	1	Вт
135	50	2	Tu
136	51	1	Ср
137	51	2	We
138	52	1	Чт
139	52	2	Th
140	53	1	Пт
141	53	2	Fr
142	54	1	Сб
143	54	2	Sa
144	55	1	Вс
145	55	2	Su
146	56	1	Применить
147	56	2	Apply
148	57	1	дата не задана
149	57	2	date is not set
150	58	1	Произошла ошибка. Попробуйте позднее.
151	58	2	An error has occurred. Please try again later.
152	59	1	Доступ запрещен
153	59	2	Access denied
154	60	1	Страница
155	60	2	Page
156	61	1	Выход
157	61	2	Sign out
158	62	1	Сохранить
159	62	2	Save
160	63	1	загрузка...
161	63	2	loading...
162	64	1	Главная
163	64	2	Home
588	202	2	Dishes - Edit
591	204	1	Код
592	204	2	SKU
593	205	1	Название
594	205	2	Name
170	68	1	Регистрация ресторана
171	68	2	Restaurant registration
174	70	1	ФИО
175	70	2	Contact person name
176	71	1	Телефон
177	71	2	Phone
178	72	1	Адрес
179	72	2	Address
180	73	1	ИНН
181	73	2	ITN/TIN
182	74	1	ОГРН
183	74	2	PSRN
184	75	1	Валюта
185	75	2	Currency
186	76	1	Комментарий
187	76	2	Comment
188	77	1	E-mail администратора
189	77	2	Administrator e-mail
190	78	1	Пароль администратора
191	78	2	Administrator password
192	79	1	Домен занят
193	79	2	Domain is already in use
194	80	1	E-mail занят
195	80	2	E-mail is already in use
196	81	1	Язык
197	81	2	Language
198	82	1	Параметры ресторана
199	82	2	Restaurant data
200	83	1	Назад
201	83	2	Back
202	84	1	Добавить
203	84	2	Add
204	85	1	Закрыть
205	85	2	Close
173	69	2	Website
172	69	1	Сайт
206	86	1	Пароль сохранен
207	86	2	Password saved
208	87	1	Да
209	87	2	Yes
210	88	1	Нет
211	88	2	No
212	89	1	Удалить
213	89	2	Delete
214	90	1	Отмена
215	90	2	Cancel
216	91	1	День
217	91	2	Day
218	92	1	Месяц
219	92	2	Month
220	93	1	Год
221	93	2	Year
561	189	1	Категории
292	129	1	Новые заказы
293	129	2	New orders
315	140	2	RUB
226	96	1	Авторизация
227	96	2	Authorization
228	97	1	E-mail
229	97	2	E-mail
230	98	1	Пароль
231	98	2	Password
232	99	1	Войти
233	99	2	Sign in
234	100	1	Войти через Google
235	100	2	Sign in with Google
236	101	1	Войти через Apple
237	101	2	Sign in with Apple
238	102	1	период
239	102	2	period
314	140	1	RUB
244	105	1	Транзакции
245	105	2	Transactions
246	106	1	Пополнить счет
247	106	2	Recharge the account
248	107	1	Ресторан
249	107	2	Restaurant
250	108	1	Сумма
251	108	2	Amount
254	110	1	Ресторан
255	110	2	Restaurant
256	111	1	Дата создания
257	111	2	Created at
258	112	1	Тип
259	112	2	Type
260	113	1	Сумма
261	113	2	Amount
263	114	2	none
262	114	1	нет данных
264	115	1	автоматическая
265	115	2	auto
266	116	1	сотрудник ресторана
267	116	2	restaurant employee
268	117	1	администратор системы
269	117	2	system administrator
270	118	1	Итоговая сумма
271	118	2	Total
272	119	1	Фильтр
273	119	2	Filter
274	120	1	Сортировка
275	120	2	Sorting
276	121	1	Транзакции
277	121	2	Transactions
278	122	1	Сводка
279	122	2	Summary
280	123	1	все
281	123	2	any
284	125	1	Осталось дней
285	125	2	Days left
282	124	1	Сотрудники
283	124	2	Employees
286	126	1	Главная
287	126	2	Home
294	130	1	Карта столов
296	131	1	Блюда
298	132	1	Статистика
288	127	1	Персонал
289	127	2	Personnel
295	130	2	Table map
297	131	2	Dishes
299	132	2	Statistics
300	133	1	Главная
301	133	2	Home
302	134	1	Пополнить
303	134	2	Recharge
306	136	1	Вы работаете как
307	136	2	You are signed in as
308	137	1	Ресторан
309	137	2	Restaurant
310	138	1	Состояние счета
311	138	2	Account state
318	142	1	Ваш статус
319	142	2	Status
320	143	1	не установлен
321	143	2	none
312	139	1	Осталось дней
313	139	2	Days left
316	141	1	Следующее списание
317	141	2	Next charge
322	144	1	Кол-во сотрудников
323	144	2	Employees qty
325	145	2	Personnel
326	146	1	Язык
327	146	2	Language
328	147	1	Действия
329	147	2	Actions
330	148	1	Просмотр и редактирование
331	148	2	View and edit
332	149	1	Дата создания
333	149	2	Created at
334	150	1	ФИО
335	150	2	Full name
336	151	1	Администратор
337	151	2	Administrator
338	152	1	Статус
339	152	2	Status
340	153	1	Пароль
324	145	1	Персонал
341	153	2	Password
342	154	1	Ваш пароль
343	154	2	Your password
345	155	2	Personnel - Add
346	156	1	E-mail
347	156	2	E-mail
348	157	1	Пароль
349	157	2	Password
350	158	1	E-mail занят
351	158	2	E-mail is already in use
352	159	1	Телефон
353	159	2	Phone
354	160	1	При добавлении сотрудника с вашего счета будет списано
355	160	2	When you add an employee, your account will be charged by
356	161	1	Персонал - Редактирование
357	161	2	Personnel - Edit
344	155	1	Персонал - Добавление
358	162	1	введите, если хотите изменить
359	162	2	enter to update
360	163	1	Сменить пароль
361	163	2	Change password
362	164	1	Смена пароля
363	164	2	Change password
364	165	1	Новый пароль
365	165	2	New password
366	166	1	Новый пароль еще раз
367	166	2	Repeat new password
368	167	1	Ваш логин
369	167	2	Your login
370	168	1	Пароли не совпадают
371	168	2	Passwords don't match
372	169	1	Пароль сохранен
373	169	2	Password saved
374	170	1	Карта столов
375	170	2	Table map
376	171	1	Залы
377	171	2	Halls
378	172	1	Залы
379	172	2	Halls
380	173	1	Название
381	173	2	Name
382	174	1	Места по горизонтали
383	174	2	Places horizontally
384	175	1	Места по вертикали
385	175	2	Places vertically
386	176	1	Позиция в списке
387	176	2	Position
388	177	1	Залы - Добавление
389	177	2	Halls - Add
390	178	1	Залы - Редактирование
391	178	2	Halls - Edit
392	179	1	Места
393	179	2	Places
394	180	1	Залы
395	180	2	Halls
396	181	1	чел.
397	181	2	pers.
398	182	1	Номер
399	182	2	No.
400	183	1	Кол-во мест
401	183	2	Seats qty
402	184	1	стол
403	184	2	table
404	185	1	Версия для печати
405	185	2	Print version
562	189	2	Categories
563	190	1	Категории - Добавление
564	190	2	Categories - Add
565	191	1	Категории - Редактирование
566	191	2	Categories - Edit
575	196	1	не задано
576	196	2	none
581	199	1	поиск по названию
582	199	2	search by name
589	203	1	Категории
590	203	2	Categories
595	206	1	Цена
596	206	2	Price
599	208	1	Калорийность, ккал
600	208	2	Calorific capacity, kcal
601	209	1	Время приготовления
602	209	2	Cooking time
603	210	1	Детали
604	210	2	Details
605	211	1	Позиция в списке
606	211	2	Position
607	212	1	Активность
608	212	2	Active
609	213	1	Рекомендуемое
610	213	2	Recommended
611	214	1	г
612	214	2	g
613	215	1	ккал
614	215	2	kcal
617	217	1	название или код
618	217	2	name or SKU
615	216	1	Фильтр
616	216	2	Filter
619	218	1	Изображения
620	218	2	Images
621	219	1	Ингредиенты
622	219	2	Ingredients
625	221	1	Используйте файлы .jpg и .png.
626	221	2	Use .jpg and .png files.
623	220	1	исключаемое
624	220	2	excludable
627	222	1	Главная
628	222	2	Home
629	223	1	Цена
630	223	2	Price
631	224	1	г
632	224	2	g
633	225	1	ккал
634	225	2	kcal
637	227	1	Подробнее...
638	227	2	Details...
639	228	1	Код
640	228	2	SKU
641	229	1	Вес
642	229	2	Weight
643	230	1	Время приготовления
644	230	2	Cooking time
645	231	1	Калорийность
646	231	2	Calorific capacity
647	232	1	Детали
648	232	2	Details
649	233	1	Ингредиенты
650	233	2	Ingredients
651	234	1	Количество
652	234	2	Quantity
653	235	1	Счет
659	238	1	Корзина
660	238	2	Cart
661	239	1	Заказать
662	239	2	Order
663	240	1	Итого
664	240	2	Total
869	241	1	Подача
654	235	2	Bill
657	237	1	Специальные предложения дня
636	226	2	Add to order
873	243	1	Заказ пуст
870	241	2	Service
875	244	1	Отправить заказ?
876	244	2	Send an order?
877	245	1	Ваш заказ принят!
878	245	2	Your order is accepted!
879	246	1	Ваш счет
881	247	1	Счет не открыт
882	247	2	Invoice is not open
883	248	1	Дата открытия
885	249	1	Состояние
886	249	2	Status
887	250	1	официант вызван
888	250	2	waiter is called
889	251	1	заказ дополнен
890	251	2	items added to order
891	252	1	расчет
892	252	2	payment
893	253	1	Закрыть счет
897	255	1	Ваш заказ
898	255	2	Your order
899	256	1	Сумма
901	257	1	Итого
902	257	2	Total
903	258	1	Скидка
904	258	2	Discount
905	259	1	Способ оплаты
906	259	2	Payment method
907	260	1	наличные
908	260	2	cash
911	262	1	Хотите закрыть счет и рассчитаться?
912	262	2	Do you want to pay off?
913	263	1	Пожалуйста, ожидайте официанта
914	263	2	Please expect a waiter
915	264	1	Вызвать официанта?
916	264	2	Call the waiter?
917	265	1	Пожалуйста, ожидайте официанта
918	265	2	Please expect a waiter
291	128	2	My orders
290	128	1	Мои заказы
921	267	1	Мои заказы
922	267	2	My orders
967	290	1	Комментарий клиента
927	270	1	Блюда в заказе
928	270	2	Dishes in order
929	271	1	Официант
930	271	2	Waiter
968	290	2	Customer comment
969	291	1	Комментарий официанта
970	291	2	Waiter comment
920	266	2	New orders
937	275	1	Просмотр
938	275	2	View
924	268	2	table
923	268	1	стол
925	269	1	Кол-во мест
926	269	2	Seats qty
947	280	1	нет
948	280	2	none
949	281	1	Статусы
950	281	2	Statuses
951	282	1	Отменить этот заказ?
952	282	2	Cancel this order?
953	283	1	Удалить статус "официант вызван"?
954	283	2	Remove "waiter called" status?
955	284	1	Удалить статус "заказ дополнен"?
956	284	2	Remove "items added" status?
957	285	1	Удалить статус "расчет"?
958	285	2	Remove "payment" status?
939	276	1	Принять
940	276	2	Accept
959	286	1	Принять этот заказ?
960	286	2	Accept this order?
963	288	1	Зал
964	288	2	Hall
965	289	1	Стол
966	289	2	Table
919	266	1	Новые заказы
961	287	1	Новые заказы - Просмотр
962	287	2	New orders - View
971	292	1	зал
972	292	2	hall
973	293	1	Дата создания
974	293	2	Created at
977	295	1	Содержание заказа
978	295	2	Order content
979	296	1	Подача
980	296	2	Serving
981	297	1	Сумма
982	297	2	Subtotal
983	298	1	Заказ уже принят другим сотрудником
984	298	2	Order is already accepted
985	299	1	Номер
986	299	2	No.
987	300	1	Мои заказы - Редактирование
988	300	2	My orders - Edit
989	301	1	чел.
990	301	2	seats
992	302	2	completed
942	277	2	Waiter is called
941	277	1	Официант вызван
991	302	1	выполнено
993	303	1	Оплата
994	303	2	Payment
995	304	1	Скидка, %
996	304	2	Discount, %
997	305	1	К оплате
998	305	2	Total
999	306	1	Способ оплаты
1000	306	2	Payment method
1001	307	1	наличные
1002	307	2	cash
1003	308	1	банковская карта
1004	308	2	bank card
1005	309	1	Завершить
1006	309	2	Complete
1007	310	1	Завершить этот заказ?
1008	310	2	Complete this order?
910	261	2	pay online
871	242	1	Дополнительные инструкции
895	254	1	Номер счета
896	254	2	Bill number
874	243	2	Order is empty
884	248	2	Opening date
900	256	2	Amount
880	246	2	Bill summary
894	253	2	Pay the bill
975	294	1	Статус
1009	311	1	Сохранить заказ?
1010	311	2	Save the order?
1011	312	1	Код
1012	312	2	Code
1013	313	1	Добавлено
1014	313	2	Added
1015	314	1	Прямая ссылка
1016	314	2	Direct link
1017	315	1	Выбор блюд
1018	315	2	Select dishes
1019	316	1	Добавить
1020	316	2	Add
1021	317	1	Добавлено
1022	317	2	Added
1023	318	1	Мои заказы - Добавление
1024	318	2	My orders - Add
1025	319	1	Активность
1026	319	2	Active
1027	320	1	активен
1028	320	2	active
1030	321	2	not active
1029	321	1	не активен
1033	323	1	Все заказы
1034	323	2	All orders
1035	324	1	Все заказы
1036	324	2	All orders
1037	325	1	Сумма
1038	325	2	Amount
1039	326	1	Кол-во заказов
1040	326	2	Orders qty
1041	327	1	Статус
1042	327	2	Status
1043	328	1	активен
1044	328	2	active
1045	329	1	завершен
1046	329	2	completed
1047	330	1	отменен
1048	330	2	cancelled
1049	331	1	Удалить заказ №
1050	331	2	Delete order #
1051	332	1	Сводка
1052	332	2	Summary
1053	333	1	QR-код
1054	333	2	QR code
1055	334	1	История заказов
1056	334	2	Order history
1057	335	1	Все заказы - Редактирование
1058	335	2	All orders - Edit
1059	336	1	Дата принятия
1060	336	2	Accepted at
1061	337	1	Дата завершения
1062	337	2	Completed at
944	278	2	Items added
943	278	1	Заказ дополнен
946	279	2	Payment
945	279	1	Расчет
1063	338	1	Отменить заказ №
1064	338	2	Cancel order #
1065	339	1	Завершить заказ №
1066	339	2	Complete order #
1067	340	1	Активировать
1068	340	2	Activate
1069	341	1	Активировать заказ №
1070	341	2	Activate order #
1071	342	1	Все заказы - Добавление
1072	342	2	All orders - Add
1089	351	1	Ед. измерения
1090	351	2	Unit
1091	352	1	Алкоголь
1092	352	2	Alcohol
1083	348	1	Кол-во заказов по месяцам года
1084	348	2	Orders qty by months of the year
1081	347	1	Доход по месяцам года
1082	347	2	Income by months of the year
1085	349	1	Экспорт
1086	349	2	Export
1087	350	1	мл
1088	350	2	ml
597	207	1	Вес/объем
598	207	2	Weight/volume
1094	353	2	Alcohol content, %
1093	353	1	Содерж. алкоголя, %
1095	354	1	мл
1096	354	2	ml
1097	355	1	Объём
1098	355	2	Volume
1099	356	1	Алкоголь
1100	356	2	Alcohol
1101	357	1	История заказов
1102	357	2	Order history
1103	358	1	Дата создания
1104	358	2	Created at
1105	359	1	Сумма
1106	359	2	Amount
1107	360	1	Статус
1108	360	2	Status
1109	361	1	завершен
1110	361	2	completed
1111	362	1	активен
1112	362	2	active
1113	363	1	отменен
1114	363	2	cancelled
1115	364	1	Ресторан
1116	364	2	Restaurant
1117	365	1	Кол-во заказов
1118	365	2	Orders qty
1119	366	1	Сводка
1120	366	2	Summary
1121	2	8	نشيط
1122	3	8	غير نشط
1125	20	8	تفويض
1128	22	8	بريد إلكتروني
1126	8	8	المطاعم النشطة
1127	10	8	المطاعم غير النشطة
1124	12	8	أوامر التاريخ
1133	29	8	تغيير كلمة المرور
1136	37	8	تسجيلك
1078	345	2	Table turnover per month
1077	345	1	Оборот по столам за месяц
1225	145	8	شؤون الموظفين
1237	155	8	شخصي - إضافة
1243	161	8	الأفراد - تحرير
1230	149	8	أنشئت في
1231	150	8	الاسم الكامل
1232	151	8	مدير
1229	172	8	قاعات
1075	344	1	Анализ
1076	344	2	Analysis
1073	343	1	Анализ
1074	343	2	Analytics
1254	177	8	القاعات - اضافة
1255	178	8	القاعات - تحرير
1236	173	8	اسم
1251	174	8	أماكن أفقية
1252	175	8	الأماكن عموديًا
1253	176	8	موضع
1215	170	8	خريطة الجدول
1257	180	8	قاعات
1259	182	8	لا.
1260	183	8	مقاعد الكمية
1261	184	8	طاولة
1262	185	8	النسخة المطبوعة
1264	189	8	فئات
1265	190	8	الفئات - إضافة
1266	191	8	الفئات - تحرير
1272	193	8	اسم
1275	200	8	أطباق
1276	201	8	الأطباق - إضافة
1277	202	8	الأطباق - تحرير
1278	203	8	فئات
1279	204	8	SKU
1140	51	8	الأربعاء
1141	52	8	يوم الخميس
1142	53	8	جمعة
1143	54	8	السبت
1144	55	8	الأحد
1145	56	8	يتقدم
1148	60	8	صفحة
1149	61	8	خروج
1150	62	8	يحفظ
1151	63	8	تحميل...
1152	64	8	بيت
1167	93	8	سنة
1179	102	8	فترة
1204	114	8	لا أحد
1205	119	8	منقي
1206	120	8	فرز
1181	123	8	أي
1226	146	8	لغة
1227	147	8	أجراءات
1228	148	8	عرض وتحرير
1234	153	8	كلمة المرور
1235	154	8	كلمة السر خاصتك
1244	162	8	أدخل للتحديث
1258	181	8	بيرس.
1268	196	8	لا أحد
1269	197	8	عرض قائمة
1155	68	8	تسجيل المطعم
1156	82	8	بيانات المطعم
1201	106	8	إعادة شحن الحساب
1183	79	8	المجال قيد الاستخدام بالفعل
1184	80	8	البريد الالكتروني قيد الاستخدام بالفعل
1185	16	8	أنشئت في
1186	17	8	اسم
1187	69	8	موقع إلكتروني
1189	71	8	هاتف
1191	73	8	ITN/TIN
1192	74	8	PSRN
1193	75	8	عملة
1194	76	8	تعليق
1195	77	8	البريد الإلكتروني المسؤول
1196	78	8	كلمة مرور المسؤول
1197	81	8	لغة
1200	105	8	المعاملات
1202	107	8	مطعم
1203	108	8	كمية
1182	124	8	موظفين
1198	125	8	ايام متبقية
1208	121	8	المعاملات
1209	110	8	مطعم
1210	111	8	أنشئت في
1211	112	8	يكتب
1160	86	8	تم حفظ كلمة المرور
1212	126	8	بيت
1307	128	8	طلباتي
1213	129	8	طلبات جديدة
1214	130	8	خريطة الجدول
1263	131	8	أطباق
1220	134	8	تعبئة رصيد
1173	96	8	تفويض
1174	97	8	بريد إلكتروني
1175	98	8	كلمة المرور
1176	99	8	تسجيل الدخول
1245	164	8	تغيير كلمة المرور
1246	165	8	كلمة المرور الجديدة
1247	166	8	كرر كلمة المرور الجديدة
1324	289	8	طاولة
1308	268	8	طاولة
1309	269	8	مقاعد
1310	270	8	الأطباق بالترتيب
1311	271	8	النادل
1314	277	8	يسمى النادل
1315	278	8	العناصر المضافة
1316	279	8	قسط
1284	235	8	فاتورة
1304	264	8	اتصل بالنادل؟
1283	222	8	بيت
1207	133	8	بيت
1216	136	8	قمت بتسجيل الدخول كما
1217	137	8	مطعم
1218	138	8	حالة الحساب
1221	142	8	حالة
1222	143	8	لا أحد
1223	139	8	ايام متبقية
1219	141	8	الشحنة التالية
1224	144	8	عدد الموظفين
1233	152	8	حالة
1238	156	8	بريد إلكتروني
1239	157	8	كلمة المرور
1240	158	8	البريد الالكتروني قيد الاستخدام بالفعل
1241	159	8	هاتف
1242	160	8	عند إضافة موظف ، سيتم فرض رسوم على حسابك بواسطة
1256	179	8	أماكن
1334	314	8	رابط مباشر
1267	192	8	أيقونة
1271	199	8	البحث عن طريق الإسم
1273	194	8	موضع
1274	195	8	نشيط
1335	315	8	حدد الأطباق
1280	205	8	اسم
1281	206	8	سعر
1282	207	8	الوزن/الحجم
1431	351	8	وحدة
1353	208	8	قدرة السعرات الحرارية ، KCAL
1354	209	8	وقت الطبخ
1355	210	8	تفاصيل
1356	211	8	موضع
1357	212	8	نشيط
1358	213	8	مُستَحسَن
1359	214	8	ز
1434	350	8	مل
1360	215	8	kcal
1361	216	8	منقي
1362	217	8	الاسم أو sku
1363	218	8	الصور
1379	219	8	مكونات
1380	220	8	استبعاد
1381	221	8	استخدم ملفات .jpg و .png.
1432	352	8	الكحول
1433	353	8	محتوى الكحول، ٪
1138	49	8	الاثنين
1139	50	8	يوم الثلاثاء
1153	57	8	لم يتم تعيين التاريخ
1154	67	8	غير مضبوط
1157	83	8	خلف
1158	84	8	يضيف
1159	85	8	يغلق
1161	87	8	نعم
1162	88	8	لا
1163	89	8	يمسح
1164	90	8	يلغي
1165	91	8	يوم
1166	92	8	شهر
1338	140	8	DH
1270	198	8	إخفاء القائمة
1343	319	8	نشيط
1438	357	8	تاريخ الطلب
1439	358	8	أنشئت في
1440	359	8	كمية
1441	360	8	حالة
1442	361	8	مكتمل
1443	362	8	نشيط
1369	323	8	جميع الطلبات
1370	132	8	إحصائيات
1371	127	8	شؤون الموظفين
1372	163	8	تغيير كلمة المرور
1373	171	8	قاعات
1374	186	8	القاعات والجداول
1375	187	8	مطبخ
1376	188	8	فئات
1340	266	8	طلبات جديدة
1342	287	8	أوامر جديدة - عرض
1341	267	8	طلباتي
1326	301	8	مقاعد الكمية
1419	338	8	الغاء الطلب #
1333	310	8	اكمل الطلب #
1420	339	8	أكمل هذا الطلب؟
1327	311	8	حفظ الطلب؟
1388	331	8	حذف الطلب #
1422	341	8	تنشيط الطلب #
1389	292	8	قاعة
1378	299	8	لا.
1400	302	8	مكتمل
1401	303	8	قسط
1402	304	8	تخفيض، ٪
1403	306	8	طريقة الدفع او السداد
1404	307	8	نقدي
1405	308	8	بطاقة مصرفية
1406	312	8	شفرة
1407	325	8	كمية
1408	326	8	أوامر الكمية
1409	327	8	حالة
1410	328	8	نشيط
1411	329	8	مكتمل
1412	330	8	ألغيت
1417	336	8	قبلت
1418	337	8	أكمل في
1430	349	8	يصدّر
1328	223	8	سعر
1329	224	8	ز
1435	354	8	مل
1330	225	8	kcal
1382	230	8	وقت الطبخ
1383	231	8	القدرة الحرارية
1384	232	8	تفاصيل
1385	233	8	مكونات
1386	234	8	كمية
1387	313	8	وأضاف
1347	238	8	عربة التسوق
1348	239	8	طلب
1349	240	8	المجموع
1426	345	8	دوران الجدول في الشهر
1427	346	8	دوران الموظف الشهري
1312	275	8	منظر
1322	276	8	يقبل
1313	280	8	لا أحد
1317	281	8	الحالات
1332	309	8	مكتمل
1336	316	8	يضيف
1337	317	8	وأضاف
1344	320	8	نشيط
1345	321	8	غير فعال
1413	332	8	ملخص
1414	333	8	رمز الاستجابة السريعة
1415	334	8	تاريخ الطلب
1421	340	8	تفعيل
1146	58	8	حدث خطأ. الرجاء معاودة المحاولة في وقت لاحق.
1147	59	8	تم الرفض
1123	4	8	تغيير كلمة المرور
1129	23	8	كلمة المرور
1130	24	8	تسجيل الدخول
1131	32	8	الدخول مع جوجل
1132	33	8	تسجيل الدخول مع Apple
1188	70	8	اسم شخص الاتصال
1190	72	8	عنوان
1168	113	8	كمية
1169	115	8	آلي
1170	116	8	موظف مطعم
1171	117	8	مدير النظام
1172	118	8	المجموع
1180	122	8	ملخص
1134	35	8	كلمة المرور الجديدة
1135	36	8	كرر كلمة المرور الجديدة
1137	38	8	لا تتطابق كلمات المرور
1444	363	8	ألغيت
1445	364	8	مطعم
1446	365	8	أوامر الكمية
1447	366	8	ملخص
1177	100	8	الدخول مع جوجل
1178	101	8	تسجيل الدخول مع Apple
1248	167	8	تسجيلك
1249	168	8	لا تتطابق كلمات المرور
1250	169	8	تم حفظ كلمة المرور
1325	300	8	أوامري - تحرير
1339	318	8	أوامري - أضف
1377	324	8	جميع الطلبات
1416	335	8	جميع الطلبات - تحرير
1364	241	8	خدمة
1425	344	8	تحليل
1424	343	8	تحليل
1199	103	8	رصيد الحساب
1423	342	8	جميع الطلبات - إضافة
1318	282	8	إلغاء هذا الطلب؟
1319	283	8	إزالة "النادل يسمى" الحالة؟
1320	284	8	إزالة حالة "العناصر المضافة"؟
1321	285	8	إزالة حالة "الدفع"؟
1323	286	8	قبول هذا الطلب؟
1390	288	8	قاعة
1391	290	8	تعليق العميل
1392	291	8	تعليق النادل
1393	293	8	أنشئت في
1395	295	8	طلب محتوى
1396	296	8	خدمة
1397	297	8	نطاق فرعي
1398	305	8	المجموع
1399	298	8	تم قبول الطلب بالفعل
1428	347	8	الدخل بأشهر من العام
1429	348	8	أوامر Qty بأشهر من العام
1306	265	8	يرجى توقع نادل
1350	227	8	تفاصيل...
1351	228	8	SKU
1352	229	8	وزن
1436	355	8	مقدار
1437	356	8	الكحول
1367	244	8	إرسال طلب؟
1368	245	8	طلبك مقبول!
1287	246	8	فاتورة
1288	247	8	الفاتورة ليست مفتوحة
1290	249	8	حالة
1291	250	8	يسمى النادل
1292	251	8	العناصر المضافة إلى الطلب
1293	252	8	قسط
1294	253	8	.سدد دينك
1296	255	8	طلبك
1297	256	8	نطاق فرعي
1298	257	8	المجموع
1299	258	8	تخفيض
1300	259	8	طريقة الدفع او السداد
1301	260	8	نقدي
1303	262	8	هل تريد أن تؤتي ثمارها؟
1305	263	8	يرجى توقع نادل
1079	346	1	Оборот по сотрудникам за месяц
1080	346	2	Monthly employee turnover
1448	367	8	نوع المنشأة
1449	367	1	Тип заведения
1450	367	2	Faclility type
1451	368	8	لا أحد
1452	368	1	Не указано
1453	368	2	None
1454	369	8	طوابق
1455	369	1	Этажи
1456	369	2	Floors
1457	370	8	غرف
1458	370	1	Комнаты
1459	370	2	Rooms
1460	371	8	الطوابق والغرف
1461	371	1	Этажи и комнаты
1462	371	2	Floors and rooms
1463	372	8	طوابق
1464	372	1	Этажи
1465	372	2	Floors
1469	374	8	أماكن أفقية
1470	374	1	Места по горизонтали
1471	374	2	Places horizontally
1472	375	8	الأماكن عموديًا
1473	375	1	Места по вертикали
1474	375	2	Places vertically
1475	376	8	أماكن
1476	376	1	Места
1477	376	2	Places
1478	377	8	الطوابق - أضف
1479	377	1	Этажи - Добавить
1480	377	2	Этажи - Добавить
1481	378	8	الطوابق - تحرير
1482	378	1	Этажи — Редактирование
1483	378	2	Floors - Edit
1466	373	8	رقم
1467	373	1	Номер
1468	373	2	Number
1484	379	8	طوابق
1485	379	1	Этажи
1486	379	2	Floors
1487	380	8	غرف
1488	380	1	Номера
1489	380	2	Rooms
1490	381	8	سعة
1491	381	1	Вместимость
1492	381	2	Capacity
1493	382	8	النسخة المطبوعة
1494	382	1	Версия для печати
1495	382	2	Print version
1496	383	8	رابط مباشر
1497	383	1	Прямая ссылка
1498	383	2	Direct link
1499	384	8	غرفة
1500	384	1	Комната
1501	384	2	Room
1502	385	8	أرضية
1503	385	1	Этаж
1504	385	2	Floor
1505	386	8	غرف
1506	386	1	Комнаты
1507	386	2	Rooms
1508	387	8	نوع الغرفة
1509	387	1	Тип комнаты
1510	387	2	Room type
1511	388	8	يكمل
1512	388	1	Продолжить
1513	388	2	Continue
1514	389	8	يدفع
1515	389	1	Оплатить
1516	389	2	Pay
1517	390	8	تجديد الرصيد بمقدار
1518	390	1	Баланс пополнен на
1519	390	2	Balance replenished by 
1520	391	8	شحن الرصيد تلقائيًا
1521	391	1	Автоматически пополнять счет
1522	391	2	Automatically recharge balance
1523	392	8	ليتم خصمها
1524	392	1	К списанию
1525	392	2	To be debited
1526	393	8	للدفع
1331	226	8	اضافة للأمر
1295	254	8	رقم الفاتوره
1366	243	8	الطلب فارغ
1289	248	8	موعد الافتتاح
1394	294	8	حالة
1527	393	1	К оплате
1528	393	2	Charge for
1529	394	8	الطلبات المجمعة
1530	394	1	Объединенные заказы
1531	394	2	Combined orders
1532	395	8	يرفض
1533	395	1	Отклонить
1534	395	2	Reject
1535	396	8	كمية الطلبات المجمعة
1536	396	1	Cумма объединенных заказов
1537	396	2	Combined orders total
1538	397	8	انهيار جميع
1539	397	1	Свернуть все
1540	397	2	Collapse all
1541	398	8	أوامر للجدول
1542	398	1	Заказы на стол
1543	398	2	Orders for table
1544	399	8	أوامر للغرفة
1545	399	1	Заказы на номер
1546	399	2	Orders for the room
1547	400	8	فوق حتى
1548	400	1	Пополнить
1550	401	8	مطعم
1551	401	1	Ресторан
1552	401	2	Restaurant
1553	402	8	كمية
1554	402	1	Количество
1555	402	2	Amount
1556	403	8	ليتم خصمها
1557	403	1	К списанию
1558	403	2	To be debited
1559	404	8	للدفع
1560	404	1	К оплате
1561	404	2	Charge for
1562	405	8	ضريبة
1563	405	1	Налог
1564	405	2	Tax
1565	406	8	ضريبة القيمة المضافة
1566	406	1	НДС
1567	406	2	VAT
1568	407	8	عمولة الخدمة
1569	407	1	Комиссия сервиса
1570	407	2	Service fee
1571	408	8	عمولة نظام الدفع
1572	408	1	Комиссия платежной системы
1573	408	2	Gateway fee
1574	409	8	طريقة الدفع او السداد
1575	409	1	Способ оплаты
1576	409	2	Payment method
1577	410	8	إضافة حساب
1578	410	1	Добавить счет
1579	410	2	Add account
1580	411	8	يحفظ
1581	411	1	Сохранить
1582	411	2	Save
1583	412	8	معلومات الدفع
1584	412	1	Платежная информация
1585	412	2	Payment info
1586	413	8	أطفئ
1587	413	1	Отключено
1588	413	2	Disabled
1589	414	8	طرق الدفع
1590	414	1	Способы оплаты
1591	414	2	Payment methods
1592	415	8	تخصيص QR
1593	415	1	Настроить QR
1594	415	2	Customize QR
1595	416	8	إلغاء جميع الطلبات على الجدول №
1596	416	1	Отменить все заказы за столом №
1597	416	2	Cancel all orders at table №
1598	417	8	إلغاء جميع الطلبات في الغرفة №
1599	417	1	Отменить все заказы в комнате №
1600	417	2	Cancel all orders at room №
1607	420	8	قم بتأكيد الكل
1608	420	1	Подтвердить все
1610	421	8	تأكيد الحالي
1611	421	1	Подтвердить текущий
1613	422	8	لا تلغي
1614	422	1	Не отменять
1615	422	2	Don't cancel
1616	423	8	إلغاء الحالي
1617	423	1	Отменить текущий
1618	423	2	Cancel current
1619	424	8	ألغ الكل
1620	424	1	Отменить все
1621	424	2	Cancel all
1606	419	2	Complete all orders at table №
1605	419	1	Выполнить все заказы за столом №
1604	419	8	أكمل جميع الطلبات على الجدول №
1603	418	2	Complete all orders at room №
1602	418	1	Выполнить все заказы в комнате №
1601	418	8	أكمل جميع الطلبات في الغرفة №
1612	421	2	Complete current
1609	420	2	Complete all
1622	425	8	مسافة بادئة
1623	425	1	Отступ
1624	425	2	Margin
1625	426	8	نوع النقطة
1626	426	1	Тип точки
1627	426	2	Dot type
1628	427	8	لون النقطة
1629	427	1	Цвет точек
1630	427	2	Dot color
1631	428	8	نوع نقطة الزاوية
1632	428	1	Тип угловой точки
1633	428	2	Corner dot type
1634	429	8	لون نقطة الزاوية
1635	429	1	Цвет угловой точки
1636	429	2	Corner dot color
1637	430	8	نوع الزاوية
1638	430	1	Тип угла
1639	430	2	Corner type
1549	400	2	Recharge
1640	431	8	لون الزاوية
1641	431	1	Цвет угла
1642	431	2	Corner-color
1643	432	8	هامش الصورة
1644	432	1	Отступ изображения
1645	432	2	Image margin
1646	433	8	حجم الصورة
1647	433	1	Размер изображения
1648	433	2	Image size
1649	434	8	لون الخلفية
1650	434	1	Цвет фона
1651	434	2	Background color
1655	436	8	مقاس
1656	436	1	Размер
1657	436	2	Size
1658	437	8	اختر صورة
1659	437	1	Выбрать изображение
1660	437	2	Select-icon
1661	438	8	يحفظ
1662	438	1	Сохранить
1663	438	2	Save
1652	435	8	صورة
1653	435	1	Изображение
1654	435	2	Image
1664	439	8	اسم
1665	439	1	Название
1666	439	2	Name
1667	440	8	الوحدات
1668	440	1	Единицы измерения
1669	440	2	Units
1670	441	8	مكونات
1671	441	1	Ингредиенты
1672	441	2	Ingredients
1673	442	8	كمية
1674	442	1	Количество
1675	442	2	Quantity
1676	443	8	يتصل
1677	443	1	Подключить
1678	443	2	Connect
1679	444	8	متصل
1680	444	1	Подключен
1681	444	2	Connected
1682	445	8	عاجز
1683	445	1	Отключено
1684	445	2	Disabled
1685	446	8	المفتاح السري لواجهة برمجة التطبيقات. يمكن إنشاؤها في علامة التبويب "المطورون"
1686	446	1	Секретный ключ API. Может быть создан во вкладке "Разработчикам"
1687	446	2	API secret key. Can be created in "Developers" tab
1688	447	8	مفتاح API العام. يمكن إنشاؤها في علامة التبويب "المطورون"
1689	447	1	Публичный ключ API. Может быть создан во вкладке "Разработчикам"
1690	447	2	Public API key. Can be created in the "Developers" tab
1691	448	8	المفتاح المرتبط بكيان Checkout المحدد عند إنشاء المفتاح السري. متاح للعرض بعد تحديد مفتاح سري في علامة التبويب "المطورون"
1692	448	1	Ключ, связанный с сущностью Checkout, выбранной при создании секретного ключа. Доступен для просмотра после выбора секретного ключа на вкладке "Разработчикам"
1693	448	2	The key associated with the Checkout entity selected when generating the secret key. Available for viewing after selecting a secret key on the "Developers" tab.
1694	449	8	يقع في علامة التبويب "المطورون" ، يجب أن يكون افتراضيًا
1695	449	1	Находится на вкладке «Разработчикам», должен быть стандартным
1696	449	2	Found in "Developers" tab, should be standard
1697	450	8	تحديث
1698	450	1	Обновить
1699	450	2	Update
1700	451	8	فشل التحقق من صحة المفاتيح. أدخل القيم الصحيحة وحاول مرة أخرى
1701	451	1	Не удалось проверить ключи. Введите правильные значения и повторите попытку.
1702	451	2	Failed to validate keys. Enter correct values and try again
1703	452	8	فشل إنشاء الرد التلقائي على الويب. تحقق من المفاتيح وحاول مرة أخرى
1704	452	1	Не удалось создать вебхук. Проверьте ключи и повторите попытку
1705	452	2	Failed to create webhook. Check keys and try again
1706	453	8	مدفوع
1707	453	1	Оплачено
1708	453	2	Paid
909	261	1	оплатить онлайн
1302	261	8	ادفع عبر الإنترنت
1712	455	8	الحد الأدنى للدفع 0.50 دولار
1713	455	1	Минимальная сумма платежа 0.50$
1714	455	2	Minimum payment amount is 0.50$
1715	456	8	اسم
1716	456	1	Имя
1717	456	2	Name
1718	457	8	وحدة
1719	457	1	Единица измерения
1720	457	2	Unit
1721	458	8	سعر
1722	458	1	Цена
1723	458	2	Price
1724	459	8	مكونات
1725	459	1	Ингредиенты
1726	459	2	Ingredients
1727	460	8	المكونات - أضف
1728	460	1	Ингредиенты - добавить
1729	460	2	Ingredients - Add
1730	461	8	المكونات - تحرير
1731	461	1	Ингредиенты - Изменить
1732	461	2	Ingredients - Edit
1733	462	8	سعر الكلفة
1734	462	1	Себестоимость
1735	462	2	Cost price
1736	463	8	المكونات
1737	463	1	Ингредиент
1738	463	2	Ingredient
1739	464	8	كمية
1740	464	1	Количество
1741	464	2	Amount
1742	465	8	مكونات
1743	465	1	Ингредиенты
1744	465	2	Ingredients
1745	466	8	سياسة الخصوصية
1746	466	1	Политика Конфиденциальности
1747	466	2	Privacy Policy
1748	467	8	تم تطويره بواسطة IQ SPECIAL SYSTEM INTEGRATION IT LLC ، ترخيص № 1120015 ، دبي - جميع الحقوق محفوظة
1749	467	1	Разработано IQ SPECIAL SYSTEM INTEGRATION IT LLC, Лицензия № 1120015, Дубай - Все права защищены
1750	467	2	Developed by IQ SPECIAL SYSTEM INTEGRATION IT LLC, License № 1120015, Dubai - All right reserved
1751	468	8	مسببات الحساسية
1752	468	1	Аллергены
1753	468	2	Allergens
655	236	1	Официант/Официантка
656	236	2	Waiter/Waitress
1285	236	8	نادل/نادلة
658	237	2	Specials of the day
1286	237	8	العروض الخاصة لهذا اليوم
1365	242	8	تعليمات إضافية
872	242	2	Additional instructions
1346	322	8	من فضلك ، حدد اسمك ورغباتك في الطلب
1031	322	1	Пожалуйста, укажите свое имя и пожелания для заказа
1032	322	2	Please, specify your name and wishes for the order
1754	469	8	مكان الامر
1755	469	1	Разместить заказ
1756	469	2	Place order
635	226	1	Добавить в заказ
1760	471	8	محطة الدفع
1761	471	1	платежный терминал
1762	471	2	payment terminal
1757	470	8	POS
1758	470	1	POS
1759	470	2	POS
1763	472	8	فوق حتى
1764	472	1	Пополнить
1765	472	2	Top up
976	294	2	Status
26	12	2	Order history
241	103	2	Account balance
240	103	1	Баланс
1766	473	8	عدد المراجعات
1767	473	1	Количество отзывов
1768	473	2	Number of reviews
1769	474	8	نسبة المراجعات
1770	474	1	Процент отзывов
1771	474	2	Percentage of reviews
1772	475	8	خدمة
1773	475	1	Обслуживание
1774	475	2	Service
1775	476	8	الجو المحيط
1776	476	1	Атмосфера
1777	476	2	Ambience
1781	478	8	ارجوك قم بتقييمنا
1782	478	1	Пожалуйста, оцените нас
1783	478	2	Please rate us
1784	479	8	من فضلك أخبرنا عن تجربتك
1785	479	1	Пожалуйста, расскажите нам о своем опыте
1786	479	2	Please tell us about your experience
1787	480	8	يرسل
1788	480	1	Отправить
1789	480	2	Submit
1790	481	8	التقييمات
1791	481	1	Рейтинг
1792	481	2	Ratings
1793	482	8	تظهر في
1794	482	1	Показать в
1795	482	2	Show in
1778	477	8	مذاق الطعام
1779	477	1	Вкус еды
1780	477	2	Food taste
1796	483	8	حساب التعبئة
1797	483	1	Пополнить счет
1798	483	2	Top up account
1799	484	8	هل لديك أي نوع من الحساسية:
1800	484	1	Есть ли у вас аллергия:
1801	484	2	Do you have any allergies:
1802	485	8	يرجى الإشارة ...
1803	485	1	Пожалуйста, укажите...
1804	485	2	Please, specify…
1805	486	8	تعليق الحساسية
1806	486	1	Комментарий к аллергии
1807	486	2	Allergies comment
\.


--
-- TOC entry 3831 (class 0 OID 25994)
-- Dependencies: 292
-- Data for Name: vne_wordbooks; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_wordbooks (id, name, pos) FROM stdin;
5	common	1
2	owner-common	2
3	owner-login	3
1	owner-restaurants	4
4	owner-password	6
8	owner-transactions	5
7	restorator-common	8
6	restorator-login	9
11	restorator-password	10
9	restorator-home	11
10	restorator-employees	12
13	restorator-halls	13
12	restorator-tables	14
14	restorator-cats	15
15	restorator-products	16
21	restorator-orders	17
22	restorator-stats	18
18	customer-common	19
16	customer-home	20
17	customer-menu	21
19	customer-cart	22
20	customer-invoice	23
23	owner-orders	7
24	restorator-floors	15
25	common-pay	0
26	restorator-qr	15
27	restorator-ingredients	10
28	restorator-ingr-units	0
29	common-reviews	0
\.


--
-- TOC entry 3833 (class 0 OID 26003)
-- Dependencies: 294
-- Data for Name: vne_words; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_words (id, wordbook_id, pos, mark, note) FROM stdin;
2	2	1	menu-active	\N
3	2	2	menu-inactive	\N
4	2	3	menu-pw	\N
12	1	102	history	\N
20	3	1	title	\N
8	1	1	title-active	\N
10	1	2	title-inactive	\N
22	3	2	email	\N
23	3	3	password	\N
24	3	4	login	\N
32	3	5	with-google	\N
33	3	6	with-apple	\N
29	4	1	title	\N
35	4	2	password1	\N
36	4	3	password2	\N
37	4	4	login	\N
38	4	5	error-mismatch	\N
49	5	1	mo	\N
50	5	2	tu	\N
51	5	3	we	\N
52	5	4	th	\N
53	5	5	fr	\N
54	5	6	sa	\N
55	5	7	su	\N
56	5	100	apply	\N
58	5	200	error	\N
59	5	201	error-401	\N
60	5	102	page	\N
61	5	103	logout	\N
62	5	104	save	\N
63	5	105	loading	\N
64	5	106	home	\N
57	5	101	no-date	\N
67	5	107	not-set	\N
68	1	3	title-create	\N
82	1	4	title-edit	\N
83	5	108	back	\N
84	5	109	create	\N
85	5	110	close	
86	4	6	saved	\N
87	5	111	yes	\N
88	5	112	no	\N
89	5	113	delete	\N
90	5	114	cancel	\N
91	5	115	day	\N
92	5	116	month	\N
93	5	117	year	\N
113	8	4	amount	\N
115	8	5	type-auto	\N
116	8	6	type-employee	\N
117	8	7	type-admin	\N
118	8	8	sum	
96	6	1	title	\N
97	6	2	email	\N
98	6	3	password	\N
99	6	4	login	\N
100	6	5	with-google	\N
101	6	6	with-apple	\N
102	5	118	period	\N
122	8	9	summary	\N
123	5	122	any	\N
124	1	129	employees-q	\N
79	1	107	error-domain-duplication	\N
80	1	108	error-email-duplication	\N
16	1	109	created-at	\N
17	1	110	name	\N
69	1	111	domain	\N
70	1	112	ownername	\N
71	1	113	phone	\N
72	1	114	address	\N
73	1	115	inn	\N
74	1	116	ogrn	\N
75	1	117	currency	\N
76	1	118	comment	\N
77	1	119	admin-email	\N
78	1	120	admin-password	\N
81	1	121	lang	\N
125	1	130	daysleft	\N
103	1	124	money	\N
105	1	125	transactions	\N
106	1	101	recharge	\N
107	1	126	restaurant	\N
108	1	127	amount	\N
114	5	119	none	\N
119	5	120	filter	\N
120	5	121	sorting	\N
133	9	0	title	\N
121	8	0	title	\N
110	8	1	restaurant	\N
111	8	2	created-at	\N
112	8	3	type	\N
126	7	1	menu-home	\N
129	7	3	menu-new-orders	\N
130	7	5	menu-tables	\N
170	12	1	title	\N
136	9	0	signed-as	\N
137	9	0	restaurant	\N
138	9	0	acc-state	\N
141	9	0	acc-nextcharge	\N
134	7	100	recharge	\N
142	9	0	status	\N
143	9	0	status-none	\N
139	9	0	acc-daysleft	
144	9	0	employees-q	\N
145	10	1	title-index	\N
146	5	124	lang	\N
147	5	125	actions	\N
148	5	126	edit	\N
172	13	1	title-index	\N
149	10	100	created-at	\N
150	10	101	name	\N
151	10	102	admin	\N
152	10	103	status	\N
153	5	127	password	\N
154	5	128	your-password	\N
173	13	100	name	\N
155	10	2	title-create	\N
156	10	104	email	\N
157	10	105	password	\N
158	10	106	error-email-duplication	\N
159	10	107	phone	\N
160	10	108	note	\N
161	10	3	title-edit	\N
162	5	129	password-change	\N
164	11	0	title	\N
165	11	0	password1	\N
166	11	0	password2	\N
167	11	0	login	\N
168	11	0	error-mismatch	\N
169	11	0	saved	\N
174	13	101	nx	\N
175	13	102	ny	\N
176	13	103	pos	\N
177	13	2	title-create	\N
178	13	3	title-edit	\N
179	13	104	places	\N
180	12	2	halls	\N
181	5	130	pers	\N
182	12	3	no	\N
183	12	4	seats	\N
184	12	5	table	\N
131	7	6	menu-products	\N
189	14	1	title-index	\N
190	14	2	title-create	\N
191	14	3	title-edit	\N
192	14	100	icon	\N
196	5	131	not-set	\N
197	5	132	show-list	\N
198	5	133	hide-list	\N
199	14	101	icon-filter	\N
193	14	102	name	\N
194	14	103	pos	\N
195	14	104	active	\N
207	15	104	weight	\N
222	16	1	title	\N
235	18	0	invoice	\N
236	18	0	call	\N
237	18	0	recommended	\N
246	20	0	invoice	\N
247	20	0	not-open	\N
248	20	0	created-at	\N
249	20	0	status	\N
250	20	0	need-waiter	\N
251	20	0	need-products	\N
252	20	0	need-invoice	\N
253	20	0	close	\N
254	20	0	no	\N
255	20	0	your-order	\N
256	20	0	subtotal	\N
257	20	0	total	\N
258	20	0	discount	\N
259	20	0	paymethod	\N
260	20	0	cash	\N
261	20	0	card	\N
262	20	0	confirm-close	\N
264	18	0	confirm-waiter	\N
263	20	0	closed-msg	\N
265	18	0	wait-waiter	\N
128	7	2	menu-my-orders	\N
268	21	100	table	\N
269	21	101	seats	\N
270	21	102	q	\N
271	21	103	employee	\N
275	5	134	view	\N
280	5	136	empty	\N
277	21	200	need-waiter	\N
278	21	201	need-products	\N
279	21	202	need-invoice	\N
281	5	136	statuses	\N
282	21	104	confirm-cancel	\N
283	21	105	confirm-unneed-waiter	\N
284	21	106	confirm-unneed-products	\N
285	21	107	confirm-unneed-invoice	\N
276	5	135	accept	\N
286	21	108	confirm-accept	\N
289	21	100	table2	\N
300	21	4	title-my-edit	\N
301	21	101	seats2	\N
311	21	110	confirm-save	\N
223	17	1	price	\N
224	17	2	g	\N
225	17	4	kcal	\N
226	17	5	to-cart	\N
309	5	137	complete	\N
310	21	109	confirm-complete	\N
314	12	7	link	\N
316	5	138	add	\N
317	5	139	added	\N
140	5	123	currency-name	это просто обозначение валюты самой системы
318	21	5	title-my-create	\N
266	21	1	title-new-index	\N
267	21	3	title-my-index	\N
287	21	2	title-new-view	\N
319	1	131	active	\N
320	5	140	is-active	\N
321	5	141	is-not-active	\N
322	19	6	comment-placeholder	
238	19	1	cart	\N
239	19	2	order	\N
240	19	3	total	\N
227	17	6	more	\N
228	17	7	code	\N
229	17	8	weight	\N
208	15	106	cal	\N
209	15	107	time	\N
210	15	108	about	\N
211	15	109	pos	\N
212	15	110	active	\N
213	15	111	recommended	\N
214	15	112	g	\N
215	15	114	kcal	\N
216	15	115	filter	\N
217	15	116	name-code	\N
218	15	117	images	\N
241	19	4	serving	\N
242	19	5	comment	\N
243	19	7	empty	\N
244	19	8	confirm-sending	\N
245	19	9	order-accepted	\N
323	7	4	menu-all-orders	\N
132	7	7	menu-stat	\N
127	7	8	menu-employees	\N
163	7	9	menu-pw	\N
171	7	10	menu-halls	\N
186	7	11	menu-halls-tables	\N
187	7	12	menu-kitchen	\N
188	7	13	menu-cats	\N
324	21	6	title-all-index	\N
299	21	123	no	\N
219	15	118	ingredients	\N
220	15	119	excludable	\N
221	15	120	images-note	\N
230	17	10	time	
231	17	11	cal	\N
232	17	12	about	\N
233	17	13	ingredients	\N
234	17	14	q	\N
313	17	15	added	\N
331	21	111	confirm-delete	\N
292	21	112	hall2	\N
288	21	113	hall	\N
290	21	114	customer-comment	\N
291	21	115	employee-comment	\N
293	21	116	created-at	\N
294	21	117	statuses	\N
295	21	118	content	\N
296	21	119	serving	\N
297	21	120	subtotal	\N
305	21	121	total	\N
298	21	122	accept-conflict	\N
302	21	124	completed	\N
303	21	125	payment	\N
304	21	126	discount	\N
306	21	127	paymethod	\N
307	21	128	paymethod-cash	\N
308	21	129	paymethod-card	\N
312	21	130	code	\N
325	21	131	sum	\N
326	21	132	orders-q	\N
327	21	133	status	\N
328	21	134	status-active	\N
329	21	135	status-completed	\N
330	21	136	status-cancelled	\N
332	5	142	summary	\N
333	5	143	qr	\N
334	5	144	order-history	\N
335	21	7	title-all-edit	\N
336	21	137	accepted-at	\N
337	21	138	completed-at	\N
338	21	104	confirm-cancel2	\N
339	21	109	confirm-complete2	\N
340	5	145	activate	\N
341	21	111	confirm-activate	\N
342	21	8	title-all-create	\N
343	7	14	menu-stats	\N
344	22	0	title	\N
345	22	1	stat-tsm	\N
346	22	2	stat-esm	\N
347	22	3	stat-sy	\N
348	22	4	stat-oy	\N
349	21	139	export	\N
351	15	105	unit	\N
352	15	121	alc	\N
353	15	122	alc-percent	\N
350	15	113	ml	\N
354	17	3	ml	\N
355	17	9	volume	\N
356	17	16	alc	\N
357	23	1	title	\N
358	23	2	created-at	\N
359	23	3	sum	\N
360	23	4	status	\N
361	23	5	status-completed	\N
362	23	6	status-active	\N
363	23	7	status-cancelled	\N
364	23	8	restaurant	\N
365	23	9	q	\N
366	23	10	summary	\N
200	15	1	title-index	
201	15	2	title-create	
202	15	3	title-edit	
315	15	4	title-finder	
203	15	100	cats	
204	15	101	code	
205	15	102	name	
206	15	103	price	
367	1	0	type	\N
368	1	0	type-none	\N
369	7	0	menu-floors	\N
370	7	0	menu-rooms	\N
371	7	0	menu-floors-rooms	\N
372	24	0	title-index	\N
374	24	0	nx	\N
375	24	0	ny	\N
376	24	0	places	\N
377	24	0	title-create	\N
378	24	0	title-edit	\N
373	24	0	number	\N
379	24	0	floors	\N
380	24	0	rooms-title	\N
381	24	0	capacity	\N
382	24	0	print-versions	\N
383	24	0	link	\N
185	12	6	print-versions	\N
384	21	0	room	\N
385	21	0	floor	\N
386	24	0	rooms	\N
387	24	0	room-type	\N
388	5	146	continue	\N
389	5	147	pay	\N
390	2	4	balance-updated	\N
391	1	100	subscription-desc	\N
392	8	10	to-be-debited	\N
393	8	11	charge-for	\N
394	21	0	grouped-orders	\N
395	5	0	reject	\N
396	21	0	grouped-sum	\N
397	21	0	collapse-all	\N
398	21	0	title-for-table	\N
399	21	0	title-for-room	\N
400	25	0	recharge	\N
401	25	0	restaurant	\N
402	25	0	amount	\N
403	25	0	to-be-debited	\N
404	25	0	charge-for	\N
405	25	0	tax	\N
406	25	0	vat	\N
407	25	0	service-fee	\N
408	25	0	gateway-fee	\N
410	25	0	add-account	\N
411	25	0	save	\N
412	25	0	payment-info	\N
413	25	0	disabled	\N
414	25	0	paymenth-methods	\N
409	25	0	payment-methods	\N
415	7	0	customize-qr	\N
416	21	0	confirm-cancel-group-t	\N
417	21	0	confirm-cancel-group-r	\N
418	21	0	confirm-complete-group-r	\N
419	21	0	confirm-complete-group-t	\N
420	21	0	confirm-group-all	\N
421	21	0	confirm-group-current	\N
422	21	0	comfirm-cancel-no	\N
423	21	0	cancel-group-current	\N
424	21	0	cancel-group-all	\N
425	26	0	margin	\N
426	26	0	dot-type	\N
428	26	0	corner-dot-type	\N
429	26	0	corner-dot-color	\N
430	26	0	corner-type	\N
431	26	0	corner-color	\N
432	26	0	image-margin	\N
433	26	0	image-size	\N
434	26	0	background-color	\N
436	26	0	size	\N
437	26	0	select-icon	\N
438	26	0	save	\N
427	26	0	dot-color	\N
435	26	0	image	\N
439	27	0	name	\N
440	27	0	units	\N
441	27	0	title	\N
442	27	0	quantity	\N
443	25	0	connect	\N
444	25	0	connected	\N
445	25	0	disabled	\N
446	25	0	secret-key-cko	\N
447	25	0	public-key-cko	\N
448	25	0	processing-channel-cko	\N
449	25	0	secret-key-stripe	\N
450	25	0	update	\N
451	25	0	key-validation-fail	\N
452	25	0	wh-validation-fail	\N
453	21	0	paid	\N
473	29	0	review-number	\N
455	25	0	stripe-min-amount-error	\N
456	28	0	ingr-name	\N
457	28	0	ingr-unit	\N
458	28	0	ingr-price	\N
459	28	0	title-ingr-index	\N
461	28	0	title-ingr-edit	\N
460	28	0	title-ingr-create	\N
462	28	0	dish-price	\N
463	28	0	ingredient	\N
464	28	0	amount	\N
465	7	0	menu-ingredients	\N
466	5	0	privacy-policy	\N
467	5	0	developed-by	\N
468	5	0	allergens	\N
469	19	0	order-place	\N
470	20	0	pos	\N
471	21	0	paymethod-pos	\N
472	25	0	top-up	\N
474	29	0	review-percentage	\N
475	29	0	service	\N
476	29	0	ambience	\N
477	29	0	taste	\N
478	29	0	modal-title	\N
479	29	0	modal-comment	\N
480	29	0	modal-submit	\N
481	29	0	ratings	\N
482	29	0	show-in-p	\N
483	25	0	top-up-acc	\N
484	19	0	allergy-comment	\N
485	19	0	allergy-comment-placeholder	\N
486	21	0	allergy-comment	\N
\.


--
-- TOC entry 3835 (class 0 OID 26012)
-- Dependencies: 296
-- Data for Name: vne_wsservers; Type: TABLE DATA; Schema: default; Owner: -
--

COPY "default".vne_wsservers (id, url, pos) FROM stdin;
1	https://ws1.resto-club.com	1
\.


--
-- TOC entry 3901 (class 0 OID 0)
-- Dependencies: 202
-- Name: order_group_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".order_group_id_seq', 137, true);


--
-- TOC entry 3902 (class 0 OID 0)
-- Dependencies: 204
-- Name: qr_config_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".qr_config_id_seq', 1, false);


--
-- TOC entry 3903 (class 0 OID 0)
-- Dependencies: 206
-- Name: vne_admingroups_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_admingroups_id_seq', 1, true);


--
-- TOC entry 3904 (class 0 OID 0)
-- Dependencies: 208
-- Name: vne_admins_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_admins_id_seq', 7, true);


--
-- TOC entry 3905 (class 0 OID 0)
-- Dependencies: 300
-- Name: vne_allergen_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_allergen_id_seq', 22, true);


--
-- TOC entry 3906 (class 0 OID 0)
-- Dependencies: 298
-- Name: vne_allergen_translation_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_allergen_translation_id_seq', 66, true);


--
-- TOC entry 3907 (class 0 OID 0)
-- Dependencies: 210
-- Name: vne_auth_logs_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_auth_logs_id_seq', 140, true);


--
-- TOC entry 3908 (class 0 OID 0)
-- Dependencies: 212
-- Name: vne_balance_settings_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_balance_settings_id_seq', 1, true);


--
-- TOC entry 3909 (class 0 OID 0)
-- Dependencies: 214
-- Name: vne_cats_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_cats_id_seq', 22, true);


--
-- TOC entry 3910 (class 0 OID 0)
-- Dependencies: 216
-- Name: vne_currencies_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_currencies_id_seq', 5, true);


--
-- TOC entry 3911 (class 0 OID 0)
-- Dependencies: 218
-- Name: vne_employee_status_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_employee_status_translations_id_seq', 16, true);


--
-- TOC entry 3912 (class 0 OID 0)
-- Dependencies: 220
-- Name: vne_employee_statuses_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_employee_statuses_id_seq', 3, true);


--
-- TOC entry 3913 (class 0 OID 0)
-- Dependencies: 222
-- Name: vne_employees_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_employees_id_seq', 59, true);


--
-- TOC entry 3914 (class 0 OID 0)
-- Dependencies: 224
-- Name: vne_facility_type_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_facility_type_id_seq', 10, true);


--
-- TOC entry 3915 (class 0 OID 0)
-- Dependencies: 226
-- Name: vne_facility_type_translation_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_facility_type_translation_id_seq', 24, true);


--
-- TOC entry 3916 (class 0 OID 0)
-- Dependencies: 228
-- Name: vne_floor_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_floor_id_seq', 10, true);


--
-- TOC entry 3917 (class 0 OID 0)
-- Dependencies: 230
-- Name: vne_halls_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_halls_id_seq', 25, true);


--
-- TOC entry 3918 (class 0 OID 0)
-- Dependencies: 232
-- Name: vne_icon_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_icon_translations_id_seq', 71, true);


--
-- TOC entry 3919 (class 0 OID 0)
-- Dependencies: 234
-- Name: vne_icons_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_icons_id_seq', 20, true);


--
-- TOC entry 3920 (class 0 OID 0)
-- Dependencies: 236
-- Name: vne_ingredient_types_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_ingredient_types_id_seq', 8, true);


--
-- TOC entry 3921 (class 0 OID 0)
-- Dependencies: 238
-- Name: vne_ingredients_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_ingredients_id_seq', 14, true);


--
-- TOC entry 3922 (class 0 OID 0)
-- Dependencies: 240
-- Name: vne_langs_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_langs_id_seq', 8, true);


--
-- TOC entry 3923 (class 0 OID 0)
-- Dependencies: 242
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_mailtemplate_translations_id_seq', 28, true);


--
-- TOC entry 3924 (class 0 OID 0)
-- Dependencies: 244
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_mailtemplates_id_seq', 8, true);


--
-- TOC entry 3925 (class 0 OID 0)
-- Dependencies: 246
-- Name: vne_order_group_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_order_group_id_seq', 4, true);


--
-- TOC entry 3926 (class 0 OID 0)
-- Dependencies: 248
-- Name: vne_order_product_ingredients_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_order_product_ingredients_id_seq', 1289, true);


--
-- TOC entry 3927 (class 0 OID 0)
-- Dependencies: 250
-- Name: vne_order_products_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_order_products_id_seq', 570, true);


--
-- TOC entry 3928 (class 0 OID 0)
-- Dependencies: 252
-- Name: vne_orders_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_orders_id_seq', 302, true);


--
-- TOC entry 3929 (class 0 OID 0)
-- Dependencies: 254
-- Name: vne_payment_config_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_payment_config_id_seq', 3, true);


--
-- TOC entry 3930 (class 0 OID 0)
-- Dependencies: 256
-- Name: vne_payment_intent_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_payment_intent_id_seq', 44, true);


--
-- TOC entry 3931 (class 0 OID 0)
-- Dependencies: 258
-- Name: vne_payment_settings_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_payment_settings_id_seq', 2, true);


--
-- TOC entry 3932 (class 0 OID 0)
-- Dependencies: 260
-- Name: vne_product_images_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_product_images_id_seq', 388, true);


--
-- TOC entry 3933 (class 0 OID 0)
-- Dependencies: 262
-- Name: vne_products_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_products_id_seq', 210, true);


--
-- TOC entry 3934 (class 0 OID 0)
-- Dependencies: 264
-- Name: vne_qr_config_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_qr_config_id_seq', 4, true);


--
-- TOC entry 3935 (class 0 OID 0)
-- Dependencies: 267
-- Name: vne_restaurants_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_restaurants_id_seq', 55, true);


--
-- TOC entry 3936 (class 0 OID 0)
-- Dependencies: 303
-- Name: vne_review_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_review_id_seq', 3, true);


--
-- TOC entry 3937 (class 0 OID 0)
-- Dependencies: 269
-- Name: vne_room_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_room_id_seq', 9, true);


--
-- TOC entry 3938 (class 0 OID 0)
-- Dependencies: 271
-- Name: vne_room_type_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_room_type_id_seq', 2, true);


--
-- TOC entry 3939 (class 0 OID 0)
-- Dependencies: 273
-- Name: vne_room_type_translation_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_room_type_translation_id_seq', 6, true);


--
-- TOC entry 3940 (class 0 OID 0)
-- Dependencies: 275
-- Name: vne_serving_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_serving_translations_id_seq', 13, true);


--
-- TOC entry 3941 (class 0 OID 0)
-- Dependencies: 277
-- Name: vne_servings_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_servings_id_seq', 4, true);


--
-- TOC entry 3942 (class 0 OID 0)
-- Dependencies: 279
-- Name: vne_settings_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_settings_id_seq', 19, true);


--
-- TOC entry 3943 (class 0 OID 0)
-- Dependencies: 281
-- Name: vne_subscription_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_subscription_id_seq', 1, false);


--
-- TOC entry 3944 (class 0 OID 0)
-- Dependencies: 283
-- Name: vne_tables_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_tables_id_seq', 111, true);


--
-- TOC entry 3945 (class 0 OID 0)
-- Dependencies: 285
-- Name: vne_transactions_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_transactions_id_seq', 1902, true);


--
-- TOC entry 3946 (class 0 OID 0)
-- Dependencies: 287
-- Name: vne_units_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_units_id_seq', 5, true);


--
-- TOC entry 3947 (class 0 OID 0)
-- Dependencies: 289
-- Name: vne_units_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_units_translations_id_seq', 15, true);


--
-- TOC entry 3948 (class 0 OID 0)
-- Dependencies: 291
-- Name: vne_word_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_word_translations_id_seq', 1275, true);


--
-- TOC entry 3949 (class 0 OID 0)
-- Dependencies: 293
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_wordbooks_id_seq', 29, true);


--
-- TOC entry 3950 (class 0 OID 0)
-- Dependencies: 295
-- Name: vne_words_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_words_id_seq', 432, true);


--
-- TOC entry 3951 (class 0 OID 0)
-- Dependencies: 297
-- Name: vne_wsservers_id_seq; Type: SEQUENCE SET; Schema: default; Owner: -
--

SELECT pg_catalog.setval('"default".vne_wsservers_id_seq', 4, true);


--
-- TOC entry 3511 (class 2606 OID 26070)
-- Name: vne_settings PK_00e1517e9faaaba0f525bcb590e; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_settings
    ADD CONSTRAINT "PK_00e1517e9faaaba0f525bcb590e" PRIMARY KEY (id);


--
-- TOC entry 3479 (class 2606 OID 26072)
-- Name: vne_payment_settings PK_06fac73c117a90bb48361ac6620; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_payment_settings
    ADD CONSTRAINT "PK_06fac73c117a90bb48361ac6620" PRIMARY KEY (id);


--
-- TOC entry 3530 (class 2606 OID 26074)
-- Name: vne_words PK_072d0974d51316d8537ba4708bb; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_words
    ADD CONSTRAINT "PK_072d0974d51316d8537ba4708bb" PRIMARY KEY (id);


--
-- TOC entry 3494 (class 2606 OID 26076)
-- Name: vne_restaurants PK_0875461f4afdd97af48b6444eff; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "PK_0875461f4afdd97af48b6444eff" PRIMARY KEY (id);


--
-- TOC entry 3439 (class 2606 OID 26078)
-- Name: vne_halls PK_0989b8637f146421fd51f440a9e; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_halls
    ADD CONSTRAINT "PK_0989b8637f146421fd51f440a9e" PRIMARY KEY (id);


--
-- TOC entry 3455 (class 2606 OID 26080)
-- Name: vne_mailtemplates PK_0ad69d17564005feccf82893808; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_mailtemplates
    ADD CONSTRAINT "PK_0ad69d17564005feccf82893808" PRIMARY KEY (id);


--
-- TOC entry 3419 (class 2606 OID 26082)
-- Name: vne_cats PK_0bdee08b5c108a0ac6a85774467; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_cats
    ADD CONSTRAINT "PK_0bdee08b5c108a0ac6a85774467" PRIMARY KEY (id);


--
-- TOC entry 3506 (class 2606 OID 26084)
-- Name: vne_serving_translations PK_0dc8f78fd2fa6a62819b25f1a6d; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_serving_translations
    ADD CONSTRAINT "PK_0dc8f78fd2fa6a62819b25f1a6d" PRIMARY KEY (id);


--
-- TOC entry 3410 (class 2606 OID 26086)
-- Name: vne_admins PK_0e169cb063501c963352dfbaaac; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_admins
    ADD CONSTRAINT "PK_0e169cb063501c963352dfbaaac" PRIMARY KEY (id);


--
-- TOC entry 3445 (class 2606 OID 26088)
-- Name: vne_ingredient_types PK_11807550ceaa269abd60c2c295f; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_ingredient_types
    ADD CONSTRAINT "PK_11807550ceaa269abd60c2c295f" PRIMARY KEY (id);


--
-- TOC entry 3540 (class 2606 OID 26730)
-- Name: vne_products_allergens_vne_allergen PK_13082c6435fa8eab041883753c7; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_products_allergens_vne_allergen
    ADD CONSTRAINT "PK_13082c6435fa8eab041883753c7" PRIMARY KEY ("vneProductsId", "vneAllergenId");


--
-- TOC entry 3491 (class 2606 OID 26090)
-- Name: vne_restaurant_fee_configs PK_17c9b3cc17c809f91633a4cd1ab; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_restaurant_fee_configs
    ADD CONSTRAINT "PK_17c9b3cc17c809f91633a4cd1ab" PRIMARY KEY (restaurant_id, payment_type);


--
-- TOC entry 3534 (class 2606 OID 26716)
-- Name: vne_allergen_translation PK_1b95051a220c4821da864c30a43; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_allergen_translation
    ADD CONSTRAINT "PK_1b95051a220c4821da864c30a43" PRIMARY KEY (id);


--
-- TOC entry 3417 (class 2606 OID 26092)
-- Name: vne_balance_settings PK_1ec9a02d9b510a35a233339cd93; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_balance_settings
    ADD CONSTRAINT "PK_1ec9a02d9b510a35a233339cd93" PRIMARY KEY (id);


--
-- TOC entry 3536 (class 2606 OID 26725)
-- Name: vne_allergen PK_2c687eab54ad209aed6efe2911e; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_allergen
    ADD CONSTRAINT "PK_2c687eab54ad209aed6efe2911e" PRIMARY KEY (id);


--
-- TOC entry 3504 (class 2606 OID 26094)
-- Name: vne_room_type_translation PK_2ce2f67337f03ecaf6840cd15b5; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room_type_translation
    ADD CONSTRAINT "PK_2ce2f67337f03ecaf6840cd15b5" PRIMARY KEY (id);


--
-- TOC entry 3481 (class 2606 OID 26096)
-- Name: vne_product_images PK_2cff70e96751e07d208cf318897; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_product_images
    ADD CONSTRAINT "PK_2cff70e96751e07d208cf318897" PRIMARY KEY (id);


--
-- TOC entry 3477 (class 2606 OID 26098)
-- Name: vne_payment_intent PK_33ff70544c446799efec872cc31; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_payment_intent
    ADD CONSTRAINT "PK_33ff70544c446799efec872cc31" PRIMARY KEY (id);


--
-- TOC entry 3485 (class 2606 OID 26100)
-- Name: vne_products PK_350040868e6f6a4bbcb33727d49; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_products
    ADD CONSTRAINT "PK_350040868e6f6a4bbcb33727d49" PRIMARY KEY (id);


--
-- TOC entry 3423 (class 2606 OID 26102)
-- Name: vne_employee_status_translations PK_3537ef87ea04c2bb295c1c0e948; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employee_status_translations
    ADD CONSTRAINT "PK_3537ef87ea04c2bb295c1c0e948" PRIMARY KEY (id);


--
-- TOC entry 3425 (class 2606 OID 26104)
-- Name: vne_employee_statuses PK_3b845110cc6cfb8b64b275a9f4f; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employee_statuses
    ADD CONSTRAINT "PK_3b845110cc6cfb8b64b275a9f4f" PRIMARY KEY (id);


--
-- TOC entry 3525 (class 2606 OID 26106)
-- Name: vne_word_translations PK_521f92df69a7ad9c67b18da8f68; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_word_translations
    ADD CONSTRAINT "PK_521f92df69a7ad9c67b18da8f68" PRIMARY KEY (id);


--
-- TOC entry 3437 (class 2606 OID 26108)
-- Name: vne_floor PK_57093298d9e6558a95ddeaf0df8; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_floor
    ADD CONSTRAINT "PK_57093298d9e6558a95ddeaf0df8" PRIMARY KEY (id);


--
-- TOC entry 3473 (class 2606 OID 26110)
-- Name: vne_payment_config PK_5dfc4dca0189d62afaf6252ebc4; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_payment_config
    ADD CONSTRAINT "PK_5dfc4dca0189d62afaf6252ebc4" PRIMARY KEY (id);


--
-- TOC entry 3502 (class 2606 OID 26112)
-- Name: vne_room_type PK_6a18f3e31cbc8ace591fe415012; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room_type
    ADD CONSTRAINT "PK_6a18f3e31cbc8ace591fe415012" PRIMARY KEY (id);


--
-- TOC entry 3463 (class 2606 OID 26114)
-- Name: vne_order_products PK_6d0799e3fbcc5e68c5bb4fa7c8d; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_order_products
    ADD CONSTRAINT "PK_6d0799e3fbcc5e68c5bb4fa7c8d" PRIMARY KEY (id);


--
-- TOC entry 3447 (class 2606 OID 26116)
-- Name: vne_ingredients PK_70157e9e833b07dc104edf6fe5c; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_ingredients
    ADD CONSTRAINT "PK_70157e9e833b07dc104edf6fe5c" PRIMARY KEY (id);


--
-- TOC entry 3513 (class 2606 OID 26118)
-- Name: vne_subscription PK_8043c5df977648b505a6c67c9cf; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_subscription
    ADD CONSTRAINT "PK_8043c5df977648b505a6c67c9cf" PRIMARY KEY (id);


--
-- TOC entry 3421 (class 2606 OID 26120)
-- Name: vne_currencies PK_84d6314cfa9aff009fbb4f55c22; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_currencies
    ADD CONSTRAINT "PK_84d6314cfa9aff009fbb4f55c22" PRIMARY KEY (id);


--
-- TOC entry 3443 (class 2606 OID 26122)
-- Name: vne_icons PK_87f5339d51f9d2577f7ef3b922d; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_icons
    ADD CONSTRAINT "PK_87f5339d51f9d2577f7ef3b922d" PRIMARY KEY (id);


--
-- TOC entry 3407 (class 2606 OID 26124)
-- Name: vne_admingroups PK_885fdcbc51834c0641662d5d550; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_admingroups
    ADD CONSTRAINT "PK_885fdcbc51834c0641662d5d550" PRIMARY KEY (id);


--
-- TOC entry 3471 (class 2606 OID 26126)
-- Name: vne_orders PK_8a2a7c2e8cff037b183b338c5f6; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "PK_8a2a7c2e8cff037b183b338c5f6" PRIMARY KEY (id);


--
-- TOC entry 3403 (class 2606 OID 26128)
-- Name: qr_config PK_8a9fd52af46651a4dcc81258073; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".qr_config
    ADD CONSTRAINT "PK_8a9fd52af46651a4dcc81258073" PRIMARY KEY (id);


--
-- TOC entry 3441 (class 2606 OID 26130)
-- Name: vne_icon_translations PK_8b8160671a2807bd49fc66fcd27; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_icon_translations
    ADD CONSTRAINT "PK_8b8160671a2807bd49fc66fcd27" PRIMARY KEY (id);


--
-- TOC entry 3452 (class 2606 OID 26132)
-- Name: vne_mailtemplate_translations PK_9c2864edd8cf9260136c23914bc; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "PK_9c2864edd8cf9260136c23914bc" PRIMARY KEY (id);


--
-- TOC entry 3521 (class 2606 OID 26134)
-- Name: vne_units PK_9dfbd5b14bf16284feadb9af7a5; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_units
    ADD CONSTRAINT "PK_9dfbd5b14bf16284feadb9af7a5" PRIMARY KEY (id);


--
-- TOC entry 3498 (class 2606 OID 26136)
-- Name: vne_room PK_ad881f45f435ee545e02a42bb8c; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room
    ADD CONSTRAINT "PK_ad881f45f435ee545e02a42bb8c" PRIMARY KEY (id);


--
-- TOC entry 3487 (class 2606 OID 26138)
-- Name: vne_qr_config PK_b23b28e8e3412c7c7eb2ac18519; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_qr_config
    ADD CONSTRAINT "PK_b23b28e8e3412c7c7eb2ac18519" PRIMARY KEY (id);


--
-- TOC entry 3461 (class 2606 OID 26140)
-- Name: vne_order_product_ingredients PK_b3772c34456c2cb6f168403080f; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_order_product_ingredients
    ADD CONSTRAINT "PK_b3772c34456c2cb6f168403080f" PRIMARY KEY (id);


--
-- TOC entry 3523 (class 2606 OID 26142)
-- Name: vne_units_translations PK_b7f7daf003bc758ed55b7d30106; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_units_translations
    ADD CONSTRAINT "PK_b7f7daf003bc758ed55b7d30106" PRIMARY KEY (id);


--
-- TOC entry 3515 (class 2606 OID 26144)
-- Name: vne_tables PK_bb89d6ca78aa6b3905e302fde95; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_tables
    ADD CONSTRAINT "PK_bb89d6ca78aa6b3905e302fde95" PRIMARY KEY (id);


--
-- TOC entry 3429 (class 2606 OID 26146)
-- Name: vne_employees PK_be6da89c037f846b6b791a35f8b; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "PK_be6da89c037f846b6b791a35f8b" PRIMARY KEY (id);


--
-- TOC entry 3508 (class 2606 OID 26148)
-- Name: vne_servings PK_c3f64fa30f7cd7277b75c868314; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_servings
    ADD CONSTRAINT "PK_c3f64fa30f7cd7277b75c868314" PRIMARY KEY (id);


--
-- TOC entry 3519 (class 2606 OID 26150)
-- Name: vne_transactions PK_c4c1c2e63f854ccf92d4e7209d7; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_transactions
    ADD CONSTRAINT "PK_c4c1c2e63f854ccf92d4e7209d7" PRIMARY KEY (id);


--
-- TOC entry 3435 (class 2606 OID 26152)
-- Name: vne_facility_type_translation PK_c800ab9b8d2154513a6abb701af; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_facility_type_translation
    ADD CONSTRAINT "PK_c800ab9b8d2154513a6abb701af" PRIMARY KEY (id);


--
-- TOC entry 3450 (class 2606 OID 26154)
-- Name: vne_langs PK_d5d1c1e82773cfdb6bc8785f60a; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_langs
    ADD CONSTRAINT "PK_d5d1c1e82773cfdb6bc8785f60a" PRIMARY KEY (id);


--
-- TOC entry 3532 (class 2606 OID 26156)
-- Name: vne_wsservers PK_e23a1bca999f0a79ce125cda569; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_wsservers
    ADD CONSTRAINT "PK_e23a1bca999f0a79ce125cda569" PRIMARY KEY (id);


--
-- TOC entry 3415 (class 2606 OID 26158)
-- Name: vne_auth_logs PK_e609840636bd3b3649ca59d7d37; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_auth_logs
    ADD CONSTRAINT "PK_e609840636bd3b3649ca59d7d37" PRIMARY KEY (id);


--
-- TOC entry 3459 (class 2606 OID 26160)
-- Name: vne_order_group PK_e679a1fd5df37d88a1d554a869f; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_order_group
    ADD CONSTRAINT "PK_e679a1fd5df37d88a1d554a869f" PRIMARY KEY (id);


--
-- TOC entry 3433 (class 2606 OID 26162)
-- Name: vne_facility_type PK_ed440bfc2efdcad302551c5a782; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_facility_type
    ADD CONSTRAINT "PK_ed440bfc2efdcad302551c5a782" PRIMARY KEY (id);


--
-- TOC entry 3401 (class 2606 OID 26164)
-- Name: order_group PK_f35c5aef0f513f39b3b831e91a2; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".order_group
    ADD CONSTRAINT "PK_f35c5aef0f513f39b3b831e91a2" PRIMARY KEY (id);


--
-- TOC entry 3542 (class 2606 OID 26879)
-- Name: vne_review PK_fb1559479a54de41e56df910e95; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_review
    ADD CONSTRAINT "PK_fb1559479a54de41e56df910e95" PRIMARY KEY (id);


--
-- TOC entry 3527 (class 2606 OID 26166)
-- Name: vne_wordbooks PK_fe107eba055dfeb52d76f771029; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_wordbooks
    ADD CONSTRAINT "PK_fe107eba055dfeb52d76f771029" PRIMARY KEY (id);


--
-- TOC entry 3544 (class 2606 OID 26881)
-- Name: vne_review REL_11b5b9c5c1629977c3e41cdd71; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_review
    ADD CONSTRAINT "REL_11b5b9c5c1629977c3e41cdd71" UNIQUE (order_id);


--
-- TOC entry 3405 (class 2606 OID 26168)
-- Name: qr_config REL_1562aa2559b2ee29d0e2af8aaa; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".qr_config
    ADD CONSTRAINT "REL_1562aa2559b2ee29d0e2af8aaa" UNIQUE (restaurant_id);


--
-- TOC entry 3500 (class 2606 OID 26170)
-- Name: vne_room UQ_01b2e281cdaef1f36071a3e4396; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room
    ADD CONSTRAINT "UQ_01b2e281cdaef1f36071a3e4396" UNIQUE (code);


--
-- TOC entry 3412 (class 2606 OID 26172)
-- Name: vne_admins UQ_0ebf4ce544e97dc18ccf67dadb4; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_admins
    ADD CONSTRAINT "UQ_0ebf4ce544e97dc18ccf67dadb4" UNIQUE (email);


--
-- TOC entry 3496 (class 2606 OID 26174)
-- Name: vne_restaurants UQ_1f2568af88f6eb72dda0bf01c62; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "UQ_1f2568af88f6eb72dda0bf01c62" UNIQUE ("qrId");


--
-- TOC entry 3431 (class 2606 OID 26176)
-- Name: vne_employees UQ_752fad6244eb8729bba8e6558da; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "UQ_752fad6244eb8729bba8e6558da" UNIQUE (email);


--
-- TOC entry 3457 (class 2606 OID 26178)
-- Name: vne_mailtemplates UQ_8dcdd7fca3bc0ba922e66e6e632; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_mailtemplates
    ADD CONSTRAINT "UQ_8dcdd7fca3bc0ba922e66e6e632" UNIQUE (name);


--
-- TOC entry 3489 (class 2606 OID 26180)
-- Name: vne_qr_config UQ_9867f627945c80bb4b6e9dea323; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_qr_config
    ADD CONSTRAINT "UQ_9867f627945c80bb4b6e9dea323" UNIQUE (restaurant_id);


--
-- TOC entry 3517 (class 2606 OID 26182)
-- Name: vne_tables UQ_af6e48dc3768cbad3f140aa3aca; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_tables
    ADD CONSTRAINT "UQ_af6e48dc3768cbad3f140aa3aca" UNIQUE (code);


--
-- TOC entry 3475 (class 2606 OID 26184)
-- Name: vne_payment_config UQ_fad6dbc1ff3caf16a69bd1ad7c2; Type: CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_payment_config
    ADD CONSTRAINT "UQ_fad6dbc1ff3caf16a69bd1ad7c2" UNIQUE (type);


--
-- TOC entry 3528 (class 1259 OID 26185)
-- Name: IDX_04ce0a0d84f168475f385b5843; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_04ce0a0d84f168475f385b5843" ON "default".vne_words USING btree (mark);


--
-- TOC entry 3537 (class 1259 OID 26732)
-- Name: IDX_0b11b415a8d2628011c5596492; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_0b11b415a8d2628011c5596492" ON "default".vne_products_allergens_vne_allergen USING btree ("vneAllergenId");


--
-- TOC entry 3408 (class 1259 OID 26186)
-- Name: IDX_0ebf4ce544e97dc18ccf67dadb; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_0ebf4ce544e97dc18ccf67dadb" ON "default".vne_admins USING btree (email);


--
-- TOC entry 3482 (class 1259 OID 26187)
-- Name: IDX_15bbea4f323c6b5d1b5d1bc630; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_15bbea4f323c6b5d1b5d1bc630" ON "default".vne_products USING btree (name);


--
-- TOC entry 3464 (class 1259 OID 26188)
-- Name: IDX_19f8a7e397d62395cd2088b24b; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_19f8a7e397d62395cd2088b24b" ON "default".vne_orders USING btree (accepted_at);


--
-- TOC entry 3492 (class 1259 OID 26189)
-- Name: IDX_29851f01aa898c68aa2c4b7014; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_29851f01aa898c68aa2c4b7014" ON "default".vne_restaurants USING btree (name);


--
-- TOC entry 3448 (class 1259 OID 26190)
-- Name: IDX_2e1de563e14f7009d683b9bde4; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_2e1de563e14f7009d683b9bde4" ON "default".vne_langs USING btree (slug);


--
-- TOC entry 3465 (class 1259 OID 26191)
-- Name: IDX_4df2ab0a3f08abf7f8baa4954b; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_4df2ab0a3f08abf7f8baa4954b" ON "default".vne_orders USING btree (completed_at);


--
-- TOC entry 3413 (class 1259 OID 26192)
-- Name: IDX_6d1464b38ae4b70ca0fcae739a; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_6d1464b38ae4b70ca0fcae739a" ON "default".vne_auth_logs USING btree (created_at);


--
-- TOC entry 3466 (class 1259 OID 26193)
-- Name: IDX_74e816a5981260a074b04455f0; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_74e816a5981260a074b04455f0" ON "default".vne_orders USING btree (status);


--
-- TOC entry 3426 (class 1259 OID 26194)
-- Name: IDX_752fad6244eb8729bba8e6558d; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_752fad6244eb8729bba8e6558d" ON "default".vne_employees USING btree (email);


--
-- TOC entry 3467 (class 1259 OID 26643)
-- Name: IDX_766c8969dd7b17ed014aac11ac; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_766c8969dd7b17ed014aac11ac" ON "default".vne_orders USING btree (paymethod);


--
-- TOC entry 3468 (class 1259 OID 26196)
-- Name: IDX_7cd3f8bca6a97d655d996b03a8; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_7cd3f8bca6a97d655d996b03a8" ON "default".vne_orders USING btree (sum);


--
-- TOC entry 3453 (class 1259 OID 26197)
-- Name: IDX_8dcdd7fca3bc0ba922e66e6e63; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_8dcdd7fca3bc0ba922e66e6e63" ON "default".vne_mailtemplates USING btree (name);


--
-- TOC entry 3538 (class 1259 OID 26731)
-- Name: IDX_93159e67552d731ea43f3d7c1e; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_93159e67552d731ea43f3d7c1e" ON "default".vne_products_allergens_vne_allergen USING btree ("vneProductsId");


--
-- TOC entry 3509 (class 1259 OID 26198)
-- Name: IDX_961714c023daa0f447930913e0; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_961714c023daa0f447930913e0" ON "default".vne_settings USING btree (p);


--
-- TOC entry 3427 (class 1259 OID 26199)
-- Name: IDX_d30ea31a6d19f1e5e6ab6aea97; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_d30ea31a6d19f1e5e6ab6aea97" ON "default".vne_employees USING btree (name);


--
-- TOC entry 3483 (class 1259 OID 26200)
-- Name: IDX_e4310c89c01b1e43dfa6772e01; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_e4310c89c01b1e43dfa6772e01" ON "default".vne_products USING btree (code);


--
-- TOC entry 3469 (class 1259 OID 26201)
-- Name: IDX_f7bb2db7292a4d084f6fa4da7f; Type: INDEX; Schema: default; Owner: -
--

CREATE INDEX "IDX_f7bb2db7292a4d084f6fa4da7f" ON "default".vne_orders USING btree (created_at);


--
-- TOC entry 3570 (class 2606 OID 26202)
-- Name: vne_orders FK_048841240685197444cf83e1a94; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_048841240685197444cf83e1a94" FOREIGN KEY (table_id) REFERENCES "default".vne_tables(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3565 (class 2606 OID 26207)
-- Name: vne_mailtemplate_translations FK_04dd42b567b276df508ea10d846; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "FK_04dd42b567b276df508ea10d846" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3607 (class 2606 OID 26758)
-- Name: vne_products_allergens_vne_allergen FK_0b11b415a8d2628011c5596492e; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_products_allergens_vne_allergen
    ADD CONSTRAINT "FK_0b11b415a8d2628011c5596492e" FOREIGN KEY ("vneAllergenId") REFERENCES "default".vne_allergen(id);


--
-- TOC entry 3550 (class 2606 OID 26212)
-- Name: vne_employee_status_translations FK_0fddd42f52eb8aa644afef6ce0c; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employee_status_translations
    ADD CONSTRAINT "FK_0fddd42f52eb8aa644afef6ce0c" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3609 (class 2606 OID 26892)
-- Name: vne_review FK_11b5b9c5c1629977c3e41cdd71a; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_review
    ADD CONSTRAINT "FK_11b5b9c5c1629977c3e41cdd71a" FOREIGN KEY (order_id) REFERENCES "default".vne_orders(id);


--
-- TOC entry 3571 (class 2606 OID 26217)
-- Name: vne_orders FK_1736aea497879ac29103cadbd9c; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_1736aea497879ac29103cadbd9c" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3597 (class 2606 OID 26222)
-- Name: vne_transactions FK_176f7316fe69ff2ecff4dadc719; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_transactions
    ADD CONSTRAINT "FK_176f7316fe69ff2ecff4dadc719" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3582 (class 2606 OID 26227)
-- Name: vne_qr_config FK_18889090cddce6dd3ce50d0db9c; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_qr_config
    ADD CONSTRAINT "FK_18889090cddce6dd3ce50d0db9c" FOREIGN KEY (icon_id) REFERENCES "default".vne_icons(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3605 (class 2606 OID 26748)
-- Name: vne_allergen_translation FK_1bd77ae7331df05fb6b18f89b20; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_allergen_translation
    ADD CONSTRAINT "FK_1bd77ae7331df05fb6b18f89b20" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3604 (class 2606 OID 26232)
-- Name: vne_words FK_1dadd9fef27716c045b163f7883; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_words
    ADD CONSTRAINT "FK_1dadd9fef27716c045b163f7883" FOREIGN KEY (wordbook_id) REFERENCES "default".vne_wordbooks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3585 (class 2606 OID 26237)
-- Name: vne_restaurants FK_1f2568af88f6eb72dda0bf01c62; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "FK_1f2568af88f6eb72dda0bf01c62" FOREIGN KEY ("qrId") REFERENCES "default".vne_qr_config(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3602 (class 2606 OID 26242)
-- Name: vne_word_translations FK_205f30e87780f40620664ec78eb; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_word_translations
    ADD CONSTRAINT "FK_205f30e87780f40620664ec78eb" FOREIGN KEY (word_id) REFERENCES "default".vne_words(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3546 (class 2606 OID 26247)
-- Name: vne_auth_logs FK_2519338c34b910862fcc14580d2; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_auth_logs
    ADD CONSTRAINT "FK_2519338c34b910862fcc14580d2" FOREIGN KEY (employee_id) REFERENCES "default".vne_employees(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3600 (class 2606 OID 26252)
-- Name: vne_units_translations FK_260e34ecd142b6f1b045a94a065; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_units_translations
    ADD CONSTRAINT "FK_260e34ecd142b6f1b045a94a065" FOREIGN KEY (unit_id) REFERENCES "default".vne_units(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3591 (class 2606 OID 26257)
-- Name: vne_room_type_translation FK_2b46c326e4f74c5018bf71baa29; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room_type_translation
    ADD CONSTRAINT "FK_2b46c326e4f74c5018bf71baa29" FOREIGN KEY (type_id) REFERENCES "default".vne_room_type(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3577 (class 2606 OID 26262)
-- Name: vne_payment_intent FK_309a39ce7ef37fbe483230af86b; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_payment_intent
    ADD CONSTRAINT "FK_309a39ce7ef37fbe483230af86b" FOREIGN KEY (order_id) REFERENCES "default".vne_orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3560 (class 2606 OID 26267)
-- Name: vne_ingredient_types FK_31b6ba03644b6e0f0fc4e8cc5f2; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_ingredient_types
    ADD CONSTRAINT "FK_31b6ba03644b6e0f0fc4e8cc5f2" FOREIGN KEY (unit_id) REFERENCES "default".vne_units(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3599 (class 2606 OID 26272)
-- Name: vne_units FK_343e1b89b0bc8ae2f6f1cee45ad; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_units
    ADD CONSTRAINT "FK_343e1b89b0bc8ae2f6f1cee45ad" FOREIGN KEY (related_id) REFERENCES "default".vne_units(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3601 (class 2606 OID 26282)
-- Name: vne_units_translations FK_4165d7b324491fb913d55e8a041; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_units_translations
    ADD CONSTRAINT "FK_4165d7b324491fb913d55e8a041" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3579 (class 2606 OID 26287)
-- Name: vne_product_images FK_4525d666b04e8390496065a6759; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_product_images
    ADD CONSTRAINT "FK_4525d666b04e8390496065a6759" FOREIGN KEY (product_id) REFERENCES "default".vne_products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3567 (class 2606 OID 26292)
-- Name: vne_order_product_ingredients FK_467dcd9450ea032392c626ce08b; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_order_product_ingredients
    ADD CONSTRAINT "FK_467dcd9450ea032392c626ce08b" FOREIGN KEY (order_product_id) REFERENCES "default".vne_order_products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3598 (class 2606 OID 26297)
-- Name: vne_transactions FK_4de42650a2ff9d81382165d4673; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_transactions
    ADD CONSTRAINT "FK_4de42650a2ff9d81382165d4673" FOREIGN KEY (order_id) REFERENCES "default".vne_orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3545 (class 2606 OID 26302)
-- Name: vne_admins FK_55d689227fb459994e546aa0293; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_admins
    ADD CONSTRAINT "FK_55d689227fb459994e546aa0293" FOREIGN KEY (admingroup_id) REFERENCES "default".vne_admingroups(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3551 (class 2606 OID 26307)
-- Name: vne_employee_status_translations FK_568aa4b75543a6152b15e117352; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employee_status_translations
    ADD CONSTRAINT "FK_568aa4b75543a6152b15e117352" FOREIGN KEY (employee_status_id) REFERENCES "default".vne_employee_statuses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3552 (class 2606 OID 26312)
-- Name: vne_employees FK_60383ed5415c03ba84e5670d21b; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "FK_60383ed5415c03ba84e5670d21b" FOREIGN KEY (employee_status_id) REFERENCES "default".vne_employee_statuses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3554 (class 2606 OID 26317)
-- Name: vne_facility_type_translation FK_683aa7102ef734098a60c635b21; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_facility_type_translation
    ADD CONSTRAINT "FK_683aa7102ef734098a60c635b21" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3592 (class 2606 OID 26322)
-- Name: vne_room_type_translation FK_696b7079e5ee73b2836fc3e4a55; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room_type_translation
    ADD CONSTRAINT "FK_696b7079e5ee73b2836fc3e4a55" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3589 (class 2606 OID 26327)
-- Name: vne_room FK_6a18f3e31cbc8ace591fe415012; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room
    ADD CONSTRAINT "FK_6a18f3e31cbc8ace591fe415012" FOREIGN KEY (type_id) REFERENCES "default".vne_room_type(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3572 (class 2606 OID 26332)
-- Name: vne_orders FK_71351164edc415b84ae0c45eba5; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_71351164edc415b84ae0c45eba5" FOREIGN KEY (room_id) REFERENCES "default".vne_room(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3557 (class 2606 OID 26337)
-- Name: vne_halls FK_76a8663a8771558c69ef1e51fef; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_halls
    ADD CONSTRAINT "FK_76a8663a8771558c69ef1e51fef" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3548 (class 2606 OID 26342)
-- Name: vne_cats FK_783fb2e5fce129fa4260d764e10; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_cats
    ADD CONSTRAINT "FK_783fb2e5fce129fa4260d764e10" FOREIGN KEY (icon_id) REFERENCES "default".vne_icons(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3573 (class 2606 OID 26347)
-- Name: vne_orders FK_7a27dad3c45a791aff444fc4b11; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_7a27dad3c45a791aff444fc4b11" FOREIGN KEY (hall_id) REFERENCES "default".vne_halls(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3558 (class 2606 OID 26352)
-- Name: vne_icon_translations FK_80244055d0c2bf40fdf02dd143a; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_icon_translations
    ADD CONSTRAINT "FK_80244055d0c2bf40fdf02dd143a" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3590 (class 2606 OID 26357)
-- Name: vne_room FK_87ef6b474d6de711f1929773ffb; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_room
    ADD CONSTRAINT "FK_87ef6b474d6de711f1929773ffb" FOREIGN KEY (floor_id) REFERENCES "default".vne_floor(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3556 (class 2606 OID 26362)
-- Name: vne_floor FK_89a54c204bdaae62300fa06c71a; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_floor
    ADD CONSTRAINT "FK_89a54c204bdaae62300fa06c71a" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3559 (class 2606 OID 26367)
-- Name: vne_icon_translations FK_8acb739beb6940c0a16ae1da22a; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_icon_translations
    ADD CONSTRAINT "FK_8acb739beb6940c0a16ae1da22a" FOREIGN KEY (icon_id) REFERENCES "default".vne_icons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3608 (class 2606 OID 26753)
-- Name: vne_products_allergens_vne_allergen FK_93159e67552d731ea43f3d7c1e4; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_products_allergens_vne_allergen
    ADD CONSTRAINT "FK_93159e67552d731ea43f3d7c1e4" FOREIGN KEY ("vneProductsId") REFERENCES "default".vne_products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3566 (class 2606 OID 26372)
-- Name: vne_mailtemplate_translations FK_967e7082c5cd07daaa63df4a36b; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "FK_967e7082c5cd07daaa63df4a36b" FOREIGN KEY (mailtemplate_id) REFERENCES "default".vne_mailtemplates(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3583 (class 2606 OID 26377)
-- Name: vne_qr_config FK_9867f627945c80bb4b6e9dea323; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_qr_config
    ADD CONSTRAINT "FK_9867f627945c80bb4b6e9dea323" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3574 (class 2606 OID 26382)
-- Name: vne_orders FK_9a2241cf08b28330c95866c7e42; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_9a2241cf08b28330c95866c7e42" FOREIGN KEY (group_id) REFERENCES "default".vne_order_group(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3578 (class 2606 OID 26387)
-- Name: vne_payment_intent FK_9a261c4858411b6443bcf292fff; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_payment_intent
    ADD CONSTRAINT "FK_9a261c4858411b6443bcf292fff" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3555 (class 2606 OID 26392)
-- Name: vne_facility_type_translation FK_9d5d6c5633ac9705546ad23c6f5; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_facility_type_translation
    ADD CONSTRAINT "FK_9d5d6c5633ac9705546ad23c6f5" FOREIGN KEY (type_id) REFERENCES "default".vne_facility_type(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3562 (class 2606 OID 26397)
-- Name: vne_ingredients FK_a0bb80d16761c0e30d77ebec9e8; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_ingredients
    ADD CONSTRAINT "FK_a0bb80d16761c0e30d77ebec9e8" FOREIGN KEY (product_id) REFERENCES "default".vne_products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3580 (class 2606 OID 26402)
-- Name: vne_products FK_a24a1d97f422df9a4ef6f858dac; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_products
    ADD CONSTRAINT "FK_a24a1d97f422df9a4ef6f858dac" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3553 (class 2606 OID 26407)
-- Name: vne_employees FK_ab4672296c3f1ab805e0937a481; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "FK_ab4672296c3f1ab805e0937a481" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3575 (class 2606 OID 26412)
-- Name: vne_orders FK_acded4671415971a908889aa27a; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_acded4671415971a908889aa27a" FOREIGN KEY (employee_id) REFERENCES "default".vne_employees(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3586 (class 2606 OID 26417)
-- Name: vne_restaurants FK_b4f2c8b3192294163738f730610; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "FK_b4f2c8b3192294163738f730610" FOREIGN KEY (currency_id) REFERENCES "default".vne_currencies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3561 (class 2606 OID 26613)
-- Name: vne_ingredient_types FK_b875f36bc47fab603835b188895; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_ingredient_types
    ADD CONSTRAINT "FK_b875f36bc47fab603835b188895" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3593 (class 2606 OID 26427)
-- Name: vne_serving_translations FK_ba0bb18061498374ba02a088f34; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_serving_translations
    ADD CONSTRAINT "FK_ba0bb18061498374ba02a088f34" FOREIGN KEY (serving_id) REFERENCES "default".vne_servings(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3568 (class 2606 OID 26432)
-- Name: vne_order_products FK_c0a52d72eb2b7bd4c54824df211; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_order_products
    ADD CONSTRAINT "FK_c0a52d72eb2b7bd4c54824df211" FOREIGN KEY (serving_id) REFERENCES "default".vne_servings(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3603 (class 2606 OID 26437)
-- Name: vne_word_translations FK_c7d449bf6c30c1b0c83af297543; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_word_translations
    ADD CONSTRAINT "FK_c7d449bf6c30c1b0c83af297543" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3569 (class 2606 OID 26442)
-- Name: vne_order_products FK_d5451b74f20b52873ecc99c3a70; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_order_products
    ADD CONSTRAINT "FK_d5451b74f20b52873ecc99c3a70" FOREIGN KEY (order_id) REFERENCES "default".vne_orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3596 (class 2606 OID 26447)
-- Name: vne_tables FK_d70db2be1204137303fa4cf72b4; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_tables
    ADD CONSTRAINT "FK_d70db2be1204137303fa4cf72b4" FOREIGN KEY (hall_id) REFERENCES "default".vne_halls(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3594 (class 2606 OID 26452)
-- Name: vne_serving_translations FK_dd6d1111b8ab2c8ac36231e7c4d; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_serving_translations
    ADD CONSTRAINT "FK_dd6d1111b8ab2c8ac36231e7c4d" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3576 (class 2606 OID 26457)
-- Name: vne_orders FK_de1cf45eed13b97d37353bf2cb0; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_de1cf45eed13b97d37353bf2cb0" FOREIGN KEY (floor_id) REFERENCES "default".vne_floor(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3563 (class 2606 OID 26603)
-- Name: vne_ingredients FK_df813bc1ec216e5a4cc853b36c4; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_ingredients
    ADD CONSTRAINT "FK_df813bc1ec216e5a4cc853b36c4" FOREIGN KEY (unit_id) REFERENCES "default".vne_units(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3587 (class 2606 OID 26462)
-- Name: vne_restaurants FK_dfacce29e43cf0856e61f4c5317; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "FK_dfacce29e43cf0856e61f4c5317" FOREIGN KEY (type_id) REFERENCES "default".vne_facility_type(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3606 (class 2606 OID 26743)
-- Name: vne_allergen_translation FK_e0df7fe8474e9ca83cc4b9f65a7; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_allergen_translation
    ADD CONSTRAINT "FK_e0df7fe8474e9ca83cc4b9f65a7" FOREIGN KEY (allergen_id) REFERENCES "default".vne_allergen(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3547 (class 2606 OID 26467)
-- Name: vne_auth_logs FK_e553ff5773f22c10a34caf29ee9; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_auth_logs
    ADD CONSTRAINT "FK_e553ff5773f22c10a34caf29ee9" FOREIGN KEY (admin_id) REFERENCES "default".vne_admins(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3584 (class 2606 OID 26472)
-- Name: vne_restaurant_fee_configs FK_e63a43fe38240f28b5976564bdb; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_restaurant_fee_configs
    ADD CONSTRAINT "FK_e63a43fe38240f28b5976564bdb" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3595 (class 2606 OID 26477)
-- Name: vne_subscription FK_e66dfa52fbc837e049789c6fc97; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_subscription
    ADD CONSTRAINT "FK_e66dfa52fbc837e049789c6fc97" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3581 (class 2606 OID 26482)
-- Name: vne_products FK_f080cc7f8507b209a6d54439a36; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_products
    ADD CONSTRAINT "FK_f080cc7f8507b209a6d54439a36" FOREIGN KEY (cat_id) REFERENCES "default".vne_cats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3549 (class 2606 OID 26487)
-- Name: vne_cats FK_f25d1c7e725d240109b931ef530; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_cats
    ADD CONSTRAINT "FK_f25d1c7e725d240109b931ef530" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3564 (class 2606 OID 26608)
-- Name: vne_ingredients FK_f33b19f55123054eb4c7e6730f5; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_ingredients
    ADD CONSTRAINT "FK_f33b19f55123054eb4c7e6730f5" FOREIGN KEY (type_id) REFERENCES "default".vne_ingredient_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3588 (class 2606 OID 26492)
-- Name: vne_restaurants FK_f8d32ea80f03240f3f3328a7374; Type: FK CONSTRAINT; Schema: default; Owner: -
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "FK_f8d32ea80f03240f3f3328a7374" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2023-07-31 17:37:58 EEST

--
-- PostgreSQL database dump complete
--

