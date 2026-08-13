package com.daniel.market_app.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

class RateLimitFilter extends OncePerRequestFilter {

    private static final int MAX_TRACKED_CLIENTS = 10_000;

    private final int capacity;
    private final long refillPeriodSeconds;
    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    RateLimitFilter(int capacity, long refillPeriodSeconds) {
        this.capacity = capacity;
        this.refillPeriodSeconds = refillPeriodSeconds;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Evita que un ataque desde muchas IPs distintas haga crecer el mapa sin límite.
        if (buckets.size() > MAX_TRACKED_CLIENTS) {
            buckets.clear();
        }

        String clientIp = resolveClientIp(request);

        Bucket bucket = buckets.computeIfAbsent(
                clientIp,
                key -> new Bucket(capacity)
        );

        if (bucket.tryConsume(capacity, refillPeriodSeconds)) {
            filterChain.doFilter(request, response);
            return;
        }

        respondTooManyRequests(request, response);

    }

    private void respondTooManyRequests(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {

        response.setStatus(429);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Retry-After", String.valueOf(refillPeriodSeconds));

        response.getWriter().write(
                """
                {"timestamp":"%s","status":429,"error":"Too Many Requests","message":"Has superado el límite de peticiones. Inténtalo de nuevo en unos segundos.","details":null,"path":"%s"}"""
                        .formatted(LocalDateTime.now(), request.getRequestURI())
        );

    }

    private String resolveClientIp(HttpServletRequest request) {

        // Railway (y la mayoría de PaaS) exponen la IP real del cliente en X-Forwarded-For.
        String forwardedFor = request.getHeader("X-Forwarded-For");

        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }

        return request.getRemoteAddr();

    }

    private static final class Bucket {

        private double tokens;
        private long lastRefillNanos;

        private Bucket(int initialTokens) {
            this.tokens = initialTokens;
            this.lastRefillNanos = System.nanoTime();
        }

        private synchronized boolean tryConsume(int capacity, long refillPeriodSeconds) {

            refill(capacity, refillPeriodSeconds);

            if (tokens < 1) {
                return false;
            }

            tokens -= 1;
            return true;

        }

        private void refill(int capacity, long refillPeriodSeconds) {

            long now = System.nanoTime();
            double elapsedSeconds = (now - lastRefillNanos) / 1_000_000_000.0;
            double refillRatePerSecond = (double) capacity / refillPeriodSeconds;

            tokens = Math.min(capacity, tokens + elapsedSeconds * refillRatePerSecond);
            lastRefillNanos = now;

        }

    }

}
