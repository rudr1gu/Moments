import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from '../../../Moments';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  //moment
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  //icons
  faEdit = faEdit;
  faTimes = faTimes;



  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //id que esta na url
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data));
  }

  deleteMoment(id: number): void {
    this.momentService.deleteMoment(id).subscribe(() => {
      alert('Moment deleted successfully');
    });
  }

}
