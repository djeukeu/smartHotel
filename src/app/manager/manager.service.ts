import { Injectable } from '@angular/core';
import { Room } from './home/room-detail/room.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ManagerService {

  constructor() {

   }

  private _rooms: Room[] = [];


  getAllRooms() {
    return [...this._rooms];
    // this.http.get<[key: string]: RoomData>('https://smart-hotel-7d712.firebaseio.com/room.json')
  }

  getRoom(roomId: string) {
    return {
      ...this._rooms.find(room => {
        return room.id === roomId;
      }
      )
    };
  }  


  addRoom() {}

  deleteRoom(roomId: string) {
    this._rooms = this._rooms.filter(room => {
      return room.id !== roomId;
    });
  }

}
