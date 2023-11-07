# Full-Stack Shoe Store Project

![image](https://drive.google.com/uc?export=view&id=1Z7D7SY2ukVmiQyv0eHIrExE8QFTqaidU)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Project Structure](#project-structure)

## Overview

This is a personal full-stack shoe store project that utilizes Angular for the frontend and Spring Boot for the backend. The project aims to provide essential functionalities for an online shoe store, including user management, product management, order processing, and more.

## Features

The project includes the following key features:

### User Service

- Create an account
- Verify accounts via email
- Reset passwords
- Forgot passwords
- Delete accounts
- Update user profiles

### Product Service

- Create products individually
- Upload products via CSV files

### Order Service

- Add products to the cart
- Submit orders with payment
- Orders automatically start with a "status in progress"

### Store Owner

- Can mark orders as "received" and "completed"

### Email Notifications

- Send review requests via email after an order is completed

## Technologies Used

- Angular for the frontend
- Spring Boot for the backend
- PostgreSQL database
- Gradle as the build tool
- Java 17
- Twilio for sending emails
- RabbitMQ for handling asynchronous actions
- Docker for containerization
