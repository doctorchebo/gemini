export class Movie {
  constructor(
    public name: string,
    public genre: string,
    public year: number,
    public director: string,
    public cast: string[],
    public synopsis: string,
    public rating: number,
    public imageUrl?: string
  ) {}
}
