--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8
-- Dumped by pg_dump version 13.4

-- Started on 2022-02-06 15:52:04 CET

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
-- TOC entry 210 (class 1255 OID 1575245)
-- Name: fn_user_create(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_user_create() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN

INSERT INTO public.user_rank
(user_uid, rank)
	SELECT uid, uid FROM NEW;

RETURN NEW;
END;
$$;


ALTER FUNCTION public.fn_user_create() OWNER TO postgres;

--
-- TOC entry 209 (class 1255 OID 1414029)
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
    discriminator character varying NOT NULL,
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
-- TOC entry 208 (class 1259 OID 1575199)
-- Name: user_rank; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_rank (
    user_uid integer NOT NULL,
    rank bigint NOT NULL
);


ALTER TABLE public.user_rank OWNER TO postgres;

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
-- TOC entry 3230 (class 0 OID 1327736)
-- Dependencies: 205
-- Data for Name: duel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.duel (did, status, created_on, updated_on, ended_on, invitation_iid) FROM stdin;
\.


--
-- TOC entry 3228 (class 0 OID 1327709)
-- Dependencies: 203
-- Data for Name: invitation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invitation (iid, status, created_on, ended_on) FROM stdin;
\.


--
-- TOC entry 3227 (class 0 OID 1327701)
-- Dependencies: 202
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (uid, username, discriminator, extref_id) FROM stdin;
\.


--
-- TOC entry 3229 (class 0 OID 1327717)
-- Dependencies: 204
-- Data for Name: user_has_invitation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_has_invitation (user_uid, invitation_iid, is_owner) FROM stdin;
\.


--
-- TOC entry 3233 (class 0 OID 1575199)
-- Dependencies: 208
-- Data for Name: user_rank; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_rank (user_uid, rank) FROM stdin;
\.


--
-- TOC entry 3245 (class 0 OID 0)
-- Dependencies: 207
-- Name: duel_did_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.duel_did_seq', 1, false);


--
-- TOC entry 3246 (class 0 OID 0)
-- Dependencies: 206
-- Name: user_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_uid_seq', 1, true);


--
-- TOC entry 3091 (class 2606 OID 1327743)
-- Name: duel duel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duel
    ADD CONSTRAINT duel_pkey PRIMARY KEY (did);


--
-- TOC entry 3087 (class 2606 OID 1327716)
-- Name: invitation invitation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitation
    ADD CONSTRAINT invitation_pkey PRIMARY KEY (iid);


--
-- TOC entry 3081 (class 2606 OID 1575214)
-- Name: user unique_extref_id_on_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_extref_id_on_user UNIQUE (extref_id);


--
-- TOC entry 3093 (class 2606 OID 1414528)
-- Name: duel unique_invitation_iid_on_duel; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duel
    ADD CONSTRAINT unique_invitation_iid_on_duel UNIQUE (invitation_iid);


--
-- TOC entry 3095 (class 2606 OID 1575205)
-- Name: user_rank unique_rank_on_user_rank; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_rank
    ADD CONSTRAINT unique_rank_on_user_rank UNIQUE (rank);


--
-- TOC entry 3083 (class 2606 OID 1414526)
-- Name: user unique_username_and_discriminator_on_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_username_and_discriminator_on_user UNIQUE (username, discriminator);


--
-- TOC entry 3089 (class 2606 OID 1414014)
-- Name: user_has_invitation user_has_invitation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_has_invitation
    ADD CONSTRAINT user_has_invitation_pkey PRIMARY KEY (invitation_iid, user_uid);


--
-- TOC entry 3085 (class 2606 OID 1327708)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (uid);


--
-- TOC entry 3100 (class 2620 OID 1575246)
-- Name: user tai_user_create; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tai_user_create AFTER INSERT ON public."user" FOR EACH ROW EXECUTE FUNCTION public.fn_user_create();


--
-- TOC entry 3098 (class 2606 OID 1414008)
-- Name: duel Ref_duel_to_invitation; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duel
    ADD CONSTRAINT "Ref_duel_to_invitation" FOREIGN KEY (invitation_iid) REFERENCES public.invitation(iid);


--
-- TOC entry 3097 (class 2606 OID 1414020)
-- Name: user_has_invitation Ref_user_has_invitation_to_invitation; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_has_invitation
    ADD CONSTRAINT "Ref_user_has_invitation_to_invitation" FOREIGN KEY (invitation_iid) REFERENCES public.invitation(iid);


--
-- TOC entry 3096 (class 2606 OID 1414015)
-- Name: user_has_invitation Ref_user_has_invitation_to_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_has_invitation
    ADD CONSTRAINT "Ref_user_has_invitation_to_user" FOREIGN KEY (user_uid) REFERENCES public."user"(uid);


--
-- TOC entry 3099 (class 2606 OID 1575206)
-- Name: user_rank Ref_user_rank_to_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_rank
    ADD CONSTRAINT "Ref_user_rank_to_user" FOREIGN KEY (user_uid) REFERENCES public."user"(uid);


--
-- TOC entry 3239 (class 0 OID 0)
-- Dependencies: 209
-- Name: FUNCTION truncate_tables(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.truncate_tables() TO "Dev" WITH GRANT OPTION;


--
-- TOC entry 3240 (class 0 OID 0)
-- Dependencies: 205
-- Name: TABLE duel; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.duel TO "Dev" WITH GRANT OPTION;


--
-- TOC entry 3241 (class 0 OID 0)
-- Dependencies: 203
-- Name: TABLE invitation; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.invitation TO "Dev" WITH GRANT OPTION;


--
-- TOC entry 3242 (class 0 OID 0)
-- Dependencies: 202
-- Name: TABLE "user"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."user" TO "Dev" WITH GRANT OPTION;


--
-- TOC entry 3243 (class 0 OID 0)
-- Dependencies: 204
-- Name: TABLE user_has_invitation; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_has_invitation TO "Dev" WITH GRANT OPTION;


--
-- TOC entry 3244 (class 0 OID 0)
-- Dependencies: 208
-- Name: TABLE user_rank; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_rank TO "Dev" WITH GRANT OPTION;


-- Completed on 2022-02-06 15:52:04 CET

--
-- PostgreSQL database dump complete
--

