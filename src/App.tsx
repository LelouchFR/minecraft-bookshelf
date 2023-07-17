import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import Book from "./components/Book";

function Books(props: MC.BooksProps): JSX.Element {
  return (
    <section className="BookSection">{props.children}</section>
  )
}

function NewBook({ CreateBook }: { CreateBook: () => void }): JSX.Element {
  return (
    <div>
      <FontAwesomeIcon icon={faSquarePlus} /><br />
      <button onClick={CreateBook}>Add Book</button>
    </div>
  )
}

export default function App(): JSX.Element {
  const [books, setBooks] = useState<MC.BookProps[]>(() => {
    const storedBooks: string = localStorage.getItem("Books")!;
    return storedBooks ? JSON.parse(storedBooks) : [{title: "First Book", enchanted: true}];
  });

  useEffect(() => {
    localStorage.setItem("Books", JSON.stringify(books));
  }, [books]);

  function CreateBook(): void {
    return setBooks((prevBooks: MC.BookProps[]) => [...prevBooks, { title: "New Book" }]);
  }

  return (
    <>
      <h1 className="title">Minecraft Bookshelf</h1>
      <Books>
        {books.map((book: MC.BookProps, index: number) => (
          <Book key={index} title={book.title} enchanted={book.enchanted} />
        ))}
        <NewBook CreateBook={CreateBook}/>
      </Books>
      <small>v0.1</small>
    </>
  )
}