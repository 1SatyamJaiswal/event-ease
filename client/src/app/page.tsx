import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div data-theme="cupcake">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-[700px]">
            <h1 className="mb-5 text-5xl font-bold">Explore All Nearby Events</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link href="/events"><button className="btn btn-primary">Get Started</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
