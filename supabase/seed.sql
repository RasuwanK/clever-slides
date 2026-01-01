SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict uyddEahLQbbtgaj27xH9NCy3h9sg8NIr7jbcBjcCWZHRNySubMtiUi5Ah5Mbihb

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('0134878e-48d0-4585-a367-2da3e498bda4', NULL, 'b99c4d7d-45fc-41c2-b564-5694318725ee', 's256', 'WnMJWy-flaSklmo9nFnlvlLaFTul60_oV1sXaoxgGR8', 'google', '', '', '2025-12-19 07:48:46.301577+00', '2025-12-19 07:48:46.301577+00', 'oauth', NULL),
	('3ca35c82-2dff-4e17-a9a9-fc9533a8a0fe', NULL, 'c5e6f6e4-2ec8-4dc5-93d3-4b52bea22f18', 's256', 'WjEJcJ4QLynAovviOaJP2BVqoIYte4gu3BkVFXCL-dU', 'google', '', '', '2025-12-19 07:50:02.749408+00', '2025-12-19 07:50:02.749408+00', 'oauth', NULL),
	('0c1d1f22-6b38-4dbc-a01a-e9c5c9512374', NULL, '586ec6d7-a82a-4d0a-b281-700b4cac01df', 's256', 'Tm8cgFCwsSRne8MEgCa6lgbiQ8go1rnc3HTT2djbnb4', 'google', '', '', '2025-12-19 07:50:34.976078+00', '2025-12-19 07:50:34.976078+00', 'oauth', NULL),
	('5485728e-4a74-4b11-a400-10ecffc25add', NULL, '167e20d0-e523-45cf-aa05-3f064b0d6cc3', 's256', 'CrhvnPyePxcbguIA8XiwKcvnxNPOLH7vNFbQWXNZRPU', 'google', '', '', '2025-12-19 07:52:32.842981+00', '2025-12-19 07:52:32.842981+00', 'oauth', NULL),
	('b51bd48e-f49e-4a82-9888-6ceb187ed93c', NULL, '1c53b0db-43f3-4ea8-844a-f5970b59f1b6', 's256', 'A5dg4kxDhCzxK-OfEVjfCIxl_WRxCb8y2H-xb0m9op8', 'google', '', '', '2025-12-19 07:53:22.447671+00', '2025-12-19 07:53:22.447671+00', 'oauth', NULL),
	('18909f41-9dba-4bf2-bbbe-62d245133397', NULL, 'c51d89ed-5e8e-4060-9c72-b3334d979401', 's256', 'lvpkJQp9af6W77oMMvZ_BaVPFZqj_OdSY9-1OkTwmeI', 'google', '', '', '2025-12-19 07:55:19.564042+00', '2025-12-19 07:55:19.564042+00', 'oauth', NULL),
	('4bdc983f-4be6-4460-bed5-73d68e557a74', NULL, '8c2c98fb-0e6a-4e59-8737-8f0ea188b10d', 's256', 'jnw5uS8E66XTAGI9dbMbU_89QTQRAanfJLvhT3lopcM', 'google', '', '', '2025-12-19 07:57:40.621+00', '2025-12-19 07:57:40.621+00', 'oauth', NULL),
	('b2927796-e51e-4851-b3e7-c429f992284f', NULL, 'bb94abf3-f384-49b7-9962-6b7b91da8570', 's256', 'ykgjURmnzHKLKirwA92WvLvVWdzRbuoYfdEnHtgZ9cE', 'google', '', '', '2025-12-19 07:58:24.993536+00', '2025-12-19 07:58:24.993536+00', 'oauth', NULL),
	('49224504-7769-4afb-a67e-3b7d2cfe1996', NULL, '26bd9df3-4ab5-4b24-baa1-0ce5c63af963', 's256', 'E-pfedmKVnuyfGX9toMd3-khYzynPyaEQ7gKef1zpm8', 'google', '', '', '2025-12-19 08:02:33.940388+00', '2025-12-19 08:02:33.940388+00', 'oauth', NULL),
	('a0107520-bee0-4837-ae4e-c60078977e20', NULL, '84eecf10-d95e-42ea-975e-35e9e0b7e722', 's256', '58eGCC2qzKPsHr_9REBylrBxDWpTRiHEEKKDkW4avOM', 'google', '', '', '2025-12-19 08:15:23.971552+00', '2025-12-19 08:15:23.971552+00', 'oauth', NULL),
	('eb6eaf51-e7e6-4c2d-a5ad-b1f03a091572', NULL, 'c238639f-ba0b-43a5-93c9-1caff39261a0', 's256', 'e4FqCTYqttntIbRKfBpasLBViR5tHEoEm-R2lks_nQk', 'google', '', '', '2025-12-19 09:03:13.599911+00', '2025-12-19 09:03:13.599911+00', 'oauth', NULL),
	('b05365bd-f205-49a4-a407-ccc43f9b772e', '40aac989-b0ce-43af-a995-60dd7e46d4c1', 'e2c3028d-1e4e-4f07-b4cf-22032aece8cd', 's256', 'Ob-JfsYKTIzWCgsLmgxlQ0fYg4GOKccPEh-bntnTBgk', 'email', '', '', '2025-12-21 19:11:01.846213+00', '2025-12-21 19:11:01.846213+00', 'email/signup', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '67a19abd-8743-4afd-a591-e373b3274c46', 'authenticated', 'authenticated', 'kalharaweragala@gmail.com', NULL, '2025-12-19 08:22:07.407275+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-22 06:46:15.756969+00', '{"provider": "google", "providers": ["google"]}', '{"iss": "https://accounts.google.com", "sub": "102784041904108937184", "name": "Rasuwan Kalhara", "email": "kalharaweragala@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKPtsHzJXlV_QIZHGimBHMBWk4CP7ag3JPaJCyKxd1QA713eh-e=s96-c", "full_name": "Rasuwan Kalhara", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKPtsHzJXlV_QIZHGimBHMBWk4CP7ag3JPaJCyKxd1QA713eh-e=s96-c", "provider_id": "102784041904108937184", "email_verified": true, "phone_verified": false}', NULL, '2025-12-19 08:22:07.36973+00', '2025-12-22 06:46:15.790552+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '40aac989-b0ce-43af-a995-60dd7e46d4c1', 'authenticated', 'authenticated', 'rasuwankalhara@aiesec.net', '$2a$10$eKmsQ1njRTVdq5T.l51deOHfMb2ZND41skQZU9J6RpZMy.cNLelZS', NULL, NULL, 'pkce_da1ddd963c108cfa92270f38ce43702c2fe56b830ba917a360e6b144', '2025-12-21 19:11:01.86559+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "40aac989-b0ce-43af-a995-60dd7e46d4c1", "email": "rasuwankalhara@aiesec.net", "email_verified": false, "phone_verified": false}', NULL, '2025-12-21 19:11:01.805471+00', '2025-12-21 19:11:04.643002+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('40aac989-b0ce-43af-a995-60dd7e46d4c1', '40aac989-b0ce-43af-a995-60dd7e46d4c1', '{"sub": "40aac989-b0ce-43af-a995-60dd7e46d4c1", "email": "rasuwankalhara@aiesec.net", "email_verified": false, "phone_verified": false}', 'email', '2025-12-21 19:11:01.837093+00', '2025-12-21 19:11:01.837159+00', '2025-12-21 19:11:01.837159+00', '40aa1daf-a3c3-44fb-a9e7-8422582a1b9b'),
	('102784041904108937184', '67a19abd-8743-4afd-a591-e373b3274c46', '{"iss": "https://accounts.google.com", "sub": "102784041904108937184", "name": "Rasuwan Kalhara", "email": "kalharaweragala@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKPtsHzJXlV_QIZHGimBHMBWk4CP7ag3JPaJCyKxd1QA713eh-e=s96-c", "full_name": "Rasuwan Kalhara", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKPtsHzJXlV_QIZHGimBHMBWk4CP7ag3JPaJCyKxd1QA713eh-e=s96-c", "provider_id": "102784041904108937184", "email_verified": true, "phone_verified": false}', 'google', '2025-12-19 08:22:07.39638+00', '2025-12-19 08:22:07.397188+00', '2025-12-22 06:46:14.812176+00', 'a40d8d16-963e-492a-8a1c-b7a019114077');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('7949aba2-97cb-455d-9679-42181869274a', '40aac989-b0ce-43af-a995-60dd7e46d4c1', 'confirmation_token', 'pkce_da1ddd963c108cfa92270f38ce43702c2fe56b830ba917a360e6b144', 'rasuwankalhara@aiesec.net', '2025-12-21 19:11:04.652115', '2025-12-21 19:11:04.652115');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--


