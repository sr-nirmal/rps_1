package com.sap.rps;

import java.util.Random;


// import com.mongodb.ConnectionString;
// import com.mongodb.MongoClientSettings;
// import com.mongodb.MongoException;
// import com.mongodb.ServerApi;
// import com.mongodb.ServerApiVersion;
// import com.mongodb.client.MongoClient;
// import com.mongodb.client.MongoClients;
// import com.mongodb.client.MongoDatabase;
// import com.mongodb.client.MongoCollection;
// import com.mongodb.client.MongoDatabase;

// import org.bson.Document;

public class RpsServices{

    int rock = 0;
    int paper = 1;
    int scissor = 2;

    public RpsServices(){
        // String connectionString = "mongodb+srv://deadshot:deadshot@cluster0.ptitmlu.mongodb.net/?retryWrites=true&w=majority";
        
        // ServerApi serverApi = ServerApi.builder()
        //         .version(ServerApiVersion.V1)
        //         .build();
        // MongoClientSettings settings = MongoClientSettings.builder()
        //         .applyConnectionString(new ConnectionString(connectionString))
        //         .serverApi(serverApi)
        //         .build();
        // // Create a new client and connect to the server
        // try (MongoClient mongoClient = MongoClients.create(settings)) {
        //     try {
        //         // Send a ping to confirm a successful connection
        //         MongoDatabase database = mongoClient.getDatabase("admin");
        //         database.runCommand(new Document("ping", 1));
        //         System.out.println("Pinged your deployment. You successfully connected to MongoDB!");
        //     } catch (MongoException e) {
        //         e.printStackTrace();
        //     }
        // }


        // MongoDatabase database = mongoClient.getDatabase("database_01");
        // MongoCollection<Document> collection = database.getCollection("collection_03");

        // Document document = new Document("name", "John Doe").append("age", 30);
        // collection.insertOne(document);
    }
    
    private int getRandom(){
        Random rand = new Random();
        int rand_int = rand.nextInt(1000);
        return (int) (rand_int%3);
    }

    public int[o] check(int player){ // player win=1 ; draw=0 ; lose=-1
        int computer;
        int[] Return = {0, 0} ;
        computer = this.getRandom();
        Return[1] = computer;
        System.ut.println("play -> "+ player  + " " + computer);
        if(player == computer){
            Return[0] = 0;
        }
        else if(player == rock){
            if(computer == scissor){
                Return[0] = 1;
            }
            else{
                Return[0] = -1;
            }
            
        }
        else if(player == scissor){
            if(computer == paper){
                Return[0] = 1;
            }
            else{
                Return[0] = -1;
            }
            
           
        }
        else if(player == paper){
            if(computer == rock){
                Return[0] = 1;
            }
            else{
                Return[0] = -1;
            } 
        }
        return Return;
    }

}