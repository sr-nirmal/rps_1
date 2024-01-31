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
	}
}

class PlayReq{
	public String name;
	public int move;
	public float time;
}

class Result{
	public int result, computer;
	public String stat;
	public Result(int computer, int result, String stat){
		this.computer = computer;
		this.result = result;
		this.stat = stat;
	}
}



@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RpsController {

	RpsServices services =  new RpsServices();
	List<RpsModel> arr = new ArrayList<>();
	int MAX_CHANCES = 10;

	@PutMapping("/start")
	public Response start(@RequestBody NameReq Name) {
		System.out.println(Name.name);
		for (RpsModel temp : arr){
			System.out.println(temp.name +" "+ Name.name);
			if(temp.name.equals(Name.name)){
				temp.wins = 0;
				temp.loses = 0;
				temp.draws = 0;
				temp.time = 0;
				return new Response("Success");
			}
		}
		arr.add(new RpsModel(Name.name, 0, 0, 0, 0));
		// for (RpsModel printTemp : arr){
		// 	System.out.println(printTemp.name +" "+ printTemp.wins +" "+ printTemp.chances);
		// }
		return new Response("Success");
	}

	@PutMapping("/play")
	public Result play(@RequestBody PlayReq Play){
		int[] result;
		int Result = 0 , Computer = 0;
		int chances = 0;
		for (RpsModel temp : arr){
			if(temp.chances >= 10){
				chances =  temp.chances;
				break;
			}
			else{
				if(temp.name.equals(Play.name)){
					result = services.check(Play.move);
					
					Computer = result[1];
					Result = result[0];
					System.out.println("Result -> "+Result+" "+Computer);
					if(Result == 0){temp.draws++;}
					if(Result == -1){temp.loses++;}
					if(Result ==  1){temp.wins++;}
					chances = temp.chances++ ;
					break;
				}
			}
			
		}

		// for (RpsModel printTemp : arr){
		// 	System.out.println(printTemp.name +" "+ printTemp.wins +" "+ printTemp.chances);
		// 	System.out.println("---------------");
		// }
		if(chances < MAX_CHANCES){
			return (new Result(Computer,Result,"proceed"));
		}
		return (new Result(Computer, Result, "finish"));
	}
}