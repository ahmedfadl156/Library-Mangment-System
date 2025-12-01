import { BookCard } from "./BookCard";

interface Props {
    title: string;
    books: Book[];
}
export const BookList = ({title , books}: Props) => {
return (
    <section className="my-24">
        <h2 className="font-bebas-neue text-4xl text-[#D6E0FF]">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-12">
            {books.map((book) => (
                <BookCard key={book.id} {...book}/>
            ))}
        </div>
    </section>
)
}
