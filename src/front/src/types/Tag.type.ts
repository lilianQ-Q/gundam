import { Report } from "./Report.type";

export type Tag = {
	id: number;
	name: string;
	
	reports: Report[];

	modifiedAt: string;
	createdAt: string;
}