--
-- Data for Name: Presentation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 27, true);


-- custom seed
SET session_replication_role = replica;

-- ==============================
-- PUBLIC.ACCOUNT
-- ==============================
INSERT INTO public."Account" (
  id,
  first_name,
  last_name,
  country,
  institution
) VALUES (
  '67a19abd-8743-4afd-a591-e373b3274c46',
  'Rasuwan',
  'Kalhara',
  'Sri Lanka',
  'University of Sri Jayewardenepura'
);

-- ==============================
-- PUBLIC.PRESENTATION (FULL)
-- ==============================
INSERT INTO public."Presentation" (
  id,
  created_by,
  prompt,
  content,
  theme,
  status
) VALUES (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '67a19abd-8743-4afd-a591-e373b3274c46',
  'Explain machine learning to beginners',
  '{
    "theme": {
      "accentColor": "#6366f1",
      "background": "light"
    },
    "slides": [
      {
        "layout": "title_center",
        "title": "What is Machine Learning?",
        "bullets": [
          "A subset of Artificial Intelligence",
          "Learns from data",
          "Improves over time"
        ]
      },
      {
        "layout": "bullets_left",
        "title": "Why it matters",
        "bullets": [
          "Automation",
          "Predictions",
          "Personalization"
        ]
      }
    ]
  }'::json,
  '{
    "accentColor": "#6366f1",
    "background": "light"
  }'::json,
  'draft'
);

-- ==============================
-- PUBLIC.PRESENTATION (DRAFT)
-- ==============================
INSERT INTO public."Presentation" (
  created_by,
  prompt,
  status
) VALUES (
  '67a19abd-8743-4afd-a591-e373b3274c46',
  'Create a research presentation on quantum computing',
  'draft'
);

-- ==============================
-- PUBLIC.PRESENTATION (SOFT-DELETED)
-- ==============================
INSERT INTO public."Presentation" (
  created_by,
  prompt,
  is_deleted,
  status
) VALUES (
  '67a19abd-8743-4afd-a591-e373b3274c46',
  'Old deleted presentation',
  true,
  'draft'
);

RESET session_replication_role;


--
-- PostgreSQL database dump complete
--

-- \unrestrict uyddEahLQbbtgaj27xH9NCy3h9sg8NIr7jbcBjcCWZHRNySubMtiUi5Ah5Mbihb

RESET ALL;
