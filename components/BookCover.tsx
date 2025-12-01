import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide"
const variantStyle: Record<BookCoverVariant, string> = {
    extraSmall: "w-[29px] h-10",
    small: "w-[55px] h-[76px]",
    medium: "w-[144px] h-[199px]",
    regular: "xs:w-[174px] w-[114px] xs:h-[239px] h-[169px]",
    wide: "xs:w-[296px] w-[256px] xs:h-[404px] h-[354px]",
}
interface BookCoverProps {
    variant?: BookCoverVariant;
    coverColor: string;
    coverUrl: string;
    className?: string;
}
export const BookCover = ({variant = "regular", coverColor="#012B48", coverUrl, className}: BookCoverProps) => {
return (
    <div className={cn('relative transition-all duration-300',variantStyle[variant], className)}>
        <BookCoverSvg coverColor={coverColor}/>
        <div className="absolute z-10" style={{left: "12%" , width: "87.5%" , height: "88%"}}>
            <Image src={coverUrl} alt="Book Cover" fill className="object-fill rounded-sm"/>
        </div>
    </div>
)
}
