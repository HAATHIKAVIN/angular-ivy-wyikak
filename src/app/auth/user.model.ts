export class User{
  constructor(
    public email : string,
    public id : string,
    private _token : string,
    private _tokenexpirationdate : Date
  ) {}
   get token(){
     if(!this._tokenexpirationdate || new Date > this._tokenexpirationdate){
        return null;
     }
     return this._token;
   }

}