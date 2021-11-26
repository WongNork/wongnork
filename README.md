## Wongnork
Wongnork is a web application that will help you to find recommended restaurants and/or review restaurants.

## Getting Started

|    Name    | Required version(s) |
| :--------: | :-----------------: |
|   Python   |   3.7 or higher     |
|   Django   |   3.1 or higher     |

1. Clone this repository to your computer.
    ```
    git clone https://github.com/WongNork/wongnork.git
    ```
2. Change directory to the repository.
    ```
    cd wongnork
    ```
3. Install virtualenv to your computer.
    ```
    pip install virtualenv
    ```
4. Create virtual environment.
    ```
    virtualenv wongnork_env
    ```
5. Activate virtualenv by using this command.

    for Mac OS / Linux
    ```
    source wongnork_env/bin/activate
    ```
    for Windows
    ```
    wongnork_env\Scripts\activate
    ```
6. Run this command to install all require packages.
    ``` 
    pip install -r requirements.txt
    ```
7. Create .env file inside wongnork (same level as settings.py) and added:
    ```
    DEBUG=True
    ```
8. Run this command to migrate the database.
    ```
    python manage.py migrate
    ```
9. Start running the server by this command.
    ```
    python manage.py runserver
    ```


## Project Documents

• [Project Proposal](https://docs.google.com/document/d/1cibKReE7fufIIWBa5UsEatZo1PgeTS3rAfY2V7jv_cw/edit#heading=h.vn7vb3jwnex)

• [Vision Statement](https://github.com/WongNork/wongnork/wiki/Vision-Statement)

• [Code Review Procedure](https://github.com/WongNork/wongnork/wiki/Code-Checklist)

• [Code Checklist](https://github.com/WongNork/wongnork/wiki/Code-Checklist)

## Iteration Plans

[Iteration 1](https://github.com/WongNork/wongnork/wiki/Iteration-1) and [Task board](https://github.com/WongNork/wongnork/projects/1)    

[Iteration 2](https://github.com/WongNork/wongnork/wiki/Iteration-2) and [Task board](https://github.com/WongNork/wongnork/projects/2)   

[Iteration 3](https://github.com/WongNork/wongnork/wiki/Iteration-3) and [Task board](https://github.com/WongNork/wongnork/projects/3)   

[Iteration 4](https://github.com/WongNork/wongnork/wiki/Iteration-4) and [Task board](https://github.com/WongNork/wongnork/projects/4)   

[Iteration 5](https://github.com/WongNork/wongnork/wiki/Iteration-5) and [Task board](https://github.com/WongNork/wongnork/projects/5)   

[Iteration 6](https://github.com/WongNork/wongnork/wiki/Iteration-6) and [Task board](https://github.com/WongNork/wongnork/projects/6)   
