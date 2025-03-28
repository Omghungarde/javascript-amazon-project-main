class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;
    
    constructor(Details) {
        this.#brand = Details.brand;
        this.#model = Details.model;
    }

    displayInfo(){
        const trunkStatus = this.isTrunkOpen ? 'open' : 'close';
        console.log(`${this.#brand} ${this.#model}, Speed : ${this.speed} km/h, Trunk:${trunkStatus}`);
        

    }

    go(){
        if(!this.isTrunkOpen){
        this.speed+=5;
        }
        if(this.speed>200){
            this.speed=200;
        }
        
    }

    brake(){
        this.speed-=5;
        if(this.speed<0){
            this.speed=0;
        }
    }

    opentrunk(){
        if(this.speed===0){
            this.isTrunkOpen=true;
        }
    }
    closetrunk(){
        this.isTrunkOpen=false;
    }
    
}

class RaceCar extends Car {
    accelaration;

    constructor(Details) {
        super(Details);
        this.accelaration= Details.accelaration;

    }

    go(){
        this.speed += this.accelaration;
        if(this.speed>300){
            this.speed=300;
        }
    }
    opentrunk(){
        console.log('Race Car do not have a trunk.');
        
    }
    closetrunk(){
        console.log('Race Car do not have a trunk.');
                
    }
}
const raceCar = new RaceCar({
    brand: 'Mclearn',
    model: 'F5',
    accelaration: 50
});

const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla'
});
const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3'
});


car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();
car2.opentrunk();
car2.go();
car2.displayInfo(); 
car2.closetrunk();
car2.go();
car2.displayInfo();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.opentrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();


