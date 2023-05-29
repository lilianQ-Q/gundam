import { Group } from "./Group.type";
import { Report } from "./Report.type";

export type Site = {
	id: number;
	name: string;
	url: string;
	interval: string;
	description: string;
	
	userId: number;

	reports: Report[];

	groups: Group[];

	createdAt: string;
	modifiedAt: string;
}