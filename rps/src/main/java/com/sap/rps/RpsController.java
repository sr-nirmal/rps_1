package com.sap.rps;

import com.sap.rps.RpsServices;
import com.sap.rps.RpsModel;
// import com.sap.rps.RpsRequest.NameReq;

import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

class NameReq{
	public String name;
	public NameReq(){}
}

class Response{
	public String prompt;
	public Response(String prompt){
		this.prompt = prompt;
		// test for commit
	}
}

class PlayReq{
	public String name;
	public int move;
}

class Result{
	public int result, computer, chances ;
	public String stat;
	public Result(int computer, int result, String stat, int chances){
		this.computer = computer;
		this.result = result;
		this.stat = stat;
		this.chances = chances;
	}
}

class historyData{
	public String name, date;
	public int wins, loses, draws ,score;

	public historyData(String name, String date, int wins, int loses, int draws){
		this.name = name;
		this.date = date;
		this.wins = wins;
		this.loses = loses;
		this.draws =  draws;
		this.score = wins*3 - loses;
	}
}


// class MatchHistory{
//     public int wins, loses, draws;
//     public String date;
//     public MatchHistory(int wins, int loses, int draws, String date){
//         this.wins = wins;
//         this.loses = loses;
//         this.draws = draws;
//         this.date = date;
//     }
// }



@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RpsController {
	RpsServices services =  new RpsServices();
	List<RpsModel> arr;

	public RpsController(){
		System.out.println("init......");
		try{
			this.arr = services.init();
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println("error here...");
		}
	}
	

	int MAX_CHANCES = 10;

	@PutMapping("/start")
	public Response start(@RequestBody NameReq Name) {
		System.out.println(Name.name);
		for (RpsModel temp : this.arr){
			System.out.println(temp.name +" "+ Name.name);
			if(temp.name.equals(Name.name)){
				temp.wins = 0;
				temp.loses = 0;
				temp.draws = 0;
				temp.chances = 0;
				return new Response("Success");
			}
		}
		this.arr.add(new RpsModel(Name.name, 0, 0, 0));
		for (RpsModel printTemp : this.arr){
			System.out.println(printTemp.name +" "+ printTemp.wins +" "+ printTemp.chances);
		}
		return new Response("Success");
	}

	@PutMapping("/play")
	public Result play(@RequestBody PlayReq Play){
		int[] result;
		int Result = 0 , Computer = 0;
		int chances = 0;
		String date;
		for (RpsModel temp : arr){
			
			
				if(temp.name.equals(Play.name)){
						result = services.check(Play.move);
						
						Computer = result[1];
						Result = result[0];
						System.out.println("Result -> "+Result+" "+Computer);
						if(Result == 0){temp.draws++;}
						if(Result == -1){temp.loses++;}
						if(Result ==  1){temp.wins++;}
						chances = ++temp.chances ;
					if(temp.chances >= MAX_CHANCES){
						System.out.println("Chances at if --> "+temp.chances);
						date = temp.updateScore();
						services.writeData(new historyData(temp.name, date, temp.wins, temp.loses, temp.draws));
						chances =  MAX_CHANCES;
						int sum = temp.wins+temp.loses+temp.draws;
						System.out.println("total plays -> " +(sum));
						temp.wins = 0;
						temp.loses = 0;
						temp.draws = 0;
						temp.chances = 0;
						break;
					}
						break;
				}
			}
			


		// for (RpsModel printTemp : arr){
		// 	System.out.println(printTemp.name +" "+ printTemp.wins +" "+ printTemp.chances);
		// 	System.out.println("---------------");
		// }
		if(chances < MAX_CHANCES){
			System.out.println("chances ---> "+ chances);
			return (new Result(Computer,Result,"proceed", chances));
		}
		return (new Result(Computer, Result, "finish", chances));
	}

	@PutMapping("/history")
	public List<MatchHistory> getHistory(@RequestBody NameReq Name) {
		RpsModel temp1 = null;
		for (RpsModel temp : arr){
			System.out.println(temp.name +" "+ Name.name);
			if(temp.name.equals(Name.name)){
				temp1 = temp;
				break;
			}
		}
		return temp1.history;

	}
}