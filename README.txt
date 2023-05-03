The app is developed using React Native, Json Server and Ngrok as database.

There are other items in the `others` folder,
1. jsonserver       - The server code I have used to develop the app.
2. App Explanation  - The explanation of the app.
3. assessment video - The video of me explaining what I have developed.


*Note: 
In order to run this app with the jsonserver I used, run the jsonserver and Ngrok in the command prompt and copy the Forwarding url of Ngrok into the baseURL 'src/api/jsonserver.js'.

Also, I realized sometimes the CartScreen shows empty after refreshing the app even there are items in the cart database，updating the database (e.g. add product to cart) will make the CartScreen acts normal. I did some research, it seem like a server site problem, please do let me know if the issue is my code problem so I can improve it.