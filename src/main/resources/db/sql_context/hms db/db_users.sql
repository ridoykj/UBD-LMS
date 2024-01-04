 create table t_per_person (
    id_person_key bigint not null primary key,
    id_person_ver bigint,
	given_name varchar(128),
    additional_name varchar(64),
    family_name varchar(64),
    alternate_name varchar(64),
    birth_date date,
    death_date date,
	ref_person  json, --{"parent,children,colleague,knows,spouse,sibling"}
	follows  json,
	has_occupation  bit,
	honorific_prefix     varchar(8)       ,
	honorific_suffix     varchar(8)       ,
	knows_language     json , -- {bangla,english}
	nationality     json , -- {bangladesh,unitied states of america}
	sponsor     json , -- {person,organization}
	description     json , -- {documantry,biography}
    created_at timestamp default current_timestamp,
    updated_at timestamp default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
);

create table t_per_medical (
    id bigint not null auto_increment primary key,
    id_person_key bigint not null,
    address varchar(255),
    birth_place varchar(255),
    death_place varchar(255),
    weight varchar(255),
	height decimal(5,3),
	children             bigint       ,
	gender enum('male','female','transgender','others') default 'others' not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table t_per_address (
    id bigint not null auto_increment primary key,
    id_person_key bigint not null,
    address varchar(255),
    birth_place varchar(255),
    death_place varchar(255),
    home_location varchar(255),
    present_address varchar(255),
    permanent_address varchar(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table t_per_contact (
    id bigint not null auto_increment primary key,
    id_person_key bigint not null,
    email json,
    phone json, -- {home,fax,work}
    telephone json, -- {home,fax,work}
    fax_number json, -- {home,fax,work}
    contact_point bigint,
    web_profile    json , -- {facebook,website}
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table t_per_occupation (
    id bigint not null auto_increment primary key,
    id_person_key bigint not null,
    records json,  -- {job_title,job_description,job_location,job_start_date,job_end_date,job_employer,job_employment_type,job_industry,job_salary}
    has_occupation varchar(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table t_per_document_records (
    id bigint not null auto_increment primary key,
    id_person_key bigint not null,
    records json, -- {birth_certificate,driving_licence,death_certificate,tax_certificate,education_certificate}
    education_records json, -- {ssc,hsc,bsc,msc,phd}
    national_records json, -- {nid,passport,tax,driving_licence,tin,trade_licence,trade_mark,trade_certificate}
    medical_records json, -- {birth_certificate,blood_group,medical_certificate,death_certificate,health_insurance}
    reward_records json, -- {award_certificate,award_letter,award_medal}
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table t_user (
    id bigint not null auto_increment primary key,
    username varchar(255) not null unique,
    password varchar(255) not null,
    primary_phone varchar(64),
    primary_email varchar(128),
    roles json,
    permissions json,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table t_roles (
    id bigint not null auto_increment primary key,
    name varchar(255) not null unique,
    description varchar(255),
    permissions json,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);
