package com.sap.rps;

import java.util.Random;


public class RpsServices{

    int rock = 0;
    int paper = 1;
    int scissor = 2;
    
    private int getRandom(){
        Random rand = new Random();
        int rand_int = rand.nextInt(1000);
        return (int) (rand_int%3);
    }

    public int check(int player){ // player win=1 ; draw=0 ; lose=-1
        int computer;
        computer = this.getRandom();
        System.out.println("play -> "+ player  + " " + computer);
        if(player == computer){
            return 0;
        }
        else if(player == rock){
            if(computer == scissor){
                return 1;
            }
            return -1;
        }
        else if(player == scissor){
            if(computer == paper){
                return 1;
            }
            return -1;
        }
        else if(player == paper){
            if(computer == rock){
                return 1;
            }
            return -1;
        }
        return 2;
    }

}