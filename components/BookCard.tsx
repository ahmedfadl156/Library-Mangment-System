import Link from "next/link"
import { BookCover } from "./BookCover"

export const BookCard = ({id , title , author , genre , rating , totalCopies , availableCopies , description , coverColor , coverUrl , videoUrl , summary}: Book) => {
return (
    <Link href={`/book/${id}`}>
        <BookCover coverColor={coverColor} coverUrl={coverUrl}/>
        <h2 className="font-bebas-neue text-xl text-[#FFFFFF] mt-2">{title}</h2>
        <p className="text-[#D6E0FF] text-sm mt-2">{author}</p>
    </Link>
)
}
