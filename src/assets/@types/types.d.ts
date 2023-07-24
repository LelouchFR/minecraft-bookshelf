namespace MC {
    type BookProps = {
        title: string;
        text: string;
        enchanted?: boolean;
        onClick?: () => void;
        onDelete?: () => void;
    };
    
    type BooksProps = {
        children: React.ReactNode;
    };

    type PageProps = {
        index: number;
        title: string;
        text: string;
    };
}

namespace State {
    type Book = [MC.BookProps[], React.Dispatch<React.SetStateAction<MC.BookProps[]>>];
    type ShouldShowPage = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    type ClickedBookIndex = [number | null, React.Dispatch<React.SetStateAction<number | null>>];
    type textareaValue = [string, React.Dispatch<React.SetStateAction<string>>];
}