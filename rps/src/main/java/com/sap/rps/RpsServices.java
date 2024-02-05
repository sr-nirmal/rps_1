package com.sap.rps;

import java.io.*;

import com.opencsv.CSVWriter;
import com.opencsv.CSVReader;

import java.io.FileReader;
import java.util.List;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

public class RpsServices{

    int rock = 0;
    int paper = 1;
    int scissor = 2;
    String FILE_NAME = new String("databse.csv");
    File fileObject;

    public RpsServices(){
        try {
            this.fileObject = new File(FILE_NAME);
            if (fileObject.createNewFile()) {
                System.out.println("File created: " + fileObject.getName());
            } 
            else {
                System.out.println("File already exists.");
            }
        } 
        catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
            // test for commit
        }

    }   

    public ArrayList<RpsModel> init() throws Exception {
        ArrayList<RpsModel> arr = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new FileReader(FILE_NAME))) {
            List<String[]> allLines = reader.readAll();
    
            for (String[] line : allLines) {
                String name = line[0];
                String date = line[1];
                int wins = Integer.parseInt(line[2]);
                int loses = Integer.parseInt(line[3]);
                int draws = Integer.parseInt(line[4]);
                int score = Integer.parseInt(line[5]);
    
                boolean found = false;
    
                for (RpsModel temp : arr) {
                    if (temp.name.equals(name)) {
                        temp.history.add(new MatchHistory(wins, loses, draws, score, date));
                        found = true;
                        System.out.println("Data adding in else if....." + name + " " + date + " " + wins + " " + loses);
                        break;
                    }
                }
    
                if (!found) {
                    // If not found, create a new RpsModel and add it to the list
                    RpsModel temp1 = new RpsModel(name, 0, 0, 0);
                    temp1.history.add(new MatchHistory(wins, loses, draws, score, date));
                    arr.add(temp1);
                    System.out.println("Data adding in else....." + name + " " + date + " " + wins + " " + loses);
                }
    
                System.out.println("data init....");
            }
        } catch (IOException e) {
            System.out.println("error.....");
            e.printStackTrace();
        }
    
        for (RpsModel printTemp : arr) {
            System.out.println("users -> " + printTemp.name + " " + printTemp.wins + " " + printTemp.chances);
            for (MatchHistory printTemp1 : printTemp.history) {
                System.out.println("init -> " + printTemp1.wins + " " + printTemp1.loses + " " + printTemp1.draws + " " + printTemp1.date);
            }
        }
    
        return arr;
    }
    
    
    private int getRandom(){
        Random rand = new Random();
        int rand_int = rand.nextInt(1000);
        return (int) (rand_int%3);
    }

    public int[] check(int player){ // player win=1 ; draw=0 ; lose=-1
        int computer;
        int[] Return = {0, 0} ;
        computer = this.getRandom();
        Return[1] = computer;
        System.out.println("play -> "+ player  + " " + computer);
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

    public void writeData(historyData data){ // name, date, wins, loses, draws, score
        try (CSVWriter writer = new CSVWriter(new FileWriter(this.FILE_NAME, true))) {
            
            // String[] header = {"Name", "Date", "Wins", "Loses", "Draws", "Score"};
            // writer.writeNext(header);
            String[] writeData = {
                data.name,
                data.date,
                    String.valueOf(data.wins),
                    String.valueOf(data.loses),
                    String.valueOf(data.draws),
                    String.valueOf(data.score)
            };
            writer.writeNext(writeData);
          

            System.out.println("data updated.....");
        } 
        catch (IOException e) {
            e.printStackTrace();
        }
    }

}