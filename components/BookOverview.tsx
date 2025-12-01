import Image from "next/image";
import { BookCover } from "./BookCover";

export const BookOverview = ({
    id,
    title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
    videoUrl,
    summary,
}: Book) => {
return (
    <section className="flex flex-col-reverse items-center gap-12 sm:gap-32 xl:flex-row xl:gap-8">
        <div className="flex flex-1 flex-col gap-5">
            <h1 className="text-[#FFFFFF] text-5xl font-bold">{title}</h1>
            <div className="flex flex-row flex-wrap text-xl gap-5 items-center mt-7">
                <p className="text-[#D6E0FF]">By <span className="font-semibold text-[#EED1AC]">{author}</span></p>
                <p className="text-[#D6E0FF]">Category{" "} <span className="font-semibold text-[#EED1AC]">{genre}</span></p>
                <div className="flex flex-row gap-1">
                    <Image src="/icons/star.svg" alt="Star" width={22} height={22}/>
                    <p className="text-[#D6E0FF]">{rating}</p>
                </div>
            </div>
            <div className="flex flex-row gap-5 flex-wrap items-center mt-2">
                <p className="text-[#D6E0FF]">Total Copies: <span className="font-semibold text-[#EED1AC]">{totalCopies}</span></p>
                <p className="text-[#D6E0FF]">Available Copies: <span className="font-semibold text-[#EED1AC]">{availableCopies}</span></p>
            </div>
            <p className="text-[#D6E0FF] mt-2 text-xl text-justify">{description}</p>
            <button className="mt-4 w-fit min-h-14 items-center text-[#16191E] flex gap-2 bg-[#EED1AC] rounded-lg max-md:w-full px-4">
                <Image src="/icons/book.svg" alt="Book" width={20} height={20}/>
                <p className="font-bebas-neue text-xl font-bold">Borrow</p>
            </button>
        </div>
            <div className="relative flex flex-1 justify-center">
                <div className="relative">
                    <BookCover 
                    variant="wide"
                    coverColor={coverColor}
                    coverUrl={coverUrl}
                    className="z-10"
                    />
                </div>
                <div className="absloute lef-16 top-10 rotate-12 opacity-40 max-sm:hidden">
                    <BookCover variant="wide" coverColor={coverColor} coverUrl={coverUrl}/>
                </div>
            </div>
    </section>
)
}
