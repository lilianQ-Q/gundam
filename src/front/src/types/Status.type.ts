import { Report } from "./Report.type";

export type Status = {
	id: number;
	name: string;
	
	reports: Report[];

	modifiedAt: string;
	createdAt: string;
}