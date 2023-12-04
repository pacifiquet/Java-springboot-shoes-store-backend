package com.store.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cloud.aws")
public record AwsConfigProperties(
        String bucketUrlEndpoint,
        String senderGridSecretName,
        String bucketUrlSecret,
        String bucketName,
        String accessKey,
        String secretKey,
        String region) {
}
