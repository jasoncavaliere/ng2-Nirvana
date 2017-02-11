export class ChannelEvent {
    public Name: string;
    public ChannelName: string;
    public Timestamp: Date;
    public Data: any;
    public Json: string;

    constructor() {
        this.Timestamp = new Date();
    }
}
/**
 * Created by Jason on 2/11/2017.
 */
