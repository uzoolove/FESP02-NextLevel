import Pagination from "@/components/Pagination";
import Submit from "@/components/Submit";
import { Metadata } from "next";
import Link from "next/link";
import ListItem from "./ListItem";

export function generateMetadata({ params }: { params: { type: string } }): Metadata{
  const boardName = params.type;
  return {
    title: `${boardName}`,
    description: `${boardName} 게시판입니다.`,
    openGraph: {
      title: `${boardName}`,
      description: `${boardName} 게시판입니다.`,
      url: `/${params.type}`,
      images: {
        url: '/images/fesp.webp'
      }
    }
  };
}

export default function Page({ params }: { params: { type: string } }) {
  const list = [<ListItem key={1} />, <ListItem key={2} />];

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">정보 공유</h2>
      </div>
      <div className="flex justify-end mr-4">
        <Link href={`/${params.type}/new`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">글작성</Link>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">조회수</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">댓글수</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">작성일</th>
            </tr>
          </thead>
          <tbody>
            { list }
          </tbody>
        </table>
        <hr />

        <Pagination />

      </section>
    </main>
  );
}