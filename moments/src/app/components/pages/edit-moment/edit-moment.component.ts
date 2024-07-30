import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Moments';
import { MomentService } from 'src/app/services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((moment) => {
      this.moment = moment.data;
    });
  }

}
