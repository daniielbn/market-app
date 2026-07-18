package com.daniel.market_app.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.daniel.market_app.dto.response.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

public class HouseNotFoundException extends RuntimeException {

    @ExceptionHandler(HouseNotFoundException.class)
public ResponseEntity<ErrorResponse> handleHouseNotFound(
        HouseNotFoundException ex,
        HttpServletRequest request) {

    ErrorResponse response = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),
            HttpStatus.NOT_FOUND.getReasonPhrase(),
            ex.getMessage(),
            null,
            request.getRequestURI()
    );

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
}

}
