# CT-internship-task
Control Point assignment task for internship assessment; Building an application with Java springboot 
# Asset Monitoring System

## Prerequisites
- Java 21
- Node.js (v18 or higher)

## Run Instructions

### 1. Backend (Spring Boot)

Navigate to repository path and execute the following commands in your shell:


#### Windows:
```bash
.\gradlew.bat bootRun
``` 

#### Linux:
```bash
./gradlew bootRun
``` 

### 2. Frontend
Navigate to repository path and execute the following commands in your shell:
```bash
cd src/frontend
npm install 
npm run dev
```
Navigate to http://localhost:5173 on your browser

## Assumptions & Design Choices
- Architecture: Decoupled client-server model separating the backend REST API from the frontend single-page application.

- Type Safety: TypeScript is utilized on the frontend to mirror backend entity structures, ensuring data consistency across the stack.

- State Management: Standard React hooks (useState, useEffect) are used for state management and API data fetching to minimize unnecessary dependencies.

- Data Simulation: Since physical sensors are not present, a scheduled data generation mechanism was implemented to create randomized temperature and pressure readings, simulating real-time asset monitoring behavior.

- Database: An in-memory database (H2) is assumed for the backend to simplify the setup and review process without requiring external database configuration.
