package com.store.config;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.store.utils.Constants.USER_EVENT_EXCHANGE;
import static com.store.utils.Constants.USER_EVENT_QUEUE;
import static com.store.utils.Constants.USER_EVENT_ROUTING_KEY;

@Configuration
public class RabbitMQConfig {

    @Bean
    public Binding binding() {
        return BindingBuilder.bind(queue()).to(topicExchange()).with(USER_EVENT_ROUTING_KEY);
    }

    @Bean
    public Queue queue() {
        return new Queue(USER_EVENT_QUEUE);
    }

    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange(USER_EVENT_EXCHANGE);
    }

    @Bean
    public AmqpTemplate template(ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
