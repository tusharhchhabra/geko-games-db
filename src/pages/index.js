import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex justify-center p-16 ${inter.className}`}></main>
  );
}
