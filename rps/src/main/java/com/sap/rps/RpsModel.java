package com.sap.rps;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import java.util.List;
import java.util.ArrayList;

class MatchHistory{
    public int wins, loses, draws, score;
    public String date;
    public MatchHistory(int wins, int loses, int draws, int score, String date){
        this.wins = wins;
        this.loses = loses;
        this.draws = draws;
        this.score = score;
        this.date = date;
        System.out.println("new match history created..."+score);
    }
}


public class RpsModel{
    
    public String name;
    public int wins, loses, draws;
    public int chances = 1;

    List<MatchHistory> history ;
    

    public RpsModel(String name, int wins, int loses, int draws){
        this.name = name;
        this.wins = wins;
        this.loses = loses;
        this.history = new ArrayList<>();
    }

    public String updateScore(){
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String date = currentDate.format(formatter);
        history.add(new MatchHistory(this.wins, this.loses, this.draws, this.wins*3 - this.loses ,date));
        return date;
    }




}


