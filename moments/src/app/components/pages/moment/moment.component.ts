import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from '../../../Moments';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';

import { Comment } from 'src/app/Comment';
import { CommentService } from 'src/app/services/comment.service';

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

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService){ }

  ngOnInit(): void {
    //id que esta na url
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){
      await this.momentService.removeMoment(id).subscribe();
      this.messagesService.add('Momento removido com sucesso');
      this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective){
    if(this.commentForm.invalid){
      return;
    }

    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data));
    this.messagesService.add('Comentário adicionado com sucesso');

    //reset form
    this.commentForm.reset();
    formDirective.resetForm();
  }


}
