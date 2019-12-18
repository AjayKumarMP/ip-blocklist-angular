import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { StorageService } from '../service/storage.service'

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {

  userType: String = ''

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  submitForm(event) {
    event.preventDefault()
    console.log(this.userType)
    this.storageService.save('user', this.userType)
    this.router.navigate(['/dashboard'])
  }

}
