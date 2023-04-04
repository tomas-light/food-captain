
CREATE TABLE public.dimension (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.dimension OWNER TO postgres;

--
-- TOC entry 2977 (class 0 OID 0)
-- Dependencies: 197
-- Name: TABLE dimension; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.dimension IS 'В чем измеряются ингредиенты (кг, граммы, штуки, ложки, литры и т.д.)';


--
-- TOC entry 196 (class 1259 OID 38457)
-- Name: dimension_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dimension_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dimension_id_seq OWNER TO postgres;

--
-- TOC entry 2978 (class 0 OID 0)
-- Dependencies: 196
-- Name: dimension_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dimension_id_seq OWNED BY public.dimension.id;


--
-- TOC entry 199 (class 1259 OID 38465)
-- Name: dish; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dish (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    description text,
    image_id integer
);


ALTER TABLE public.dish OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 38463)
-- Name: dish_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dish_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dish_id_seq OWNER TO postgres;

--
-- TOC entry 2979 (class 0 OID 0)
-- Dependencies: 198
-- Name: dish_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dish_id_seq OWNED BY public.dish.id;


--
-- TOC entry 200 (class 1259 OID 38472)
-- Name: dish_in_menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dish_in_menu (
    menu_id integer NOT NULL,
    dish_id integer NOT NULL,
    order_number integer
);


ALTER TABLE public.dish_in_menu OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 38475)
-- Name: dish_in_set; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dish_in_set (
    dish_id integer NOT NULL,
    dish_set_id integer NOT NULL
);


ALTER TABLE public.dish_in_set OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 38480)
-- Name: dish_set; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dish_set (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    image_id integer
);


ALTER TABLE public.dish_set OWNER TO postgres;

--
-- TOC entry 2980 (class 0 OID 0)
-- Dependencies: 203
-- Name: TABLE dish_set; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.dish_set IS 'Условный набор блюд. \nзавтраки / обеды / ужины\nпостное / мясное / жирное / вегетарианское\nсупы / гарнир / второе';


--
-- TOC entry 202 (class 1259 OID 38478)
-- Name: dish_set_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dish_set_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dish_set_id_seq OWNER TO postgres;

--
-- TOC entry 2981 (class 0 OID 0)
-- Dependencies: 202
-- Name: dish_set_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dish_set_id_seq OWNED BY public.dish_set.id;


--
-- TOC entry 205 (class 1259 OID 38486)
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image (
    id integer NOT NULL,
    content text NOT NULL
);


ALTER TABLE public.image OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 38484)
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.image_id_seq OWNER TO postgres;

--
-- TOC entry 2982 (class 0 OID 0)
-- Dependencies: 204
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.image_id_seq OWNED BY public.image.id;


--
-- TOC entry 207 (class 1259 OID 38495)
-- Name: ingredient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient (
    id integer NOT NULL,
    name character varying(150),
    image_id integer
);


ALTER TABLE public.ingredient OWNER TO postgres;

--
-- TOC entry 2983 (class 0 OID 0)
-- Dependencies: 207
-- Name: TABLE ingredient; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.ingredient IS 'Ингредиент блюда. То, из чего формируется рецепт (соль, перец, курица и т.д.)';


--
-- TOC entry 206 (class 1259 OID 38493)
-- Name: ingredient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredient_id_seq OWNER TO postgres;

--
-- TOC entry 2984 (class 0 OID 0)
-- Dependencies: 206
-- Name: ingredient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredient_id_seq OWNED BY public.ingredient.id;


--
-- TOC entry 217 (class 1259 OID 38529)
-- Name: ingredient_in_recipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient_in_recipe (
    recipe_id integer NOT NULL,
    ingredient_id integer NOT NULL,
    dimension_id integer,
    size integer DEFAULT 0
);


ALTER TABLE public.ingredient_in_recipe OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 38499)
-- Name: ingredient_in_set; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient_in_set (
    ingredient_id integer NOT NULL,
    ingredient_set_id integer NOT NULL
);


ALTER TABLE public.ingredient_in_set OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 38504)
-- Name: ingredient_set; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient_set (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    image_id integer
);


ALTER TABLE public.ingredient_set OWNER TO postgres;

--
-- TOC entry 2985 (class 0 OID 0)
-- Dependencies: 210
-- Name: TABLE ingredient_set; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.ingredient_set IS 'фрукты / овощи \nсладкое / соленое\nмясо / птица';


