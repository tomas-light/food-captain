INSERT INTO public.dimension (id, name)
VALUES
    (1,	'килограмм'),
    (2,	'грамм'),
    (3,	'штука'),
    (4,	'литр'),
    (5,	'столовая ложка'),
    (6,	'чайная ложка'),
    (7,	'щепотка')
;

INSERT INTO public.role (id, name)
VALUES
    (1,	'admin'),
    (2,	'user'),
    (3,	'guest')
;

INSERT INTO public.user (id, name, email, password)
VALUES
    (1,	'Артём Игнатьев', 'artem@fc.com', 'Qwerty!234')
;

INSERT INTO public.user_role (user_id, role_id)
VALUES
    (1,	1)
;
