package com.store;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
class ShoesStoreBackendApplicationTests {
	private static final String APP_NAME = "shoes-store";
	@Test
	void contextLoads() {
		Assertions.assertEquals("shoes-store", APP_NAME);
	}

}
