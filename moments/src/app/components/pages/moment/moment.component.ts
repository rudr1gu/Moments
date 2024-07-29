import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from '../../../Moments';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';

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
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router){ }

  ngOnInit(): void {
    //id que esta na url
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data));
  }

  async removeHandler(id: number){
      await this.momentService.removeMoment(id).subscribe();
      this.messagesService.add('Momento removido com sucesso');
      this.router.navigate(['/']);
  }


}
