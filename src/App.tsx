import { useState } from "react";
import FieldItem from "./components/FieldItem";

interface InputData {
	id: number;
	fieldName: string;
	dataType: string;
	required: boolean;
	obj?: InputData[];
}

function App() {
	const [data, setData] = useState<InputData[]>([
		{
			id: 1,
			fieldName: "addName",
			dataType: "object",
			required: true,
			obj: [
				{
					id: 11,
					fieldName: "addName",
					dataType: "string",
					required: true,
				},
				{
					id: 12,
					fieldName: "addName",
					dataType: "string",
					required: true,
				},
			],
		},
		{
			id: 2,
			fieldName: "addName",
			dataType: "integer",
			required: false,
		},
	]);
	const handleState = (item: InputData) => {
		const temp = data.map((i) => (item.id == i.id ? item : i));
		setData(temp);
	};
	const handleDelete = (id: number) => {
		console.log(id);

		const temp = data.filter((i) => i.id != id);
		setData(temp);
	};

	return (
		<main className="flex min-w-full items-center justify-center">
			<div className="bg-white flex flex-col rounded-md  border-[2px] border-slate-200 mt-5 w-[700px]">
				<div className="m-8 bg-slate-50 rounded-md">
					<div className=" flex flex-row justify-between items-center mt-1">
						<h1 className="text-xs font-mono font-medium text-slate-500 ml-10">
							Field name and type
						</h1>
						<button
							onClick={() => {
								const temp = [...data];
								temp.push({
									id: data.length + 1,
									fieldName: "addName",
									dataType: "string",
									required: false,
								});
								setData(temp);
							}}
							className="text-end font-mono font-medium text-black mr-10"
						>
							+
						</button>
					</div>

					{data.map((item) => (
						<>
							<div key={item.id} className="flex  flex-row">
								<div className="flex p-4">{item.id}</div>
								<FieldItem
									data={item}
									handleState={handleState}
									handleDelete={handleDelete}
								/>
							</div>
						</>
					))}
				</div>
			</div>
		</main>
	);
}

export default App;
