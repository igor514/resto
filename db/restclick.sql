--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

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
-- Name: default; Type: SCHEMA; Schema: -; Owner: vio
--

CREATE SCHEMA "default";


ALTER SCHEMA "default" OWNER TO vio;

--
-- Name: vne_orders_paymethod_enum; Type: TYPE; Schema: default; Owner: vio
--

CREATE TYPE "default".vne_orders_paymethod_enum AS ENUM (
    'cash',
    'card'
);


ALTER TYPE "default".vne_orders_paymethod_enum OWNER TO vio;

--
-- Name: vne_orders_status_enum; Type: TYPE; Schema: default; Owner: vio
--

CREATE TYPE "default".vne_orders_status_enum AS ENUM (
    'active',
    'completed',
    'cancelled'
);


ALTER TYPE "default".vne_orders_status_enum OWNER TO vio;

--
-- Name: vne_products_unit_enum; Type: TYPE; Schema: default; Owner: vio
--

CREATE TYPE "default".vne_products_unit_enum AS ENUM (
    'g',
    'ml'
);


ALTER TYPE "default".vne_products_unit_enum OWNER TO vio;

--
-- Name: vne_transactions_type_enum; Type: TYPE; Schema: default; Owner: vio
--

CREATE TYPE "default".vne_transactions_type_enum AS ENUM (
    'auto',
    'employee',
    'admin'
);


