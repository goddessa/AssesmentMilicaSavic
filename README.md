# AssesmentMilicaSavic
Setup guide:
*A text editor or IDE: You can use any text editor or IDE of your choice to edit and run the code. Some popular options include Visual Studio Code, Atom, Sublime Text, or Visual Studio. I used Visual Studio Code.
1. .NET SDK: This project is built using .NET Core, so you'll need to have the .NET SDK installed on your machine. You can download the latest version of the .NET SDK from the official website at https://dotnet.microsoft.com/download. I used .net 7.*.
2. SQL Server: This project uses SQL Server to store data. You can download SQL Server Express Edition from the official website at https://www.microsoft.com/en-us/sql-server/sql-server-downloads. I used Azure Data Studio to show my database and connection to database. I also used Azure to see changes in my application testing CRUD operations.
Once you have these tools installed, you can follow these steps to run the project:
Clone the project repository to your local machine.
Open the project folder in your text editor or IDE.
In the terminal or command prompt, navigate to the project folder.
Run dotnet restore to restore the necessary packages.
Run dotnet ef migrations V1 to do the necessary migrations to make changes to database.
Run dotnet ef database update to apply the latest database migrations.
Run dotnet run to start the server.
You can test the API endpoints using a tool like Postman or curl. I used Swagger to show API endpoints result.
This all related to backend part of the application if you want to test CRUD in swagger.
For the frontend side, I started my project with Five Server, it runs on 127.0.0.1:5555/Frontend/index.html. 
You need to add Five Server to your Visual Studio Code, you add it from the menu in the VSCode „extensions“ on the left of your IDE.
To start Live Server in VS Code, you can follow these steps:
1. Open your HTML or JavaScript file in VS Code.
2. Install the "Live Server" extension from the VS Code marketplace.
3. Once the extension is installed, you will see a "Go Live" button in the bottom right corner of your editor window.
4. Click the "Go Live" button, and a new tab will open in your default browser, showing your web page.
5. Alternatively, you can right-click on your HTML file and select "Open with Live Server" from the context menu.One get result in Swagger.
