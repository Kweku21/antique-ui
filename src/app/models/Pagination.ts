export class Pagination{
  count: number;
  next: string;
  previous: string;

  constructor(count: number, next: string, previous: string) {
    this.count = count;
    this.next = next;
    this.previous = previous;
  }
}
