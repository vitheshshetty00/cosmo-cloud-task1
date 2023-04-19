import Switch from "@mui/material/Switch";
import { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

interface InputData {
	id: number;
	fieldName: string;
	dataType: string;
	required: boolean;
	obj?: InputData[];
}

type FieldItemProps = {
	data: {
		id: number;
		fieldName: string;
		dataType: string;
		required: boolean;
		obj?: InputData[];
	};
	handleState: (item: InputData) => void;
	handleDelete: (id: number) => void;
};

const FieldItem = ({ data, handleState, handleDelete }: FieldItemProps) => {
	const [item, setItem] = useState<InputData>(data);
	const handleObjState = (ob: InputData) => {
		const temp = item.obj?.map((i) => (ob.id == i.id ? item : i));
		setItem({ ...item, obj: temp });
	};
	const handleObjDelete = (id: number) => {
		console.log(id);

		const temp = item.obj?.filter((i) => i.id != id);
		setItem({ ...item, obj: temp });
	};

	return (
		<div className="flex flex-col flex-1 ml-6 ">
			<div className="flex flex-1 flex-row  py-2 justify-between rounded-md hover:bg-slate-200 border-b-2">
				<div>
					<input
						type="text"
						placeholder="AddName"
						value={item.fieldName}
						onChange={(e) => {
							setItem({ ...item, fieldName: e.target.value });
							handleState(item);
						}}
						className={`outline-none border-none w-auto m-2 [&:not(:focus)]:bg-slate-50 [&:not(:focus)]:w-[100px] `}
					/>
					<select
						className="rounded-sm bg-slate-200 outline-none p-1"
						onChange={(e) => {
							setItem({ ...item, dataType: e.target.value });
							handleState(item);
						}}
						value={item.dataType}
					>
						<option value="integer" className="bg-white hover:bg-slate-200  ">
							INTEGER
						</option>
						<option value="string" className="bg-white hover:bg-slate-200 p-2 ">
							STRING
						</option>
						<option
							value="boolean"
							className="bg-white hover:bg-slate-200 p-2 "
						>
							BOOLEAN
						</option>
						<option value="object" className="bg-white hover:bg-slate-200 p-2 ">
							OBJECT
						</option>
					</select>
				</div>

				<div className=" flex items-center ">
					<label htmlFor="switch">Required</label>
					<Switch
						checked={item.required}
						onChange={() => {
							setItem({ ...item, required: !item.required });
							handleState(item);
						}}
						inputProps={{ "aria-label": "controlled" }}
					/>
					{item.dataType == "object" ? (
						<button
							onClick={() => {
								const temp = item.obj||[];
								temp.push({
									id: item.id * 10 + temp?.length + 1,
									fieldName: "addName",
									dataType: "string",
									required: true,
								});
								setItem({ ...item, obj: temp });
								handleState(item);

								// setItem(temp)
							}}
							className=" font-mono font-medium bg-white text-black p-2 mr-1 "
						>
							+
						</button>
					) : (
						""
					)}
					<RiDeleteBin5Fill
						className="text-gray-600 text-lg cursor-pointer mr-2"
						onClick={() => handleDelete(item.id)}
					/>
				</div>
			</div>
			{item.dataType == "object" && item.obj
				? item.obj.map((ob) => (
						<>
							<div key={ob.id}>
								<FieldItem
									data={ob}
									handleState={handleObjState}
									handleDelete={handleObjDelete}
								/>
							</div>
						</>
				  ))
				: ""}
		</div>
	);
};

export default FieldItem;