--
-- TOC entry 209 (class 1259 OID 38502)
-- Name: ingredient_set_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredient_set_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredient_set_id_seq OWNER TO postgres;

--
-- TOC entry 2986 (class 0 OID 0)
-- Dependencies: 209
-- Name: ingredient_set_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredient_set_id_seq OWNED BY public.ingredient_set.id;


--
-- TOC entry 212 (class 1259 OID 38510)
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu (
    id integer NOT NULL,
    create_date date DEFAULT CURRENT_DATE NOT NULL,
    last_update date DEFAULT CURRENT_DATE NOT NULL,
    author_id integer,
    name character varying(200)
);


ALTER TABLE public.menu OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 38508)
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_id_seq OWNER TO postgres;

--
-- TOC entry 2987 (class 0 OID 0)
-- Dependencies: 211
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;


--
-- TOC entry 213 (class 1259 OID 38516)
-- Name: menu_in_schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu_in_schedule (
    schedule_id integer NOT NULL,
    menu_id integer NOT NULL,
    date date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.menu_in_schedule OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 38522)
-- Name: recipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe (
    id integer NOT NULL,
    name character varying(200),
    dish_id integer NOT NULL,
    image_id integer,
    description text
);


ALTER TABLE public.recipe OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 38520)
-- Name: recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipe_id_seq OWNER TO postgres;

--
-- TOC entry 2988 (class 0 OID 0)
-- Dependencies: 214
-- Name: recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipe_id_seq OWNED BY public.recipe.id;


--
-- TOC entry 216 (class 1259 OID 38526)
-- Name: recipe_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_image (
    recipe_id integer NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE public.recipe_image OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 38535)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 38533)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 2989 (class 0 OID 0)
-- Dependencies: 218
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 221 (class 1259 OID 38541)
-- Name: schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule (
    id integer NOT NULL,
    author_id integer,
    name character varying(200)
);


ALTER TABLE public.schedule OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 38539)
-- Name: schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedule_id_seq OWNER TO postgres;

--
-- TOC entry 2990 (class 0 OID 0)
-- Dependencies: 220
-- Name: schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedule_id_seq OWNED BY public.schedule.id;


--
-- TOC entry 223 (class 1259 OID 38547)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.user OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 38545)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 2991 (class 0 OID 0)
-- Dependencies: 222
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.user.id;


--
-- TOC entry 224 (class 1259 OID 38554)
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_role (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_role OWNER TO postgres;

--
-- TOC entry 2777 (class 2604 OID 38462)
-- Name: dimension id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dimension ALTER COLUMN id SET DEFAULT nextval('public.dimension_id_seq'::regclass);


--
-- TOC entry 2778 (class 2604 OID 38468)
-- Name: dish id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish ALTER COLUMN id SET DEFAULT nextval('public.dish_id_seq'::regclass);


--
-- TOC entry 2779 (class 2604 OID 38483)
-- Name: dish_set id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_set ALTER COLUMN id SET DEFAULT nextval('public.dish_set_id_seq'::regclass);


--
-- TOC entry 2780 (class 2604 OID 38489)
-- Name: image id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image ALTER COLUMN id SET DEFAULT nextval('public.image_id_seq'::regclass);


--
-- TOC entry 2781 (class 2604 OID 38498)
-- Name: ingredient id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient ALTER COLUMN id SET DEFAULT nextval('public.ingredient_id_seq'::regclass);


--
-- TOC entry 2782 (class 2604 OID 38507)
-- Name: ingredient_set id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_set ALTER COLUMN id SET DEFAULT nextval('public.ingredient_set_id_seq'::regclass);


--
-- TOC entry 2783 (class 2604 OID 38513)
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);


--
-- TOC entry 2787 (class 2604 OID 38525)
-- Name: recipe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe ALTER COLUMN id SET DEFAULT nextval('public.recipe_id_seq'::regclass);


--
-- TOC entry 2789 (class 2604 OID 38538)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 2790 (class 2604 OID 38544)
-- Name: schedule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule ALTER COLUMN id SET DEFAULT nextval('public.schedule_id_seq'::regclass);


--
-- TOC entry 2791 (class 2604 OID 38550)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2793 (class 2606 OID 38558)
-- Name: dimension pk_dimension_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dimension
    ADD CONSTRAINT pk_dimension_id PRIMARY KEY (id);


