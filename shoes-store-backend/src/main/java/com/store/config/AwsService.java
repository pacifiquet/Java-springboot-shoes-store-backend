package com.store.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClient;
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest;
import com.amazonaws.services.secretsmanager.model.GetSecretValueResult;
import com.google.gson.Gson;
import com.store.email.SendGridApiKey;
import org.springframework.stereotype.Component;

@Component
public record AwsService(AwsConfigProperties configProperties) {
    static  String apiKey;
    static Gson gson = new Gson();
    public SendGridApiKey getSenderGridApiKey(){
        AWSStaticCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(new BasicAWSCredentials(configProperties().accessKey(), configProperties().secretKey()));
        AWSSecretsManager secretsManager = AWSSecretsManagerClient.builder()
                .withRegion(configProperties.region())
                .withCredentials(credentialsProvider).build();
        GetSecretValueRequest secretValueRequest = new GetSecretValueRequest().withSecretId(configProperties().senderGridSecretName());
        GetSecretValueResult secretValue = secretsManager.getSecretValue(secretValueRequest);

        if (secretValue.getSecretString() != null){
            apiKey = secretValue.getSecretString();
            return gson.fromJson(apiKey, SendGridApiKey.class);
        }

        return null;
    }
}
