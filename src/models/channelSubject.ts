import { Subject } from "rxjs/Subject";
import { ChannelEvent } from "./channelEvent";
export class ChannelSubject {
    public channel: string;
    public subject: Subject<ChannelEvent>;
}