ALTER TYPE "default".vne_transactions_type_enum OWNER TO vio;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: vne_admingroups; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_admingroups (
    id integer NOT NULL,
    name character varying,
    title character varying,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_admingroups OWNER TO vio;

--
-- Name: vne_admingroups_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_admingroups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_admingroups_id_seq OWNER TO vio;

--
-- Name: vne_admingroups_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_admingroups_id_seq OWNED BY "default".vne_admingroups.id;


--
-- Name: vne_admins; Type: TABLE; Schema: default; Owner: vio
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


ALTER TABLE "default".vne_admins OWNER TO vio;

--
-- Name: vne_admins_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_admins_id_seq OWNER TO vio;

--
-- Name: vne_admins_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_admins_id_seq OWNED BY "default".vne_admins.id;


--
-- Name: vne_cats; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_cats (
    id integer NOT NULL,
    restaurant_id integer,
    icon_id integer,
    name character varying,
    pos integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE "default".vne_cats OWNER TO vio;

--
-- Name: vne_cats_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_cats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_cats_id_seq OWNER TO vio;

--
-- Name: vne_cats_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_cats_id_seq OWNED BY "default".vne_cats.id;


--
-- Name: vne_currencies; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_currencies (
    id integer NOT NULL,
    name character varying,
    symbol character varying,
    pos integer DEFAULT 0 NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_currencies OWNER TO vio;

--
-- Name: vne_currencies_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_currencies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_currencies_id_seq OWNER TO vio;

--
-- Name: vne_currencies_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_currencies_id_seq OWNED BY "default".vne_currencies.id;


--
-- Name: vne_employee_status_translations; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_employee_status_translations (
    id integer NOT NULL,
    employee_status_id integer,
    lang_id integer,
    name character varying
);


ALTER TABLE "default".vne_employee_status_translations OWNER TO vio;

--
-- Name: vne_employee_status_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_employee_status_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_employee_status_translations_id_seq OWNER TO vio;

--
-- Name: vne_employee_status_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_employee_status_translations_id_seq OWNED BY "default".vne_employee_status_translations.id;


--
-- Name: vne_employee_statuses; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_employee_statuses (
    id integer NOT NULL,
    color character varying DEFAULT '#000000'::character varying NOT NULL,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_employee_statuses OWNER TO vio;

--
-- Name: vne_employee_statuses_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_employee_statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_employee_statuses_id_seq OWNER TO vio;

--
-- Name: vne_employee_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_employee_statuses_id_seq OWNED BY "default".vne_employee_statuses.id;


--
-- Name: vne_employees; Type: TABLE; Schema: default; Owner: vio
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


ALTER TABLE "default".vne_employees OWNER TO vio;

--
-- Name: vne_employees_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_employees_id_seq OWNER TO vio;

--
-- Name: vne_employees_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_employees_id_seq OWNED BY "default".vne_employees.id;


--
-- Name: vne_halls; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_halls (
    id integer NOT NULL,
    restaurant_id integer,
    name character varying,
    nx integer DEFAULT 5 NOT NULL,
    ny integer DEFAULT 5 NOT NULL,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_halls OWNER TO vio;

--
-- Name: vne_halls_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_halls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_halls_id_seq OWNER TO vio;

--
-- Name: vne_halls_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_halls_id_seq OWNED BY "default".vne_halls.id;


--
-- Name: vne_icon_translations; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_icon_translations (
    id integer NOT NULL,
    icon_id integer,
    lang_id integer,
    name character varying
);


ALTER TABLE "default".vne_icon_translations OWNER TO vio;

--
-- Name: vne_icon_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_icon_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_icon_translations_id_seq OWNER TO vio;

--
-- Name: vne_icon_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_icon_translations_id_seq OWNED BY "default".vne_icon_translations.id;


--
-- Name: vne_icons; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_icons (
    id integer NOT NULL,
    img character varying,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_icons OWNER TO vio;

--
-- Name: vne_icons_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_icons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_icons_id_seq OWNER TO vio;

--
-- Name: vne_icons_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_icons_id_seq OWNED BY "default".vne_icons.id;


--
-- Name: vne_ingredients; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_ingredients (
    id integer NOT NULL,
    product_id integer,
    name character varying,
    pos integer DEFAULT 0 NOT NULL,
    excludable boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_ingredients OWNER TO vio;

--
-- Name: vne_ingredients_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_ingredients_id_seq OWNER TO vio;

--
-- Name: vne_ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_ingredients_id_seq OWNED BY "default".vne_ingredients.id;


--
-- Name: vne_langs; Type: TABLE; Schema: default; Owner: vio
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


ALTER TABLE "default".vne_langs OWNER TO vio;

--
-- Name: vne_langs_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_langs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_langs_id_seq OWNER TO vio;

--
-- Name: vne_langs_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_langs_id_seq OWNED BY "default".vne_langs.id;


--
-- Name: vne_mailtemplate_translations; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_mailtemplate_translations (
    id integer NOT NULL,
    mailtemplate_id integer,
    lang_id integer,
    subject character varying,
    content text
);


ALTER TABLE "default".vne_mailtemplate_translations OWNER TO vio;

--
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_mailtemplate_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_mailtemplate_translations_id_seq OWNER TO vio;

--
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_mailtemplate_translations_id_seq OWNED BY "default".vne_mailtemplate_translations.id;


--
-- Name: vne_mailtemplates; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_mailtemplates (
    id integer NOT NULL,
    name character varying,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_mailtemplates OWNER TO vio;

--
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_mailtemplates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_mailtemplates_id_seq OWNER TO vio;

--
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_mailtemplates_id_seq OWNED BY "default".vne_mailtemplates.id;


--
-- Name: vne_order_product_ingredients; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_order_product_ingredients (
    id integer NOT NULL,
    order_product_id integer,
    name character varying,
    included boolean DEFAULT true NOT NULL
);


ALTER TABLE "default".vne_order_product_ingredients OWNER TO vio;

--
-- Name: vne_order_product_ingredients_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_order_product_ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_order_product_ingredients_id_seq OWNER TO vio;

--
-- Name: vne_order_product_ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_order_product_ingredients_id_seq OWNED BY "default".vne_order_product_ingredients.id;


--
-- Name: vne_order_products; Type: TABLE; Schema: default; Owner: vio
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


ALTER TABLE "default".vne_order_products OWNER TO vio;

--
-- Name: vne_order_products_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_order_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_order_products_id_seq OWNER TO vio;

--
-- Name: vne_order_products_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_order_products_id_seq OWNED BY "default".vne_order_products.id;


--
-- Name: vne_orders; Type: TABLE; Schema: default; Owner: vio
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
    completed_at timestamp without time zone
);


ALTER TABLE "default".vne_orders OWNER TO vio;

--
-- Name: vne_orders_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_orders_id_seq OWNER TO vio;

--
-- Name: vne_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_orders_id_seq OWNED BY "default".vne_orders.id;


--
-- Name: vne_product_images; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_product_images (
    id integer NOT NULL,
    product_id integer,
    img character varying,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_product_images OWNER TO vio;

--
-- Name: vne_product_images_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_product_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_product_images_id_seq OWNER TO vio;

--
-- Name: vne_product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_product_images_id_seq OWNED BY "default".vne_product_images.id;


--
-- Name: vne_products; Type: TABLE; Schema: default; Owner: vio
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


ALTER TABLE "default".vne_products OWNER TO vio;

--
-- Name: vne_products_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_products_id_seq OWNER TO vio;

--
-- Name: vne_products_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_products_id_seq OWNED BY "default".vne_products.id;


--
-- Name: vne_restaurants; Type: TABLE; Schema: default; Owner: vio
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
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE "default".vne_restaurants OWNER TO vio;

--
-- Name: vne_restaurants_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_restaurants_id_seq OWNER TO vio;

--
-- Name: vne_restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_restaurants_id_seq OWNED BY "default".vne_restaurants.id;


--
-- Name: vne_serving_translations; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_serving_translations (
    id integer NOT NULL,
    serving_id integer,
    lang_id integer,
    name character varying
);


ALTER TABLE "default".vne_serving_translations OWNER TO vio;

--
-- Name: vne_serving_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_serving_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_serving_translations_id_seq OWNER TO vio;

--
-- Name: vne_serving_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_serving_translations_id_seq OWNED BY "default".vne_serving_translations.id;


--
-- Name: vne_servings; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_servings (
    id integer NOT NULL,
    pos integer DEFAULT 0 NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_servings OWNER TO vio;

--
-- Name: vne_servings_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_servings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_servings_id_seq OWNER TO vio;

--
-- Name: vne_servings_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_servings_id_seq OWNED BY "default".vne_servings.id;


--
-- Name: vne_settings; Type: TABLE; Schema: default; Owner: vio
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


ALTER TABLE "default".vne_settings OWNER TO vio;

--
-- Name: vne_settings_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_settings_id_seq OWNER TO vio;

--
-- Name: vne_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_settings_id_seq OWNED BY "default".vne_settings.id;


--
-- Name: vne_tables; Type: TABLE; Schema: default; Owner: vio
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


ALTER TABLE "default".vne_tables OWNER TO vio;

--
-- Name: vne_tables_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_tables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_tables_id_seq OWNER TO vio;

--
-- Name: vne_tables_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_tables_id_seq OWNED BY "default".vne_tables.id;


--
-- Name: vne_transactions; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_transactions (
    id integer NOT NULL,
    restaurant_id integer,
    amount integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    type "default".vne_transactions_type_enum DEFAULT 'auto'::"default".vne_transactions_type_enum NOT NULL
);


ALTER TABLE "default".vne_transactions OWNER TO vio;

--
-- Name: vne_transactions_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_transactions_id_seq OWNER TO vio;

--
-- Name: vne_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_transactions_id_seq OWNED BY "default".vne_transactions.id;


--
-- Name: vne_word_translations; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_word_translations (
    id integer NOT NULL,
    word_id integer,
    lang_id integer,
    text text
);


ALTER TABLE "default".vne_word_translations OWNER TO vio;

--
-- Name: vne_word_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_word_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_word_translations_id_seq OWNER TO vio;

--
-- Name: vne_word_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_word_translations_id_seq OWNED BY "default".vne_word_translations.id;


--
-- Name: vne_wordbooks; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_wordbooks (
    id integer NOT NULL,
    name character varying,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_wordbooks OWNER TO vio;

--
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_wordbooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_wordbooks_id_seq OWNER TO vio;

--
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_wordbooks_id_seq OWNED BY "default".vne_wordbooks.id;


--
-- Name: vne_words; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_words (
    id integer NOT NULL,
    wordbook_id integer,
    pos integer DEFAULT 0 NOT NULL,
    mark character varying,
    note character varying
);


ALTER TABLE "default".vne_words OWNER TO vio;

--
-- Name: vne_words_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_words_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_words_id_seq OWNER TO vio;

--
-- Name: vne_words_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_words_id_seq OWNED BY "default".vne_words.id;


--
-- Name: vne_wsservers; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_wsservers (
    id integer NOT NULL,
    url character varying,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_wsservers OWNER TO vio;

--
-- Name: vne_wsservers_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_wsservers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_wsservers_id_seq OWNER TO vio;

--
-- Name: vne_wsservers_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_wsservers_id_seq OWNED BY "default".vne_wsservers.id;


--
-- Name: vne_admingroups id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admingroups ALTER COLUMN id SET DEFAULT nextval('"default".vne_admingroups_id_seq'::regclass);


--
-- Name: vne_admins id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admins ALTER COLUMN id SET DEFAULT nextval('"default".vne_admins_id_seq'::regclass);


--
-- Name: vne_cats id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_cats ALTER COLUMN id SET DEFAULT nextval('"default".vne_cats_id_seq'::regclass);


--
-- Name: vne_currencies id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_currencies ALTER COLUMN id SET DEFAULT nextval('"default".vne_currencies_id_seq'::regclass);


--
-- Name: vne_employee_status_translations id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_status_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_employee_status_translations_id_seq'::regclass);


--
-- Name: vne_employee_statuses id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_statuses ALTER COLUMN id SET DEFAULT nextval('"default".vne_employee_statuses_id_seq'::regclass);


--
-- Name: vne_employees id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employees ALTER COLUMN id SET DEFAULT nextval('"default".vne_employees_id_seq'::regclass);


--
-- Name: vne_halls id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_halls ALTER COLUMN id SET DEFAULT nextval('"default".vne_halls_id_seq'::regclass);


--
-- Name: vne_icon_translations id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icon_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_icon_translations_id_seq'::regclass);


--
-- Name: vne_icons id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icons ALTER COLUMN id SET DEFAULT nextval('"default".vne_icons_id_seq'::regclass);


--
-- Name: vne_ingredients id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_ingredients ALTER COLUMN id SET DEFAULT nextval('"default".vne_ingredients_id_seq'::regclass);


--
-- Name: vne_langs id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_langs ALTER COLUMN id SET DEFAULT nextval('"default".vne_langs_id_seq'::regclass);


--
-- Name: vne_mailtemplate_translations id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_mailtemplate_translations_id_seq'::regclass);


--
-- Name: vne_mailtemplates id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplates ALTER COLUMN id SET DEFAULT nextval('"default".vne_mailtemplates_id_seq'::regclass);


--
-- Name: vne_order_product_ingredients id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_order_product_ingredients ALTER COLUMN id SET DEFAULT nextval('"default".vne_order_product_ingredients_id_seq'::regclass);


--
-- Name: vne_order_products id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_order_products ALTER COLUMN id SET DEFAULT nextval('"default".vne_order_products_id_seq'::regclass);


--
-- Name: vne_orders id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_orders ALTER COLUMN id SET DEFAULT nextval('"default".vne_orders_id_seq'::regclass);


--
-- Name: vne_product_images id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_product_images ALTER COLUMN id SET DEFAULT nextval('"default".vne_product_images_id_seq'::regclass);


--
-- Name: vne_products id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_products ALTER COLUMN id SET DEFAULT nextval('"default".vne_products_id_seq'::regclass);


--
-- Name: vne_restaurants id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants ALTER COLUMN id SET DEFAULT nextval('"default".vne_restaurants_id_seq'::regclass);


--
-- Name: vne_serving_translations id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_serving_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_serving_translations_id_seq'::regclass);


--
-- Name: vne_servings id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_servings ALTER COLUMN id SET DEFAULT nextval('"default".vne_servings_id_seq'::regclass);


--
-- Name: vne_settings id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_settings ALTER COLUMN id SET DEFAULT nextval('"default".vne_settings_id_seq'::regclass);


--
-- Name: vne_tables id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_tables ALTER COLUMN id SET DEFAULT nextval('"default".vne_tables_id_seq'::regclass);


--
-- Name: vne_transactions id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_transactions ALTER COLUMN id SET DEFAULT nextval('"default".vne_transactions_id_seq'::regclass);


--
-- Name: vne_word_translations id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_word_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_word_translations_id_seq'::regclass);


--
-- Name: vne_wordbooks id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_wordbooks ALTER COLUMN id SET DEFAULT nextval('"default".vne_wordbooks_id_seq'::regclass);


--
-- Name: vne_words id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_words ALTER COLUMN id SET DEFAULT nextval('"default".vne_words_id_seq'::regclass);


--
-- Name: vne_wsservers id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_wsservers ALTER COLUMN id SET DEFAULT nextval('"default".vne_wsservers_id_seq'::regclass);


--
-- Data for Name: vne_admingroups; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_admingroups (id, name, title, defended) FROM stdin;
1	owners	Owners	t
\.


--
-- Data for Name: vne_admins; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_admins (id, admingroup_id, name, email, password, img, active, defended) FROM stdin;
1	1	Alex	7573497@gmail.com	$2b$10$BBFjulN8d2kWvPC6lbaOduhDRd0l59lOHEF6fKTd3yrSm6SW0q9t.	2021-8/1629929025223_150.jpg	t	t
6	1	Иван Петров	viovalya@gmail.com	$2b$10$d/AHzrLN7/2iu9DjVOuIEuo4.AIg3mMNU0TWGkdNZZ5kSjn5oe7SW	2021-9/1632435404692_150.jpg	t	f
\.


--
-- Data for Name: vne_cats; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_cats (id, restaurant_id, icon_id, name, pos, active) FROM stdin;
12	21	5	Сыры	6	t
4	21	14	Фрукты	7	t
7	21	11	Мороженое	8	t
2	21	4	Хлеб	9	t
17	21	17	Вино	10	t
1	21	9	Гамбургеры	1	t
6	9	2	Тестовая	1	t
8	21	13	Пицца	2	t
9	21	8	Рыбные блюда	3	t
3	21	6	Среднеазиатская кухня	4	t
10	21	12	Острые блюда	5	t
\.


--
-- Data for Name: vne_currencies; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_currencies (id, name, symbol, pos, defended) FROM stdin;
1	RUR	₽	1	t
3	USD	$	3	f
2	EUR	€	2	f
4	CHF	₣	4	f
\.


--
-- Data for Name: vne_employee_status_translations; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_employee_status_translations (id, employee_status_id, lang_id, name) FROM stdin;
1	1	1	выходной
2	1	2	day off
5	2	2	working
6	3	1	обед
7	3	2	dinner
4	2	1	работа
\.


--
-- Data for Name: vne_employee_statuses; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_employee_statuses (id, color, pos) FROM stdin;
3	#f88413	3
2	#24b83f	1
1	#ff0000	2
\.


--
-- Data for Name: vne_employees; Type: TABLE DATA; Schema: default; Owner: vio
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
\.


--
-- Data for Name: vne_halls; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_halls (id, restaurant_id, name, nx, ny, pos) FROM stdin;
3	9	Зал 1	5	5	1
4	21	Зеленый	5	5	3
2	21	Синий	4	4	2
18	21	Красный	3	2	1
\.


--
-- Data for Name: vne_icon_translations; Type: TABLE DATA; Schema: default; Owner: vio
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
\.


--
-- Data for Name: vne_icons; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_icons (id, img, pos) FROM stdin;
2	2021-9/1632167887039.svg	1
3	2021-9/1632167965070.svg	2
4	2021-9/1632168036661.svg	3
5	2021-9/1632168063129.svg	4
6	2021-9/1632168098919.svg	5
7	2021-9/1632168122445.svg	6
8	2021-9/1632168156771.svg	7
9	2021-9/1632168188447.svg	8
10	2021-9/1632168226617.svg	9
11	2021-9/1632168252118.svg	10
12	2021-9/1632168279908.svg	11
13	2021-9/1632168338978.svg	12
14	2021-9/1632168372867.svg	13
17	2021-10/1634920564664.svg	14
\.


--
-- Data for Name: vne_ingredients; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_ingredients (id, product_id, name, pos, excludable) FROM stdin;
7	3	Сыр среднеазиатский "Дары пустыни"	3	f
8	3	Зелень	4	t
9	4	Апельсины	1	t
10	4	Грейпфруты	2	t
5	3	Хлеб	1	f
6	3	Мясо	2	f
27	194	мороженое сливочное	0	t
28	194	мороженое шоколадное	1	t
29	194	вафельный стаканчик	2	t
30	195	мороженое фруктовое	0	f
31	195	клубника	1	t
2	1	мясо	0	f
1	1	хлеб	1	f
18	1	кетчуп	2	t
3	1	помидор	3	t
4	1	лист салата	4	t
\.


--
-- Data for Name: vne_langs; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_langs (id, slug, title, shorttitle, img, pos, active, slugable, dir, defended) FROM stdin;
1	ru	Русский	Рус	\N	1	t	f	ltr	t
2	en	English	Eng	\N	2	t	f	ltr	f
\.


--
-- Data for Name: vne_mailtemplate_translations; Type: TABLE DATA; Schema: default; Owner: vio
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
\.


--
-- Data for Name: vne_mailtemplates; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_mailtemplates (id, name, defended) FROM stdin;
2	[employee]restaurant-created	f
5	[employee]restaurant-low-money	f
6	[employee]restaurant-no-money	f
7	[admin]restaurants-low-no-money	f
\.


--
-- Data for Name: vne_order_product_ingredients; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_order_product_ingredients (id, order_product_id, name, included) FROM stdin;
13	13	Мясо	t
14	13	Хлеб	t
15	13	Кетчуп	t
16	13	Помидор	t
17	13	Лист салата	t
18	14	Мясо	t
19	14	Хлеб	t
20	14	Кетчуп	t
21	14	Помидор	t
22	14	Лист салата	t
23	15	Хлеб	t
24	15	Мясо	t
25	15	Сыр	t
26	15	Зелень	t
27	16	Мясо	t
28	16	Хлеб	t
29	16	Кетчуп	t
30	16	Помидор	t
31	16	Лист салата	t
32	17	Мясо	t
33	17	Хлеб	t
34	17	Кетчуп	t
35	17	Помидор	t
36	17	Лист салата	t
37	18	Мясо	t
38	18	Хлеб	t
39	18	Кетчуп	t
40	18	Помидор	t
41	18	Лист салата	t
42	19	Мясо	t
43	19	Хлеб	t
44	19	Кетчуп	t
45	19	Помидор	t
46	19	Лист салата	t
47	20	Мясо	t
48	20	Хлеб	t
49	20	Кетчуп	t
50	20	Помидор	t
51	20	Лист салата	t
52	22	Мясо	t
53	22	Хлеб	t
54	22	Кетчуп	t
55	22	Помидор	t
56	22	Лист салата	t
57	25	Мясо	t
58	25	Хлеб	t
59	25	Кетчуп	t
60	25	Помидор	t
61	25	Лист салата	t
62	27	мороженое сливочное	t
63	27	мороженое шоколадное	t
64	27	вафельный стаканчик	t
65	28	Мясо	t
66	28	Хлеб	t
67	28	Кетчуп	t
68	28	Помидор	t
69	28	Лист салата	t
70	29	Хлеб	t
71	29	Мясо	t
72	29	Сыр	t
73	29	Зелень	t
74	30	мороженое сливочное	t
75	30	мороженое шоколадное	t
76	30	вафельный стаканчик	t
77	31	мороженое сливочное	t
78	31	мороженое шоколадное	t
79	31	вафельный стаканчик	t
80	32	мороженое сливочное	t
81	32	мороженое шоколадное	t
82	32	вафельный стаканчик	t
83	33	мороженое сливочное	t
84	33	мороженое шоколадное	t
85	33	вафельный стаканчик	t
86	34	Мясо	t
87	34	Хлеб	t
88	34	Кетчуп	t
89	34	Помидор	t
90	34	Лист салата	t
91	35	мороженое фруктовое	t
92	35	клубника	t
93	36	мороженое фруктовое	t
94	36	клубника	t
95	37	Мясо	t
96	37	Хлеб	t
97	37	Кетчуп	t
98	37	Помидор	t
99	37	Лист салата	t
100	39	Мясо	t
101	39	Хлеб	t
102	39	Кетчуп	t
103	39	Помидор	t
104	39	Лист салата	t
105	41	Мясо	t
106	41	Хлеб	t
107	41	Кетчуп	f
108	41	Помидор	t
109	41	Лист салата	t
110	42	Мясо	t
111	42	Хлеб	t
112	42	Кетчуп	f
113	42	Помидор	t
114	42	Лист салата	t
115	43	Хлеб	t
116	43	Мясо	t
117	43	Сыр	t
118	43	Зелень	f
119	45	Мясо	t
120	45	Хлеб	t
121	45	Кетчуп	t
122	45	Помидор	t
123	45	Лист салата	t
124	46	Мясо	t
125	46	Хлеб	t
126	46	Кетчуп	t
127	46	Помидор	t
128	46	Лист салата	t
129	48	мороженое фруктовое	t
130	48	клубника	t
131	49	мороженое сливочное	t
132	49	мороженое шоколадное	t
133	49	вафельный стаканчик	t
134	50	Мясо	t
135	50	Хлеб	t
136	50	Кетчуп	t
137	50	Помидор	f
138	50	Лист салата	f
139	51	мясо	t
140	51	хлеб	t
141	51	кетчуп	t
142	51	помидор	t
143	51	лист салата	t
144	52	Хлеб	t
145	52	Мясо	t
146	52	Сыр	t
147	52	Зелень	t
148	55	Хлеб	t
149	55	Мясо	t
150	55	Сыр	t
151	55	Зелень	t
152	56	мясо	t
153	56	хлеб	t
154	56	кетчуп	t
155	56	помидор	t
156	56	лист салата	t
157	57	мясо	t
158	57	хлеб	t
159	57	кетчуп	t
160	57	помидор	t
161	57	лист салата	t
162	58	Хлеб	t
163	58	Мясо	t
164	58	Сыр	t
165	58	Зелень	t
166	62	мясо	t
167	62	хлеб	t
168	62	кетчуп	t
169	62	помидор	t
170	62	лист салата	t
171	63	Хлеб	t
172	63	Мясо	t
173	63	Сыр	t
174	63	Зелень	t
175	64	мясо	t
176	64	хлеб	t
179	64	лист салата	t
180	65	Хлеб	t
181	65	Мясо	t
183	65	Зелень	t
182	65	Сыр	f
177	64	кетчуп	f
178	64	помидор	f
184	67	мясо	t
185	67	хлеб	t
186	67	кетчуп	t
187	67	помидор	t
188	67	лист салата	t
189	68	Хлеб	t
190	68	Мясо	t
191	68	Сыр	t
192	68	Зелень	t
193	69	мясо	t
194	69	хлеб	t
195	69	кетчуп	t
196	69	помидор	t
197	69	лист салата	t
198	70	Хлеб	t
199	70	Мясо	t
200	70	Сыр среднеазиатский "Дары пустыни"	t
201	70	Зелень	t
202	72	мясо	t
203	72	хлеб	t
204	72	кетчуп	t
205	72	помидор	t
206	72	лист салата	t
207	80	мороженое сливочное	t
208	80	мороженое шоколадное	t
209	80	вафельный стаканчик	t
210	81	мороженое фруктовое	t
211	81	клубника	t
212	82	мороженое фруктовое	t
213	82	клубника	t
214	83	мороженое сливочное	t
215	83	мороженое шоколадное	t
216	83	вафельный стаканчик	t
217	84	мороженое фруктовое	t
218	84	клубника	t
219	85	мясо	t
220	85	хлеб	t
221	85	кетчуп	t
222	85	помидор	t
223	85	лист салата	t
224	86	Хлеб	t
225	86	Мясо	t
226	86	Сыр среднеазиатский "Дары пустыни"	t
227	86	Зелень	t
228	87	мясо	t
229	87	хлеб	t
230	87	кетчуп	t
231	87	помидор	t
232	87	лист салата	t
233	88	Хлеб	t
234	88	Мясо	t
235	88	Сыр среднеазиатский "Дары пустыни"	t
236	88	Зелень	t
237	90	мороженое сливочное	t
238	90	мороженое шоколадное	t
239	90	вафельный стаканчик	t
240	91	мороженое фруктовое	t
241	91	клубника	t
242	93	мясо	t
243	93	хлеб	t
244	93	кетчуп	t
245	93	помидор	t
246	93	лист салата	t
247	94	Хлеб	t
248	94	Мясо	t
249	94	Сыр среднеазиатский "Дары пустыни"	t
250	94	Зелень	t
251	95	мороженое сливочное	t
252	95	мороженое шоколадное	t
253	95	вафельный стаканчик	t
254	96	мороженое фруктовое	t
255	96	клубника	t
256	97	мороженое сливочное	t
257	97	мороженое шоколадное	t
258	97	вафельный стаканчик	t
259	98	мороженое фруктовое	t
260	98	клубника	t
261	99	мясо	t
262	99	хлеб	t
263	99	кетчуп	t
264	99	помидор	t
265	99	лист салата	t
266	100	Хлеб	t
267	100	Мясо	t
268	100	Сыр среднеазиатский "Дары пустыни"	t
269	100	Зелень	t
270	101	мясо	t
271	101	хлеб	t
272	101	кетчуп	t
273	101	помидор	t
274	101	лист салата	t
275	102	Хлеб	t
276	102	Мясо	t
277	102	Сыр среднеазиатский "Дары пустыни"	t
278	102	Зелень	t
279	103	мороженое сливочное	t
280	103	мороженое шоколадное	t
281	103	вафельный стаканчик	t
282	104	мороженое фруктовое	t
283	104	клубника	t
284	105	мороженое сливочное	t
285	105	мороженое шоколадное	t
286	105	вафельный стаканчик	t
287	106	мясо	t
288	106	хлеб	t
289	106	кетчуп	t
290	106	помидор	t
291	106	лист салата	t
292	107	Хлеб	t
293	107	Мясо	t
294	107	Сыр среднеазиатский "Дары пустыни"	t
295	107	Зелень	t
296	108	мороженое сливочное	t
297	108	мороженое шоколадное	t
298	108	вафельный стаканчик	t
299	109	мороженое фруктовое	t
300	109	клубника	t
301	110	мясо	t
302	110	хлеб	t
303	110	кетчуп	t
304	110	помидор	t
305	110	лист салата	t
306	111	Хлеб	t
307	111	Мясо	t
308	111	Сыр среднеазиатский "Дары пустыни"	t
309	111	Зелень	t
315	114	вафельный стаканчик	t
316	114	мороженое шоколадное	t
317	114	мороженое сливочное	t
318	115	клубника	t
319	115	мороженое фруктовое	t
320	116	Апельсины	t
321	116	Грейпфруты	t
322	117	мясо	t
323	117	хлеб	t
324	117	кетчуп	t
325	117	помидор	t
326	117	лист салата	t
327	118	Хлеб	t
328	118	Мясо	t
329	118	Сыр среднеазиатский "Дары пустыни"	t
330	118	Зелень	t
331	120	клубника	t
332	120	мороженое фруктовое	t
333	121	хлеб	t
334	121	кетчуп	t
335	121	помидор	t
336	121	лист салата	t
337	121	мясо	t
338	122	Сыр среднеазиатский "Дары пустыни"	t
339	122	Зелень	t
340	122	Хлеб	t
341	122	Мясо	t
342	123	хлеб	t
343	123	кетчуп	t
344	123	помидор	t
345	123	лист салата	t
346	123	мясо	t
347	124	Сыр среднеазиатский "Дары пустыни"	t
348	124	Зелень	t
349	124	Хлеб	t
350	124	Мясо	t
351	125	хлеб	t
352	125	кетчуп	t
353	125	помидор	t
354	125	лист салата	t
355	125	мясо	t
356	126	Апельсины	t
357	126	Грейпфруты	t
358	127	хлеб	t
359	127	кетчуп	t
360	127	помидор	t
361	127	лист салата	t
362	127	мясо	t
363	128	Апельсины	t
364	128	Грейпфруты	t
367	129	кетчуп	t
368	129	помидор	t
369	129	лист салата	t
370	130	мороженое сливочное	t
371	130	мороженое шоколадное	t
372	130	вафельный стаканчик	t
373	131	мороженое фруктовое	t
374	131	клубника	t
375	132	мороженое сливочное	t
376	132	мороженое шоколадное	t
377	132	вафельный стаканчик	t
378	133	мороженое фруктовое	t
379	133	клубника	t
411	147	мясо	t
366	129	хлеб	f
365	129	мясо	t
412	147	хлеб	t
385	137	zxc	t
386	137	cxz	t
387	138	мясо	t
388	138	хлеб	t
389	138	кетчуп	t
390	138	помидор	t
391	138	лист салата	t
392	139	мясо	t
393	139	хлеб	t
394	139	кетчуп	t
395	139	помидор	t
396	139	лист салата	t
397	143	мясо	t
398	143	хлеб	t
399	143	кетчуп	t
400	143	помидор	t
401	143	лист салата	t
402	145	мясо	t
403	145	хлеб	t
404	145	кетчуп	t
405	145	помидор	t
406	145	лист салата	t
407	146	Хлеб	t
408	146	Мясо	t
409	146	Сыр среднеазиатский "Дары пустыни"	t
410	146	Зелень	t
413	147	кетчуп	t
414	147	помидор	t
415	147	лист салата	t
416	148	Хлеб	t
417	148	Мясо	f
418	148	Сыр среднеазиатский "Дары пустыни"	t
419	148	Зелень	t
420	149	Хлеб	t
421	149	Мясо	t
422	149	Сыр среднеазиатский "Дары пустыни"	t
423	149	Зелень	t
424	150	Апельсины	t
425	150	Грейпфруты	t
426	151	Апельсины	t
427	151	Грейпфруты	t
428	152	мороженое сливочное	t
429	152	мороженое шоколадное	t
430	152	вафельный стаканчик	t
431	153	мороженое сливочное	t
432	153	мороженое шоколадное	t
433	153	вафельный стаканчик	t
434	154	Апельсины	t
435	154	Грейпфруты	t
436	155	мороженое сливочное	t
437	155	мороженое шоколадное	t
438	155	вафельный стаканчик	t
439	156	Апельсины	t
440	156	Грейпфруты	t
441	157	Хлеб	t
442	157	Мясо	t
443	157	Сыр среднеазиатский "Дары пустыни"	t
444	157	Зелень	t
445	158	мясо	t
446	158	хлеб	t
447	158	кетчуп	t
448	158	помидор	t
449	158	лист салата	t
450	160	Хлеб	t
451	160	Мясо	t
452	160	Сыр среднеазиатский "Дары пустыни"	t
453	160	Зелень	t
454	161	Апельсины	t
455	161	Грейпфруты	t
456	162	Хлеб	t
457	162	Мясо	t
458	162	Сыр среднеазиатский "Дары пустыни"	t
459	162	Зелень	t
460	163	мороженое сливочное	t
461	163	мороженое шоколадное	t
462	163	вафельный стаканчик	t
463	164	Апельсины	t
464	164	Грейпфруты	t
465	165	мороженое сливочное	t
466	165	мороженое шоколадное	t
467	165	вафельный стаканчик	t
468	166	мороженое фруктовое	t
469	166	клубника	t
470	167	мясо	t
471	167	хлеб	t
472	167	кетчуп	t
473	167	помидор	t
474	167	лист салата	t
475	168	Хлеб	t
476	168	Мясо	t
477	168	Сыр среднеазиатский "Дары пустыни"	t
478	168	Зелень	t
494	172	Апельсины	t
495	172	Грейпфруты	t
496	173	мороженое сливочное	t
497	173	мороженое шоколадное	t
498	173	вафельный стаканчик	t
499	174	мороженое сливочное	t
500	174	мороженое шоколадное	t
501	174	вафельный стаканчик	t
502	175	Хлеб	t
503	175	Мясо	t
504	175	Сыр среднеазиатский "Дары пустыни"	t
505	175	Зелень	t
506	176	мясо	t
507	176	хлеб	t
508	176	кетчуп	t
509	176	помидор	t
510	176	лист салата	t
511	177	Хлеб	t
512	177	Мясо	t
513	177	Сыр среднеазиатский "Дары пустыни"	t
514	177	Зелень	t
515	178	мороженое сливочное	t
516	178	мороженое шоколадное	t
517	178	вафельный стаканчик	t
518	179	мороженое фруктовое	t
519	179	клубника	t
525	182	мороженое фруктовое	t
526	182	клубника	t
529	184	мороженое фруктовое	t
530	184	клубника	t
533	186	мороженое фруктовое	t
534	186	клубника	t
535	187	мороженое сливочное	t
536	187	мороженое шоколадное	t
537	187	вафельный стаканчик	t
538	188	мясо	t
539	188	хлеб	t
540	188	кетчуп	f
541	188	помидор	t
542	188	лист салата	t
543	189	мороженое сливочное	t
544	189	мороженое шоколадное	t
545	189	вафельный стаканчик	t
546	190	мороженое фруктовое	t
547	190	клубника	t
548	191	мороженое сливочное	t
549	191	мороженое шоколадное	t
550	191	вафельный стаканчик	t
551	192	мороженое фруктовое	t
552	192	клубника	t
553	193	мороженое сливочное	t
554	193	мороженое шоколадное	t
555	193	вафельный стаканчик	t
556	194	мороженое фруктовое	t
557	194	клубника	t
558	195	мороженое сливочное	t
559	195	мороженое шоколадное	t
560	195	вафельный стаканчик	t
561	196	мороженое фруктовое	t
562	196	клубника	t
563	197	мороженое фруктовое	t
564	197	клубника	t
565	198	мясо	t
568	198	помидор	t
569	198	лист салата	t
567	198	кетчуп	f
566	198	хлеб	f
570	199	мясо	t
571	199	хлеб	t
572	199	кетчуп	t
573	199	помидор	t
574	199	лист салата	t
575	201	мясо	t
576	201	хлеб	t
577	201	кетчуп	t
578	201	помидор	t
579	201	лист салата	t
580	202	мясо	t
581	202	хлеб	t
582	202	кетчуп	t
583	202	помидор	t
584	202	лист салата	t
585	203	мясо	t
586	203	хлеб	t
587	203	кетчуп	t
588	203	помидор	t
589	203	лист салата	t
590	204	Хлеб	t
591	204	Мясо	t
592	204	Сыр среднеазиатский "Дары пустыни"	t
593	204	Зелень	t
594	205	Хлеб	t
595	205	Мясо	t
596	205	Сыр среднеазиатский "Дары пустыни"	t
597	205	Зелень	t
598	206	Хлеб	t
599	206	Мясо	t
600	206	Сыр среднеазиатский "Дары пустыни"	t
601	206	Зелень	t
602	207	мясо	t
603	207	хлеб	t
604	207	кетчуп	t
605	207	помидор	t
606	207	лист салата	t
607	208	мясо	t
608	208	хлеб	t
609	208	кетчуп	t
610	208	помидор	t
611	208	лист салата	t
612	209	мясо	t
613	209	хлеб	t
614	209	кетчуп	t
615	209	помидор	t
616	209	лист салата	t
617	210	мясо	t
618	210	хлеб	t
619	210	кетчуп	t
620	210	помидор	t
621	210	лист салата	t
622	211	мясо	t
623	211	хлеб	t
624	211	кетчуп	t
625	211	помидор	t
626	211	лист салата	t
627	212	мясо	t
628	212	хлеб	t
629	212	кетчуп	t
630	212	помидор	t
631	212	лист салата	t
632	213	мясо	t
633	213	хлеб	t
634	213	кетчуп	t
635	213	помидор	t
636	213	лист салата	t
637	214	мясо	t
638	214	хлеб	t
639	214	кетчуп	t
640	214	помидор	t
641	214	лист салата	t
642	215	мясо	t
643	215	хлеб	t
644	215	кетчуп	t
645	215	помидор	t
646	215	лист салата	t
647	216	мясо	t
648	216	хлеб	t
649	216	кетчуп	t
650	216	помидор	t
651	216	лист салата	t
652	217	мясо	t
653	217	хлеб	t
654	217	кетчуп	t
655	217	помидор	t
656	217	лист салата	t
657	218	мясо	t
658	218	хлеб	t
659	218	кетчуп	t
660	218	помидор	t
661	218	лист салата	t
662	219	мясо	t
663	219	хлеб	t
664	219	кетчуп	t
665	219	помидор	t
666	219	лист салата	t
667	220	мясо	t
668	220	хлеб	t
669	220	кетчуп	t
670	220	помидор	t
671	220	лист салата	t
672	221	мясо	t
673	221	хлеб	t
674	221	кетчуп	t
675	221	помидор	t
676	221	лист салата	t
677	222	Хлеб	t
678	222	Мясо	t
679	222	Сыр среднеазиатский "Дары пустыни"	t
680	222	Зелень	t
681	230	мясо	t
682	230	хлеб	t
683	230	кетчуп	t
684	230	помидор	t
685	230	лист салата	t
686	231	мясо	t
687	231	хлеб	t
688	231	кетчуп	t
689	231	помидор	t
690	231	лист салата	t
691	232	мясо	t
692	232	хлеб	t
693	232	кетчуп	t
694	232	помидор	t
695	232	лист салата	t
696	233	мясо	t
697	233	хлеб	t
698	233	кетчуп	t
699	233	помидор	t
700	233	лист салата	t
701	234	мясо	t
702	234	хлеб	t
703	234	кетчуп	t
704	234	помидор	t
705	234	лист салата	t
706	235	мясо	t
707	235	хлеб	t
708	235	кетчуп	t
709	235	помидор	t
710	235	лист салата	t
711	236	Хлеб	t
712	236	Мясо	t
713	236	Сыр среднеазиатский "Дары пустыни"	t
714	236	Зелень	t
715	237	Хлеб	t
716	237	Мясо	t
717	237	Сыр среднеазиатский "Дары пустыни"	t
718	237	Зелень	t
719	238	Хлеб	t
720	238	Мясо	t
721	238	Сыр среднеазиатский "Дары пустыни"	t
722	238	Зелень	t
723	239	Хлеб	t
724	239	Мясо	t
725	239	Сыр среднеазиатский "Дары пустыни"	t
726	239	Зелень	t
727	240	Хлеб	t
728	240	Мясо	t
729	240	Сыр среднеазиатский "Дары пустыни"	t
730	240	Зелень	t
731	241	Хлеб	t
732	241	Мясо	t
733	241	Сыр среднеазиатский "Дары пустыни"	t
734	241	Зелень	t
735	242	мясо	t
736	242	хлеб	t
737	242	кетчуп	t
738	242	помидор	t
739	242	лист салата	t
740	243	Хлеб	t
741	243	Мясо	t
742	243	Сыр среднеазиатский "Дары пустыни"	t
743	243	Зелень	t
744	244	Хлеб	t
745	244	Мясо	t
746	244	Сыр среднеазиатский "Дары пустыни"	t
747	244	Зелень	t
748	245	Хлеб	t
749	245	Мясо	t
750	245	Сыр среднеазиатский "Дары пустыни"	t
751	245	Зелень	t
752	246	Хлеб	t
753	246	Мясо	t
754	246	Сыр среднеазиатский "Дары пустыни"	t
755	246	Зелень	t
756	247	Хлеб	t
757	247	Мясо	t
758	247	Сыр среднеазиатский "Дары пустыни"	t
759	247	Зелень	t
760	248	Хлеб	t
761	248	Мясо	t
762	248	Сыр среднеазиатский "Дары пустыни"	t
763	248	Зелень	t
764	249	мясо	t
765	249	хлеб	t
766	249	кетчуп	t
767	249	помидор	t
768	249	лист салата	t
773	251	Хлеб	t
774	251	Мясо	t
775	251	Сыр среднеазиатский "Дары пустыни"	t
776	251	Зелень	t
777	252	Хлеб	t
778	252	Мясо	t
779	252	Сыр среднеазиатский "Дары пустыни"	t
780	252	Зелень	t
781	253	Хлеб	t
782	253	Мясо	t
783	253	Сыр среднеазиатский "Дары пустыни"	t
784	253	Зелень	t
785	254	мясо	t
786	254	хлеб	t
787	254	кетчуп	t
788	254	помидор	t
789	254	лист салата	t
790	255	мясо	t
791	255	хлеб	t
792	255	кетчуп	t
793	255	помидор	t
794	255	лист салата	t
795	256	Хлеб	t
796	256	Мясо	t
797	256	Сыр среднеазиатский "Дары пустыни"	t
798	256	Зелень	t
799	257	Хлеб	t
800	257	Мясо	t
801	257	Сыр среднеазиатский "Дары пустыни"	t
802	257	Зелень	t
803	258	Хлеб	t
804	258	Мясо	t
805	258	Сыр среднеазиатский "Дары пустыни"	t
806	258	Зелень	t
811	260	мясо	t
812	260	хлеб	t
813	260	кетчуп	t
814	260	помидор	t
815	260	лист салата	t
816	261	мясо	t
817	261	хлеб	t
818	261	кетчуп	t
819	261	помидор	t
820	261	лист салата	t
821	262	Хлеб	t
822	262	Мясо	t
823	262	Сыр среднеазиатский "Дары пустыни"	t
824	262	Зелень	t
825	263	мясо	t
826	263	хлеб	t
827	263	кетчуп	t
828	263	помидор	t
829	263	лист салата	t
830	264	мясо	t
831	264	хлеб	t
832	264	кетчуп	t
833	264	помидор	t
834	264	лист салата	t
835	265	мясо	t
836	265	хлеб	t
837	265	кетчуп	t
838	265	помидор	t
839	265	лист салата	t
840	266	Хлеб	t
841	266	Мясо	t
842	266	Сыр среднеазиатский "Дары пустыни"	t
843	266	Зелень	t
844	268	мороженое сливочное	t
845	268	мороженое шоколадное	t
846	268	вафельный стаканчик	t
847	270	мороженое сливочное	t
848	270	мороженое шоколадное	t
849	270	вафельный стаканчик	t
850	271	мороженое фруктовое	t
851	271	клубника	t
852	272	мясо	t
853	272	хлеб	t
854	272	кетчуп	t
855	272	помидор	t
856	272	лист салата	t
857	273	мясо	t
858	273	хлеб	t
859	273	кетчуп	t
860	273	помидор	t
861	273	лист салата	t
862	274	мясо	t
863	274	хлеб	t
864	274	кетчуп	t
865	274	помидор	t
866	274	лист салата	t
867	275	Хлеб	t
868	275	Мясо	t
869	275	Сыр среднеазиатский "Дары пустыни"	t
870	275	Зелень	t
871	276	Хлеб	t
872	276	Мясо	t
873	276	Сыр среднеазиатский "Дары пустыни"	t
874	276	Зелень	t
875	277	Хлеб	t
876	277	Мясо	t
877	277	Сыр среднеазиатский "Дары пустыни"	t
878	277	Зелень	t
879	278	Хлеб	t
880	278	Мясо	t
881	278	Сыр среднеазиатский "Дары пустыни"	t
882	278	Зелень	t
883	279	мясо	t
884	279	хлеб	t
885	279	кетчуп	t
886	279	помидор	t
887	279	лист салата	t
903	283	мясо	t
904	283	хлеб	t
905	283	кетчуп	t
906	283	помидор	t
907	283	лист салата	t
908	284	мясо	t
909	284	хлеб	t
910	284	кетчуп	t
911	284	помидор	t
912	284	лист салата	t
913	285	мясо	t
914	285	хлеб	t
915	285	кетчуп	t
916	285	помидор	t
917	285	лист салата	t
918	286	мясо	t
919	286	хлеб	t
920	286	кетчуп	t
921	286	помидор	t
922	286	лист салата	t
923	287	мясо	t
924	287	хлеб	t
925	287	кетчуп	t
926	287	помидор	t
927	287	лист салата	t
928	288	мясо	t
929	288	хлеб	t
930	288	кетчуп	t
931	288	помидор	t
932	288	лист салата	t
933	289	мясо	t
934	289	хлеб	t
935	289	кетчуп	t
936	289	помидор	t
937	289	лист салата	t
938	290	Хлеб	t
939	290	Мясо	t
940	290	Сыр среднеазиатский "Дары пустыни"	t
941	290	Зелень	t
942	291	мясо	t
943	291	хлеб	t
944	291	кетчуп	t
945	291	помидор	t
946	291	лист салата	t
947	292	мясо	t
948	292	хлеб	t
949	292	кетчуп	t
950	292	помидор	t
951	292	лист салата	t
952	293	мясо	t
953	293	хлеб	t
954	293	кетчуп	t
955	293	помидор	t
956	293	лист салата	t
957	294	мясо	t
958	294	хлеб	t
959	294	кетчуп	t
960	294	помидор	t
961	294	лист салата	t
962	295	мороженое сливочное	t
963	295	мороженое шоколадное	t
964	295	вафельный стаканчик	t
965	296	мясо	t
966	296	хлеб	t
967	296	кетчуп	t
968	296	помидор	t
969	296	лист салата	t
988	302	мороженое сливочное	t
989	302	мороженое шоколадное	t
990	302	вафельный стаканчик	t
991	303	мороженое сливочное	t
992	303	мороженое шоколадное	t
993	303	вафельный стаканчик	t
996	305	мороженое фруктовое	t
997	305	клубника	t
998	306	мороженое сливочное	t
999	306	мороженое шоколадное	t
1000	306	вафельный стаканчик	t
1001	307	мороженое фруктовое	t
1002	307	клубника	t
1003	308	мясо	t
1004	308	хлеб	t
1005	308	кетчуп	t
1006	308	помидор	t
1007	308	лист салата	t
1008	309	Хлеб	t
1009	309	Мясо	t
1010	309	Сыр среднеазиатский "Дары пустыни"	t
1011	309	Зелень	t
1012	311	мороженое сливочное	t
1013	311	мороженое шоколадное	t
1014	311	вафельный стаканчик	t
1015	312	мороженое фруктовое	t
1016	312	клубника	t
1017	313	мороженое фруктовое	t
1018	313	клубника	t
1026	316	Хлеб	t
1027	316	Мясо	t
1028	316	Сыр среднеазиатский "Дары пустыни"	t
1029	316	Зелень	t
1030	317	мороженое сливочное	t
1031	317	мороженое шоколадное	t
1032	317	вафельный стаканчик	t
1033	318	мороженое фруктовое	t
1034	318	клубника	t
1035	319	мороженое фруктовое	t
1036	319	клубника	t
1037	320	мясо	t
1038	320	хлеб	t
1039	320	кетчуп	t
1040	320	помидор	t
1041	320	лист салата	t
1042	322	мясо	t
1043	322	хлеб	t
1044	322	кетчуп	t
1045	322	помидор	t
1046	322	лист салата	t
1047	323	мороженое фруктовое	t
1048	323	клубника	t
1049	324	Апельсины	t
1050	324	Грейпфруты	t
1051	325	мороженое сливочное	t
1052	325	мороженое шоколадное	t
1053	325	вафельный стаканчик	t
1054	326	мороженое фруктовое	t
1055	326	клубника	t
1056	327	мороженое сливочное	t
1057	327	мороженое шоколадное	t
1058	327	вафельный стаканчик	t
1059	328	мороженое фруктовое	t
1060	328	клубника	t
1061	329	мороженое сливочное	t
1062	329	мороженое шоколадное	t
1063	329	вафельный стаканчик	t
1064	330	мороженое фруктовое	t
1065	330	клубника	t
1066	331	мороженое фруктовое	t
1067	331	клубника	t
1068	332	мороженое сливочное	t
1069	332	мороженое шоколадное	t
1070	332	вафельный стаканчик	t
1071	333	мясо	t
1072	333	хлеб	t
1073	333	кетчуп	t
1074	333	помидор	t
1075	333	лист салата	t
1076	334	Хлеб	t
1077	334	Мясо	t
1078	334	Сыр среднеазиатский "Дары пустыни"	t
1079	334	Зелень	t
1080	335	мороженое сливочное	t
1081	335	мороженое шоколадное	t
1082	335	вафельный стаканчик	t
1083	336	мороженое фруктовое	t
1084	336	клубника	t
1085	337	мороженое сливочное	t
1086	337	мороженое шоколадное	t
1087	337	вафельный стаканчик	t
1088	338	мороженое фруктовое	t
1089	338	клубника	t
1090	339	мороженое сливочное	t
1091	339	мороженое шоколадное	t
1092	339	вафельный стаканчик	t
1093	340	мороженое фруктовое	t
1094	340	клубника	t
1095	341	мороженое сливочное	t
1096	341	мороженое шоколадное	t
1097	341	вафельный стаканчик	t
1098	342	мороженое фруктовое	t
1099	342	клубника	t
1100	343	мороженое сливочное	t
1101	343	мороженое шоколадное	t
1102	343	вафельный стаканчик	t
1103	344	мороженое фруктовое	t
1104	344	клубника	t
1105	345	мороженое сливочное	t
1106	345	мороженое шоколадное	t
1107	345	вафельный стаканчик	t
1108	346	мороженое фруктовое	t
1109	346	клубника	t
1110	347	мясо	t
1111	347	хлеб	t
1112	347	кетчуп	t
1113	347	помидор	t
1114	347	лист салата	t
1115	348	Хлеб	t
1116	348	Мясо	t
1117	348	Сыр среднеазиатский "Дары пустыни"	t
1118	348	Зелень	t
1119	349	мясо	t
1120	349	хлеб	t
1121	349	кетчуп	t
1122	349	помидор	t
1123	349	лист салата	t
1124	350	Хлеб	t
1125	350	Мясо	t
1126	350	Сыр среднеазиатский "Дары пустыни"	t
1127	350	Зелень	t
1128	351	мясо	t
1129	351	хлеб	t
1130	351	кетчуп	t
1131	351	помидор	t
1132	351	лист салата	t
1133	352	Хлеб	t
1134	352	Мясо	t
1135	352	Сыр среднеазиатский "Дары пустыни"	t
1136	352	Зелень	t
1137	353	мясо	t
1138	353	хлеб	t
1139	353	кетчуп	t
1140	353	помидор	t
1141	353	лист салата	t
1142	354	мясо	t
1143	354	хлеб	t
1144	354	кетчуп	t
1145	354	помидор	t
1146	354	лист салата	t
1147	355	Хлеб	t
1148	355	Мясо	t
1149	355	Сыр среднеазиатский "Дары пустыни"	t
1150	355	Зелень	t
1151	356	мясо	t
1152	356	хлеб	t
1153	356	кетчуп	t
1154	356	помидор	t
1155	356	лист салата	t
1156	358	мясо	t
1157	358	хлеб	t
1158	358	кетчуп	t
1159	358	помидор	t
1160	358	лист салата	t
1161	360	мясо	t
1162	360	хлеб	t
1163	360	кетчуп	t
1164	360	помидор	t
1165	360	лист салата	t
1166	361	мясо	t
1167	361	хлеб	t
1168	361	кетчуп	t
1169	361	помидор	t
1170	361	лист салата	t
1171	362	Хлеб	t
1172	362	Мясо	t
1173	362	Сыр среднеазиатский "Дары пустыни"	t
1174	362	Зелень	t
1175	363	мясо	t
1176	363	хлеб	t
1177	363	кетчуп	t
1178	363	помидор	t
1179	363	лист салата	t
1180	364	Хлеб	t
1181	364	Мясо	t
1182	364	Сыр среднеазиатский "Дары пустыни"	t
1183	364	Зелень	t
1184	365	мясо	t
1185	365	хлеб	t
1186	365	кетчуп	t
1187	365	помидор	t
1188	365	лист салата	t
1189	366	Хлеб	t
1190	366	Мясо	t
1191	366	Сыр среднеазиатский "Дары пустыни"	t
1192	366	Зелень	t
1193	367	Хлеб	t
1194	367	Мясо	t
1195	367	Сыр среднеазиатский "Дары пустыни"	t
1196	367	Зелень	t
\.


--
-- Data for Name: vne_order_products; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_order_products (id, order_id, serving_id, code, name, price, q, completed, img) FROM stdin;
5	2	1	hf00015	Какое-то блюдо 15	1000	1	f	\N
6	3	2	hf00015	Какое-то блюдо 15	1000	1	f	\N
7	4	1	hf00015	Какое-то блюдо 15	1000	1	f	\N
8	5	1	hf00015	Какое-то блюдо 15	1000	2	f	\N
9	6	1	hf00015	Какое-то блюдо 15	1000	1	f	\N
10	7	1	hf00015	Какое-то блюдо 15	1000	2	f	\N
13	10	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
14	11	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
15	11	2	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
16	12	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
17	13	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
18	14	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
19	14	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
20	15	1	h0001	Гамбургер с телятиной	100	2	f	2021-9/1632527184307_500.jpg
21	15	1	hf00015	Какое-то блюдо 15	1000	1	f	2021-9/1632350544594_500.jpg
22	15	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
23	15	1	hf00020	Какое-то блюдо 20	1000	1	f	2021-9/1632350544594_500.jpg
24	15	1	hf00077	Какое-то блюдо 77	1000	1	f	2021-9/1632350544594_500.jpg
25	16	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
26	16	1	hf0004	Какое-то блюдо 4	1000	1	f	2021-9/1632350544594_500.jpg
27	16	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
28	17	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
29	17	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
30	17	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
31	18	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
32	19	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
33	20	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
34	21	2	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
35	21	1	m0002	Мороженое "Фруктовый сад"	300	3	f	2021-9/1632669997544_500.jpg
36	22	1	m0002	Мороженое "Фруктовый сад"	300	3	f	2021-9/1632669997544_500.jpg
37	23	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
38	23	2	hf00015	Какое-то блюдо 15	1000	1	f	2021-9/1632350544594_500.jpg
39	23	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
40	23	2	hf00015	Какое-то блюдо 15	1000	1	f	2021-9/1632350544594_500.jpg
41	23	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
42	24	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
43	24	2	h0002	Королевский чизбургер	305	2	f	2021-9/1632351029146_500.jpg
44	24	1	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
45	25	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
46	25	2	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
47	25	2	hf00015	Какое-то блюдо 15	1000	1	f	2021-9/1632350544594_500.jpg
48	27	2	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
49	27	2	m0001	Мороженое "Сказка"	500	2	f	2021-9/1632669890885_500.jpg
50	27	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
51	28	1	h0001	Гамбургер с телятиной	100	3	f	2021-9/1632527184307_500.jpg
52	28	1	h0002	Королевский чизбургер	305	3	f	2021-9/1632351029146_500.jpg
53	28	1	hf0001	Гамбургер "Бостон"	1000	4	f	2021-9/1632350544594_500.jpg
54	29	2	hf0001	Гамбургер "Бостон"	1000	4	f	2021-9/1632350544594_500.jpg
55	29	2	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
56	29	2	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
57	30	2	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
58	30	2	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
59	30	2	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
60	31	2	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
61	31	2	hf0002	Какое-то блюдо с очень длинным-предлинным названием	1000	1	f	2021-9/1632350544594_500.jpg
62	31	2	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
63	31	2	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
65	32	2	h0002	Королевский чизбургер	305	2	t	2021-9/1632351029146_500.jpg
114	38	1	m0001	Мороженое "Сказка"	500	3	f	2021-9/1632669890885_500.jpg
64	32	2	h0001	Гамбургер с телятиной	100	3	f	2021-9/1632527184307_500.jpg
66	32	2	hf0001	Гамбургер "Бостон"	1000	1	t	2021-9/1632350544594_500.jpg
67	33	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
68	33	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
69	34	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
70	34	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
71	34	1	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
72	35	1	h0001	Гамбургер с телятиной	100	62	f	2021-9/1632527184307_500.jpg
73	35	1	hf00015	Какое-то блюдо 15	1000	3	f	2021-9/1632350544594_500.jpg
74	35	1	hf00033	Какое-то блюдо 33	1000	2	f	2021-9/1632350544594_500.jpg
75	35	1	hf00020	Какое-то блюдо 20	1000	2	f	2021-9/1632350544594_500.jpg
76	35	1	hf00042	Какое-то блюдо 42	1000	3	f	2021-9/1632350544594_500.jpg
77	35	1	hf00035	Какое-то блюдо 35	1000	1	f	2021-9/1632350544594_500.jpg
78	35	1	hf00077	Какое-то блюдо 77	1000	1	f	2021-9/1632350544594_500.jpg
79	35	1	hf00061	Какое-то блюдо 61	1000	1	f	2021-9/1632350544594_500.jpg
80	36	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
81	36	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
82	35	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
83	37	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
84	37	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
85	37	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
86	37	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
87	38	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
88	38	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
89	38	2	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
90	39	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
91	39	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
92	38	1	hf0002	Какое-то блюдо с очень длинным-предлинным названием	1000	1	f	2021-9/1632350544594_500.jpg
93	40	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
94	40	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
95	41	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
96	41	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
97	41	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
98	41	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
99	40	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
100	40	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
101	42	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
102	42	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
103	43	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
104	43	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
105	43	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
106	44	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
107	44	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
108	45	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
109	45	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
110	45	2	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
111	45	2	h0002	Королевский чизбургер	305	2	f	2021-9/1632351029146_500.jpg
115	38	1	m0002	Мороженое "Фруктовый сад"	300	2	f	2021-9/1632669997544_500.jpg
116	38	1	f0001	Цитрусовая нарезка	200	2	f	2021-9/1632351091004_500.jpg
117	47	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
118	47	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
119	47	1	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
120	47	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
121	48	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
122	48	1	h0002	Королевский чизбургер	305	2	f	2021-9/1632351029146_500.jpg
123	49	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
124	49	1	h0002	Королевский чизбургер	305	2	f	2021-9/1632351029146_500.jpg
125	50	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
126	50	1	f0001	Цитрусовая нарезка	200	3	f	2021-9/1632351091004_500.jpg
127	51	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
128	51	1	f0001	Цитрусовая нарезка	200	1	f	2021-9/1632351091004_500.jpg
132	53	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
133	53	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
163	65	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
130	52	2	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
164	66	1	f0001	Цитрусовая нарезка	200	1	f	2021-9/1632351091004_500.jpg
129	52	1	h0001	Гамбургер с телятиной	100	3	t	2021-9/1632527184307_500.jpg
165	67	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
131	52	2	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
166	67	1	m0002	Мороженое "Фруктовый сад"	300	2	f	2021-9/1632669997544_500.jpg
167	68	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
137	\N	1	qqq	www	33	4	t	2021-10/1633562315568_500.jpg
138	54	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
139	55	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632527184307_500.jpg
142	56	1	hf0006	Какое-то блюдо 6	1000	2	f	2021-9/1632350544594_500.jpg
144	56	1	hf0001	Гамбургер "Бостон"	1000	4	f	2021-9/1632350544594_500.jpg
145	56	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
146	56	1	h0002	Королевский чизбургер	305	1	t	2021-9/1632351029146_500.jpg
168	68	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
147	57	1	h0001	Гамбургер с телятиной	100	2	f	2021-9/1632942969923_500.jpg
148	57	1	h0002	Королевский чизбургер	305	2	f	2021-9/1632351029146_500.jpg
149	56	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
140	56	1	hf0007	Какое-то блюдо 7	1000	1	t	2021-9/1632350544594_500.jpg
141	56	1	hf0008	Какое-то блюдо 8	1000	4	t	2021-9/1632350544594_500.jpg
143	\N	1	h0001	Гамбургер с телятиной	100	4	f	2021-9/1632942969923_500.jpg
150	58	1	f0001	Цитрусовая нарезка	200	2	f	2021-9/1632351091004_500.jpg
151	59	1	f0001	Цитрусовая нарезка	200	1	f	2021-9/1632351091004_500.jpg
152	60	1	m0001	Мороженое "Сказка"	500	4	f	2021-9/1632669890885_500.jpg
153	60	1	m0001	Мороженое "Сказка"	500	3	f	2021-9/1632669890885_500.jpg
154	61	1	f0001	Цитрусовая нарезка	200	1	f	2021-9/1632351091004_500.jpg
155	61	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
156	62	1	f0001	Цитрусовая нарезка	200	2	f	2021-9/1632351091004_500.jpg
157	63	1	h0002	Королевский чизбургер	305	2	f	2021-9/1632351029146_500.jpg
158	63	1	h0001	Гамбургер с телятиной	100	10	f	2021-9/1632942969923_500.jpg
159	63	1	hf0001	Гамбургер "Бостон"	1000	5	f	2021-9/1632350544594_500.jpg
160	63	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
161	64	1	f0001	Цитрусовая нарезка	200	1	t	2021-9/1632351091004_500.jpg
162	64	1	h0002	Королевский чизбургер	305	3	t	2021-9/1632351029146_500.jpg
172	70	1	f0001	Цитрусовая нарезка	200	1	f	2021-9/1632351091004_500.jpg
173	70	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
174	71	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
175	72	1	h0002	Королевский чизбургер	305	2	f	2021-9/1632351029146_500.jpg
176	72	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
177	73	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
178	74	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
179	74	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
182	76	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
184	78	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
186	80	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
188	80	1	h0001	Гамбургер с телятиной	100	2	t	2021-9/1632942969923_500.jpg
187	80	1	m0001	Мороженое "Сказка"	500	1	t	2021-9/1632669890885_500.jpg
189	80	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
190	80	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
191	80	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
192	80	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
194	81	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
193	81	1	m0001	Мороженое "Сказка"	500	1	t	2021-9/1632669890885_500.jpg
195	82	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
196	82	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
197	86	2	m0002	Мороженое "Фруктовый сад"	300	2	f	2021-9/1632669997544_500.jpg
198	86	1	h0001	Гамбургер с телятиной	100	1	t	2021-9/1632942969923_500.jpg
199	87	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
200	87	1	hf0003	Какое-то блюдо 3	1000	1	f	2021-9/1632350619186_500.jpg
201	88	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
202	89	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
203	90	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
204	91	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
205	92	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
206	93	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
207	94	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
208	95	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
209	96	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
210	97	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
211	98	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
212	99	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
213	100	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
214	101	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
215	102	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
216	103	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
217	104	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
218	105	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
219	106	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
220	107	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
221	108	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
222	108	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
223	109	1	hf0002	Какое-то блюдо с очень длинным-предлинным названием	1000	1	f	2021-9/1632350544594_500.jpg
224	109	1	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
225	110	1	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
226	111	1	hf0001	Гамбургер "Бостон"	1000	2	f	2021-9/1632350544594_500.jpg
227	112	1	hf0001	Гамбургер "Бостон"	1000	2	f	2021-9/1632350544594_500.jpg
228	114	1	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
229	115	1	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
230	115	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
231	115	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
232	115	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
233	115	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
234	115	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
235	115	1	h0001	Гамбургер с телятиной	100	2	f	2021-9/1632942969923_500.jpg
236	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
237	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
238	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
239	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
240	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
241	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
242	115	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
243	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
244	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
245	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
246	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
247	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
248	115	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
249	116	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
251	118	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
252	119	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
253	120	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
254	121	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
255	122	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
256	123	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
257	124	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
258	125	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
260	127	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
261	128	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
262	129	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
263	130	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
264	131	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
265	132	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
266	132	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
268	132	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
267	\N	2	hf0002	Какое-то блюдо с очень длинным-предлинным названием	1000	1	f	2021-9/1632350544594_500.jpg
269	133	1	hf00015	Какое-то блюдо 15	1000	1	f	2021-9/1632350544594_500.jpg
270	134	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
271	134	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
272	134	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
273	134	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
274	134	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
275	134	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
276	134	4	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
277	134	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
278	135	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
279	136	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
283	140	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
284	141	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
285	144	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
286	146	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
287	147	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
288	149	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
289	150	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
290	150	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
291	152	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
292	153	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
293	153	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
294	153	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
295	154	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
296	154	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
302	158	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
303	159	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
305	161	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
306	162	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
307	162	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
308	162	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
309	162	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
310	162	1	hf0001	Гамбургер "Бостон"	1000	1	f	2021-9/1632350544594_500.jpg
311	162	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
312	162	1	m0002	Мороженое "Фруктовый сад"	300	2	f	2021-9/1632669997544_500.jpg
313	162	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
316	165	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
317	166	1	m0001	Мороженое "Сказка"	500	1	f	2021-9/1632669890885_500.jpg
318	166	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
319	166	1	m0002	Мороженое "Фруктовый сад"	300	1	f	2021-9/1632669997544_500.jpg
320	168	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
321	168	1	hf00015	Какое-то блюдо 15	1000	1	f	2021-9/1632350544594_500.jpg
322	169	1	h0001	Гамбургер с телятиной	100	21	f	2021-9/1632942969923_500.jpg
323	170	1	m0002	Мороженое "Фруктовый сад"	300	40	f	2021-9/1632669997544_500.jpg
324	171	1	f0001	Цитрусовая нарезка	200	26	f	2021-9/1632351091004_500.jpg
325	172	1	m0001	Мороженое "Сказка"	500	31	f	2021-9/1632669890885_500.jpg
326	172	1	m0002	Мороженое "Фруктовый сад"	300	27	f	2021-9/1632669997544_500.jpg
327	173	1	m0001	Мороженое "Сказка"	500	7	f	2021-9/1632669890885_500.jpg
328	173	1	m0002	Мороженое "Фруктовый сад"	300	11	f	2021-9/1632669997544_500.jpg
329	174	1	m0001	Мороженое "Сказка"	500	3	f	2021-9/1632669890885_500.jpg
330	174	1	m0002	Мороженое "Фруктовый сад"	300	3	f	2021-9/1632669997544_500.jpg
331	175	1	m0002	Мороженое "Фруктовый сад"	300	9	f	2021-9/1632669997544_500.jpg
332	175	1	m0001	Мороженое "Сказка"	500	13	f	2021-9/1632669890885_500.jpg
333	176	1	h0001	Гамбургер с телятиной	100	28	f	2021-9/1632942969923_500.jpg
334	176	1	h0002	Королевский чизбургер	305	41	f	2021-9/1632351029146_500.jpg
335	177	1	m0001	Мороженое "Сказка"	500	11	f	2021-9/1632669890885_500.jpg
336	177	1	m0002	Мороженое "Фруктовый сад"	300	24	f	2021-9/1632669997544_500.jpg
337	178	1	m0001	Мороженое "Сказка"	500	12	f	2021-9/1632669890885_500.jpg
338	178	1	m0002	Мороженое "Фруктовый сад"	300	9	f	2021-9/1632669997544_500.jpg
339	179	1	m0001	Мороженое "Сказка"	500	31	f	2021-9/1632669890885_500.jpg
340	179	1	m0002	Мороженое "Фруктовый сад"	300	31	f	2021-9/1632669997544_500.jpg
341	180	1	m0001	Мороженое "Сказка"	500	20	f	2021-9/1632669890885_500.jpg
342	180	1	m0002	Мороженое "Фруктовый сад"	300	7	f	2021-9/1632669997544_500.jpg
343	181	1	m0001	Мороженое "Сказка"	500	31	f	2021-9/1632669890885_500.jpg
344	181	1	m0002	Мороженое "Фруктовый сад"	300	16	f	2021-9/1632669997544_500.jpg
345	182	1	m0001	Мороженое "Сказка"	500	54	f	2021-9/1632669890885_500.jpg
346	182	1	m0002	Мороженое "Фруктовый сад"	300	44	f	2021-9/1632669997544_500.jpg
347	191	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
348	191	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
349	192	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
350	192	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
351	192	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
352	192	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
353	193	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
354	194	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
355	192	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
356	195	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
357	195	1	al0001	Шампанское "Советское"	1000	1	f	2021-10/1634920285748_500.jpg
358	192	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
359	192	1	hf00015	Какое-то блюдо 15	1000	1	f	2021-9/1632350544594_500.jpg
360	197	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
361	199	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
362	201	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
363	201	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
364	203	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
365	204	1	h0001	Гамбургер с телятиной	100	1	f	2021-9/1632942969923_500.jpg
366	204	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
367	204	1	h0002	Королевский чизбургер	305	1	f	2021-9/1632351029146_500.jpg
368	204	1	al0001	Шампанское "Советское"	1000	3	f	2021-10/1634920285748_500.jpg
\.


--
-- Data for Name: vne_orders; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_orders (id, table_id, hall_id, restaurant_id, employee_id, need_waiter, need_invoice, status, discount_percent, sum, created_at, need_products, customer_comment, employee_comment, paymethod, accepted_at, completed_at) FROM stdin;
56	\N	\N	21	9	t	f	cancelled	0	11710	2021-10-10 13:01:24.230971	t			card	2021-10-10 13:03:34.934	\N
32	61	2	21	9	f	f	completed	10	\N	2021-10-04 22:34:46.437364	f		пробный заказ 2	cash	2021-10-04 22:34:57.587	2021-10-04 23:08:32.699
41	\N	\N	21	9	f	f	completed	0	\N	2021-10-05 15:02:00.171683	t			cash	2021-10-05 15:03:34.031	2021-09-05 15:03:46.086
174	83	18	21	9	f	f	completed	0	24000	2021-05-17 02:20:05.111451	f			cash	2021-05-17 02:20:09.478	2021-05-17 02:20:11.964
58	81	18	21	9	t	f	completed	0	400	2021-10-10 22:02:45.327232	t	<div>10.10.2021 22:03 Артём OOJ.ru , срочно! </div>		cash	2021-10-10 22:04:22.963	2021-10-10 22:04:47.529
150	64	4	21	9	f	f	cancelled	5	384.75	2021-10-14 12:32:57.676092	f			card	\N	\N
115	81	18	21	9	t	f	cancelled	0	5460	2021-10-12 23:18:17.073788	t			cash	2021-10-13 01:49:56.48	\N
142	81	18	21	\N	f	f	cancelled	5	0	2021-10-14 12:28:35.838881	f			cash	\N	\N
60	81	18	21	\N	f	t	cancelled	0	3500	2021-10-10 22:06:08.115151	t			cash	\N	\N
36	\N	\N	21	9	f	t	completed	0	\N	2021-10-05 13:18:53.653899	f			cash	2021-10-05 13:23:57.678	2021-10-05 13:32:46.877
116	81	18	21	\N	f	f	cancelled	0	100	2021-10-13 01:50:49.759374	f			cash	\N	\N
62	81	18	21	9	f	f	cancelled	0	400	2021-10-10 22:14:08.338499	f	<div>10.10.2021 22:14 Артём.  Срочно. </div>		cash	2021-10-10 22:14:20.755	\N
64	81	18	21	9	f	f	cancelled	0	1115	2021-10-10 22:24:59.099559	f	<div>10.10.2021 22:24 Артём. Срочно! Бургер медиум велодром. </div>		cash	2021-10-10 22:25:17.591	\N
119	81	18	21	\N	f	f	cancelled	0	305	2021-10-13 02:13:01.310983	f			cash	\N	\N
152	81	18	21	9	t	f	cancelled	0	100	2021-10-14 12:51:52.710124	f			cash	2021-10-14 12:51:56.166	\N
66	81	18	21	9	f	f	cancelled	0	200	2021-10-10 22:27:28.401087	f	<div>10.10.2021 22:27 Артём. </div>		cash	2021-10-10 22:27:35.056	\N
122	81	18	21	\N	f	f	cancelled	0	100	2021-10-13 02:26:01.346612	f			cash	\N	\N
68	81	18	21	9	f	f	cancelled	0	405	2021-10-10 22:33:17.693619	f			cash	2021-10-10 22:33:33.073	\N
154	61	2	21	9	f	f	cancelled	5	570	2021-10-14 18:50:25.087653	f			card	2021-10-14 18:50:29.554	\N
91	81	18	21	\N	f	f	cancelled	0	305	2021-10-12 19:18:55.559831	f			cash	\N	\N
94	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:31:03.086786	f			cash	\N	\N
70	81	18	21	9	f	f	completed	0	700	2021-10-10 23:15:33.477597	f	<div>10.10.2021 23:15 Артём. </div>		cash	2021-10-10 23:15:50.396	2021-10-10 23:18:01.57
96	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:40:21.125187	f			cash	\N	\N
99	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 20:11:46.481838	f			cash	\N	\N
101	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 20:56:58.785693	f			cash	\N	\N
103	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 20:59:10.945537	f			cash	\N	\N
127	81	18	21	\N	f	f	cancelled	0	100	2021-10-13 11:30:01.887654	f			cash	\N	\N
72	81	18	21	9	t	t	cancelled	5	674.5	2021-10-11 13:11:04.34053	t			card	2021-10-11 13:11:15.167	\N
106	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 21:14:36.807832	f			cash	\N	\N
57	\N	\N	21	9	f	f	completed	0	810	2021-10-10 13:04:39.795598	f			cash	2021-10-10 13:04:39.794	2021-10-10 13:05:01.238
74	81	18	21	\N	f	f	completed	0	800	2021-10-11 14:01:25.301117	f			cash	\N	2021-10-11 14:09:39.595
123	81	18	21	\N	f	f	cancelled	0	305	2021-10-13 02:26:17.10655	f			cash	2021-10-13 02:26:30.337	\N
108	81	18	21	\N	f	f	cancelled	0	405	2021-10-12 21:28:00.629733	f			cash	\N	\N
76	81	18	21	\N	f	f	completed	0	300	2021-10-11 14:12:26.278343	f			cash	\N	2021-10-11 14:12:41.294
109	81	18	21	\N	f	f	cancelled	0	2000	2021-10-12 21:29:38.424816	f			cash	\N	\N
153	81	18	21	9	t	f	cancelled	0	300	2021-10-14 12:53:02.946773	t			cash	2021-10-14 12:53:06.35	\N
131	61	2	21	9	t	f	cancelled	0	100	2021-10-13 12:05:03.635841	f			cash	2021-10-13 12:05:11.541	\N
125	81	18	21	9	f	f	cancelled	0	305	2021-10-13 02:27:04.323239	f			cash	2021-10-13 02:38:55.026	\N
33	\N	\N	21	9	f	f	cancelled	0	\N	2021-10-04 23:08:44.168034	f		пробный заказ 2	cash	2021-10-04 23:08:56.154	\N
87	62	2	21	9	t	f	cancelled	0	1100	2021-10-11 15:19:04.884165	f			cash	\N	\N
133	61	2	21	\N	f	f	cancelled	0	1000	2021-10-13 18:48:45.807257	f			cash	\N	\N
156	81	18	21	\N	f	f	cancelled	0	0	2021-10-15 00:47:26.749673	f			cash	\N	\N
139	81	18	21	\N	f	f	cancelled	0	0	2021-10-14 12:26:11.250911	f			cash	\N	\N
132	81	18	21	\N	f	f	cancelled	5	859.7500000000001	2021-10-13 12:36:14.351541	f			card	\N	\N
140	81	18	21	9	f	f	cancelled	5	95	2021-10-14 12:26:51.248589	f			card	\N	\N
111	81	18	21	\N	t	f	cancelled	0	2000	2021-10-12 22:20:23.998444	f			cash	\N	\N
158	81	18	21	9	t	f	cancelled	0	500	2021-10-15 00:54:39.635985	f			cash	2021-10-15 00:55:02.351	\N
159	81	18	21	9	t	f	cancelled	0	500	2021-10-15 00:58:33.278184	f			cash	2021-10-15 00:58:54.267	\N
141	61	2	21	\N	f	f	cancelled	0	100	2021-10-14 12:28:06.064681	f			cash	\N	\N
134	61	2	21	9	t	f	cancelled	0	2014.9999999999998	2021-10-13 19:07:11.793389	t			card	2021-10-13 19:31:47.167	\N
135	61	2	21	\N	f	f	cancelled	0	305	2021-10-13 19:41:04.450103	f			cash	\N	\N
161	81	18	21	9	f	f	cancelled	0	300	2021-10-15 01:11:22.597348	f			cash	2021-10-15 01:12:00.206	\N
143	81	18	21	9	f	f	cancelled	0	0	2021-10-14 12:28:53.880066	f			cash	\N	\N
144	82	18	21	9	f	f	cancelled	0	100	2021-10-14 12:30:08.277882	f			cash	\N	\N
162	81	18	21	9	f	f	cancelled	0	3604.9999999999995	2021-10-15 01:24:01.51979	t			cash	2021-10-15 01:24:30.757	\N
165	82	18	21	\N	f	f	cancelled	0	305	2021-10-15 01:43:24.840481	f			cash	\N	\N
147	83	18	21	9	f	f	cancelled	0	100	2021-10-14 12:31:14.769658	f			cash	\N	\N
146	81	18	21	9	f	f	cancelled	0	100	2021-10-14 12:30:50.513492	f			cash	\N	\N
145	82	18	21	9	f	f	cancelled	0	0	2021-10-14 12:30:28.486326	f			cash	\N	\N
151	63	4	21	9	t	t	cancelled	0	0	2021-10-14 12:33:16.549689	t			cash	\N	\N
149	82	18	21	9	f	f	cancelled	0	100	2021-10-14 12:32:35.40198	f			cash	\N	\N
148	82	18	21	9	f	f	cancelled	0	0	2021-10-14 12:32:17.350334	f			cash	\N	\N
167	61	2	21	9	f	f	cancelled	0	0	2021-10-15 02:31:19.051269	f			cash	\N	\N
166	81	18	21	9	t	f	cancelled	0	1100	2021-10-15 02:10:02.691236	t			cash	2021-10-15 02:18:16.116	\N
168	81	18	21	\N	f	f	cancelled	0	1100	2021-10-16 22:16:21.750611	t			cash	\N	\N
81	82	18	21	9	f	f	completed	0	800	2021-09-11 14:24:20.160382	f			cash	2021-10-11 14:24:39.056	2021-10-11 14:32:06.124
136	61	2	21	\N	f	f	completed	0	100	2021-09-13 19:48:26.776779	f			cash	\N	2021-10-13 19:50:48.34
129	82	18	21	9	f	f	completed	0	305	2021-09-13 11:46:37.11334	f			cash	\N	2021-10-13 12:10:25.35
130	82	18	21	9	f	f	completed	0	100	2021-10-13 12:04:14.747888	f			cash	2021-10-13 12:04:24.432	2021-09-13 12:16:50.798
169	61	2	21	9	f	f	completed	0	2100	2021-10-17 01:49:14.512239	f			cash	2021-10-17 01:49:22.122	2021-10-17 01:49:29.599
170	64	4	21	9	f	f	completed	0	12000	2021-10-17 01:50:06.91881	f			cash	2021-10-17 01:50:12.349	2021-10-17 01:50:14.892
171	86	2	21	9	f	f	completed	0	5200	2021-10-17 02:15:25.061267	f			cash	2021-10-17 02:15:35.026	2021-10-17 02:15:39.644
172	87	2	21	9	f	f	completed	0	23600	2021-10-17 02:17:08.061226	f			cash	2021-10-17 02:17:14.126	2021-10-17 02:17:16.382
173	83	18	21	9	f	f	completed	0	6800	2021-10-17 02:19:42.514253	f			cash	2021-10-17 02:19:47.54	2021-10-17 02:19:51.653
175	88	4	21	9	f	f	completed	0	9200	2021-10-17 02:22:07.840258	f			cash	2021-10-17 02:22:14.18	2021-10-17 02:22:16.39
176	81	18	21	36	f	f	completed	0	15305	2021-10-17 20:59:26.447956	f			cash	2021-10-17 20:59:31.385	2021-10-17 20:59:39.458
39	\N	\N	21	\N	f	f	cancelled	0	\N	2021-10-05 14:51:09.478667	f			cash	\N	\N
21	\N	\N	21	9	t	t	cancelled	0	\N	2021-10-01 01:27:00.455782	f			cash	\N	\N
43	\N	\N	21	9	f	f	completed	0	\N	2021-10-05 15:07:42.737255	t			cash	2021-10-05 15:08:01.712	2021-10-05 15:08:42.702
45	\N	\N	21	9	f	t	cancelled	0	\N	2021-10-05 15:09:14.730267	t			card	2021-10-06 22:04:03.247	\N
49	\N	\N	21	9	f	f	cancelled	5	\N	2021-10-06 18:12:54.334244	f			cash	\N	\N
48	\N	\N	21	9	f	f	cancelled	5	\N	2021-10-06 18:08:05.546655	f		пробный заказ	card	\N	\N
80	81	18	21	9	f	f	completed	10	2340	2021-10-11 14:16:02.738158	t			cash	\N	2021-10-11 14:24:12.904
89	81	18	21	9	t	f	cancelled	5	95	2021-10-11 20:48:39.215891	f			cash	\N	\N
88	81	18	21	9	f	f	cancelled	0	100	2021-10-11 17:18:14.705183	f			cash	\N	\N
53	\N	\N	21	9	t	t	completed	1	792	2021-10-07 00:26:27.118492	t	test comment	пробный заказ 2	card	2021-10-07 00:26:37.404	2021-10-07 00:54:33.721
11	\N	\N	21	\N	f	f	completed	0	\N	2021-09-30 01:32:36.071462	f			cash	\N	\N
44	\N	\N	21	\N	f	f	cancelled	0	\N	2021-10-05 15:09:02.374082	f			cash	\N	\N
18	\N	\N	21	\N	f	t	completed	0	\N	2021-09-30 23:51:43.753031	f			card	\N	\N
37	\N	\N	21	9	f	f	completed	0	\N	2021-10-05 13:50:14.186157	f			cash	2021-10-05 15:07:03.445	2021-10-05 15:10:21.418
19	\N	\N	21	\N	t	t	completed	0	\N	2021-10-01 01:16:02.416953	f			cash	\N	\N
20	\N	\N	21	\N	f	f	completed	0	\N	2021-10-01 01:26:29.700644	f			cash	\N	\N
40	\N	\N	21	9	f	f	cancelled	0	\N	2021-10-05 15:01:07.716266	t			cash	2021-10-05 15:04:06.322	\N
22	\N	\N	21	9	f	f	cancelled	0	\N	2021-10-01 22:19:35.824168	f			cash	\N	\N
34	\N	\N	21	9	f	f	completed	0	\N	2021-10-04 23:09:41.853611	f		пробный заказ	cash	2021-10-04 23:09:46.9	2021-10-05 15:10:25.115
42	\N	\N	21	9	f	t	completed	0	\N	2021-10-05 15:05:50.955622	f			cash	2021-10-05 15:06:22.435	2021-10-05 15:07:31.862
17	\N	\N	21	9	f	t	cancelled	0	\N	2021-09-30 23:30:54.056362	f			cash	\N	\N
4	\N	\N	21	\N	f	f	cancelled	0	\N	2021-09-29 20:00:22.929265	f			cash	\N	\N
3	\N	\N	21	\N	f	f	cancelled	0	\N	2021-09-29 19:59:36.82795	f			cash	\N	\N
16	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-30 23:06:33.262757	f	дайте что-нибудь		cash	2021-10-04 01:13:42.507	\N
14	\N	\N	21	9	t	t	cancelled	0	\N	2021-09-30 22:02:14.884161	t			cash	2021-10-04 03:56:24.379	\N
27	\N	\N	21	9	f	f	cancelled	0	\N	2021-10-04 18:59:52.308565	t			cash	2021-10-05 13:30:43.25	\N
10	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-30 01:15:52.684241	f			cash	\N	\N
13	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-30 21:50:05.352669	f			cash	2021-10-03 02:18:08.926	\N
7	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-29 20:08:31.197834	f			cash	2021-10-03 23:35:54.838	\N
6	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-29 20:04:21.826392	f			cash	2021-10-03 02:18:37.203	\N
2	\N	\N	21	9	f	f	cancelled	0	\N	2021-09-29 19:46:07.036984	f			cash	\N	\N
24	\N	\N	21	9	f	f	completed	0	\N	2021-10-04 02:16:40.599221	f	<div>04.10.2021 02:16 какое-то поежлание</div>	друг шефа	cash	2021-10-04 12:49:12.066	2021-10-05 15:10:32.676
12	\N	\N	21	\N	f	f	cancelled	0	\N	2021-09-30 01:52:41.812539	f			cash	\N	\N
181	63	4	21	48	f	f	completed	0	20300	2021-10-18 02:38:08.984643	f			cash	2021-10-18 02:38:22.324	2021-10-18 02:38:25
15	\N	\N	21	\N	f	f	cancelled	10	\N	2021-09-30 22:49:06.120396	f			cash	\N	\N
5	\N	\N	21	9	t	f	cancelled	0	\N	2021-09-29 20:01:07.059932	t		хороший клиент	cash	2021-10-04 12:48:38.243	\N
25	\N	\N	21	9	f	f	completed	0	\N	2021-10-04 12:50:16.497155	t			cash	2021-10-04 22:13:00.08	2021-10-04 22:17:43.006
26	\N	\N	21	9	t	f	cancelled	0	\N	2021-10-04 12:51:52.275692	f			cash	2021-10-05 13:30:56.093	\N
28	\N	\N	21	9	f	f	completed	0	\N	2021-10-04 22:18:35.232592	f		пробный заказ	cash	2021-10-04 22:18:53.226	2021-10-04 22:19:56.519
35	\N	\N	21	9	f	f	completed	0	\N	2021-10-05 13:17:56.734197	t	<div>05.10.2021 13:17 mctest1</div>		cash	2021-10-05 13:24:18.968	2021-10-06 18:14:41.672
38	\N	\N	21	9	f	f	completed	0	\N	2021-10-05 14:49:58.008609	t			cash	2021-10-05 15:10:11.218	2021-10-06 18:14:43.928
47	\N	\N	21	9	f	f	cancelled	5	1619.75	2021-10-06 11:59:54.848708	t			cash	2021-10-06 12:01:24.885	\N
29	\N	\N	21	9	f	t	completed	0	\N	2021-10-04 22:21:17.346845	f			card	2021-10-04 22:21:39.268	2021-10-04 22:27:53.396
30	\N	\N	21	9	f	t	completed	0	\N	2021-10-04 22:28:23.508184	f		пробный заказ	cash	2021-10-04 22:28:55.354	2021-10-04 22:33:52.525
31	\N	\N	21	9	f	f	completed	0	\N	2021-10-04 22:34:07.284906	f		пробный заказ	cash	2021-10-04 22:34:19.295	2021-10-04 22:34:32.488
73	82	18	21	\N	f	f	completed	0	305	2021-10-11 13:41:23.83068	f			cash	\N	2021-10-11 13:42:12.875
51	\N	\N	21	9	f	f	completed	5	285	2021-10-06 20:40:43.988248	f		хороший клиент	card	2021-10-06 20:40:43.986	2021-10-06 22:28:17.657
50	\N	\N	21	9	f	f	completed	5	665	2021-10-06 18:15:12.103568	f		пробный заказ	card	2021-10-06 18:15:12.102	2021-10-07 00:49:16.377
84	81	18	21	9	f	f	completed	0	0	2021-10-11 14:37:42.38196	f			cash	\N	2021-10-11 14:37:53.657
52	\N	\N	21	9	t	f	cancelled	5	1045	2021-10-07 00:20:26.761395	t	test1	test2	cash	2021-10-07 00:55:34.553	\N
55	\N	\N	21	\N	f	f	cancelled	0	100	2021-10-07 23:28:06.971823	f			cash	\N	\N
54	\N	\N	21	\N	f	f	cancelled	0	100	2021-10-07 17:33:24.301754	f			cash	\N	\N
187	83	18	21	9	f	f	cancelled	0	0	2021-10-20 03:17:40.841679	f			cash	\N	\N
59	81	18	21	9	f	f	cancelled	0	200	2021-10-10 22:05:20.12121	f			cash	2021-10-10 22:05:26.924	\N
184	81	18	21	9	f	f	cancelled	0	0	2021-10-20 03:05:59.250106	f			cash	\N	\N
118	81	18	21	\N	f	f	cancelled	0	305	2021-10-13 02:11:46.005398	f			cash	\N	\N
82	82	18	21	9	f	f	completed	0	800	2021-10-11 14:32:15.093806	f			cash	2021-10-11 14:32:20.013	2021-10-11 15:06:57.94
61	81	18	21	9	f	f	cancelled	0	700	2021-10-10 22:11:17.388393	t			cash	2021-10-10 22:11:41.517	\N
120	81	18	21	\N	f	f	cancelled	0	305	2021-10-13 02:16:45.722897	f			cash	\N	\N
63	81	18	21	9	f	f	cancelled	0	6915.000000000001	2021-10-10 22:20:00.038937	t			cash	2021-10-10 22:21:05.921	\N
121	81	18	21	\N	f	f	completed	0	100	2021-10-13 02:17:44.720566	f			cash	\N	2021-10-13 02:25:18.688
65	81	18	21	\N	f	f	cancelled	0	500	2021-10-10 22:26:23.376994	f			cash	\N	\N
67	81	18	21	\N	f	f	cancelled	0	1100	2021-10-10 22:28:05.822632	f			cash	\N	\N
90	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:05:37.009443	f			cash	\N	\N
92	81	18	21	\N	f	f	cancelled	0	305	2021-10-12 19:21:18.902823	f			cash	\N	\N
93	81	18	21	\N	f	f	cancelled	0	305	2021-10-12 19:22:35.863434	f			cash	\N	\N
71	81	18	21	9	f	t	completed	0	500	2021-10-10 23:18:22.53141	f			card	2021-10-10 23:18:27.551	2021-10-10 23:18:42.625
95	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:39:23.640865	f			cash	\N	\N
78	81	18	21	\N	f	f	cancelled	0	300	2021-10-11 14:13:38.106434	f			cash	\N	\N
97	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:42:55.574125	f			cash	\N	\N
98	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 19:43:14.471724	f			cash	\N	\N
128	61	2	21	\N	f	f	cancelled	0	100	2021-10-13 11:35:50.415915	f			cash	\N	\N
100	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 20:46:48.125829	f			cash	\N	\N
124	81	18	21	\N	f	f	cancelled	0	305	2021-10-13 02:26:48.40515	f			cash	\N	\N
102	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 20:57:52.009696	f			cash	\N	\N
104	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 21:05:47.034869	f			cash	\N	\N
105	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 21:07:53.847674	f			cash	\N	\N
86	83	18	21	9	t	t	completed	5	665	2021-10-11 15:07:06.186934	f		пробный заказ	cash	2021-10-11 15:07:44.913	2021-10-13 12:17:30.484
107	81	18	21	\N	f	f	cancelled	0	100	2021-10-12 21:21:22.945604	f			cash	\N	\N
110	81	18	21	\N	t	f	cancelled	0	1000	2021-10-12 21:33:22.794021	f			cash	\N	\N
112	81	18	21	\N	t	f	cancelled	0	2000	2021-10-12 23:04:24.519403	f			cash	\N	\N
113	81	18	21	\N	t	f	cancelled	0	\N	2021-10-12 23:04:42.799402	f			cash	\N	\N
114	81	18	21	\N	t	f	cancelled	0	1000	2021-10-12 23:04:53.750018	f			cash	\N	\N
23	\N	\N	21	36	t	f	cancelled	0	\N	2021-10-02 00:43:00.9371	f	<div>03.10.2021 23:09 несите быстрее</div><div>03.10.2021 23:09 заверните с собой</div><div>04.10.2021 02:15 какое-то пожелание</div>	надо принести что-нибудь	cash	\N	\N
177	81	18	21	48	f	f	completed	0	12700	2021-10-17 21:01:23.292541	f			cash	2021-10-17 21:01:27.458	2021-10-17 21:01:29.717
188	83	18	21	9	f	f	cancelled	0	0	2021-10-20 03:23:25.02292	f			cash	\N	\N
185	81	18	21	9	f	f	cancelled	0	0	2021-10-20 03:06:13.120154	f			cash	\N	\N
190	62	2	21	9	f	f	cancelled	0	0	2021-10-20 03:24:02.970242	f			cash	\N	\N
182	61	2	21	52	f	f	completed	0	40200	2021-10-18 02:39:34.86932	f			cash	2021-10-18 02:39:50.889	2021-10-18 02:39:53.369
196	61	2	21	9	f	f	cancelled	0	0	2021-10-24 17:01:40.595333	f			cash	\N	\N
200	62	2	21	9	f	f	cancelled	0	0	2021-10-24 17:26:34.062498	f			cash	\N	\N
198	83	18	21	9	f	f	cancelled	0	0	2021-10-24 17:16:27.859255	f		пробный заказ	cash	\N	\N
192	62	2	21	9	t	f	cancelled	0	2215	2021-10-21 22:16:42.229634	f			cash	2021-10-21 22:16:58.494	\N
201	81	18	21	9	f	f	cancelled	0	405	2021-10-24 17:27:00.890267	t		asd	cash	2021-10-24 17:27:07.918	\N
203	81	18	21	\N	f	f	cancelled	0	305	2021-10-24 17:43:21.525107	f			cash	\N	\N
178	81	18	21	51	f	f	completed	0	8700	2021-09-17 22:45:49.696038	f			cash	2021-09-17 22:45:55.02	2021-09-17 22:45:57.529
179	81	18	21	52	f	f	completed	0	24800	2021-10-17 22:54:03.338912	f			cash	2021-10-17 22:54:07.314	2021-10-17 22:54:09.845
189	61	2	21	9	f	f	cancelled	0	0	2021-10-20 03:23:40.070836	f			cash	\N	\N
180	62	2	21	51	f	f	completed	0	12100	2021-10-18 02:35:29.217937	f			cash	2021-10-18 02:35:59.558	2021-10-18 02:36:02.639
186	82	18	21	9	f	f	cancelled	0	0	2021-10-20 03:17:25.598754	f			cash	\N	\N
183	81	18	21	9	f	f	cancelled	0	0	2021-10-20 03:00:56.053527	f			cash	\N	\N
191	81	18	21	\N	t	t	cancelled	0	405	2021-10-21 21:05:32.996823	f			cash	\N	\N
193	81	18	21	\N	f	f	cancelled	0	100	2021-10-21 22:18:09.091028	f			cash	\N	\N
197	81	18	21	9	f	f	cancelled	0	100	2021-10-24 17:15:55.281713	f			cash	\N	\N
195	63	4	21	9	f	f	cancelled	0	1100	2021-10-24 14:42:47.136862	f		пробный заказ	cash	\N	\N
199	81	18	21	\N	f	f	cancelled	0	100	2021-10-24 17:17:08.650959	f			cash	\N	\N
194	81	18	21	\N	t	f	cancelled	0	100	2021-10-21 22:18:43.598431	f			cash	\N	\N
202	61	2	21	9	f	f	cancelled	0	0	2021-10-24 17:39:34.866422	f			cash	\N	\N
204	81	18	21	9	t	f	active	0	3710	2021-10-24 18:46:53.77979	t		пробный заказ	cash	2021-10-24 18:47:03.678	\N
206	82	18	21	9	f	f	active	0	0	2021-10-24 18:58:37.215767	f			cash	\N	\N
207	63	4	21	9	f	f	active	0	0	2021-10-24 18:58:54.61042	f			cash	\N	\N
\.


--
-- Data for Name: vne_product_images; Type: TABLE DATA; Schema: default; Owner: vio
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
\.


--
-- Data for Name: vne_products; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_products (id, cat_id, name, weight, cal, "time", about, pos, active, likes, code, recommended, price, restaurant_id, unit, alc, alc_percent) FROM stdin;
87	1	Какое-то блюдо 3	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	4	t	0	hf0003	f	1000	21	g	f	0
1	1	Гамбургер с телятиной	3001	1200	10-20 мин	Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. 	0	t	3	h0001	t	100	21	g	f	0
2	6	Тестовое блюдо	0	0			1	t	0		f	0	9	g	f	0
3	1	Королевский чизбургер	410	755	10-12 мин	Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. 	1	t	6	h0002	t	305	21	g	f	0
4	4	Цитрусовая нарезка	250	100	5 мин.	Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. 	1	t	4	f0001	f	200	21	g	f	0
97	1	Какое-то блюдо 13	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	14	t	0	hf00013	f	1000	21	g	f	0
85	1	Гамбургер "Бостон"	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	2	t	1	hf0001	f	1000	21	g	f	0
101	1	Какое-то блюдо 17	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	18	t	0	hf00017	f	1000	21	g	f	0
102	1	Какое-то блюдо 18	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	19	t	0	hf00018	f	1000	21	g	f	0
103	1	Какое-то блюдо 19	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	20	t	0	hf00019	f	1000	21	g	f	0
105	1	Какое-то блюдо 21	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	22	t	0	hf00021	f	1000	21	g	f	0
106	1	Какое-то блюдо 22	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	23	t	0	hf00022	f	1000	21	g	f	0
107	1	Какое-то блюдо 23	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	24	t	0	hf00023	f	1000	21	g	f	0
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
161	1	Какое-то блюдо 77	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	78	t	0	hf00077	t	1000	21	g	f	0
93	1	Какое-то блюдо 9	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	10	t	0	hf0009	f	1000	21	g	f	0
86	1	Какое-то блюдо с очень длинным-предлинным названием	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	3	t	0	hf0002	f	1000	21	g	f	0
92	1	Какое-то блюдо 8	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	9	t	0	hf0008	t	1000	21	g	f	0
199	6	Test product	111	0	\N	\N	0	t	0	111	f	0	9	ml	t	23
194	7	Мороженое "Сказка"	100	640	10 мин	описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого 	0	t	0	m0001	t	500	21	g	f	0
98	1	Какое-то блюдо 14	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	15	t	0	hf00014	f	1000	21	g	f	0
99	1	Какое-то блюдо 15	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	16	t	1	hf00015	t	1000	21	g	f	0
100	1	Какое-то блюдо 16	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	17	t	0	hf00016	f	1000	21	g	f	0
200	17	Шампанское "Советское"	700	0			0	t	0	al0001	t	1000	21	ml	t	11
195	7	Мороженое "Фруктовый сад"	200	700	10 мин	описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого описание мороженого 	1	t	0	m0002	f	300	21	g	f	0
202	17	Кагор	700	0			1	t	1	al0002	f	1500	21	ml	t	12
128	1	Какое-то блюдо 44	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	45	t	0	hf00044	f	1000	21	g	f	0
129	1	Какое-то блюдо 45	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	46	t	0	hf00045	f	1000	21	g	f	0
130	1	Какое-то блюдо 46	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	47	t	0	hf00046	f	1000	21	g	f	0
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
\.


--
-- Data for Name: vne_restaurants; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_restaurants (id, currency_id, name, domain, ownername, phone, address, inn, ogrn, comment, created_at, lang_id, money, active) FROM stdin;
13	2	Ромашка	test11	Свинкин Олег Иванович	+3806778945612	ул. Ленина, 2	999666333	888999999	тестовый камент	2021-08-27 00:26:35.018103	2	0	f
2	2	Рога и копыта	roga	Андрей Рыбкин	+38 067 0000000	Москва, ул. Собачкина, 2	111222	333555	еще один тестовый ресторан	2021-08-26 20:52:31.021727	1	0	t
6	1	Привет из 90-х	test4	\N	\N	\N	\N	\N	\N	2021-08-27 00:24:57.598572	1	0	t
4	1	Шашлычная №1	test2	\N	\N	\N	\N	\N	\N	2021-08-27 00:24:10.543446	1	0	t
3	1	Одарка	test1	\N	\N	\N	\N	\N	\N	2021-08-27 00:23:50.454941	1	0	t
7	1	National	test5	\N	\N	\N	\N	\N	\N	2021-08-27 00:25:04.843937	1	0	t
18	1	Пирожковая	pirog	\N	+380664021350	Танкопия, 13/99	\N	\N	\N	2021-08-27 22:30:50.941314	1	-10	t
19	1	Рыбный день	test222	\N	+380664021350	Танкопия, 13/9	\N	\N	\N	2021-08-28 00:39:48.284041	1	-10	t
1	1	Плакучая ива	iva	Иван Петров	+38 066 4020000	Харьков, ул. Кошкина, 1	123456	654987	тестовый ресторан	2021-08-26 20:52:31.021727	1	-10	t
22	1	Курский	kursk	\N	+380664021350	Танкопия, 13/9	\N	\N	\N	2021-08-28 11:27:23.119406	1	9980	t
10	1	Сто пудов	test8	Алексей Сидоров	+380664021350	Танкопия, 1	\N	\N	\N	2021-08-27 00:25:50.223075	1	-10	t
45	1	Кошки-мышки	http://ukr.net	Максим Савенков	+380667889999	Танкопия, 13/9	999666333	555444	\N	2021-09-02 21:07:52.119825	1	-10	t
5	1	У Ашота	test3	Алексей Козлов	+380664021350	Танкопия, 1	\N	\N	\N	2021-08-27 00:24:34.213564	2	0	t
21	1	Пушкинский	https://push1.ru	Курочкин Иван Кузьмич	+38 097 456789987	Москва	456	654	\N	2021-08-28 11:12:59.882811	1	9700	t
38	1	Владимирский	http://vlad.net	Овечкин Игорь Иванович	+380664021350	Танкопия, 13/91	999666333	11222333	тест	2021-08-30 12:54:22.738402	1	-10	t
46	1	RRR		Овечкин Игорь Иванович	+380664021350	Танкопия, 103	999666333	555444	\N	2021-09-07 01:16:30.429325	1	-10	t
15	1	Длинное название ресторана	test12	\N	\N	\N	\N	\N	\N	2021-08-27 01:55:15.844543	1	-10	t
43	1	Надежда	nadezhda.ru	Овечкин Игорь Иванович	+38066666666	Танкопия, 5	123654	654987	\N	2021-09-02 12:36:33.846619	1	-10	t
12	1	Вкусно-быстро	tets10.ry	Птичкин Федор Моисеевич	+38 095 12345687	Харьков, ул. Маршала Жукова, 5	666555444	11222333	\N	2021-08-27 00:26:24.033626	1	0	t
9	1	McDonalds	test7	\N	\N	\N	\N	\N	\N	2021-08-27 00:25:34.269246	1	-10	t
8	1	Слепая свинья	test6	\N	\N	\N	\N	\N	\N	2021-08-27 00:25:12.606101	1	0	t
\.


--
-- Data for Name: vne_serving_translations; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_serving_translations (id, serving_id, lang_id, name) FROM stdin;
1	\N	\N	\N
3	1	2	to the table
2	1	1	к столу
5	2	1	с собой
6	2	2	to go
9	4	1	по готовности
10	4	2	on readiness
\.


--
-- Data for Name: vne_servings; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_servings (id, pos, defended) FROM stdin;
2	2	f
1	1	t
4	3	f
\.


--
-- Data for Name: vne_settings; Type: TABLE DATA; Schema: default; Owner: vio
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
13	customer-app-url	https://customer.restclick.vio.net.ua	URL приложения посетителей	3	t	f
4	owner-app-url	https://owner.restclick.vio.net.ua	URL админки владельца	1	t	f
11	restorator-app-url	https://restorator.restclick.vio.net.ua	URL админки рестораторов	2	t	f
\.


--
-- Data for Name: vne_tables; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_tables (id, hall_id, no, seats, x, y, code) FROM stdin;
51	3	1	1	1	1	vvgshsy57v
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
\.


--
-- Data for Name: vne_transactions; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_transactions (id, restaurant_id, amount, created_at, type) FROM stdin;
1	1	111	2021-09-02 13:03:47.052906	auto
3	2	88	2021-09-02 13:04:23.827832	auto
4	18	333	2021-09-02 15:44:46.945943	auto
5	15	94	2021-09-02 15:45:26.75125	auto
6	19	1000	2021-09-02 16:10:59.442815	admin
7	12	9476	2021-09-02 16:11:06.945146	admin
9	45	5	2021-09-02 21:09:19.325418	admin
10	1	111	2021-09-02 21:50:21.612191	admin
12	1	654	2021-09-02 21:50:31.732758	admin
2	1	-555	2021-09-01 13:04:10.573991	auto
13	1	65498	2021-09-01 21:50:39.086692	admin
11	1	222	2021-09-03 21:50:26.375833	admin
14	38	111	2021-09-02 23:56:56.688894	admin
15	43	945	2021-09-02 23:58:40.44392	admin
16	8	20	2021-09-03 01:42:34.353377	admin
17	19	-10	2021-09-04 13:04:00.022706	auto
18	43	-20	2021-09-04 13:04:00.033026	auto
19	18	-10	2021-09-04 13:04:00.037046	auto
20	21	-10	2021-09-04 13:04:00.041014	auto
21	1	-10	2021-09-04 13:04:00.044523	auto
22	15	0	2021-09-04 13:04:00.047105	auto
24	12	0	2021-09-04 13:04:00.051933	auto
25	15	0	2021-09-04 13:05:00.015339	auto
26	19	-10	2021-09-04 13:05:00.021543	auto
27	43	-20	2021-09-04 13:05:00.026542	auto
28	18	-10	2021-09-04 13:05:00.030034	auto
29	21	-10	2021-09-04 13:05:00.034265	auto
30	1	-10	2021-09-04 13:05:00.037458	auto
32	12	0	2021-09-04 13:05:00.042122	auto
33	21	-10	2021-09-04 13:06:00.01753	auto
34	1	-10	2021-09-04 13:06:00.02342	auto
35	15	0	2021-09-04 13:06:00.02588	auto
36	19	-10	2021-09-04 13:06:00.029048	auto
37	43	-20	2021-09-04 13:06:00.032726	auto
39	18	-10	2021-09-04 13:06:00.037953	auto
40	12	0	2021-09-04 13:06:00.039699	auto
42	2	0	2021-09-04 13:26:00.01843	auto
43	21	-10	2021-09-04 13:26:00.029709	auto
44	1	-10	2021-09-04 13:26:00.034822	auto
45	19	-10	2021-09-04 13:26:00.039625	auto
46	6	0	2021-09-04 13:26:00.041881	auto
47	43	-20	2021-09-04 13:26:00.045869	auto
48	4	0	2021-09-04 13:26:00.047967	auto
49	3	0	2021-09-04 13:26:00.051024	auto
50	18	-10	2021-09-04 13:26:00.054318	auto
51	7	0	2021-09-04 13:26:00.056832	auto
52	13	0	2021-09-04 13:26:00.058699	auto
53	15	0	2021-09-04 13:26:00.060929	auto
54	5	0	2021-09-04 13:26:00.062832	auto
56	12	0	2021-09-04 13:26:00.067299	auto
57	2	0	2021-09-06 22:00:00.019514	auto
58	6	0	2021-09-06 22:00:00.027212	auto
59	4	0	2021-09-06 22:00:00.029621	auto
60	3	0	2021-09-06 22:00:00.032211	auto
61	7	0	2021-09-06 22:00:00.034425	auto
62	21	-10	2021-09-06 22:00:00.040711	auto
63	1	-10	2021-09-06 22:00:00.044047	auto
64	19	-10	2021-09-06 22:00:00.047616	auto
65	43	-20	2021-09-06 22:00:00.053069	auto
66	18	-10	2021-09-06 22:00:00.060408	auto
67	13	0	2021-09-06 22:00:00.06434	auto
68	15	0	2021-09-06 22:00:00.066668	auto
69	5	0	2021-09-06 22:00:00.068827	auto
71	12	0	2021-09-06 22:00:00.072766	auto
72	1	10	2021-09-06 22:38:10.37606	admin
73	13	10	2021-09-06 22:38:20.373376	admin
74	2	0	2021-09-06 23:00:00.014002	auto
75	6	0	2021-09-06 23:00:00.017811	auto
76	4	0	2021-09-06 23:00:00.021111	auto
77	3	0	2021-09-06 23:00:00.023257	auto
78	7	0	2021-09-06 23:00:00.025197	auto
79	21	-10	2021-09-06 23:00:00.028396	auto
80	19	-10	2021-09-06 23:00:00.031333	auto
81	43	-20	2021-09-06 23:00:00.033955	auto
82	15	0	2021-09-06 23:00:00.035544	auto
83	18	-10	2021-09-06 23:00:00.038747	auto
84	5	0	2021-09-06 23:00:00.040347	auto
85	1	-10	2021-09-06 23:00:00.043222	auto
86	13	0	2021-09-06 23:00:00.045562	auto
88	12	0	2021-09-06 23:00:00.049146	auto
89	2	0	2021-09-07 00:00:00.028703	auto
90	6	0	2021-09-07 00:00:00.035382	auto
91	4	0	2021-09-07 00:00:00.038967	auto
92	3	0	2021-09-07 00:00:00.041646	auto
93	7	0	2021-09-07 00:00:00.044087	auto
94	15	0	2021-09-07 00:00:00.046873	auto
95	5	0	2021-09-07 00:00:00.049036	auto
96	13	0	2021-09-07 00:00:00.051138	auto
98	21	-10	2021-09-07 00:00:00.059995	auto
99	19	-10	2021-09-07 00:00:00.063678	auto
100	43	-20	2021-09-07 00:00:00.067297	auto
101	18	-10	2021-09-07 00:00:00.070364	auto
102	1	-10	2021-09-07 00:00:00.073924	auto
103	12	0	2021-09-07 00:00:00.075807	auto
104	21	-10	2021-09-07 01:00:00.026775	auto
105	19	-10	2021-09-07 01:00:00.034456	auto
106	2	0	2021-09-07 01:00:00.03753	auto
107	43	-20	2021-09-07 01:00:00.041674	auto
108	18	-10	2021-09-07 01:00:00.04486	auto
109	1	-10	2021-09-07 01:00:00.048041	auto
110	6	0	2021-09-07 01:00:00.050004	auto
111	4	0	2021-09-07 01:00:00.051833	auto
112	3	0	2021-09-07 01:00:00.054704	auto
113	7	0	2021-09-07 01:00:00.056673	auto
114	15	0	2021-09-07 01:00:00.061801	auto
115	5	0	2021-09-07 01:00:00.064183	auto
116	13	0	2021-09-07 01:00:00.066073	auto
118	12	0	2021-09-07 01:00:00.069909	auto
119	46	10	2021-09-07 01:20:47.019533	admin
120	2	0	2021-09-07 02:00:00.017818	auto
121	6	0	2021-09-07 02:00:00.025269	auto
122	21	-10	2021-09-07 02:00:00.032632	auto
123	4	0	2021-09-07 02:00:00.036056	auto
124	3	0	2021-09-07 02:00:00.038632	auto
125	19	-10	2021-09-07 02:00:00.043307	auto
126	7	0	2021-09-07 02:00:00.045533	auto
127	43	-20	2021-09-07 02:00:00.050413	auto
128	18	-10	2021-09-07 02:00:00.054104	auto
129	1	-10	2021-09-07 02:00:00.058118	auto
130	46	-10	2021-09-07 02:00:00.061641	auto
131	15	0	2021-09-07 02:00:00.063554	auto
132	5	0	2021-09-07 02:00:00.06549	auto
133	13	0	2021-09-07 02:00:00.06789	auto
135	12	0	2021-09-07 02:00:00.071931	auto
136	46	10	2021-09-07 02:02:38.330188	admin
137	2	0	2021-09-07 13:00:00.02493	auto
138	6	0	2021-09-07 13:00:00.035272	auto
139	4	0	2021-09-07 13:00:00.038529	auto
140	3	0	2021-09-07 13:00:00.041856	auto
141	7	0	2021-09-07 13:00:00.045124	auto
142	21	-10	2021-09-07 13:00:00.052592	auto
143	19	-10	2021-09-07 13:00:00.056713	auto
144	43	-20	2021-09-07 13:00:00.061163	auto
145	15	-10	2021-09-07 13:00:00.065458	auto
146	18	-10	2021-09-07 13:00:00.068697	auto
147	5	0	2021-09-07 13:00:00.071067	auto
148	1	-10	2021-09-07 13:00:00.07406	auto
149	13	0	2021-09-07 13:00:00.076143	auto
150	46	-10	2021-09-07 13:00:00.079058	auto
152	12	0	2021-09-07 13:00:00.082937	auto
153	1	-10	2021-09-07 14:00:00.015885	auto
154	46	-10	2021-09-07 14:00:00.021411	auto
155	2	0	2021-09-07 14:00:00.025419	auto
156	6	0	2021-09-07 14:00:00.028364	auto
157	4	0	2021-09-07 14:00:00.032344	auto
158	3	0	2021-09-07 14:00:00.035692	auto
159	7	0	2021-09-07 14:00:00.04082	auto
160	5	0	2021-09-07 14:00:00.043286	auto
161	13	0	2021-09-07 14:00:00.045464	auto
162	21	-10	2021-09-07 14:00:00.050352	auto
163	19	-10	2021-09-07 14:00:00.059344	auto
165	43	-20	2021-09-07 14:00:00.066222	auto
166	15	-10	2021-09-07 14:00:00.070157	auto
167	18	-10	2021-09-07 14:00:00.073206	auto
168	12	0	2021-09-07 14:00:00.075463	auto
169	2	0	2021-09-07 15:00:00.012396	auto
170	1	-10	2021-09-07 15:00:00.018052	auto
171	21	-10	2021-09-07 15:00:00.021026	auto
172	6	0	2021-09-07 15:00:00.022897	auto
173	19	-10	2021-09-07 15:00:00.025953	auto
174	4	0	2021-09-07 15:00:00.027444	auto
175	3	0	2021-09-07 15:00:00.029089	auto
176	43	-20	2021-09-07 15:00:00.031935	auto
177	7	0	2021-09-07 15:00:00.033407	auto
178	15	-10	2021-09-07 15:00:00.035977	auto
179	18	-10	2021-09-07 15:00:00.038866	auto
180	5	0	2021-09-07 15:00:00.040363	auto
181	13	0	2021-09-07 15:00:00.041791	auto
183	12	0	2021-09-07 15:00:00.04501	auto
184	2	0	2021-09-07 16:00:00.020562	auto
185	6	0	2021-09-07 16:00:00.023366	auto
186	4	0	2021-09-07 16:00:00.02522	auto
187	3	0	2021-09-07 16:00:00.026919	auto
188	7	0	2021-09-07 16:00:00.028692	auto
189	1	-10	2021-09-07 16:00:00.031519	auto
190	21	-10	2021-09-07 16:00:00.034233	auto
191	19	-10	2021-09-07 16:00:00.036646	auto
192	43	-20	2021-09-07 16:00:00.039559	auto
193	15	-10	2021-09-07 16:00:00.042769	auto
194	18	-10	2021-09-07 16:00:00.045362	auto
195	5	0	2021-09-07 16:00:00.04691	auto
196	13	0	2021-09-07 16:00:00.048326	auto
198	12	0	2021-09-07 16:00:00.052135	auto
199	2	0	2021-09-07 18:00:00.011046	auto
200	6	0	2021-09-07 18:00:00.015074	auto
201	4	0	2021-09-07 18:00:00.017793	auto
202	3	0	2021-09-07 18:00:00.020677	auto
203	7	0	2021-09-07 18:00:00.023242	auto
204	1	-10	2021-09-07 18:00:00.028543	auto
205	5	0	2021-09-07 18:00:00.03048	auto
206	13	0	2021-09-07 18:00:00.032393	auto
207	21	-10	2021-09-07 18:00:00.035865	auto
209	19	-10	2021-09-07 18:00:00.041672	auto
210	43	-20	2021-09-07 18:00:00.044771	auto
211	15	-10	2021-09-07 18:00:00.048166	auto
212	18	-10	2021-09-07 18:00:00.051412	auto
213	12	0	2021-09-07 18:00:00.053204	auto
214	43	-20	2021-09-07 19:00:00.027418	auto
215	15	-10	2021-09-07 19:00:00.035713	auto
216	2	0	2021-09-07 19:00:00.039155	auto
217	18	-10	2021-09-07 19:00:00.043573	auto
218	6	0	2021-09-07 19:00:00.04613	auto
219	4	0	2021-09-07 19:00:00.048144	auto
220	3	0	2021-09-07 19:00:00.050042	auto
221	7	0	2021-09-07 19:00:00.052382	auto
222	5	0	2021-09-07 19:00:00.054246	auto
223	13	0	2021-09-07 19:00:00.057068	auto
225	1	-10	2021-09-07 19:00:00.062727	auto
226	21	-10	2021-09-07 19:00:00.065734	auto
227	19	-10	2021-09-07 19:00:00.069091	auto
228	12	0	2021-09-07 19:00:00.07084	auto
229	2	0	2021-09-07 20:00:00.014496	auto
230	43	-20	2021-09-07 20:00:00.028598	auto
231	6	0	2021-09-07 20:00:00.031775	auto
232	15	-10	2021-09-07 20:00:00.036556	auto
233	4	0	2021-09-07 20:00:00.038942	auto
234	3	0	2021-09-07 20:00:00.040878	auto
235	18	-10	2021-09-07 20:00:00.044115	auto
236	7	0	2021-09-07 20:00:00.045768	auto
237	1	-10	2021-09-07 20:00:00.049506	auto
238	21	-10	2021-09-07 20:00:00.052367	auto
239	19	-10	2021-09-07 20:00:00.055717	auto
240	5	0	2021-09-07 20:00:00.057343	auto
241	13	0	2021-09-07 20:00:00.059163	auto
243	12	0	2021-09-07 20:00:00.062481	auto
244	2	0	2021-09-07 21:00:00.013625	auto
245	6	0	2021-09-07 21:00:00.021713	auto
246	4	0	2021-09-07 21:00:00.02492	auto
247	3	0	2021-09-07 21:00:00.028167	auto
248	7	0	2021-09-07 21:00:00.031499	auto
249	43	-20	2021-09-07 21:00:00.038657	auto
250	15	-10	2021-09-07 21:00:00.042465	auto
251	18	-10	2021-09-07 21:00:00.047105	auto
252	1	-10	2021-09-07 21:00:00.050623	auto
253	21	-10	2021-09-07 21:00:00.054141	auto
254	19	-10	2021-09-07 21:00:00.057596	auto
255	5	0	2021-09-07 21:00:00.059461	auto
256	13	0	2021-09-07 21:00:00.061386	auto
258	12	0	2021-09-07 21:00:00.065456	auto
259	2	0	2021-09-07 22:00:00.008074	auto
260	6	0	2021-09-07 22:00:00.011443	auto
261	4	0	2021-09-07 22:00:00.01323	auto
262	3	0	2021-09-07 22:00:00.014871	auto
263	7	0	2021-09-07 22:00:00.016862	auto
264	5	0	2021-09-07 22:00:00.018721	auto
265	43	-10	2021-09-07 22:00:00.021995	auto
266	13	0	2021-09-07 22:00:00.02368	auto
267	15	-10	2021-09-07 22:00:00.026435	auto
268	18	-10	2021-09-07 22:00:00.029172	auto
269	1	-10	2021-09-07 22:00:00.031613	auto
271	19	-10	2021-09-07 22:00:00.036644	auto
272	21	-20	2021-09-07 22:00:00.039698	auto
273	12	0	2021-09-07 22:00:00.041332	auto
274	15	-10	2021-09-07 23:00:00.017032	auto
275	18	-10	2021-09-07 23:00:00.024546	auto
276	2	0	2021-09-07 23:00:00.027379	auto
277	1	-10	2021-09-07 23:00:00.030976	auto
278	19	-10	2021-09-07 23:00:00.035254	auto
279	6	0	2021-09-07 23:00:00.037486	auto
280	21	-20	2021-09-07 23:00:00.041448	auto
281	4	0	2021-09-07 23:00:00.04335	auto
282	3	0	2021-09-07 23:00:00.047869	auto
283	7	0	2021-09-07 23:00:00.050257	auto
284	5	0	2021-09-07 23:00:00.052521	auto
285	13	0	2021-09-07 23:00:00.055052	auto
287	43	-10	2021-09-07 23:00:00.060395	auto
288	12	0	2021-09-07 23:00:00.062209	auto
289	2	0	2021-09-08 00:00:00.016514	auto
290	6	0	2021-09-08 00:00:00.023391	auto
291	4	0	2021-09-08 00:00:00.025981	auto
292	3	0	2021-09-08 00:00:00.028899	auto
293	7	0	2021-09-08 00:00:00.031269	auto
294	18	-10	2021-09-08 00:00:00.037718	auto
295	1	-10	2021-09-08 00:00:00.041265	auto
296	19	-10	2021-09-08 00:00:00.045053	auto
297	21	-20	2021-09-08 00:00:00.049191	auto
298	43	-10	2021-09-08 00:00:00.052978	auto
299	5	0	2021-09-08 00:00:00.055276	auto
300	13	0	2021-09-08 00:00:00.057794	auto
302	12	0	2021-09-08 00:00:00.062022	auto
303	2	0	2021-09-08 01:00:00.008978	auto
304	6	0	2021-09-08 01:00:00.011343	auto
305	4	0	2021-09-08 01:00:00.012799	auto
306	3	0	2021-09-08 01:00:00.014837	auto
307	7	0	2021-09-08 01:00:00.016297	auto
308	1	-10	2021-09-08 01:00:00.019426	auto
309	19	-10	2021-09-08 01:00:00.021686	auto
310	21	-20	2021-09-08 01:00:00.024026	auto
311	5	0	2021-09-08 01:00:00.025669	auto
312	43	-10	2021-09-08 01:00:00.027828	auto
313	13	0	2021-09-08 01:00:00.0294	auto
315	12	0	2021-09-08 01:00:00.032206	auto
316	2	0	2021-09-08 01:01:00.007422	auto
317	6	0	2021-09-08 01:01:00.010715	auto
318	4	0	2021-09-08 01:01:00.012554	auto
319	3	0	2021-09-08 01:01:00.014102	auto
320	7	0	2021-09-08 01:01:00.015821	auto
321	5	0	2021-09-08 01:01:00.017348	auto
322	13	0	2021-09-08 01:01:00.018743	auto
323	1	-10	2021-09-08 01:01:00.021236	auto
325	19	-10	2021-09-08 01:01:00.025035	auto
326	21	-20	2021-09-08 01:01:00.027905	auto
327	43	-10	2021-09-08 01:01:00.030923	auto
328	12	0	2021-09-08 01:01:00.032434	auto
329	2	0	2021-09-08 01:02:00.006936	auto
330	6	0	2021-09-08 01:02:00.010784	auto
331	4	0	2021-09-08 01:02:00.012988	auto
332	3	0	2021-09-08 01:02:00.01497	auto
333	7	0	2021-09-08 01:02:00.017369	auto
334	5	0	2021-09-08 01:02:00.020311	auto
335	13	0	2021-09-08 01:02:00.02188	auto
337	1	-10	2021-09-08 01:02:00.0264	auto
338	19	-10	2021-09-08 01:02:00.02888	auto
339	21	-20	2021-09-08 01:02:00.031417	auto
340	43	-10	2021-09-08 01:02:00.033638	auto
341	12	0	2021-09-08 01:02:00.035256	auto
342	1	-10	2021-09-08 01:03:00.009127	auto
343	19	-10	2021-09-08 01:03:00.013572	auto
344	2	0	2021-09-08 01:03:00.015272	auto
345	21	-20	2021-09-08 01:03:00.017834	auto
346	43	-10	2021-09-08 01:03:00.020047	auto
347	6	0	2021-09-08 01:03:00.021451	auto
348	4	0	2021-09-08 01:03:00.023005	auto
349	3	0	2021-09-08 01:03:00.024398	auto
350	7	0	2021-09-08 01:03:00.025735	auto
351	5	0	2021-09-08 01:03:00.027092	auto
352	13	0	2021-09-08 01:03:00.028611	auto
354	12	0	2021-09-08 01:03:00.031232	auto
355	2	0	2021-09-08 01:04:00.005769	auto
356	6	0	2021-09-08 01:04:00.008709	auto
357	1	-10	2021-09-08 01:04:00.011728	auto
358	4	0	2021-09-08 01:04:00.01553	auto
359	3	0	2021-09-08 01:04:00.017118	auto
360	7	0	2021-09-08 01:04:00.018726	auto
361	19	-10	2021-09-08 01:04:00.021198	auto
362	21	-20	2021-09-08 01:04:00.023805	auto
363	43	-10	2021-09-08 01:04:00.0262	auto
364	5	0	2021-09-08 01:04:00.02806	auto
365	13	0	2021-09-08 01:04:00.029412	auto
367	12	0	2021-09-08 01:04:00.033481	auto
368	2	0	2021-09-08 01:05:00.011411	auto
369	6	0	2021-09-08 01:05:00.01339	auto
370	4	0	2021-09-08 01:05:00.014806	auto
371	3	0	2021-09-08 01:05:00.01644	auto
372	7	0	2021-09-08 01:05:00.017804	auto
373	1	-10	2021-09-08 01:05:00.020165	auto
374	19	-10	2021-09-08 01:05:00.022157	auto
375	43	-10	2021-09-08 01:05:00.025031	auto
376	5	0	2021-09-08 01:05:00.026433	auto
377	13	0	2021-09-08 01:05:00.027848	auto
379	12	0	2021-09-08 01:05:00.030733	auto
380	2	0	2021-09-08 01:06:00.005648	auto
381	6	0	2021-09-08 01:06:00.007905	auto
382	4	0	2021-09-08 01:06:00.009281	auto
383	3	0	2021-09-08 01:06:00.010774	auto
384	7	0	2021-09-08 01:06:00.012416	auto
385	1	-10	2021-09-08 01:06:00.015909	auto
386	5	0	2021-09-08 01:06:00.017405	auto
387	19	-10	2021-09-08 01:06:00.019746	auto
388	13	0	2021-09-08 01:06:00.021066	auto
389	43	-10	2021-09-08 01:06:00.024204	auto
391	12	0	2021-09-08 01:06:00.02686	auto
392	2	0	2021-09-08 01:07:00.012851	auto
393	6	0	2021-09-08 01:07:00.015439	auto
394	4	0	2021-09-08 01:07:00.017104	auto
395	3	0	2021-09-08 01:07:00.019376	auto
396	7	0	2021-09-08 01:07:00.02123	auto
397	5	0	2021-09-08 01:07:00.023094	auto
398	13	0	2021-09-08 01:07:00.024505	auto
399	1	-10	2021-09-08 01:07:00.02689	auto
400	19	-10	2021-09-08 01:07:00.028907	auto
401	43	-10	2021-09-08 01:07:00.031316	auto
403	12	0	2021-09-08 01:07:00.034349	auto
404	2	0	2021-09-08 01:08:00.143162	auto
405	6	0	2021-09-08 01:08:00.146335	auto
406	4	0	2021-09-08 01:08:00.148189	auto
407	3	0	2021-09-08 01:08:00.150211	auto
408	7	0	2021-09-08 01:08:00.151521	auto
409	5	0	2021-09-08 01:08:00.152996	auto
410	13	0	2021-09-08 01:08:00.154786	auto
412	1	-10	2021-09-08 01:08:00.159145	auto
413	19	-10	2021-09-08 01:08:00.161711	auto
414	43	-10	2021-09-08 01:08:00.163752	auto
415	12	0	2021-09-08 01:08:00.165156	auto
416	19	-10	2021-09-08 01:09:00.015105	auto
417	43	-10	2021-09-08 01:09:00.018371	auto
418	2	0	2021-09-08 01:09:00.020081	auto
419	6	0	2021-09-08 01:09:00.021348	auto
420	4	0	2021-09-08 01:09:00.022635	auto
421	3	0	2021-09-08 01:09:00.023976	auto
422	7	0	2021-09-08 01:09:00.025283	auto
423	5	0	2021-09-08 01:09:00.026517	auto
424	13	0	2021-09-08 01:09:00.027928	auto
426	1	-10	2021-09-08 01:09:00.031278	auto
427	12	0	2021-09-08 01:09:00.032809	auto
428	2	0	2021-09-08 01:10:00.012203	auto
429	19	-10	2021-09-08 01:10:00.015799	auto
430	43	-10	2021-09-08 01:10:00.018263	auto
431	6	0	2021-09-08 01:10:00.019559	auto
432	1	-10	2021-09-08 01:10:00.022014	auto
433	4	0	2021-09-08 01:10:00.02343	auto
434	3	0	2021-09-08 01:10:00.024708	auto
435	7	0	2021-09-08 01:10:00.02614	auto
436	5	0	2021-09-08 01:10:00.027383	auto
437	13	0	2021-09-08 01:10:00.028873	auto
439	12	0	2021-09-08 01:10:00.031647	auto
440	2	0	2021-09-08 01:11:00.011619	auto
441	6	0	2021-09-08 01:11:00.015606	auto
442	4	0	2021-09-08 01:11:00.017537	auto
443	3	0	2021-09-08 01:11:00.019259	auto
444	7	0	2021-09-08 01:11:00.021123	auto
445	19	-10	2021-09-08 01:11:00.023437	auto
446	43	-10	2021-09-08 01:11:00.026819	auto
447	1	-10	2021-09-08 01:11:00.029691	auto
448	5	0	2021-09-08 01:11:00.031552	auto
449	13	0	2021-09-08 01:11:00.033085	auto
451	12	0	2021-09-08 01:11:00.035654	auto
452	2	0	2021-09-08 01:12:00.006712	auto
453	6	0	2021-09-08 01:12:00.009439	auto
454	4	0	2021-09-08 01:12:00.011135	auto
455	3	0	2021-09-08 01:12:00.012534	auto
456	7	0	2021-09-08 01:12:00.014078	auto
457	19	-10	2021-09-08 01:12:00.01637	auto
458	43	-10	2021-09-08 01:12:00.019081	auto
459	1	-10	2021-09-08 01:12:00.021508	auto
460	5	0	2021-09-08 01:12:00.02305	auto
461	13	0	2021-09-08 01:12:00.024389	auto
463	12	0	2021-09-08 01:12:00.026944	auto
464	21	1000	2021-09-08 01:12:23.93482	admin
465	2	0	2021-09-08 01:13:00.00909	auto
466	6	0	2021-09-08 01:13:00.011915	auto
467	4	0	2021-09-08 01:13:00.013711	auto
468	3	0	2021-09-08 01:13:00.015103	auto
469	7	0	2021-09-08 01:13:00.016599	auto
470	19	-10	2021-09-08 01:13:00.019429	auto
471	5	0	2021-09-08 01:13:00.020675	auto
472	43	-10	2021-09-08 01:13:00.023351	auto
473	13	0	2021-09-08 01:13:00.024873	auto
474	1	-10	2021-09-08 01:13:00.028051	auto
475	21	-20	2021-09-08 01:13:00.030672	auto
477	12	0	2021-09-08 01:13:00.03347	auto
478	2	0	2021-09-08 01:14:00.004717	auto
479	6	0	2021-09-08 01:14:00.007285	auto
480	4	0	2021-09-08 01:14:00.00869	auto
481	3	0	2021-09-08 01:14:00.010137	auto
482	7	0	2021-09-08 01:14:00.011625	auto
483	5	0	2021-09-08 01:14:00.012822	auto
484	13	0	2021-09-08 01:14:00.014084	auto
485	19	-10	2021-09-08 01:14:00.016768	auto
486	43	-10	2021-09-08 01:14:00.018825	auto
488	1	-10	2021-09-08 01:14:00.022189	auto
489	21	-20	2021-09-08 01:14:00.024366	auto
490	12	0	2021-09-08 01:14:00.025835	auto
491	21	-20	2021-09-08 01:15:00.009608	auto
492	2	0	2021-09-08 01:15:00.01148	auto
493	6	0	2021-09-08 01:15:00.012901	auto
494	4	0	2021-09-08 01:15:00.014324	auto
495	3	0	2021-09-08 01:15:00.015566	auto
496	7	0	2021-09-08 01:15:00.016821	auto
497	5	0	2021-09-08 01:15:00.017989	auto
498	13	0	2021-09-08 01:15:00.019649	auto
500	19	-10	2021-09-08 01:15:00.023235	auto
501	43	-10	2021-09-08 01:15:00.025481	auto
502	1	-10	2021-09-08 01:15:00.027575	auto
503	12	0	2021-09-08 01:15:00.029026	auto
504	21	-20	2021-09-08 01:16:00.007248	auto
505	2	0	2021-09-08 01:16:00.009215	auto
506	19	-10	2021-09-08 01:16:00.011538	auto
507	43	-10	2021-09-08 01:16:00.01378	auto
508	6	0	2021-09-08 01:16:00.015141	auto
509	1	-10	2021-09-08 01:16:00.017465	auto
510	4	0	2021-09-08 01:16:00.018719	auto
511	3	0	2021-09-08 01:16:00.019928	auto
512	7	0	2021-09-08 01:16:00.021331	auto
513	5	0	2021-09-08 01:16:00.022536	auto
514	13	0	2021-09-08 01:16:00.02377	auto
516	12	0	2021-09-08 01:16:00.027503	auto
517	2	0	2021-09-08 01:17:00.006758	auto
518	6	0	2021-09-08 01:17:00.009908	auto
519	4	0	2021-09-08 01:17:00.011919	auto
520	3	0	2021-09-08 01:17:00.013969	auto
521	7	0	2021-09-08 01:17:00.015468	auto
522	21	-20	2021-09-08 01:17:00.017743	auto
523	19	-10	2021-09-08 01:17:00.019856	auto
524	43	-10	2021-09-08 01:17:00.021791	auto
525	1	-10	2021-09-08 01:17:00.023855	auto
526	5	0	2021-09-08 01:17:00.025131	auto
527	13	0	2021-09-08 01:17:00.026343	auto
529	12	0	2021-09-08 01:17:00.028938	auto
530	2	0	2021-09-08 01:18:00.007158	auto
531	6	0	2021-09-08 01:18:00.009855	auto
532	4	0	2021-09-08 01:18:00.011838	auto
533	3	0	2021-09-08 01:18:00.013341	auto
534	7	0	2021-09-08 01:18:00.014977	auto
535	21	-20	2021-09-08 01:18:00.017493	auto
536	19	-10	2021-09-08 01:18:00.019975	auto
537	43	-10	2021-09-08 01:18:00.022196	auto
538	1	-10	2021-09-08 01:18:00.024239	auto
539	5	0	2021-09-08 01:18:00.025553	auto
540	13	0	2021-09-08 01:18:00.026946	auto
542	12	0	2021-09-08 01:18:00.029825	auto
543	2	0	2021-09-08 01:19:00.005135	auto
544	6	0	2021-09-08 01:19:00.007233	auto
545	4	0	2021-09-08 01:19:00.008931	auto
546	3	0	2021-09-08 01:19:00.010437	auto
547	7	0	2021-09-08 01:19:00.011742	auto
548	5	0	2021-09-08 01:19:00.014219	auto
549	21	-20	2021-09-08 01:19:00.016859	auto
550	13	0	2021-09-08 01:19:00.018198	auto
551	19	-10	2021-09-08 01:19:00.02111	auto
552	43	-10	2021-09-08 01:19:00.023284	auto
553	1	-10	2021-09-08 01:19:00.025593	auto
555	12	0	2021-09-08 01:19:00.02839	auto
556	2	0	2021-09-08 01:20:00.015438	auto
557	6	0	2021-09-08 01:20:00.022728	auto
558	4	0	2021-09-08 01:20:00.02586	auto
559	3	0	2021-09-08 01:20:00.028612	auto
560	7	0	2021-09-08 01:20:00.031512	auto
561	5	0	2021-09-08 01:20:00.033972	auto
562	13	0	2021-09-08 01:20:00.036321	auto
563	21	-20	2021-09-08 01:20:00.04301	auto
565	19	-10	2021-09-08 01:20:00.049606	auto
566	43	-10	2021-09-08 01:20:00.053351	auto
567	1	-10	2021-09-08 01:20:00.056602	auto
568	12	0	2021-09-08 01:20:00.058809	auto
569	19	-10	2021-09-08 01:21:00.017087	auto
570	43	-10	2021-09-08 01:21:00.024051	auto
571	2	0	2021-09-08 01:21:00.026561	auto
572	1	-10	2021-09-08 01:21:00.03001	auto
573	6	0	2021-09-08 01:21:00.032215	auto
574	4	0	2021-09-08 01:21:00.037578	auto
575	3	0	2021-09-08 01:21:00.039505	auto
576	7	0	2021-09-08 01:21:00.041414	auto
577	5	0	2021-09-08 01:21:00.043275	auto
578	13	0	2021-09-08 01:21:00.045801	auto
580	21	-20	2021-09-08 01:21:00.051363	auto
581	12	0	2021-09-08 01:21:00.053356	auto
582	2	0	2021-09-08 01:22:00.009305	auto
583	19	-10	2021-09-08 01:22:00.015967	auto
584	6	0	2021-09-08 01:22:00.018306	auto
585	43	-10	2021-09-08 01:22:00.022156	auto
586	4	0	2021-09-08 01:22:00.024186	auto
587	3	0	2021-09-08 01:22:00.037436	auto
588	7	0	2021-09-08 01:22:00.042316	auto
589	1	-10	2021-09-08 01:22:00.047423	auto
590	21	-20	2021-09-08 01:22:00.051289	auto
591	5	0	2021-09-08 01:22:00.053974	auto
592	13	0	2021-09-08 01:22:00.056387	auto
594	12	0	2021-09-08 01:22:00.061359	auto
595	2	0	2021-09-08 01:23:00.00884	auto
596	6	0	2021-09-08 01:23:00.012162	auto
597	4	0	2021-09-08 01:23:00.014644	auto
598	3	0	2021-09-08 01:23:00.016972	auto
599	7	0	2021-09-08 01:23:00.018777	auto
600	19	-10	2021-09-08 01:23:00.022278	auto
601	43	-10	2021-09-08 01:23:00.02586	auto
602	1	-10	2021-09-08 01:23:00.030104	auto
603	21	-20	2021-09-08 01:23:00.033502	auto
604	5	0	2021-09-08 01:23:00.035262	auto
605	13	0	2021-09-08 01:23:00.03697	auto
607	12	0	2021-09-08 01:23:00.040957	auto
608	2	0	2021-09-08 01:24:00.011479	auto
609	6	0	2021-09-08 01:24:00.014443	auto
610	4	0	2021-09-08 01:24:00.016636	auto
611	3	0	2021-09-08 01:24:00.019077	auto
612	7	0	2021-09-08 01:24:00.021316	auto
613	19	-10	2021-09-08 01:24:00.024656	auto
614	43	-10	2021-09-08 01:24:00.027613	auto
615	5	0	2021-09-08 01:24:00.029733	auto
616	1	-10	2021-09-08 01:24:00.032775	auto
617	13	0	2021-09-08 01:24:00.034927	auto
618	21	-20	2021-09-08 01:24:00.03868	auto
620	12	0	2021-09-08 01:24:00.042741	auto
621	2	0	2021-09-08 01:25:00.007918	auto
622	6	0	2021-09-08 01:25:00.011759	auto
623	4	0	2021-09-08 01:25:00.013923	auto
624	3	0	2021-09-08 01:25:00.015915	auto
625	7	0	2021-09-08 01:25:00.018204	auto
626	5	0	2021-09-08 01:25:00.019951	auto
627	13	0	2021-09-08 01:25:00.02158	auto
628	19	-10	2021-09-08 01:25:00.024551	auto
629	43	-10	2021-09-08 01:25:00.027507	auto
630	1	-10	2021-09-08 01:25:00.030124	auto
632	21	-20	2021-09-08 01:25:00.03599	auto
633	12	0	2021-09-08 01:25:00.037786	auto
634	21	-20	2021-09-08 01:26:00.012588	auto
635	2	0	2021-09-08 01:26:00.01575	auto
636	6	0	2021-09-08 01:26:00.018669	auto
637	4	0	2021-09-08 01:26:00.020771	auto
638	3	0	2021-09-08 01:26:00.022495	auto
639	7	0	2021-09-08 01:26:00.024651	auto
640	5	0	2021-09-08 01:26:00.027176	auto
641	13	0	2021-09-08 01:26:00.02944	auto
643	19	-10	2021-09-08 01:26:00.03442	auto
644	43	-10	2021-09-08 01:26:00.037668	auto
645	1	-10	2021-09-08 01:26:00.04052	auto
646	12	0	2021-09-08 01:26:00.042187	auto
647	21	-20	2021-09-08 01:27:00.00965	auto
648	2	0	2021-09-08 01:27:00.012191	auto
649	19	-10	2021-09-08 01:27:00.015331	auto
650	43	-10	2021-09-08 01:27:00.017878	auto
651	6	0	2021-09-08 01:27:00.019812	auto
652	1	-10	2021-09-08 01:27:00.022396	auto
653	4	0	2021-09-08 01:27:00.024178	auto
654	3	0	2021-09-08 01:27:00.025901	auto
655	7	0	2021-09-08 01:27:00.027408	auto
656	5	0	2021-09-08 01:27:00.029071	auto
657	13	0	2021-09-08 01:27:00.030565	auto
659	12	0	2021-09-08 01:27:00.034599	auto
660	2	0	2021-09-08 01:28:00.00819	auto
661	6	0	2021-09-08 01:28:00.010995	auto
662	4	0	2021-09-08 01:28:00.012948	auto
663	3	0	2021-09-08 01:28:00.015243	auto
664	7	0	2021-09-08 01:28:00.016888	auto
665	21	-20	2021-09-08 01:28:00.020106	auto
666	19	-10	2021-09-08 01:28:00.022727	auto
667	43	-10	2021-09-08 01:28:00.025383	auto
668	1	-10	2021-09-08 01:28:00.027809	auto
669	5	0	2021-09-08 01:28:00.029459	auto
670	13	0	2021-09-08 01:28:00.030952	auto
672	12	0	2021-09-08 01:28:00.034508	auto
673	2	0	2021-09-08 01:29:00.006459	auto
674	6	0	2021-09-08 01:29:00.010033	auto
675	4	0	2021-09-08 01:29:00.012171	auto
676	3	0	2021-09-08 01:29:00.014426	auto
677	7	0	2021-09-08 01:29:00.015944	auto
678	21	-20	2021-09-08 01:29:00.019097	auto
679	19	-10	2021-09-08 01:29:00.022439	auto
680	43	-10	2021-09-08 01:29:00.02549	auto
681	1	-10	2021-09-08 01:29:00.027833	auto
682	5	0	2021-09-08 01:29:00.029433	auto
683	13	0	2021-09-08 01:29:00.030866	auto
685	12	0	2021-09-08 01:29:00.033955	auto
686	2	0	2021-09-08 01:30:00.009644	auto
687	6	0	2021-09-08 01:30:00.013376	auto
688	4	0	2021-09-08 01:30:00.016952	auto
689	3	0	2021-09-08 01:30:00.020015	auto
690	7	0	2021-09-08 01:30:00.02355	auto
691	5	0	2021-09-08 01:30:00.026658	auto
692	21	-20	2021-09-08 01:30:00.030715	auto
693	13	0	2021-09-08 01:30:00.032845	auto
694	19	-10	2021-09-08 01:30:00.035973	auto
695	43	-10	2021-09-08 01:30:00.038987	auto
696	1	-10	2021-09-08 01:30:00.041457	auto
698	12	0	2021-09-08 01:30:00.045691	auto
699	2	0	2021-09-08 01:31:00.007751	auto
700	6	0	2021-09-08 01:31:00.010306	auto
701	4	0	2021-09-08 01:31:00.012136	auto
702	3	0	2021-09-08 01:31:00.013815	auto
703	7	0	2021-09-08 01:31:00.015509	auto
704	5	0	2021-09-08 01:31:00.017054	auto
705	13	0	2021-09-08 01:31:00.018945	auto
706	21	-20	2021-09-08 01:31:00.021728	auto
708	19	-10	2021-09-08 01:31:00.027244	auto
709	43	-10	2021-09-08 01:31:00.030765	auto
710	1	-10	2021-09-08 01:31:00.034055	auto
711	12	0	2021-09-08 01:31:00.035627	auto
712	19	-10	2021-09-08 01:32:00.008813	auto
713	43	-10	2021-09-08 01:32:00.01351	auto
714	2	0	2021-09-08 01:32:00.015568	auto
715	1	-10	2021-09-08 01:32:00.018666	auto
716	6	0	2021-09-08 01:32:00.020355	auto
717	4	0	2021-09-08 01:32:00.022308	auto
718	3	0	2021-09-08 01:32:00.023863	auto
719	7	0	2021-09-08 01:32:00.025373	auto
720	5	0	2021-09-08 01:32:00.027891	auto
721	13	0	2021-09-08 01:32:00.029443	auto
723	21	-20	2021-09-08 01:32:00.0337	auto
724	12	0	2021-09-08 01:32:00.03516	auto
725	2	0	2021-09-08 01:33:00.006957	auto
726	19	-10	2021-09-08 01:33:00.011797	auto
727	6	0	2021-09-08 01:33:00.013757	auto
728	43	-10	2021-09-08 01:33:00.016719	auto
729	4	0	2021-09-08 01:33:00.01825	auto
730	3	0	2021-09-08 01:33:00.019891	auto
731	7	0	2021-09-08 01:33:00.021549	auto
732	1	-10	2021-09-08 01:33:00.02422	auto
733	21	-20	2021-09-08 01:33:00.027018	auto
734	5	0	2021-09-08 01:33:00.028757	auto
735	13	0	2021-09-08 01:33:00.030189	auto
737	12	0	2021-09-08 01:33:00.033434	auto
738	2	0	2021-09-08 01:34:00.009928	auto
739	6	0	2021-09-08 01:34:00.012773	auto
740	4	0	2021-09-08 01:34:00.014291	auto
741	3	0	2021-09-08 01:34:00.016003	auto
742	7	0	2021-09-08 01:34:00.017654	auto
743	19	-10	2021-09-08 01:34:00.020484	auto
744	43	-10	2021-09-08 01:34:00.02315	auto
745	1	-10	2021-09-08 01:34:00.02667	auto
746	21	-20	2021-09-08 01:34:00.030462	auto
747	5	0	2021-09-08 01:34:00.031939	auto
748	13	0	2021-09-08 01:34:00.033313	auto
750	12	0	2021-09-08 01:34:00.036444	auto
751	2	0	2021-09-08 01:35:00.008599	auto
752	6	0	2021-09-08 01:35:00.011727	auto
753	4	0	2021-09-08 01:35:00.013767	auto
754	3	0	2021-09-08 01:35:00.015956	auto
755	7	0	2021-09-08 01:35:00.018012	auto
756	19	-10	2021-09-08 01:35:00.020817	auto
757	43	-10	2021-09-08 01:35:00.02376	auto
758	5	0	2021-09-08 01:35:00.025399	auto
759	1	-10	2021-09-08 01:35:00.029796	auto
760	13	0	2021-09-08 01:35:00.031351	auto
761	21	-20	2021-09-08 01:35:00.033738	auto
763	12	0	2021-09-08 01:35:00.036725	auto
764	2	0	2021-09-08 01:36:00.007791	auto
765	6	0	2021-09-08 01:36:00.013474	auto
766	4	0	2021-09-08 01:36:00.015953	auto
767	3	0	2021-09-08 01:36:00.018286	auto
768	7	0	2021-09-08 01:36:00.02077	auto
769	5	0	2021-09-08 01:36:00.02227	auto
770	13	0	2021-09-08 01:36:00.023656	auto
771	19	-10	2021-09-08 01:36:00.026159	auto
772	43	-10	2021-09-08 01:36:00.028338	auto
773	1	-10	2021-09-08 01:36:00.030746	auto
775	21	-20	2021-09-08 01:36:00.034924	auto
776	12	0	2021-09-08 01:36:00.036359	auto
777	21	-20	2021-09-08 01:37:00.143264	auto
778	2	0	2021-09-08 01:37:00.145562	auto
779	6	0	2021-09-08 01:37:00.147322	auto
780	4	0	2021-09-08 01:37:00.149348	auto
781	3	0	2021-09-08 01:37:00.150811	auto
782	7	0	2021-09-08 01:37:00.152338	auto
783	5	0	2021-09-08 01:37:00.153922	auto
784	13	0	2021-09-08 01:37:00.155966	auto
786	19	-10	2021-09-08 01:37:00.160658	auto
787	43	-10	2021-09-08 01:37:00.162972	auto
788	1	-10	2021-09-08 01:37:00.165462	auto
789	12	0	2021-09-08 01:37:00.166806	auto
790	21	-20	2021-09-08 01:38:00.009081	auto
791	2	0	2021-09-08 01:38:00.011688	auto
792	19	-10	2021-09-08 01:38:00.014165	auto
793	43	-10	2021-09-08 01:38:00.018148	auto
794	6	0	2021-09-08 01:38:00.019924	auto
795	1	-10	2021-09-08 01:38:00.022356	auto
796	4	0	2021-09-08 01:38:00.024038	auto
797	3	0	2021-09-08 01:38:00.025445	auto
798	7	0	2021-09-08 01:38:00.026875	auto
799	5	0	2021-09-08 01:38:00.028259	auto
800	13	0	2021-09-08 01:38:00.030014	auto
802	12	0	2021-09-08 01:38:00.032866	auto
803	2	0	2021-09-08 01:39:00.004858	auto
804	6	0	2021-09-08 01:39:00.007261	auto
805	4	0	2021-09-08 01:39:00.009227	auto
806	3	0	2021-09-08 01:39:00.011765	auto
807	7	0	2021-09-08 01:39:00.013883	auto
808	21	-20	2021-09-08 01:39:00.017529	auto
809	19	-10	2021-09-08 01:39:00.032896	auto
810	43	-10	2021-09-08 01:39:00.03727	auto
811	1	-10	2021-09-08 01:39:00.040948	auto
812	5	0	2021-09-08 01:39:00.045241	auto
813	13	0	2021-09-08 01:39:00.047902	auto
815	12	0	2021-09-08 01:39:00.051441	auto
816	2	0	2021-09-08 01:40:00.007397	auto
817	6	0	2021-09-08 01:40:00.010195	auto
818	4	0	2021-09-08 01:40:00.013062	auto
819	3	0	2021-09-08 01:40:00.014699	auto
820	7	0	2021-09-08 01:40:00.016218	auto
821	21	-20	2021-09-08 01:40:00.019363	auto
822	19	-10	2021-09-08 01:40:00.021567	auto
823	43	-10	2021-09-08 01:40:00.023896	auto
824	1	-10	2021-09-08 01:40:00.026067	auto
825	5	0	2021-09-08 01:40:00.027618	auto
826	13	0	2021-09-08 01:40:00.028919	auto
828	12	0	2021-09-08 01:40:00.032781	auto
829	2	0	2021-09-08 01:41:00.006139	auto
830	6	0	2021-09-08 01:41:00.009098	auto
831	4	0	2021-09-08 01:41:00.010932	auto
832	3	0	2021-09-08 01:41:00.012445	auto
833	7	0	2021-09-08 01:41:00.014326	auto
834	5	0	2021-09-08 01:41:00.015806	auto
835	21	-20	2021-09-08 01:41:00.019442	auto
836	13	0	2021-09-08 01:41:00.020777	auto
837	19	-10	2021-09-08 01:41:00.02289	auto
838	43	-10	2021-09-08 01:41:00.025251	auto
839	1	-10	2021-09-08 01:41:00.027375	auto
841	12	0	2021-09-08 01:41:00.030776	auto
842	2	0	2021-09-08 01:42:00.006819	auto
843	6	0	2021-09-08 01:42:00.010232	auto
844	4	0	2021-09-08 01:42:00.012962	auto
845	3	0	2021-09-08 01:42:00.014984	auto
846	7	0	2021-09-08 01:42:00.016471	auto
847	5	0	2021-09-08 01:42:00.01786	auto
848	13	0	2021-09-08 01:42:00.019528	auto
849	21	-20	2021-09-08 01:42:00.021733	auto
851	19	-10	2021-09-08 01:42:00.025522	auto
852	43	-10	2021-09-08 01:42:00.027612	auto
853	1	-10	2021-09-08 01:42:00.030153	auto
854	12	0	2021-09-08 01:42:00.031695	auto
855	19	-10	2021-09-08 01:43:00.009383	auto
856	43	-10	2021-09-08 01:43:00.012727	auto
857	2	0	2021-09-08 01:43:00.014377	auto
858	1	-10	2021-09-08 01:43:00.01678	auto
859	6	0	2021-09-08 01:43:00.018072	auto
860	4	0	2021-09-08 01:43:00.019605	auto
861	3	0	2021-09-08 01:43:00.020998	auto
862	7	0	2021-09-08 01:43:00.022434	auto
863	5	0	2021-09-08 01:43:00.023898	auto
864	13	0	2021-09-08 01:43:00.02549	auto
866	21	-20	2021-09-08 01:43:00.02999	auto
867	12	0	2021-09-08 01:43:00.031327	auto
868	2	0	2021-09-08 01:44:00.006727	auto
869	19	-10	2021-09-08 01:44:00.01098	auto
870	6	0	2021-09-08 01:44:00.012786	auto
871	43	-10	2021-09-08 01:44:00.015287	auto
872	4	0	2021-09-08 01:44:00.016673	auto
873	3	0	2021-09-08 01:44:00.017976	auto
874	7	0	2021-09-08 01:44:00.019522	auto
875	1	-10	2021-09-08 01:44:00.022031	auto
876	21	-20	2021-09-08 01:44:00.024472	auto
877	5	0	2021-09-08 01:44:00.025757	auto
878	13	0	2021-09-08 01:44:00.02739	auto
880	12	0	2021-09-08 01:44:00.030296	auto
881	2	0	2021-09-08 01:45:00.007661	auto
882	6	0	2021-09-08 01:45:00.010656	auto
883	4	0	2021-09-08 01:45:00.012379	auto
884	3	0	2021-09-08 01:45:00.013779	auto
885	7	0	2021-09-08 01:45:00.015418	auto
886	19	-10	2021-09-08 01:45:00.018042	auto
887	43	-10	2021-09-08 01:45:00.021039	auto
888	1	-10	2021-09-08 01:45:00.023283	auto
889	21	-20	2021-09-08 01:45:00.025467	auto
890	5	0	2021-09-08 01:45:00.027261	auto
891	13	0	2021-09-08 01:45:00.028842	auto
893	12	0	2021-09-08 01:45:00.031414	auto
894	2	0	2021-09-08 01:46:00.00597	auto
895	6	0	2021-09-08 01:46:00.009549	auto
896	4	0	2021-09-08 01:46:00.012105	auto
897	3	0	2021-09-08 01:46:00.014433	auto
898	7	0	2021-09-08 01:46:00.017496	auto
899	19	-10	2021-09-08 01:46:00.019641	auto
900	43	-10	2021-09-08 01:46:00.021935	auto
901	5	0	2021-09-08 01:46:00.023234	auto
902	1	-10	2021-09-08 01:46:00.0255	auto
903	13	0	2021-09-08 01:46:00.026779	auto
904	21	-20	2021-09-08 01:46:00.029164	auto
906	12	0	2021-09-08 01:46:00.031936	auto
907	2	0	2021-09-08 01:47:00.005387	auto
908	6	0	2021-09-08 01:47:00.00758	auto
909	4	0	2021-09-08 01:47:00.00914	auto
910	3	0	2021-09-08 01:47:00.010892	auto
911	7	0	2021-09-08 01:47:00.012425	auto
912	5	0	2021-09-08 01:47:00.014144	auto
913	13	0	2021-09-08 01:47:00.015691	auto
914	19	-10	2021-09-08 01:47:00.018574	auto
915	43	-10	2021-09-08 01:47:00.021322	auto
916	1	-10	2021-09-08 01:47:00.023595	auto
918	21	-20	2021-09-08 01:47:00.027382	auto
919	12	0	2021-09-08 01:47:00.028638	auto
920	21	-20	2021-09-08 01:48:00.009672	auto
921	2	0	2021-09-08 01:48:00.011823	auto
922	6	0	2021-09-08 01:48:00.013466	auto
923	4	0	2021-09-08 01:48:00.014998	auto
924	3	0	2021-09-08 01:48:00.016565	auto
925	7	0	2021-09-08 01:48:00.017891	auto
926	5	0	2021-09-08 01:48:00.0191	auto
927	13	0	2021-09-08 01:48:00.020683	auto
929	19	-10	2021-09-08 01:48:00.024474	auto
930	43	-10	2021-09-08 01:48:00.02678	auto
931	1	-10	2021-09-08 01:48:00.028863	auto
932	12	0	2021-09-08 01:48:00.03035	auto
933	21	-20	2021-09-08 01:49:00.009441	auto
934	2	0	2021-09-08 01:49:00.011558	auto
935	19	-10	2021-09-08 01:49:00.015839	auto
936	43	-10	2021-09-08 01:49:00.018155	auto
937	6	0	2021-09-08 01:49:00.019737	auto
938	1	-10	2021-09-08 01:49:00.021922	auto
939	4	0	2021-09-08 01:49:00.023203	auto
940	3	0	2021-09-08 01:49:00.024804	auto
941	7	0	2021-09-08 01:49:00.026059	auto
942	5	0	2021-09-08 01:49:00.027357	auto
943	13	0	2021-09-08 01:49:00.029197	auto
945	12	0	2021-09-08 01:49:00.032162	auto
946	2	0	2021-09-08 01:50:00.008359	auto
947	6	0	2021-09-08 01:50:00.011331	auto
948	4	0	2021-09-08 01:50:00.012964	auto
949	3	0	2021-09-08 01:50:00.015191	auto
950	7	0	2021-09-08 01:50:00.01681	auto
951	21	-20	2021-09-08 01:50:00.020116	auto
952	19	-10	2021-09-08 01:50:00.025342	auto
953	43	-10	2021-09-08 01:50:00.029105	auto
954	1	-10	2021-09-08 01:50:00.032144	auto
955	5	0	2021-09-08 01:50:00.033831	auto
956	13	0	2021-09-08 01:50:00.035672	auto
958	12	0	2021-09-08 01:50:00.040955	auto
959	2	0	2021-09-08 01:51:00.006427	auto
960	6	0	2021-09-08 01:51:00.009375	auto
961	4	0	2021-09-08 01:51:00.011075	auto
962	3	0	2021-09-08 01:51:00.012578	auto
963	7	0	2021-09-08 01:51:00.01414	auto
964	21	-20	2021-09-08 01:51:00.016283	auto
965	19	-10	2021-09-08 01:51:00.018501	auto
966	43	-10	2021-09-08 01:51:00.020482	auto
967	1	-10	2021-09-08 01:51:00.022786	auto
968	5	0	2021-09-08 01:51:00.024081	auto
969	13	0	2021-09-08 01:51:00.025415	auto
971	12	0	2021-09-08 01:51:00.029671	auto
972	2	0	2021-09-08 01:52:00.007987	auto
973	6	0	2021-09-08 01:52:00.011746	auto
974	4	0	2021-09-08 01:52:00.014105	auto
975	3	0	2021-09-08 01:52:00.018766	auto
976	7	0	2021-09-08 01:52:00.02279	auto
977	5	0	2021-09-08 01:52:00.026746	auto
978	21	-20	2021-09-08 01:52:00.031907	auto
979	13	0	2021-09-08 01:52:00.034509	auto
980	19	-10	2021-09-08 01:52:00.04017	auto
981	43	-10	2021-09-08 01:52:00.044248	auto
982	1	-10	2021-09-08 01:52:00.047512	auto
984	12	0	2021-09-08 01:52:00.051972	auto
985	2	0	2021-09-08 01:53:00.00771	auto
986	6	0	2021-09-08 01:53:00.010855	auto
987	4	0	2021-09-08 01:53:00.012772	auto
988	3	0	2021-09-08 01:53:00.014282	auto
989	7	0	2021-09-08 01:53:00.015844	auto
990	5	0	2021-09-08 01:53:00.017327	auto
991	13	0	2021-09-08 01:53:00.018697	auto
992	21	-20	2021-09-08 01:53:00.020882	auto
994	19	-10	2021-09-08 01:53:00.024724	auto
995	43	-10	2021-09-08 01:53:00.026855	auto
996	1	-10	2021-09-08 01:53:00.03022	auto
997	12	0	2021-09-08 01:53:00.031524	auto
998	19	-10	2021-09-08 01:54:00.008865	auto
999	43	-10	2021-09-08 01:54:00.012552	auto
1000	2	0	2021-09-08 01:54:00.014617	auto
1001	1	-10	2021-09-08 01:54:00.017134	auto
1002	6	0	2021-09-08 01:54:00.018445	auto
1003	4	0	2021-09-08 01:54:00.019703	auto
1004	3	0	2021-09-08 01:54:00.022275	auto
1005	7	0	2021-09-08 01:54:00.023555	auto
1006	5	0	2021-09-08 01:54:00.024959	auto
1007	13	0	2021-09-08 01:54:00.027228	auto
1009	21	-20	2021-09-08 01:54:00.031069	auto
1010	12	0	2021-09-08 01:54:00.032624	auto
1011	2	0	2021-09-08 01:55:00.006173	auto
1012	19	-10	2021-09-08 01:55:00.010347	auto
1013	6	0	2021-09-08 01:55:00.012228	auto
1014	43	-10	2021-09-08 01:55:00.015278	auto
1015	4	0	2021-09-08 01:55:00.016656	auto
1016	3	0	2021-09-08 01:55:00.018294	auto
1017	7	0	2021-09-08 01:55:00.019655	auto
1018	1	-10	2021-09-08 01:55:00.021779	auto
1019	21	-20	2021-09-08 01:55:00.024666	auto
1020	5	0	2021-09-08 01:55:00.026002	auto
1021	13	0	2021-09-08 01:55:00.02739	auto
1023	12	0	2021-09-08 01:55:00.03042	auto
1024	2	0	2021-09-08 01:56:00.007803	auto
1025	6	0	2021-09-08 01:56:00.010889	auto
1026	4	0	2021-09-08 01:56:00.014415	auto
1027	3	0	2021-09-08 01:56:00.015852	auto
1028	7	0	2021-09-08 01:56:00.017111	auto
1029	19	-10	2021-09-08 01:56:00.019485	auto
1030	43	-10	2021-09-08 01:56:00.021481	auto
1031	1	-10	2021-09-08 01:56:00.023648	auto
1032	21	-20	2021-09-08 01:56:00.02575	auto
1033	5	0	2021-09-08 01:56:00.027117	auto
1034	13	0	2021-09-08 01:56:00.028552	auto
1036	12	0	2021-09-08 01:56:00.031018	auto
1037	2	0	2021-09-08 01:57:00.006681	auto
1038	6	0	2021-09-08 01:57:00.009603	auto
1039	4	0	2021-09-08 01:57:00.01201	auto
1040	3	0	2021-09-08 01:57:00.013944	auto
1041	7	0	2021-09-08 01:57:00.015357	auto
1042	19	-10	2021-09-08 01:57:00.018029	auto
1043	43	-10	2021-09-08 01:57:00.020732	auto
1044	5	0	2021-09-08 01:57:00.021982	auto
1045	1	-10	2021-09-08 01:57:00.024409	auto
1046	13	0	2021-09-08 01:57:00.025908	auto
1047	21	-20	2021-09-08 01:57:00.028193	auto
1049	12	0	2021-09-08 01:57:00.031089	auto
1050	2	0	2021-09-08 01:58:00.006883	auto
1051	6	0	2021-09-08 01:58:00.009749	auto
1052	4	0	2021-09-08 01:58:00.011574	auto
1053	3	0	2021-09-08 01:58:00.012873	auto
1054	7	0	2021-09-08 01:58:00.014481	auto
1055	5	0	2021-09-08 01:58:00.015742	auto
1056	13	0	2021-09-08 01:58:00.017061	auto
1057	19	-10	2021-09-08 01:58:00.019309	auto
1058	43	-10	2021-09-08 01:58:00.02165	auto
1059	1	-10	2021-09-08 01:58:00.024014	auto
1061	21	-20	2021-09-08 01:58:00.027594	auto
1062	12	0	2021-09-08 01:58:00.029059	auto
1063	21	-20	2021-09-08 01:59:00.013112	auto
1064	2	0	2021-09-08 01:59:00.015859	auto
1065	6	0	2021-09-08 01:59:00.017814	auto
1066	4	0	2021-09-08 01:59:00.019492	auto
1067	3	0	2021-09-08 01:59:00.021203	auto
1068	7	0	2021-09-08 01:59:00.022665	auto
1069	5	0	2021-09-08 01:59:00.024104	auto
1070	13	0	2021-09-08 01:59:00.025625	auto
1072	19	-10	2021-09-08 01:59:00.029323	auto
1073	43	-10	2021-09-08 01:59:00.031789	auto
1074	1	-10	2021-09-08 01:59:00.034281	auto
1075	12	0	2021-09-08 01:59:00.035715	auto
1076	21	-20	2021-09-08 02:00:00.007757	auto
1077	2	0	2021-09-08 02:00:00.00955	auto
1078	19	-10	2021-09-08 02:00:00.012116	auto
1079	43	-10	2021-09-08 02:00:00.014189	auto
1080	6	0	2021-09-08 02:00:00.0157	auto
1081	1	-10	2021-09-08 02:00:00.017814	auto
1082	4	0	2021-09-08 02:00:00.019074	auto
1083	3	0	2021-09-08 02:00:00.020564	auto
1084	7	0	2021-09-08 02:00:00.024325	auto
1085	5	0	2021-09-08 02:00:00.025625	auto
1086	13	0	2021-09-08 02:00:00.027307	auto
1088	12	0	2021-09-08 02:00:00.030117	auto
1089	21	100	2021-09-08 02:03:33.928538	admin
1090	2	0	2021-09-08 02:09:00.015213	auto
1091	6	0	2021-09-08 02:09:00.022707	auto
1092	4	0	2021-09-08 02:09:00.02639	auto
1093	3	0	2021-09-08 02:09:00.02955	auto
1094	7	0	2021-09-08 02:09:00.032808	auto
1095	19	-10	2021-09-08 02:09:00.039146	auto
1096	43	-10	2021-09-08 02:09:00.043539	auto
1097	1	-10	2021-09-08 02:09:00.046967	auto
1098	21	-20	2021-09-08 02:09:00.051898	auto
1099	5	0	2021-09-08 02:09:00.053877	auto
1100	13	0	2021-09-08 02:09:00.056548	auto
1102	12	0	2021-09-08 02:09:00.060527	auto
1103	2	0	2021-09-08 02:10:00.017853	auto
1104	6	0	2021-09-08 02:10:00.025535	auto
1105	4	0	2021-09-08 02:10:00.029386	auto
1106	3	0	2021-09-08 02:10:00.032296	auto
1107	7	0	2021-09-08 02:10:00.035599	auto
1108	19	-10	2021-09-08 02:10:00.042281	auto
1109	43	-10	2021-09-08 02:10:00.047111	auto
1110	1	-10	2021-09-08 02:10:00.050775	auto
1111	5	0	2021-09-08 02:10:00.053951	auto
1112	21	-20	2021-09-08 02:10:00.057478	auto
1113	13	0	2021-09-08 02:10:00.060354	auto
1115	12	0	2021-09-08 02:10:00.064125	auto
1118	19	-10	2021-09-14 01:00:00.022898	auto
1119	1	-10	2021-09-14 01:00:00.032463	auto
1120	21	-30	2021-09-14 01:00:00.037544	auto
1121	43	-10	2021-09-14 01:00:00.041848	auto
1122	19	1000	2021-09-14 13:58:04.619364	admin
1123	19	-10	2021-09-15 01:00:00.145898	auto
1124	1	-10	2021-09-15 01:00:00.151486	auto
1125	21	-30	2021-09-15 01:00:00.154263	auto
1126	43	-10	2021-09-15 01:00:00.156584	auto
1127	19	-10	2021-09-21 01:00:00.008723	auto
1128	1	-10	2021-09-21 01:00:00.014011	auto
1129	21	-30	2021-09-21 01:00:00.017932	auto
1130	43	-10	2021-09-21 01:00:00.020359	auto
1132	19	-10	2021-09-22 01:00:00.014211	auto
1133	1	-10	2021-09-22 01:00:00.020768	auto
1134	21	-20	2021-09-22 01:00:00.024501	auto
1135	43	-10	2021-09-22 01:00:00.027332	auto
1136	21	10000	2021-09-22 21:31:00.496154	admin
1137	18	-10	2021-09-23 01:00:00.018965	auto
1138	19	-10	2021-09-23 01:00:00.025527	auto
1139	1	-10	2021-09-23 01:00:00.029523	auto
1140	10	-10	2021-09-23 01:00:00.032891	auto
1141	45	-10	2021-09-23 01:00:00.036353	auto
1142	9	-10	2021-09-23 01:00:00.039413	auto
1143	46	-10	2021-09-23 01:00:00.043371	auto
1144	15	-10	2021-09-23 01:00:00.046771	auto
1145	21	-20	2021-09-23 01:00:00.049953	auto
1146	43	-10	2021-09-23 01:00:00.055712	auto
1147	22	-10	2021-09-23 01:00:00.060855	auto
1148	38	-10	2021-09-23 01:00:00.066082	auto
1149	21	-20	2021-09-24 01:00:00.026534	auto
1150	21	-20	2021-09-25 01:00:00.009742	auto
1151	21	-20	2021-09-27 01:00:00.025793	auto
1152	21	-20	2021-09-28 01:00:00.015689	auto
1153	21	-20	2021-09-29 01:00:00.021474	auto
1154	21	-20	2021-10-01 01:00:00.025234	auto
1155	21	-20	2021-10-02 01:00:00.01045	auto
1156	21	-20	2021-10-03 01:00:00.016467	auto
1157	21	-20	2021-10-04 01:00:00.017331	auto
1158	21	-20	2021-10-07 01:00:00.00871	auto
1159	21	-30	2021-10-12 01:00:00.019902	auto
1160	21	-30	2021-10-13 01:00:00.011639	auto
1161	21	-30	2021-10-15 01:00:00.010641	auto
1162	21	-30	2021-10-17 01:00:00.008592	auto
1163	21	-50	2021-10-18 01:00:00.024941	auto
1164	21	-50	2021-10-19 01:00:00.01731	auto
1165	21	-50	2021-10-20 01:00:00.019234	auto
1166	21	-50	2021-10-22 01:00:00.016261	auto
1167	22	10000	2021-10-23 23:23:05.544992	admin
1168	21	-50	2021-10-24 01:00:00.015798	auto
1169	22	-10	2021-10-24 01:00:00.021449	auto
\.


--
-- Data for Name: vne_word_translations; Type: TABLE DATA; Schema: default; Owner: vio
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
26	12	2	Orders history
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
240	103	1	Деньги на счету
241	103	2	Money in the account
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
635	226	1	В корзину
636	226	2	Add to cart
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
654	235	2	Invoice
655	236	1	Официант
656	236	2	Waiter
657	237	1	Рекомендуемые
658	237	2	Recommended
659	238	1	Корзина
660	238	2	Cart
661	239	1	Заказать
662	239	2	Order
663	240	1	Итого
664	240	2	Total
869	241	1	Подача
870	241	2	Type of serving
873	243	1	Корзина пуста
874	243	2	Cart is empty
875	244	1	Отправить заказ?
876	244	2	Send an order?
877	245	1	Ваш заказ принят!
878	245	2	Your order is accepted!
879	246	1	Ваш счет
880	246	2	Invoice
881	247	1	Счет не открыт
882	247	2	Invoice is not open
883	248	1	Дата открытия
884	248	2	Created at
885	249	1	Состояние
886	249	2	Status
887	250	1	официант вызван
888	250	2	waiter is called
889	251	1	заказ дополнен
890	251	2	items added to order
891	252	1	расчет
892	252	2	payment
893	253	1	Закрыть счет
894	253	2	Pay off
895	254	1	№ счета
896	254	2	Invoice #
897	255	1	Ваш заказ
898	255	2	Your order
899	256	1	Сумма
900	256	2	Subtotal
901	257	1	Итого
902	257	2	Total
903	258	1	Скидка
904	258	2	Discount
905	259	1	Способ оплаты
906	259	2	Payment method
907	260	1	наличные
908	260	2	cash
909	261	1	банковская карта
910	261	2	bank card
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
975	294	1	Статусы
976	294	2	Statuses
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
871	242	1	Комментарий
872	242	2	Comment
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
1031	322	1	Вы можете указать свое имя и пожелания по заказу
1032	322	2	You can specify your name and wishes for the order
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
1073	343	1	Статистика
1074	343	2	Statistics
1075	344	1	Статистика
1076	344	2	Statistics
1077	345	1	Доход по столам за месяц
1078	345	2	Income by tables per month
1079	346	1	Доход по сотрудникам за месяц
1080	346	2	Income by employee per month
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
\.


--
-- Data for Name: vne_wordbooks; Type: TABLE DATA; Schema: default; Owner: vio
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
\.


--
-- Data for Name: vne_words; Type: TABLE DATA; Schema: default; Owner: vio
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
185	12	6	print-version	\N
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
200	15	1	title-index	\N
201	15	2	title-create	\N
202	15	3	title-edit	\N
203	15	100	cats	\N
204	15	101	code	\N
205	15	102	name	\N
206	15	103	price	\N
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
315	15	4	title-finder	\N
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
\.


--
-- Data for Name: vne_wsservers; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_wsservers (id, url, pos) FROM stdin;
1	https://ws1.restclick.vio.net.ua	1
\.


--
-- Name: vne_admingroups_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_admingroups_id_seq', 1, true);


--
-- Name: vne_admins_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_admins_id_seq', 6, true);


--
-- Name: vne_cats_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_cats_id_seq', 17, true);


--
-- Name: vne_currencies_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_currencies_id_seq', 4, true);


--
-- Name: vne_employee_status_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_employee_status_translations_id_seq', 13, true);


--
-- Name: vne_employee_statuses_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_employee_statuses_id_seq', 3, true);


--
-- Name: vne_employees_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_employees_id_seq', 52, true);


--
-- Name: vne_halls_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_halls_id_seq', 20, true);


--
-- Name: vne_icon_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_icon_translations_id_seq', 48, true);


--
-- Name: vne_icons_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_icons_id_seq', 17, true);


--
-- Name: vne_ingredients_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_ingredients_id_seq', 31, true);


--
-- Name: vne_langs_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_langs_id_seq', 7, true);


--
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_mailtemplate_translations_id_seq', 24, true);


--
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_mailtemplates_id_seq', 8, true);


--
-- Name: vne_order_product_ingredients_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_order_product_ingredients_id_seq', 1196, true);


--
-- Name: vne_order_products_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_order_products_id_seq', 368, true);


--
-- Name: vne_orders_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_orders_id_seq', 207, true);


--
-- Name: vne_product_images_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_product_images_id_seq', 374, true);


--
-- Name: vne_products_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_products_id_seq', 203, true);


--
-- Name: vne_restaurants_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_restaurants_id_seq', 50, true);


--
-- Name: vne_serving_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_serving_translations_id_seq', 10, true);


--
-- Name: vne_servings_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_servings_id_seq', 4, true);


--
-- Name: vne_settings_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_settings_id_seq', 13, true);


--
-- Name: vne_tables_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_tables_id_seq', 91, true);


--
-- Name: vne_transactions_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_transactions_id_seq', 1169, true);


--
-- Name: vne_word_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_word_translations_id_seq', 1120, true);


--
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_wordbooks_id_seq', 23, true);


--
-- Name: vne_words_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_words_id_seq', 366, true);


--
-- Name: vne_wsservers_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_wsservers_id_seq', 4, true);


--
-- Name: vne_settings PK_00e1517e9faaaba0f525bcb590e; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_settings
    ADD CONSTRAINT "PK_00e1517e9faaaba0f525bcb590e" PRIMARY KEY (id);


--
-- Name: vne_words PK_072d0974d51316d8537ba4708bb; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_words
    ADD CONSTRAINT "PK_072d0974d51316d8537ba4708bb" PRIMARY KEY (id);


--
-- Name: vne_restaurants PK_0875461f4afdd97af48b6444eff; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "PK_0875461f4afdd97af48b6444eff" PRIMARY KEY (id);


--
-- Name: vne_halls PK_0989b8637f146421fd51f440a9e; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_halls
    ADD CONSTRAINT "PK_0989b8637f146421fd51f440a9e" PRIMARY KEY (id);


--
-- Name: vne_mailtemplates PK_0ad69d17564005feccf82893808; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplates
    ADD CONSTRAINT "PK_0ad69d17564005feccf82893808" PRIMARY KEY (id);


--
-- Name: vne_cats PK_0bdee08b5c108a0ac6a85774467; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_cats
    ADD CONSTRAINT "PK_0bdee08b5c108a0ac6a85774467" PRIMARY KEY (id);


--
-- Name: vne_serving_translations PK_0dc8f78fd2fa6a62819b25f1a6d; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_serving_translations
    ADD CONSTRAINT "PK_0dc8f78fd2fa6a62819b25f1a6d" PRIMARY KEY (id);


--
-- Name: vne_admins PK_0e169cb063501c963352dfbaaac; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admins
    ADD CONSTRAINT "PK_0e169cb063501c963352dfbaaac" PRIMARY KEY (id);


--
-- Name: vne_product_images PK_2cff70e96751e07d208cf318897; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_product_images
    ADD CONSTRAINT "PK_2cff70e96751e07d208cf318897" PRIMARY KEY (id);


--
-- Name: vne_products PK_350040868e6f6a4bbcb33727d49; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_products
    ADD CONSTRAINT "PK_350040868e6f6a4bbcb33727d49" PRIMARY KEY (id);


--
-- Name: vne_employee_status_translations PK_3537ef87ea04c2bb295c1c0e948; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_status_translations
    ADD CONSTRAINT "PK_3537ef87ea04c2bb295c1c0e948" PRIMARY KEY (id);


--
-- Name: vne_employee_statuses PK_3b845110cc6cfb8b64b275a9f4f; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_statuses
    ADD CONSTRAINT "PK_3b845110cc6cfb8b64b275a9f4f" PRIMARY KEY (id);


--
-- Name: vne_word_translations PK_521f92df69a7ad9c67b18da8f68; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_word_translations
    ADD CONSTRAINT "PK_521f92df69a7ad9c67b18da8f68" PRIMARY KEY (id);


--
-- Name: vne_order_products PK_6d0799e3fbcc5e68c5bb4fa7c8d; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_order_products
    ADD CONSTRAINT "PK_6d0799e3fbcc5e68c5bb4fa7c8d" PRIMARY KEY (id);


--
-- Name: vne_ingredients PK_70157e9e833b07dc104edf6fe5c; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_ingredients
    ADD CONSTRAINT "PK_70157e9e833b07dc104edf6fe5c" PRIMARY KEY (id);


--
-- Name: vne_currencies PK_84d6314cfa9aff009fbb4f55c22; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_currencies
    ADD CONSTRAINT "PK_84d6314cfa9aff009fbb4f55c22" PRIMARY KEY (id);


--
-- Name: vne_icons PK_87f5339d51f9d2577f7ef3b922d; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icons
    ADD CONSTRAINT "PK_87f5339d51f9d2577f7ef3b922d" PRIMARY KEY (id);


--
-- Name: vne_admingroups PK_885fdcbc51834c0641662d5d550; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admingroups
    ADD CONSTRAINT "PK_885fdcbc51834c0641662d5d550" PRIMARY KEY (id);


--
-- Name: vne_orders PK_8a2a7c2e8cff037b183b338c5f6; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "PK_8a2a7c2e8cff037b183b338c5f6" PRIMARY KEY (id);


--
-- Name: vne_icon_translations PK_8b8160671a2807bd49fc66fcd27; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icon_translations
    ADD CONSTRAINT "PK_8b8160671a2807bd49fc66fcd27" PRIMARY KEY (id);


--
-- Name: vne_mailtemplate_translations PK_9c2864edd8cf9260136c23914bc; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "PK_9c2864edd8cf9260136c23914bc" PRIMARY KEY (id);


--
-- Name: vne_order_product_ingredients PK_b3772c34456c2cb6f168403080f; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_order_product_ingredients
    ADD CONSTRAINT "PK_b3772c34456c2cb6f168403080f" PRIMARY KEY (id);


--
-- Name: vne_tables PK_bb89d6ca78aa6b3905e302fde95; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_tables
    ADD CONSTRAINT "PK_bb89d6ca78aa6b3905e302fde95" PRIMARY KEY (id);


--
-- Name: vne_employees PK_be6da89c037f846b6b791a35f8b; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "PK_be6da89c037f846b6b791a35f8b" PRIMARY KEY (id);


--
-- Name: vne_servings PK_c3f64fa30f7cd7277b75c868314; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_servings
    ADD CONSTRAINT "PK_c3f64fa30f7cd7277b75c868314" PRIMARY KEY (id);


--
-- Name: vne_transactions PK_c4c1c2e63f854ccf92d4e7209d7; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_transactions
    ADD CONSTRAINT "PK_c4c1c2e63f854ccf92d4e7209d7" PRIMARY KEY (id);


--
-- Name: vne_langs PK_d5d1c1e82773cfdb6bc8785f60a; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_langs
    ADD CONSTRAINT "PK_d5d1c1e82773cfdb6bc8785f60a" PRIMARY KEY (id);


--
-- Name: vne_wsservers PK_e23a1bca999f0a79ce125cda569; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_wsservers
    ADD CONSTRAINT "PK_e23a1bca999f0a79ce125cda569" PRIMARY KEY (id);


--
-- Name: vne_wordbooks PK_fe107eba055dfeb52d76f771029; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_wordbooks
    ADD CONSTRAINT "PK_fe107eba055dfeb52d76f771029" PRIMARY KEY (id);


--
-- Name: vne_admins UQ_0ebf4ce544e97dc18ccf67dadb4; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admins
    ADD CONSTRAINT "UQ_0ebf4ce544e97dc18ccf67dadb4" UNIQUE (email);


--
-- Name: vne_employees UQ_752fad6244eb8729bba8e6558da; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "UQ_752fad6244eb8729bba8e6558da" UNIQUE (email);


--
-- Name: vne_mailtemplates UQ_8dcdd7fca3bc0ba922e66e6e632; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplates
    ADD CONSTRAINT "UQ_8dcdd7fca3bc0ba922e66e6e632" UNIQUE (name);


--
-- Name: vne_tables UQ_af6e48dc3768cbad3f140aa3aca; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_tables
    ADD CONSTRAINT "UQ_af6e48dc3768cbad3f140aa3aca" UNIQUE (code);


--
-- Name: IDX_04ce0a0d84f168475f385b5843; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_04ce0a0d84f168475f385b5843" ON "default".vne_words USING btree (mark);


--
-- Name: IDX_0ebf4ce544e97dc18ccf67dadb; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_0ebf4ce544e97dc18ccf67dadb" ON "default".vne_admins USING btree (email);


--
-- Name: IDX_15bbea4f323c6b5d1b5d1bc630; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_15bbea4f323c6b5d1b5d1bc630" ON "default".vne_products USING btree (name);


--
-- Name: IDX_19f8a7e397d62395cd2088b24b; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_19f8a7e397d62395cd2088b24b" ON "default".vne_orders USING btree (accepted_at);


--
-- Name: IDX_29851f01aa898c68aa2c4b7014; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_29851f01aa898c68aa2c4b7014" ON "default".vne_restaurants USING btree (name);


--
-- Name: IDX_2e1de563e14f7009d683b9bde4; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_2e1de563e14f7009d683b9bde4" ON "default".vne_langs USING btree (slug);


--
-- Name: IDX_4df2ab0a3f08abf7f8baa4954b; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_4df2ab0a3f08abf7f8baa4954b" ON "default".vne_orders USING btree (completed_at);


--
-- Name: IDX_74e816a5981260a074b04455f0; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_74e816a5981260a074b04455f0" ON "default".vne_orders USING btree (status);


--
-- Name: IDX_752fad6244eb8729bba8e6558d; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_752fad6244eb8729bba8e6558d" ON "default".vne_employees USING btree (email);


--
-- Name: IDX_766c8969dd7b17ed014aac11ac; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_766c8969dd7b17ed014aac11ac" ON "default".vne_orders USING btree (paymethod);


--
-- Name: IDX_7cd3f8bca6a97d655d996b03a8; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_7cd3f8bca6a97d655d996b03a8" ON "default".vne_orders USING btree (sum);


--
-- Name: IDX_8dcdd7fca3bc0ba922e66e6e63; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_8dcdd7fca3bc0ba922e66e6e63" ON "default".vne_mailtemplates USING btree (name);


--
-- Name: IDX_961714c023daa0f447930913e0; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_961714c023daa0f447930913e0" ON "default".vne_settings USING btree (p);


--
-- Name: IDX_d30ea31a6d19f1e5e6ab6aea97; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_d30ea31a6d19f1e5e6ab6aea97" ON "default".vne_employees USING btree (name);


--
-- Name: IDX_e4310c89c01b1e43dfa6772e01; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_e4310c89c01b1e43dfa6772e01" ON "default".vne_products USING btree (code);


--
-- Name: IDX_f7bb2db7292a4d084f6fa4da7f; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_f7bb2db7292a4d084f6fa4da7f" ON "default".vne_orders USING btree (created_at);


--
-- Name: vne_orders FK_048841240685197444cf83e1a94; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_048841240685197444cf83e1a94" FOREIGN KEY (table_id) REFERENCES "default".vne_tables(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vne_mailtemplate_translations FK_04dd42b567b276df508ea10d846; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "FK_04dd42b567b276df508ea10d846" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_employee_status_translations FK_0fddd42f52eb8aa644afef6ce0c; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_status_translations
    ADD CONSTRAINT "FK_0fddd42f52eb8aa644afef6ce0c" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_orders FK_1736aea497879ac29103cadbd9c; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_1736aea497879ac29103cadbd9c" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vne_transactions FK_176f7316fe69ff2ecff4dadc719; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_transactions
    ADD CONSTRAINT "FK_176f7316fe69ff2ecff4dadc719" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_words FK_1dadd9fef27716c045b163f7883; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_words
    ADD CONSTRAINT "FK_1dadd9fef27716c045b163f7883" FOREIGN KEY (wordbook_id) REFERENCES "default".vne_wordbooks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_word_translations FK_205f30e87780f40620664ec78eb; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_word_translations
    ADD CONSTRAINT "FK_205f30e87780f40620664ec78eb" FOREIGN KEY (word_id) REFERENCES "default".vne_words(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_product_images FK_4525d666b04e8390496065a6759; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_product_images
    ADD CONSTRAINT "FK_4525d666b04e8390496065a6759" FOREIGN KEY (product_id) REFERENCES "default".vne_products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_order_product_ingredients FK_467dcd9450ea032392c626ce08b; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_order_product_ingredients
    ADD CONSTRAINT "FK_467dcd9450ea032392c626ce08b" FOREIGN KEY (order_product_id) REFERENCES "default".vne_order_products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_admins FK_55d689227fb459994e546aa0293; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admins
    ADD CONSTRAINT "FK_55d689227fb459994e546aa0293" FOREIGN KEY (admingroup_id) REFERENCES "default".vne_admingroups(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vne_employee_status_translations FK_568aa4b75543a6152b15e117352; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_status_translations
    ADD CONSTRAINT "FK_568aa4b75543a6152b15e117352" FOREIGN KEY (employee_status_id) REFERENCES "default".vne_employee_statuses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_employees FK_60383ed5415c03ba84e5670d21b; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "FK_60383ed5415c03ba84e5670d21b" FOREIGN KEY (employee_status_id) REFERENCES "default".vne_employee_statuses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vne_halls FK_76a8663a8771558c69ef1e51fef; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_halls
    ADD CONSTRAINT "FK_76a8663a8771558c69ef1e51fef" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_cats FK_783fb2e5fce129fa4260d764e10; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_cats
    ADD CONSTRAINT "FK_783fb2e5fce129fa4260d764e10" FOREIGN KEY (icon_id) REFERENCES "default".vne_icons(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vne_orders FK_7a27dad3c45a791aff444fc4b11; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_7a27dad3c45a791aff444fc4b11" FOREIGN KEY (hall_id) REFERENCES "default".vne_halls(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vne_icon_translations FK_80244055d0c2bf40fdf02dd143a; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icon_translations
    ADD CONSTRAINT "FK_80244055d0c2bf40fdf02dd143a" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_icon_translations FK_8acb739beb6940c0a16ae1da22a; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icon_translations
    ADD CONSTRAINT "FK_8acb739beb6940c0a16ae1da22a" FOREIGN KEY (icon_id) REFERENCES "default".vne_icons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_mailtemplate_translations FK_967e7082c5cd07daaa63df4a36b; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "FK_967e7082c5cd07daaa63df4a36b" FOREIGN KEY (mailtemplate_id) REFERENCES "default".vne_mailtemplates(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_ingredients FK_a0bb80d16761c0e30d77ebec9e8; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_ingredients
    ADD CONSTRAINT "FK_a0bb80d16761c0e30d77ebec9e8" FOREIGN KEY (product_id) REFERENCES "default".vne_products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_products FK_a24a1d97f422df9a4ef6f858dac; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_products
    ADD CONSTRAINT "FK_a24a1d97f422df9a4ef6f858dac" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_employees FK_ab4672296c3f1ab805e0937a481; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "FK_ab4672296c3f1ab805e0937a481" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_orders FK_acded4671415971a908889aa27a; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_orders
    ADD CONSTRAINT "FK_acded4671415971a908889aa27a" FOREIGN KEY (employee_id) REFERENCES "default".vne_employees(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vne_restaurants FK_b4f2c8b3192294163738f730610; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "FK_b4f2c8b3192294163738f730610" FOREIGN KEY (currency_id) REFERENCES "default".vne_currencies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vne_serving_translations FK_ba0bb18061498374ba02a088f34; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_serving_translations
    ADD CONSTRAINT "FK_ba0bb18061498374ba02a088f34" FOREIGN KEY (serving_id) REFERENCES "default".vne_servings(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_order_products FK_c0a52d72eb2b7bd4c54824df211; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_order_products
    ADD CONSTRAINT "FK_c0a52d72eb2b7bd4c54824df211" FOREIGN KEY (serving_id) REFERENCES "default".vne_servings(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vne_word_translations FK_c7d449bf6c30c1b0c83af297543; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_word_translations
    ADD CONSTRAINT "FK_c7d449bf6c30c1b0c83af297543" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_order_products FK_d5451b74f20b52873ecc99c3a70; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_order_products
    ADD CONSTRAINT "FK_d5451b74f20b52873ecc99c3a70" FOREIGN KEY (order_id) REFERENCES "default".vne_orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_tables FK_d70db2be1204137303fa4cf72b4; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_tables
    ADD CONSTRAINT "FK_d70db2be1204137303fa4cf72b4" FOREIGN KEY (hall_id) REFERENCES "default".vne_halls(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_serving_translations FK_dd6d1111b8ab2c8ac36231e7c4d; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_serving_translations
    ADD CONSTRAINT "FK_dd6d1111b8ab2c8ac36231e7c4d" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_products FK_f080cc7f8507b209a6d54439a36; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_products
    ADD CONSTRAINT "FK_f080cc7f8507b209a6d54439a36" FOREIGN KEY (cat_id) REFERENCES "default".vne_cats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_cats FK_f25d1c7e725d240109b931ef530; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_cats
    ADD CONSTRAINT "FK_f25d1c7e725d240109b931ef530" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_restaurants FK_f8d32ea80f03240f3f3328a7374; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "FK_f8d32ea80f03240f3f3328a7374" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

