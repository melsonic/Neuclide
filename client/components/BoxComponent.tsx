import Image from "next/image";
import { ReactElement } from "react";

interface BoxComponentProps {
  image: string
}

export default function BoxComponent(props: BoxComponentProps): ReactElement {
  return (
    <div className="flex justify-center items-center mx-12 box-component-bg rounded-2xl">
      <Image
        src={props.image}
        width={450}
        height={300}
        className="box-component-img"
        alt="box image"
      />
    </div>
  );
}
