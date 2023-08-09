CREATE TABLE public.roles (
	id serial4 NOT NULL,
	"name" varchar(20) NOT NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (id)
);

INSERT INTO public.roles (name) VALUES ('ROLE_USER');

CREATE TABLE public.usuario (
	id serial4 NOT NULL,
	"password" varchar(120) NOT NULL,
	username varchar(255) NOT NULL,
	CONSTRAINT usuario_pkey PRIMARY KEY (id)
);

CREATE TABLE public.user_roles (
	user_id int4 NOT NULL,
	role_id int4 NOT NULL,
	CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id)
);

ALTER TABLE public.user_roles ADD CONSTRAINT fk6hdcxig28sjux082ekdae5wnj FOREIGN KEY (user_id) REFERENCES public.usuario(id);
ALTER TABLE public.user_roles ADD CONSTRAINT fk6hdcxig28sjux082ekd4324nj FOREIGN KEY (role_id) REFERENCES public.roles(id);

CREATE TABLE public.skills (
	id serial4 NOT NULL,
	descricao varchar(255) NULL,
	"level" int4 NULL,
	nome varchar(255) NULL,
	url_img varchar(255) NULL,
	usuario int4 NOT NULL,
	CONSTRAINT skills_pkey PRIMARY KEY (id)
);

ALTER TABLE public.skills ADD CONSTRAINT fkasmv5q8xylyqodq6492efjunl FOREIGN KEY (usuario) REFERENCES public.usuario(id);
