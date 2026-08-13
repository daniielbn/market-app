package com.daniel.market_app.config;

import jakarta.servlet.Filter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

@Configuration
public class RateLimitConfig {

    @Bean
    public FilterRegistrationBean<Filter> rateLimitFilter(
            @Value("${app.rate-limit.capacity:60}") int capacity,
            @Value("${app.rate-limit.refill-period-seconds:60}") long refillPeriodSeconds
    ) {

        FilterRegistrationBean<Filter> registration =
                new FilterRegistrationBean<>(
                        new RateLimitFilter(capacity, refillPeriodSeconds)
                );

        registration.addUrlPatterns("/api/*");
        registration.setOrder(Ordered.HIGHEST_PRECEDENCE);

        return registration;

    }

}
