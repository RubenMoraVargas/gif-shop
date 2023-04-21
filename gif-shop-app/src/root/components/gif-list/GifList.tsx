import { useSelector } from "react-redux";
import Image from "next/image";
import { selectGifs } from "@/root/redux/reducers/gif-reducer/gifReducer";
import { Gif } from "@/root/types/Gif.type";

export const GifList = () => {
  const gifList = useSelector(selectGifs);

  return (
    <div>
      {gifList.map((gif: Gif) => (
        <Image key={gif.id} src={gif.url} alt={gif.title} />
      ))}
    </div>
  );
};
