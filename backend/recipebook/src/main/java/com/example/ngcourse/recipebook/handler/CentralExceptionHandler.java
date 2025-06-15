package com.example.ngcourse.recipebook.handler;

import com.example.ngcourse.recipebook.util.exception.UserAlreadyExistException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CentralExceptionHandler {

  @ExceptionHandler(UserAlreadyExistException.class)
  public ProblemDetail handleUserAlreadyExistException(UserAlreadyExistException ex) {
    return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
  }
}