--
-- TOC entry 2795 (class 2606 OID 38560)
-- Name: dish pk_dish_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish
    ADD CONSTRAINT pk_dish_id PRIMARY KEY (id);


--
-- TOC entry 2801 (class 2606 OID 38562)
-- Name: dish_set pk_dish_set_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_set
    ADD CONSTRAINT pk_dish_set_id PRIMARY KEY (id);


--
-- TOC entry 2803 (class 2606 OID 38564)
-- Name: image pk_image_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT pk_image_id PRIMARY KEY (id);


--
-- TOC entry 2805 (class 2606 OID 38566)
-- Name: ingredient pk_ingredient_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT pk_ingredient_id PRIMARY KEY (id);


--
-- TOC entry 2809 (class 2606 OID 38568)
-- Name: ingredient_set pk_ingredient_set_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_set
    ADD CONSTRAINT pk_ingredient_set_id PRIMARY KEY (id);


--
-- TOC entry 2811 (class 2606 OID 38570)
-- Name: menu pk_menu_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT pk_menu_id PRIMARY KEY (id);


--
-- TOC entry 2815 (class 2606 OID 38572)
-- Name: recipe pk_recipe_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT pk_recipe_id PRIMARY KEY (id);


--
-- TOC entry 2819 (class 2606 OID 38574)
-- Name: ingredient_in_recipe pk_recipe_ingredient; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_in_recipe
    ADD CONSTRAINT pk_recipe_ingredient PRIMARY KEY (recipe_id, ingredient_id);


--
-- TOC entry 2823 (class 2606 OID 38576)
-- Name: schedule pk_schedule_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT pk_schedule_id PRIMARY KEY (id);


--
-- TOC entry 2825 (class 2606 OID 38578)
-- Name: user pk_tbl_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user
    ADD CONSTRAINT pk_tbl_id PRIMARY KEY (id);


--
-- TOC entry 2821 (class 2606 OID 38580)
-- Name: role pk_tbl_id_0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT pk_tbl_id_0 PRIMARY KEY (id);


--
-- TOC entry 2827 (class 2606 OID 38582)
-- Name: user_role pk_user_role; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT pk_user_role PRIMARY KEY (user_id, role_id);


--
-- TOC entry 2799 (class 2606 OID 38584)
-- Name: dish_in_set unq_disehs_in_set; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_in_set
    ADD CONSTRAINT unq_disehs_in_set UNIQUE (dish_id, dish_set_id);


--
-- TOC entry 2797 (class 2606 OID 38586)
-- Name: dish_in_menu unq_dish_in_menu; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_in_menu
    ADD CONSTRAINT unq_dish_in_menu UNIQUE (menu_id, dish_id, order_number);


--
-- TOC entry 2807 (class 2606 OID 38588)
-- Name: ingredient_in_set unq_ingredient_in_set; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_in_set
    ADD CONSTRAINT unq_ingredient_in_set UNIQUE (ingredient_id, ingredient_set_id);


--
-- TOC entry 2813 (class 2606 OID 38590)
-- Name: menu_in_schedule unq_menu_in_schedule; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_in_schedule
    ADD CONSTRAINT unq_menu_in_schedule UNIQUE (schedule_id, menu_id, date);


--
-- TOC entry 2817 (class 2606 OID 38592)
-- Name: recipe_image unq_recipe_image; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_image
    ADD CONSTRAINT unq_recipe_image UNIQUE (recipe_id, image_id);


