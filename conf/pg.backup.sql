--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8
-- Dumped by pg_dump version 13.4

-- Started on 2022-01-29 03:30:46 CET

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
-- TOC entry 208 (class 1255 OID 1414029)
-- Name: truncate_tables(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.truncate_tables() RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
   EXECUTE
   (SELECT 'TRUNCATE TABLE ' || string_agg(oid::regclass::text, ', ') || ' RESTART IDENTITY CASCADE'
    FROM pg_class
    WHERE relkind = 'r'
    AND relnamespace = 'public'::regnamespace
    AND oid::regclass::text NOT IN ('address_city',
                                    'address_country',
                                    'geolite2',
                                    'bank',
                                    'bank_agency'
                                   )
   );
END
$$;


ALTER FUNCTION public.truncate_tables() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 1327736)
-- Name: duel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.duel (
    did integer NOT NULL,
    status character varying,
    created_on time with time zone NOT NULL,
    updated_on time with time zone NOT NULL,
    ended_on time with time zone,
    invitation_iid integer NOT NULL
);


ALTER TABLE public.duel OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 1414027)
-- Name: duel_did_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.duel ALTER COLUMN did ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.duel_did_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 203 (class 1259 OID 1327709)
-- Name: invitation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invitation (
    iid integer NOT NULL,
    status character varying,
    created_on timestamp with time zone NOT NULL,
    ended_on timestamp with time zone
);


ALTER TABLE public.invitation OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 1327701)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    uid integer NOT NULL,
    username character varying NOT NULL,
    rank bigint NOT NULL,
    extref_id character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 1327717)
-- Name: user_has_invitation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_has_invitation (
    user_uid integer NOT NULL,
    invitation_iid integer NOT NULL,
    is_owner boolean
);


ALTER TABLE public.user_has_invitation OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 1414025)
-- Name: user_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN uid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_uid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3215 (class 0 OID 1327736)
-- Dependencies: 205
-- Data for Name: duel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.duel (did, status, created_on, updated_on, ended_on, invitation_iid) FROM stdin;
\.


--
-- TOC entry 3213 (class 0 OID 1327709)
-- Dependencies: 203
-- Data for Name: invitation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invitation (iid, status, created_on, ended_on) FROM stdin;
\.


--
-- TOC entry 3212 (class 0 OID 1327701)
-- Dependencies: 202
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (uid, username, rank, extref_id) FROM stdin;
2	Acri	1	<@!226722927838625792>
\.


--
-- TOC entry 3214 (class 0 OID 1327717)
-- Dependencies: 204
-- Data for Name: user_has_invitation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_has_invitation (user_uid, invitation_iid, is_owner) FROM stdin;
\.


--
-- TOC entry 3228 (class 0 OID 0)
-- Dependencies: 207
-- Name: duel_did_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.duel_did_seq', 1, false);


--
-- TOC entry 3229 (class 0 OID 0)
-- Dependencies: 206
-- Name: user_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_uid_seq', 2, true);


--
-- TOC entry 3078 (class 2606 OID 1327716)
-- Name: invitation INVITATION_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitation
    ADD CONSTRAINT "INVITATION_pkey" PRIMARY KEY (iid);


--
-- TOC entry 3082 (class 2606 OID 1327743)
-- Name: duel duel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duel
    ADD CONSTRAINT duel_pkey PRIMARY KEY (did);


--
-- TOC entry 3080 (class 2606 OID 1414014)
-- Name: user_has_invitation user_has_invitation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_has_invitation
    ADD CONSTRAINT user_has_invitation_pkey PRIMARY KEY (invitation_iid, user_uid);


--
-- TOC entry 3076 (class 2606 OID 1327708)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (uid);


--
-- TOC entry 3085 (class 2606 OID 1414008)
-- Name: duel Ref_duel_to_invitation; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duel
    ADD CONSTRAINT "Ref_duel_to_invitation" FOREIGN KEY (invitation_iid) REFERENCES public.invitation(iid);


--
-- TOC entry 3084 (class 2606 OID 1414020)
-- Name: user_has_invitation Ref_user_has_invitation_to_invitation; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_has_invitation
    ADD CONSTRAINT "Ref_user_has_invitation_to_invitation" FOREIGN KEY (invitation_iid) REFERENCES public.invitation(iid);


--
-- TOC entry 3083 (class 2606 OID 1414015)
-- Name: user_has_invitation Ref_user_has_invitation_to_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_has_invitation
    ADD CONSTRAINT "Ref_user_has_invitation_to_user" FOREIGN KEY (user_uid) REFERENCES public."user"(uid);


--
-- TOC entry 3223 (class 0 OID 0)
-- Dependencies: 208
-- Name: FUNCTION truncate_tables(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.truncate_tables() TO "Dev" WITH GRANT OPTION;


--
-- TOC entry 3224 (class 0 OID 0)
-- Dependencies: 205
-- Name: TABLE duel; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.duel TO "Dev" WITH GRANT OPTION;


--
-- TOC entry 3225 (class 0 OID 0)
-- Dependencies: 203
-- Name: TABLE invitation; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.invitation TO "Dev" WITH GRANT OPTION;


--
-- TOC entry 3226 (class 0 OID 0)
-- Dependencies: 202
-- Name: TABLE "user"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."user" TO "Dev" WITH GRANT OPTION;


--
-- TOC entry 3227 (class 0 OID 0)
-- Dependencies: 204
-- Name: TABLE user_has_invitation; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_has_invitation TO "Dev" WITH GRANT OPTION;


-- Completed on 2022-01-29 03:30:46 CET

--
-- PostgreSQL database dump complete
--

