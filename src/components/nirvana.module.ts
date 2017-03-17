import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerMessageListComponent } from "./server-message-list/server-message-list";

@NgModule({
    declarations: [
        ServerMessageListComponent
    ],
    exports: [
        ServerMessageListComponent,
    ],
    imports: [CommonModule],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NirvanaModule {}
