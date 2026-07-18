package com.daniel.market_app.utils;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class RandomAccessCodeGenerator implements AccessCodeGenerator {

    private static final String PREFIX = "HOME";

    private static final String CHARACTERS =
            "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    private static final SecureRandom RANDOM =
            new SecureRandom();

    @Override
    public String generate() {

        StringBuilder builder = new StringBuilder(PREFIX);
        builder.append('-');

        for (int i = 0; i < 4; i++) {
            builder.append(
                    CHARACTERS.charAt(
                            RANDOM.nextInt(CHARACTERS.length())
                    )
            );
        }

        return builder.toString();
    }

}