import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Globals from 'globals';


@Injectable()
export class BrowseService {
  private BASE_URL = Globals.DB_BASE_URL;
  
  constructor(private http: HttpClient) { }


  loadPopularGames(){
    var request = this.http.post<any>(this.BASE_URL + '/get_games',{});
    return request.map((res : any) => {  
      return res.result;
    }
    );
  }

  loadGame(gameName){
    var request = this.http.post<any>(this.BASE_URL + '/get_game',{game_name:gameName});
    return request.map((res : any) => {  
      return res;
    }
    );
  }

  loadGameById(id){
    let request = this.http.post<any>(this.BASE_URL + '/get_game_by_id',{id:id});
    return request.map((res : any) => {  
      return res;
    }
    );
  }

  searchGame(gameSubstr){
    var request = this.http.post<any>(this.BASE_URL + '/search_game',{game_name:gameSubstr});
    return request.map((res : any) => {  
      return res;
    }
    );
  }

  loadLiveStreamsByGame(game){
    var request = this.http.post<any>(this.BASE_URL + '/get_online_by_game',{game : game});
    return request.map((res : any) => {  
      return res;
      }
    );
  }


  loadUserConfiguredGame(){
    var request = this.http.post<any>(this.BASE_URL + '/get_user_game',{});
    return request.map((res : any) => {  
      return res.result;
    }
    );      
  }


  getViewersByGame(){
    console.log("About to do getViewersByGame")
    var request = this.http.post<any>(this.BASE_URL + '/get_viewers_by_game',{});
    return request.map((res : any) => {  
      console.log("Response from getViewersByGame")
      return res.result;
    }
    );      
  }





}
