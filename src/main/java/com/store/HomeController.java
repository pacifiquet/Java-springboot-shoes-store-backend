package com.store;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping
@Hidden
public class HomeController {
    @GetMapping
    public void home(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect(request.getRequestURI() + "swagger-ui/index.html#/");
    }
}
