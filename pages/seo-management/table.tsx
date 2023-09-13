import { useReactTable } from "@tanstack/react-table";

export default function TablePage() {
  const options = {
    columns: [
      {
        Header: "Name",
        accessor: "name",
  }
  const table = useReactTable(options);

  return (
    <>
      <h1>Table</h1>
    </>
  );
}
