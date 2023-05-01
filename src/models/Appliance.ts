export class Appliance{
    private personId: String;
    private value: Number;
    private date: String;
    private statusId: String;
    private type: String;
    constructor(personId:String,value:Number,date:String,statusId:String, type: String){
        this.personId = personId;
        this.value = value;
        this.date = date;
        this.statusId = statusId;
        this.type = type;
    }
}