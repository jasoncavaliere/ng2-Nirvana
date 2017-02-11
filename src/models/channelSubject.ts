import { Subject } from "rxjs";
import { ChannelEvent } from "./channelEvent";
export class ChannelSubject {
    public channel: string;
    public subject: Subject<ChannelEvent>;
}
