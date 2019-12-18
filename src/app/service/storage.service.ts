import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  save = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  getData = (key) => {
    const data = localStorage.getItem(key)
    if (data) return JSON.parse(data)
    return []
  }
}
