export class PagedResult<T> {
    public Results: T[];
    public LastPage: number;
    public Total: number;
    public PerPage: number;
    public Page: number;
}
