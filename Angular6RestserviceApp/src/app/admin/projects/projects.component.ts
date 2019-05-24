import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../projects.service";
import { Project } from 'src/app/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: number = null;
  deleteProject: Project = new Project();
  deleteIndex: number = null;
  searchBy: string = "ProjectName";
  searchText: string = "";

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.projectsService.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
      }
    );
  }

  onSaveClick() {
    this.projectsService.insertProject(this.newProject).subscribe((response) => {
      //Add Project to Grid
      var p: Project = new Project();
      p.passengerName = response.passengerName;
      p.bookingDate = response.bookingDate;
      p.destStation = response.destStation;
      p.sourceStation = response.sourceStation;
      p.email = response.email;
      
      this.projects.push(p);

      //Clear New Project Dialog - TextBoxes
      this.newProject.passengerName = null;
      this.newProject.bookingDate = null;
      this.newProject.destStation = null;
      this.newProject.sourceStation = null;
      this.newProject.email = null;
    }, (error) => {
      console.log(error);
    });
  }

  onEditClick(event, index: number) {
    this.editProject.ticketId = this.projects[index].ticketId;
    this.editProject.passengerName = this.projects[index].passengerName;
    this.editProject.bookingDate = this.projects[index].bookingDate;
    this.editProject.destStation = this.projects[index].destStation;
    this.editProject.sourceStation = this.projects[index].sourceStation;
    this.editProject.email = this.projects[index].email;
    this.editIndex = index;
  }

  onUpdateClick() {
    this.projectsService.updateProject(this.editProject).subscribe((response: Project) => {
      var p: Project = new Project();
      p.passengerName = response.passengerName;
      p.bookingDate = response.bookingDate;
      p.destStation = response.destStation;
      p.sourceStation = response.sourceStation;
      p.email = response.email;
      this.projects[this.editIndex] = p;

      this.editProject.passengerName = null;
      this.editProject.bookingDate = null;
      this.editProject.destStation = null;
      this.editProject.sourceStation = null;
      this.editProject.email=null;
    },
      (error) => {
        console.log(error);
      });
  }

  onDeleteClick(event, index: number) {
    this.deleteIndex = index;
    this.deleteProject.passengerName = this.projects[index].passengerName;
    this.deleteProject.bookingDate = this.projects[index].bookingDate;
    this.deleteProject.destStation = this.projects[index].destStation;
    this.deleteProject.sourceStation = this.projects[index].sourceStation;
    this.deleteProject.email = this.projects[index].email;
  }

  onDeleteConfirmClick() {
    this.projectsService.deleteProject(this.deleteProject.ticketId).subscribe(
      (response) => {
        this.projects.splice(this.deleteIndex, 1);
        this.deleteProject.ticketId = null;
        this.deleteProject.passengerName = null;
        this.deleteProject.sourceStation = null;
        this.deleteProject.destStation = null;
        this.deleteProject.email = null;
      },
      (error) => {
        console.log(error);
      });
  }

  onSearchClick()
  {
    this.projectsService.SearchProjects(this.searchBy, this.searchText).subscribe(
      (response: Project[]) => {
        this.projects = response;
      },
      (error) => 
      {
        console.log(error);
      });
  }
}
