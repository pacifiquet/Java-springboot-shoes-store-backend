package com.store.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClient;
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest;
import com.amazonaws.services.secretsmanager.model.GetSecretValueResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.email.SendGridApiKeys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import static com.store.utils.Constants.FAILED_TO_FETCH_SECRET_ERROR;

@Component
@Slf4j
public record AwsService(AwsConfigProperties configProperties, ObjectMapper objectMapper) {
    static String apiKey;

    public SendGridApiKeys getSenderGridApiKey() {
        AWSStaticCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(new BasicAWSCredentials(configProperties().accessKey(), configProperties().secretKey()));
        AWSSecretsManager secretsManager = AWSSecretsManagerClient.builder()
                .withRegion(configProperties.region())
                .withCredentials(credentialsProvider).build();
        GetSecretValueRequest secretValueRequest = new GetSecretValueRequest().withSecretId(configProperties().senderGridSecretName());
        GetSecretValueResult secretValue = secretsManager.getSecretValue(secretValueRequest);

        if (secretValue.getSecretString() != null) {
            apiKey = secretValue.getSecretString();
        }

        try {
            return objectMapper.readValue(apiKey, SendGridApiKeys.class);
        } catch (Exception e) {
            log.error(FAILED_TO_FETCH_SECRET_ERROR, e.getMessage());
        }

        return null;
    }

    @Bean
    public AmazonS3 s3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(configProperties.accessKey(), configProperties.secretKey());
        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(configProperties.region())
                .build();
    }

}
