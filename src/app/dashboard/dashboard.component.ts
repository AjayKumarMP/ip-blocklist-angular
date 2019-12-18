import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'

import { StorageService } from '../service/storage.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [StorageService]
})
export class DashboardComponent implements OnInit {
  pattern: string = '/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/'
  Ips = []
  userType: string = ''
  submitButtonText = 'SAVE'
  errorFlag = true
  maxIps = 0
  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.userType = this.storageService.getData("user")
    if (this.userType.length === 0) {
      return this.router.navigate([''])
    }
    if (this.userType === 'basic')
      this.maxIps = 5
    else if (this.userType === 'premium')
      this.maxIps = 10
    else return this.router.navigate([''])
    let data = this.storageService.getData("IP")
    if (data.length > 0) {
      data.forEach(_ => {
        if (_)
          this.Ips.push({ address: new FormControl(_) })
      })
    }
    this.Ips.length === 0 && this.addInput()
  }

  addInput() {
    this.Ips.push({
      address: new FormControl('')
    })
  }

  removeInput(index) {
    if (this.Ips[index].address.value && this.Ips[index].address.errors === null) {
      this.errorFlag = false
      this.submitButtonText = "SAVE"
    }
    if (this.Ips.length > 1)
      this.Ips.splice(index, 1)
    else
      this.Ips[index].address.reset()
  }

  hasError = () => (this.Ips.filter(_ => _.address.dirty).length > 0 && this.Ips.filter(data => data.address.errors !== null).length > 0
  ) || (this.Ips.filter(_ => _.address.dirty).length === 0 && this.errorFlag)

  extractData = () => this.Ips.map(_ => _.address.value)

  sumbitForm(event) {
    event.preventDefault()
    if (!this.hasError()) {
      this.submitButtonText = 'SAVING...'
      this.storageService.save("IP", this.extractData())
      this.errorFlag = true
      setTimeout(() => {
        this.Ips = []
        this.ngOnInit()
        this.submitButtonText = 'SAVED'
      }, 1000)
    }
  }

}
