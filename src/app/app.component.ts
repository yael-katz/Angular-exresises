import { Component } from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    selector: "my-app-root"
})
export class AppComponent {

    selectedId?: number;

    putId(id: number) {
        
        this.selectedId = id
        console.log("pppppppppppppppppppppppppppppppppppppp",id);

    }






    x: number = 5;

    title: string = "Hello My - App";

    sayHelloAcordingTime() {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        if (currentHour > 6 && currentHour < 13){
            return "good morning בוקר טוב"
        } else if( currentHour < 20)
            return "good afternoon צהריים טובים"
        else return "good night ערב טוב"



    }

    constructor() {
        //this.x = "sdfs";
    }

}