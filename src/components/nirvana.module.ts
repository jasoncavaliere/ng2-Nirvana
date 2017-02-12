import { NgModule } from '@angular/core';
import { ServerMessageListComponent } from "./server-message-list/server-message-list";
import { AlertModule } from 'ng2-bootstrap';

@NgModule({
    declarations: [
        ServerMessageListComponent
    ],
    exports: [
        AlertModule,
        ServerMessageListComponent,
    ],
    imports: [AlertModule.forRoot()],
    providers: []
})
export class NirvanaModule {}
