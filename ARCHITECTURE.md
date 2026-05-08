# Architecture Diagram

This document describes the high-level architecture of the Multi-tenant Booking & Queue Management Platform.

## System Overview

```mermaid
graph TD
    subgraph Clients
        MobileApp[Flutter Mobile App]
        AdminDash[Next.js Admin Dashboard]
    end

    subgraph "External/Infrastructure"
        Nginx[Nginx Reverse Proxy]
    end

    subgraph "API Gateway Layer"
        Gateway[API Gateway - NestJS]
    end

    subgraph "Microservices Layer"
        AuthSvc[Auth Service]
        UserSvc[User Service]
        BusinessSvc[Business Service]
        BookingSvc[Booking Service]
        QueueSvc[Queue Service]
        NotifSvc[Notification Service]
        FileSvc[File Service]
        PaymentSvc[Payment Service]
    end

    subgraph "Data & Messaging Layer"
        Postgres[(PostgreSQL)]
        Redis[(Redis - Live Queue)]
        RMQ[[RabbitMQ - Event Bus]]
    end

    %% Client to Nginx
    MobileApp --> Nginx
    AdminDash --> Nginx

    %% Nginx to Gateway
    Nginx --> Gateway

    %% Gateway to Services
    Gateway --> AuthSvc
    Gateway --> UserSvc
    Gateway --> BusinessSvc
    Gateway --> BookingSvc
    Gateway --> QueueSvc
    Gateway --> FileSvc
    Gateway --> PaymentSvc

    %% Service Inter-communication
    BookingSvc -.-> RMQ
    RMQ -.-> NotifSvc
    QueueSvc --> Redis

    %% Databases
    AuthSvc --> Postgres
    BusinessSvc --> Postgres
    BookingSvc --> Postgres
    UserSvc --> Postgres
```

## Core Workflows

### 1. Booking Flow
```mermaid
sequenceDiagram
    participant C as Customer (Mobile)
    participant G as API Gateway
    participant A as Auth Service
    participant B as Booking Service
    participant Q as Queue Service
    participant N as Notification Service
    participant R as RabbitMQ

    C->>G: POST /bookings (with JWT)
    G->>G: Validate Tenant Header
    G->>B: Proxy Request
    B->>B: Validate Slot Availability
    B->>B: Save Booking (Postgres)
    B->>R: Emit 'booking.created' event
    R->>N: Consume event
    N->>C: Send Push Notification
    B->>Q: Request Token Generation
    Q->>Q: Increment Redis Counter
    Q-->>B: Return Token Details
    B-->>G: Return Booking Confirmation
    G-->>C: 201 Created
```

## Key Components

### 1. API Gateway
- **Technology**: NestJS with `http-proxy-middleware`.
- **Role**: Entry point for all client requests. Handles routing, Swagger documentation aggregation, and global filters.

### 2. Microservices
- **Auth Service**: Manages identity, JWT issuance, and RBAC. Uses Prisma ORM with PostgreSQL.
- **Queue Service**: Manages real-time tokens and waiting times. Uses Redis for high-performance counter increments.
- **Booking Service**: Handles appointment scheduling and slot management.
- **Notification Service**: Asynchronous service that listens to RabbitMQ events and sends Push/SMS/Email notifications.

### 3. Multi-tenancy
- **Tenant Isolation**: Achieved via `tenantId` partitioning in the database and `TenantGuard` at the API layer.
- **Role-Based Access Control (RBAC)**: Enforced via `RolesGuard` to separate Customer, Receptionist, and Business Admin permissions.

### 4. Communication
- **Synchronous**: REST/HTTP for client-to-service and internal proxying.
- **Real-time**: WebSockets (Socket.io) in the Queue Service for live updates.
- **Asynchronous**: RabbitMQ for event-driven flows (e.g., "Booking Created" -> "Send Notification").

## Deployment
- **Production**: Linux/EC2 with PM2 for process management and Nginx as the edge proxy.
- **Local**: Docker Compose for infrastructure (Postgres, Redis, RabbitMQ) and local Node.js processes for services.
