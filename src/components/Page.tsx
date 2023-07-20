import { useState, useEffect } from 'react';
import BookPage from "../assets/img/Book_Page.png";

export default function Page({ title, text }: MC.PageProps): JSX.Element {
  let [pNum, maxpNum]: number[] = [1, 1];
  const [textareaValue, setTextareaValue]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>(text);
  const [shouldShowPage, setShouldShowPage] = useState(false);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleTitleClick = (): void => {
    setShouldShowPage((prevState: boolean) => !prevState)
    localStorage.setItem("PageText", textareaValue);
  }

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
        <textarea value={textareaValue} onChange={handleTextareaChange}/>
      </section>
      <div className="MCBTN">
        <button>Sign</button>
        <button onClick={handleTitleClick}>Done</button>
      </div>
    </section>
  )
}