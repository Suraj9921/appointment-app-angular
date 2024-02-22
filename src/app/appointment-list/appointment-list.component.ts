import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit{
  
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointment")
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
  }

  addAppointment() {
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppointment : Appointment = {
        id : Date.now(),
        title : this.newAppointmentTitle,
        date : this.newAppointmentDate
      }

      this.appointments.push(newAppointment);

      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();

      localStorage.setItem("appointment",JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number) {
    const confirmation = confirm("Are you sure you want to delete the appointment?");
    if (confirmation) {
        this.appointments.splice(index, 1);
        localStorage.setItem("appointment", JSON.stringify(this.appointments));
    }
}
}
