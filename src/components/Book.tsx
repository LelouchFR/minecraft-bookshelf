import BookImg from "../assets/img/Book.webp";
import EnchantedBookImg from "../assets/img/Enchanted_Book.webp";

export default function Book(props: MC.BookProps): JSX.Element {
  return (
    <div className="book">
      <img src={props.enchanted ? EnchantedBookImg : BookImg} alt={`Minecraft Book about ${props.title}`} draggable="false" />
      <h2 onClick={props.onClick}>{props.title}</h2>
    </div>
  )
}