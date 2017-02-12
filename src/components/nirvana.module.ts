import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    imports: [CommonModule, AlertModule.forRoot()],
    providers: []
})
export class NirvanaModule {}
