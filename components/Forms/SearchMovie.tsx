"use client";

import { searchMatchingMoviesWithTitle } from "@/app/actions/tmdb.action";
import Image from "next/image";
import { useState } from "react";
import { ValidateMovie } from "../Buttons/ValidateMovie";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchMovie({
  title,
  guid,
}: {
  guid: string;
  title: string;
}) {
  const [filmsWithMatching, setFilmsWithMatching] = useState([]);
  const [filmDetails, setFilmDetails] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const [filmSelected, setFilmSelected] = useState<any>();

  const handleSearchMovieFromTitle = async (formData: FormData) => {
    console.log("searching movie from title");
    const title = formData.get("title") as string;

    const test = await searchMatchingMoviesWithTitle(title);

    if (test.results === 0) {
      setError(true);
    } else {
      setFilmsWithMatching(test.results.slice(0, 3));
    }
  };

  const FilmMatchingList = () => {
    return filmsWithMatching.map((film: any) => {
      return (
        <div key={film.id}>
          <h2>{film.title}</h2>
          <h3>{film.release_date}</h3>

          <Image
            unoptimized
            src={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`}
            width={280}
            height={160}
            alt={film.title}
          />
          <br />
          <ValidateMovie
            film={film}
            guid={guid}
            setFilmsWithMatching={setFilmsWithMatching}
          />
        </div>
      );
    });
  };

  if (!error && filmsWithMatching?.length > 0) {
    return (
      <>
        <button onClick={() => setFilmsWithMatching([])}>CLEAN SEARCH</button>
        <FilmMatchingList />
      </>
    );
  }

  return (
    <>
      <span>Recherche automatique</span>
      <form action={handleSearchMovieFromTitle}>
        <label htmlFor="title">Titre du film</label>
        <Input
          type="text"
          name="title"
          required
          defaultValue={title}
          placeholder="retour vers le futur"
        />
        <Button type="submit">Rechercher</Button>
      </form>

      <span>MANUEL</span>
      <form action={() => console.log("AAAAAAAAAAAA")}>
        <label htmlFor="title">Titre du film</label>
        <Input
          type="text"
          name="title"
          required
          defaultValue={title}
          placeholder="retour vers le futur"
        />
        <label htmlFor="year">Année du film</label>
        <Input type="number" name="year" placeholder="1985" />
        <label htmlFor="directeur">Directeurs</label>
        <Input
          type="text"
          name="directeur"
          placeholder="John Doe, John Smith"
        />
        <label htmlFor="IdImbd">ID IMBD</label>
        <Input type="number" name="IdImbd" required placeholder="00000" />
        <label htmlFor="IdImbd">ID IMBD Collection</label>
        <Input type="number" name="IdImbd" placeholder="0000111" />
        <Button type="submit">Ajouter</Button>
      </form>
    </>
  );
}
