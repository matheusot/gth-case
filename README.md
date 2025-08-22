# Weight Calculator

This is a simple web application to manage people's information and calculate their ideal weight based on their height and sex.

## Features

- **CRUD Operations:** Create, Read, Update, and Delete people's information.
- **Search:** Search for people by name.
- **Ideal Weight Calculation:** Calculate the ideal weight for a person based on their height and sex.
- **REST API:** A RESTful API for interacting with the application.
- **Dockerized:** The application is fully containerized for easy setup and deployment.

## Technologies Used

- **Backend:**
  - Django
  - Django REST Framework
  - PostgreSQL
- **Frontend:**
  - HTML
  - Tailwind CSS
  - JavaScript
- **DevOps:**
  - Docker
  - Docker Compose

## Installation and Setup

To run this project, you need to have Docker and Docker Compose installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```
3. **Run the application using Docker Compose:**
    ```bash
    docker-compose up --build
    ```
The application will be available at [http://localhost:8000](http://localhost:8000).

## API Endpoints

The following API endpoints are available:

| Method | URL | Description |
| --- | --- | --- |
| `GET` | `/api/pessoas/` | Get a list of all people. |
| `GET` | `/api/pessoas/<id>/` | Get the details of a specific person. |
| `POST` | `/api/pessoas/` | Create a new person. |
| `PUT` | `/api/pessoas/<id>/` | Update the details of a specific person. |
| `DELETE` | `/api/pessoas/<id>/` | Delete a specific person. |
| `GET` | `/api/pessoas/search/?nome=<query>` | Search for people by name. |
| `GET` | `/api/pessoas/<id>/peso_ideal/` | Calculate the ideal weight for a specific person. |

## Usage

Once the application is running, you can access the web interface at [http://localhost:8000](http://localhost:8000). From there, you can:

- View the list of all people.
- Add a new person by clicking the "Adicionar Pessoa" button.
- Edit or delete a person using the buttons in the "Ações" column.
- Search for people by typing in the search bar.
- Calculate the ideal weight of a person by clicking the "Peso Ideal" button.
