import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Project } from './project';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService
{
  constructor(private httpClient : HttpClient)
  {
  }

  getAllProjects() : Observable<Project[]>
  {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
    
    return this.httpClient.get<Project[]>("http://localhost:9090/api/tickets/ticket/alltickets", {headers: headers})
    .pipe(map(
      (data:Project[])=>{
        for(let i=0;i<data.length;i++){
          data[i].ticketId = data[i].ticketId*2;
        }
        return data;
      }
    ));
  }

  insertProject(newProject: Project) : Observable<Project>
  {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
    return this.httpClient.post<Project>("http://localhost:9090/api/tickets/create", newProject, { headers: headers });
  }

  updateProject(existingProject: Project) : Observable<Project>
  {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');

    return this.httpClient.put<Project>("http://localhost:9090/api/tickets/ticket/update", existingProject, { headers: headers });
  }

  deleteProject(ticketId: number) : Observable<string>
  {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
    return this.httpClient.delete<string>("http://localhost:9090/api/tickets/ticket/" + ticketId,{headers:headers});
  }

  SearchProjects(searchBy: string, searchText: string) : Observable<Project[]>
  {
    return this.httpClient.get<Project[]>("/api/projects/search/" + searchBy + "/" + searchText, { responseType: "json" });
  }
}



