import BackButton from "@/components/BackButton";
import DeleteButton from "@/components/DeleteButton";

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function TodoDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const data = await getData(id);
  const date = new Date(data?.createdAt);

  return (
    <main className="flex min-h-screen flex-col p-12 max-w-2xl m-auto">
      <div className="flex gap-2 self-end mb-2">
        <BackButton destPath={"/todos"} />
        <DeleteButton itemId={id} />
      </div>

      <h1 className="mb-2 font-bold text-2xl">{data?.title}</h1>
      <p className="min-h-[10rem] break-words">{data?.description}</p>
      <span className="flex font-extralight text-xs self-end">
        {date.toDateString()}
      </span>
    </main>
  );
}
