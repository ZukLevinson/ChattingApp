DROP SCHEMA IF EXISTS chatting CASCADE;
CREATE SCHEMA chatting;

CREATE TABLE chatting.chatters(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(40),
    username VARCHAR(40) NOT NULL UNIQUE,
    joined_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE chatting.messages(
    id SERIAL PRIMARY KEY,
    sent_at TIMESTAMP DEFAULT now() NOT NULL,
    content VARCHAR(255) NOT NULL,
    chatter_id SERIAL NOT NULL,
    CONSTRAINT fk_chatter_id FOREIGN KEY(chatter_id) REFERENCES chatting.chatters(id)
);

CREATE TABLE chatting.groups(
    id SERIAL PRIMARY KEY,
    name TIMESTAMP DEFAULT now() NOT NULL,
    description VARCHAR(100) NOT NULL,
    is_private BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    created_by SERIAL NOT NULL,
    CONSTRAINT fk_created_by FOREIGN KEY(created_by) REFERENCES chatting.chatters(id)
);

CREATE TABLE chatting.authorities(
    name VARCHAR(20) PRIMARY KEY,
    can_delete_message BOOLEAN NOT NULL DEFAULT FALSE,
    can_write_message BOOLEAN NOT NULL DEFAULT FALSE,
    can_add_chatter BOOLEAN NOT NULL DEFAULT FALSE,
    can_remove_chatter BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE chatting.group_relation(
    chatter INT NOT NULL,
    CONSTRAINT fk_chatter FOREIGN KEY(chatter) REFERENCES chatting.chatters(id),
    group_id INT NOT NULL,
    CONSTRAINT fk_group_id FOREIGN KEY(group_id) REFERENCES chatting.groups(id),
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    authority VARCHAR(20) NOT NULL,
    CONSTRAINT fk_authority FOREIGN KEY(authority) REFERENCES chatting.authorities(name)
);

-- INSERT INTO chatting.authorities(name, can_delete_message, can_write_message, can_add_chatter, can_remove_chatter)
-- VALUES 
--     ("admin", TRUE, TRUE, TRUE, TRUE),
--     ("normal", TRUE, TRUE, TRUE, FALSE),
--     ("viewer", FALSE, FALSE, FALSE, FALSE);