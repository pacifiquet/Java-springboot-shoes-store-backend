package com.store.config;

import org.testcontainers.containers.PostgreSQLContainer;

public class DatabasePostgresqlTestContainer
        extends PostgreSQLContainer<DatabasePostgresqlTestContainer> {
    private static final String IMAGE_VERSION = "postgres:12.3-alpine";

    private static DatabasePostgresqlTestContainer container;

    private DatabasePostgresqlTestContainer() {
        super(IMAGE_VERSION);
    }

    public static DatabasePostgresqlTestContainer getInstance() {
        if (container == null) {
            container = new DatabasePostgresqlTestContainer();
        }
        return container;
    }

}