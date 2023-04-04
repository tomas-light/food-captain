INSERT INTO public.dimension (id, name)
VALUES
    (1,	'test')
;


INSERT INTO public.image (id, content)
VALUES
    (5,	'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636')
;


INSERT INTO public.dish (id, name, description, image_id)
VALUES
    (1,	'dish 1',	'description 12',	5),
    (3,	'dish 3',	'description 3',	null),
    (4,	'dish 4',	'description 4',	null),
    (5,	'dish 5',	'description 5',	null),
    (6,	'dish 6',	'description 6',	null)
;


INSERT INTO public.menu (id, create_date, last_update, author_id, name)
VALUES
    (1,	'2021-02-24',	'2021-02-24',	null,	'menu 1'),
    (2,	'2021-02-24',	'2021-02-24',	null,	'menu 2')
;


INSERT INTO public.dish_in_menu (menu_id, dish_id, order_number)
VALUES
    (1,	4,	null),
    (1,	5,	null),
    (2,	4,	null),
    (2,	6,	null)
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
