import { useState, useEffect } from 'react';
import BookPage from "../assets/img/Book_Page.png";

export default function Page({ index, title, text }: MC.PageProps): JSX.Element {
  let [pNum, maxpNum]: number[] = [1, 1];
  // @ts-ignore
  const [textareaValue, setTextareaValue]: State.textareaValue = useState<string>(text);
  const [shouldShowPage, setShouldShowPage]: State.ShouldShowPage = useState<boolean>(false);
  const updatedText: MC.BookProps[] = JSON.parse(localStorage.getItem("Books")!);

  // function to update the page's content to not lose any data
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = e.target.value;
    setTextareaValue(newValue);
    localStorage.setItem("PageText", newValue);

    if (updatedText && Array.isArray(updatedText) && updatedText.length > index) {
      updatedText[index]!.text = newValue;
      localStorage.setItem("Books", JSON.stringify(updatedText as MC.BookProps[]));
    }
  };

  const handleTitleClick = (): void => {
    setShouldShowPage((prevState: boolean) => !prevState);
  }

  // toggle to hide or show the books or the page
  useEffect((): void => {
    const bookSection: Element = document.querySelector('section.BookSection')!;
    const pageSection: Element = document.querySelector('section.Page')!;
      
    if (shouldShowPage) {
      bookSection.classList.remove("hide");
      pageSection?.classList.remove("show");
      bookSection.classList.add("show");
      pageSection?.classList.add("hide");
    } else {
      bookSection.classList.remove("show");
      pageSection?.classList.remove("hide");
      bookSection.classList.add("hide");
      pageSection?.classList.add("show");
    }
  }, [shouldShowPage]);

  return (
    <section className="Page">
      <section className="content">
        <img id="BookPage" src={BookPage} alt="Book page from Minecraft" draggable={false} />
        <h1>{title}</h1>
        <p>page {pNum} of {maxpNum}</p>
        <textarea value={String(updatedText[index]!.text as string)} onChange={handleTextareaChange}/>
      </section>
      <div className="MCBTN">
        <button>Sign</button>
        <button onClick={handleTitleClick}>Done</button>
      </div>
    </section>
  )
}