package com.store;

import com.store.config.AwsConfigProperties;
import com.store.config.PaymentServiceConfigProperties;
import com.store.config.PaymentResourceProperties;
import com.store.email.EmailConfigProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({EmailConfigProperties.class, AwsConfigProperties.class, PaymentServiceConfigProperties.class, PaymentResourceProperties.class})
public class ShoesStoreBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShoesStoreBackendApplication.class, args);
    }

}
