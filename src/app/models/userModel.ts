export class User {
  constructor(
    public id: number,
    public name: string,
    public guests: number,
    public attending: boolean) {
    }
}