--
-- TOC entry 2831 (class 2606 OID 38593)
-- Name: dish_in_set fk_disehs_in_set_dish; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_in_set
    ADD CONSTRAINT fk_disehs_in_set_dish FOREIGN KEY (dish_id) REFERENCES public.dish(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2832 (class 2606 OID 38598)
-- Name: dish_in_set fk_disehs_in_set_dish_set; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_in_set
    ADD CONSTRAINT fk_disehs_in_set_dish_set FOREIGN KEY (dish_set_id) REFERENCES public.dish_set(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2828 (class 2606 OID 38603)
-- Name: dish fk_dish_image; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish
    ADD CONSTRAINT fk_dish_image FOREIGN KEY (image_id) REFERENCES public.image(id) ON DELETE SET NULL;


--
-- TOC entry 2829 (class 2606 OID 38608)
-- Name: dish_in_menu fk_dish_in_menu_dish; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_in_menu
    ADD CONSTRAINT fk_dish_in_menu_dish FOREIGN KEY (dish_id) REFERENCES public.dish(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2830 (class 2606 OID 38613)
-- Name: dish_in_menu fk_dish_in_menu_menu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_in_menu
    ADD CONSTRAINT fk_dish_in_menu_menu FOREIGN KEY (menu_id) REFERENCES public.menu(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2833 (class 2606 OID 38618)
-- Name: dish_set fk_dish_set_image; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_set
    ADD CONSTRAINT fk_dish_set_image FOREIGN KEY (image_id) REFERENCES public.image(id) ON DELETE SET NULL;


--
-- TOC entry 2834 (class 2606 OID 38623)
-- Name: ingredient fk_ingredient_image; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT fk_ingredient_image FOREIGN KEY (image_id) REFERENCES public.image(id) ON DELETE SET NULL;


--
-- TOC entry 2835 (class 2606 OID 38628)
-- Name: ingredient_in_set fk_ingredient_in_set_ingredient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_in_set
    ADD CONSTRAINT fk_ingredient_in_set_ingredient FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2836 (class 2606 OID 38633)
-- Name: ingredient_in_set fk_ingredient_in_set_ingredient_set; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_in_set
    ADD CONSTRAINT fk_ingredient_in_set_ingredient_set FOREIGN KEY (ingredient_set_id) REFERENCES public.ingredient_set(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2837 (class 2606 OID 38638)
-- Name: ingredient_set fk_ingredient_set_image; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_set
    ADD CONSTRAINT fk_ingredient_set_image FOREIGN KEY (image_id) REFERENCES public.image(id) ON DELETE SET NULL;


--
-- TOC entry 2839 (class 2606 OID 38643)
-- Name: menu_in_schedule fk_menu_in_schedule_menu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_in_schedule
    ADD CONSTRAINT fk_menu_in_schedule_menu FOREIGN KEY (menu_id) REFERENCES public.menu(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2840 (class 2606 OID 38648)
-- Name: menu_in_schedule fk_menu_in_schedule_schedule; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_in_schedule
    ADD CONSTRAINT fk_menu_in_schedule_schedule FOREIGN KEY (schedule_id) REFERENCES public.schedule(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2838 (class 2606 OID 38653)
-- Name: menu fk_menu_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT fk_menu_user FOREIGN KEY (author_id) REFERENCES public.user(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- TOC entry 2841 (class 2606 OID 38658)
-- Name: recipe fk_recipe_dish; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT fk_recipe_dish FOREIGN KEY (dish_id) REFERENCES public.dish(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2842 (class 2606 OID 38704)
-- Name: recipe fk_recipe_image; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT fk_recipe_image FOREIGN KEY (image_id) REFERENCES public.image(id);


--
-- TOC entry 2843 (class 2606 OID 38663)
-- Name: recipe_image fk_recipe_image_image; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_image
    ADD CONSTRAINT fk_recipe_image_image FOREIGN KEY (image_id) REFERENCES public.image(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2844 (class 2606 OID 38668)
-- Name: recipe_image fk_recipe_image_recipe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_image
    ADD CONSTRAINT fk_recipe_image_recipe FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2845 (class 2606 OID 38673)
-- Name: ingredient_in_recipe fk_recipe_ingredient_dimension; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_in_recipe
    ADD CONSTRAINT fk_recipe_ingredient_dimension FOREIGN KEY (dimension_id) REFERENCES public.dimension(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2846 (class 2606 OID 38678)
-- Name: ingredient_in_recipe fk_recipe_ingredient_ingredient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_in_recipe
    ADD CONSTRAINT fk_recipe_ingredient_ingredient FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2847 (class 2606 OID 38683)
-- Name: ingredient_in_recipe fk_recipe_ingredient_recipe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_in_recipe
    ADD CONSTRAINT fk_recipe_ingredient_recipe FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2848 (class 2606 OID 38688)
-- Name: schedule fk_schedule_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT fk_schedule_user FOREIGN KEY (author_id) REFERENCES public.user(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2849 (class 2606 OID 38693)
-- Name: user_role fk_user_role_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT fk_user_role_role FOREIGN KEY (role_id) REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2850 (class 2606 OID 38698)
-- Name: user_role fk_user_role_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT fk_user_role_user FOREIGN KEY (user_id) REFERENCES public.user(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2021-02-27 14:39:23

--
-- PostgreSQL database dump complete
--

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
