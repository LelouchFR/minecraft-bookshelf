import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import Book from "./components/Book";
import Page from "./components/Page";

function Books(props: MC.BooksProps): JSX.Element {
  return (
    <section className="BookSection">{props.children}</section>
  )
}

function NewBook({ CreateBook }: { CreateBook: () => void }): JSX.Element {
  return (
    <div>
      <FontAwesomeIcon icon={faSquarePlus} fontSize={32}/><br />
      <button onClick={CreateBook} className="addBook">Add Book</button>
    </div>
  )
}

export default function App(): JSX.Element {
  const [books, setBooks]: State.Book = useState<MC.BookProps[]>((): MC.BookProps[] => {
    const storedBooks: string = localStorage.getItem("Books")!;
    return storedBooks ? JSON.parse(storedBooks) : [{title: "Welcome Book", text: "Hello and welcome to minecraft-bookshelf here is Baptiste Zahnow writing you a note. This website is secure, every note you write is stored in your localStorage, so you can write anything you want without being scared of getting stolen.\nMore info at github.com/LelouchFR/minecraft-bookshelf", id: 0, enchanted: true}];
  });
  const [shouldShowPage, setShouldShowPage]: State.ShouldShowPage = useState<boolean>(false);
  const [clickedBookIndex, setClickedBookIndex]: State.ClickedBookIndex = useState<number | null>(null);

  const pageComponent: JSX.Element | null = shouldShowPage && clickedBookIndex !== null ? <Page index={clickedBookIndex || 0} title={books[clickedBookIndex]?.title || books[0]!.title} text={books[clickedBookIndex]?.text || books[0]!.text} /> : null;

  // create a book
  function CreateBook(): void {
    const [NewBookTitle, NewBookEnchanted]: string[] = [prompt("New Book Title:")!, prompt("Enchanted ? [Y/N]")!];
    let isEnchanted: boolean = NewBookEnchanted?.toUpperCase() === "Y";
    return setBooks((prevBooks: MC.BookProps[]) => [...prevBooks, { title: NewBookTitle ? NewBookTitle : "Untitled", text: "Write Something...", id: prevBooks.length, enchanted: isEnchanted }]);
  }

  // to display the page from the good book
  function handleBookClick(index: number): void {
    setClickedBookIndex(index);
    togglePageVisibility();
  }

  function togglePageVisibility(): void {
    setShouldShowPage((prevState: boolean) => !prevState);
  }

  // by creating a book, it puts himself in the localStorage
  useEffect((): void => {
    localStorage.setItem("Books", JSON.stringify(books));
  }, [books]);

  // toggle to hide or show the books or the page
  useEffect((): void => {
    const bookSection: HTMLElement = document.querySelector('section.BookSection')!;
    const pageSection: HTMLElement = document.querySelector('section.Page')!;

    if (shouldShowPage) {
      bookSection.classList.remove("show");
      pageSection?.classList.remove("hide");
      bookSection.classList.add("hide");
      pageSection?.classList.add("show");
    } else {
      bookSection.classList.remove("hide");
      pageSection?.classList.remove("show");
      bookSection.classList.add("show");
      pageSection?.classList.add("hide");
    }
  }, [shouldShowPage]);

  // for updating the books and the ui
  const handleDeleteBook = (title: string, id: number): void => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the book "${title}" ?`);
    if (confirmDelete) {
      setBooks((prevBooks) => {
        // @ts-ignore
        const updatedBooks = prevBooks.filter((book: MC.BookProps, i: number): boolean => i !== id);
        localStorage.setItem("Books", JSON.stringify(updatedBooks));
        return updatedBooks;
      });
    } else {
      console.log("non");
    }
  }

  return (
    <>
      <h1 className="title">Minecraft Bookshelf</h1>
      <Books>
        {books.map<JSX.Element>((book: MC.BookProps, index: number): JSX.Element => (
          <Book key={index} title={book.title} text={book.text} enchanted={book.enchanted} onClick={() => handleBookClick(index)} onDelete={() => handleDeleteBook(book.title, index)} />
        ))}
        <NewBook CreateBook={CreateBook}/>
      </Books>
      {pageComponent}
      <small><a href="https://github.com/LelouchFR">&copy; Baptiste Zahnow</a> v1.5</small>
    </>
  )
}