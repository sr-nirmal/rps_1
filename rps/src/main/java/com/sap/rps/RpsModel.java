package com.sap.rps;


public class RpsModel{
    public String name;
    public int wins, loses, draws;
    public float time;
    public int chances = 0;

    public RpsModel(String name, int wins, int loses, int draws, float time){
        this.name = name;
        this.wins = wins;
        this.loses = loses;
        this.time = time;
    }

    public int getScore(){
        return this.wins * 3 - this.loses * 1;
    }

    public float getTime(){
        return this.time;
    }
}


