import {
  TableOptions,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import { InferGetServerSidePropsType } from "next";
import { client } from "../../.tina/__generated__/client";
import { Layout } from "../../components/layout";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const columnHelper = createColumnHelper<Person>();

export default function TablePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const options: TableOptions<unknown> = {
    data: [
      {
        firstName: "tanner",
        lastName: "linsley",
        age: 24,
        visits: 100,
        status: "In Relationship",
        progress: 50,
      },
      {
        firstName: "tandy",
        lastName: "miller",
        age: 40,
        visits: 40,
        status: "Single",
        progress: 80,
      },
      {
        firstName: "joe",
        lastName: "dirte",
        age: 45,
        visits: 20,
        status: "Complicated",
        progress: 10,
      },
    ],
    columns: [],
  };

  return (
    <>
      <Layout>
        <section className="mx-auto mt-10 max-w-8xl">
          <table>
            <thead>
              <tr className="border-1">
                <th>Name</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {props.consultingData.map((data, index) => (
                <tr key={index} className="border-1">
                  <td>
                    <a href={`/consulting/${data.name}`}>{data.name}</a>
                  </td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Layout>
    </>
  );
}

type SEOData = {
  name: string;
  title: string;
  description: string;
};

export async function getServerSideProps() {
  const consultingPages = await client.queries.consultingConnection();
  const consultingData: SEOData[] =
    consultingPages.data.consultingConnection.edges.map((edge) => ({
      name: edge.node.id.split("/")[2].slice(0, -4),
      title: edge.node.seo.title,
      description: edge.node.seo.description,
    }));

  console.log(consultingPages);

  return {
    props: { consultingData },
  };
}
