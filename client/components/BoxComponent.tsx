import Image from "next/image";

export default function BoxComponent(props: any) {
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
